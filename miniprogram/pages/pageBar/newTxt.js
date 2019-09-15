// pages/pa// pages/Page1/Page1.js
//获取应用实例
var app = getApp();
var time = '';
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: "",
    tempFilePaths: "", //wx.chooseImage接口返回的临时地址
    resultstring: "", //API返回的结果
    time: "", //用时记录
    current: 'tab1',
    id: "",
    testData: '这是测试数据！！！',
    TitleList: [{
        text: '历史记录1'
      },
      {
        text: '历史记录2'
      },
      {
        text: '历史记录3'
      },
      {
        text: '历史记录4'
      },
    ],
    isShow1: true

  },
  onLoad: function(options) {
    var _this = this;
    // 调用云函数获取用户openid，用来获取用户自己的笔记信息
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
    //var scene = decodeURIComponent(options.scene)
    //console.log("scene"+scene)
    wx.cloud.callFunction({
      name: 'code',
      data: {},
      success: res => {
        this.setData({
          image: "data:image/png;base64," + wx.arrayBufferToBase64(res.result.buffer)
        })
      }
    })

    /**
     * 获取用户数据库中识别的笔记 显示时间戳最新的3个笔记
     */
    db.collection('content').where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        var tem = new Array();
        var temCount = res.data.length - 3;
        var length = res.data.length;
        if (length < 3) {
          temCount = length;
        }
        var num = 0;
        for (var i = temCount; i < length; i++) {
          tem[i - temCount] = res.data[i];

        }
        this.setData({
          TitleList: tem
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.onLoad()
  },
  /**
   * 下拉刷新页面
   */
  onPullDownRefresh() {
    wx.showNavigationBarLoading()
    this.onLoad()
    setTimeout(() => {
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
    }, 1500)
  },
  /**
   * 选择识别的图片 调用api保存选取图片地址
   */
  chooseimage: function() {
    var that = this;
    wx.chooseImage({
      count: 9, // 默认9 
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
      success: function(res) { // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        that.setData({
          tempFilePaths: res.tempFilePaths
        }); //保存临时文件地址
      }
    })
  },

  /**
   * 识别图片 并将识别的数据保存到云数据库中
   */
  submitimg: function() {
    wx.showLoading({
      'title': '识别中'
    }); //提示框
    var CryptoJS = require('../../lib/crypto-js/crypto-js'); //引入CryptoJS模块
    var now = Math.floor(Date.now() / 1000);
    var expired = now + 10000; //生成过期时间
    var secret_src = 'a=' + app.globalData.appid + '&b=' + '&k=' + app.globalData.secretid + '&e=' + expired + '&t=' + now + '&r=' + '123' + '&f='; //按照开发文档拼接字符串
    var auth_b = CryptoJS.HmacSHA1(secret_src, app.globalData.secret).concat(CryptoJS.enc.Utf8.parse(secret_src)); //完成加密算法
    var auth = auth_b.toString(CryptoJS.enc.Base64); //按要求获取base64字符串
    var that = this;
    time = Date.now(); //开始计时
    wx.uploadFile({
      url: 'https://recognition.image.myqcloud.com/ocr/handwriting',
      filePath: this.data.tempFilePaths[0],
      name: 'image',
      header: {
        'authorization': auth //header按照文档填写
      },
      formData: {
        'appid': app.globalData.appid
      },
      success: function(res) {
        wx.hideLoading();
        db.collection('content').add({
          data: JSON.parse(res.data)
        })
        that.onLoad()
      }

    })
  },
  //识别多张图片函数
  submitimgMore: function() {
    wx.showLoading({
      'title': '识别中'
    }); //提示框
    var CryptoJS = require('../../lib/crypto-js/crypto-js'); //引入CryptoJS模块
    var now = Math.floor(Date.now() / 1000);
    var expired = now + 10000; //生成过期时间
    var secret_src = 'a=' + app.globalData.appid + '&b=' + '&k=' + app.globalData.secretid + '&e=' + expired + '&t=' + now + '&r=' + '123' + '&f='; //按照开发文档拼接字符串
    var auth_b = CryptoJS.HmacSHA1(secret_src, app.globalData.secret).concat(CryptoJS.enc.Utf8.parse(secret_src)); //完成加密算法
    var auth = auth_b.toString(CryptoJS.enc.Base64); //按要求获取base64字符串
    var that = this;
    time = Date.now(); //开始计时
    // var count = this.data.tempFilePaths.length;
    var result;
    var count = this.data.tempFilePaths.length;
    var array = new Array();
    var arrayTem = new Array();
    var currentRecord = 0;
    for (var i = 0; i < count; i++) {
      wx.uploadFile({
        url: 'https://recognition.image.myqcloud.com/ocr/handwriting',
        filePath: this.data.tempFilePaths[i],
        name: 'image',
        header: {
          'authorization': auth //header按照文档填写
        },
        formData: {
          'appid': app.globalData.appid
        },
        success: function(res) {
          wx.hideLoading();
          var jsData = JSON.parse(res.data);
          result = JSON.parse(res.data);
          // array = res.data.items;
          // array.concat(res.data.items)
          array = array.concat(jsData.data.items);
          currentRecord++;
          if (currentRecord == 3) {
            result.data.items = arrayTem.concat(array);
            db.collection('content').add({
              data: result
            })
            this.onLoad()
          }
        }

      })
    }
  },
  //未使用
  display(data) {
    var result = JSON.parse(data);
    if (result.code != 0) //非正常情况
    {
      wx.showModal({
        'title': '错误',
        'content': '服务暂不可用\ncode:' + result.code + '\nmsg:' + result.message,
        'showCancel': false
      });
    } else {
      var out = "识别到了：\n";
      for (var i = 0; i < result.data.items.length; i++) {
        out = out + '[' + i + ']' + ' ' + result.data.items[i].itemstring + '\n'; //识别返回结果的拼接
      }
      var last = Date.now() - time; //停止计时
      this.setData({
        time: ' 用时:' + last + 'ms'
      }); //显示
      console.log(result); //控制台记录结果，以便调试
      this.setData({
        "resultstring": out
      });
    }
  },
  //未使用
  handleChange: function({
    detail
  }) {
    this.setData({
      current: detail.key
    });
    var k = detail.key
    if (k == "tab1") {
      console.log(detail.key);
      this.setData({
        isShow1: true
      });
    }
    if (k == "tab2") {
      this.setData({
        isShow1: false
      });
    }
  },
  /**
   * 跳转到编辑页面 将当前栏目（已识别的笔记）id传输到编辑页面
   */
  TurnTo: function(event) {
    var id = event.currentTarget.id;
    wx.navigateTo({
      url: '../note/noteedit?id=' + id,
    })
  },
  /**
   * 跳转到分享页面 毕竟栏目显示数据传输到分享页面
   */
  shareto: function(event) {
    var id = event.currentTarget.id;
    console.log("id" + id);
    var n = event.currentTarget.id
    var update = this.data.TitleList
    for (let i in update) {
      if (update[i]._id == n) {
        this.setData({
          testData: update[i]
        })
      }
    }
    wx.navigateTo({
      url: '../share/share?data=' + JSON.stringify(this.data.testData),
    })
  }
})
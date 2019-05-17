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
  onLoad: function (options) {
    var _this = this;
    // 调用云函数获取用户openid，用来获取用户自己的笔记信息
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
    db.collection('content').where({
      _openid: app.globalData.openid
    }).get({
      success: res => {
        this.setData({
          TitleList: res.data
        })
      }
    })
  },
  chooseimage: function () {
    var that = this;
    wx.chooseImage({
      count: 9, // 默认9 
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
      success: function (res) { // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        that.setData({
          tempFilePaths: res.tempFilePaths
        }); //保存临时文件地址
      }
    })
  },

  submitimg: function () {
    wx.showLoading({
      'title': '识别中'
    }); //提示框
    var CryptoJS = require('../../lib/crypto-js/crypto-js'); //引入CryptoJS模块
    var now = Math.floor(Date.now() / 1000);
    var expired = now + 1000; //生成过期时间
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
      success: function (res) {
        wx.hideLoading();
        console.log(res.data);
        console.log(JSON.parse(res.data).data)
        db.collection('content').add({
          data: JSON.parse(res.data)
        })
      }

    })
  },
  //识别多张图片函数
  submitimgMore: function () {
    wx.showLoading({
      'title': '识别中'
    }); //提示框
    var CryptoJS = require('../../lib/crypto-js/crypto-js'); //引入CryptoJS模块
    var now = Math.floor(Date.now() / 1000);
    var expired = now + 1000; //生成过期时间
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
      console.log("循环" + i);
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
        success: function (res) {
          wx.hideLoading();
          var jsData = JSON.parse(res.data);
          console.log(i);
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
          }
        }

      })
      console.log("结束api调用");
    }

    // db.collection('content').add({
    //   data: JSON.parse(res.data)
    // })
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
  handleChange: function ({
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
  TurnTo: function (event) {
    var id = event.currentTarget.id;
    console.log(event);
    wx.navigateTo({
      url: '../note/noteedit?id=' + id,
    })
  },
  shareto: function () {
    wx.navigateTo({
      url: "../share/share",
    })
  }
})
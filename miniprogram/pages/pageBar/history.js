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
  onLoad: function(options) {

    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    });
    /**
     * 获取用户信息
     */
    wx.getUserInfo({
      success: function(res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
      }
    })
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
   * 跳转到编辑页面 将当前栏目（已识别的笔记）id传输到编辑页面
   */
  TurnTo: function(event) {
    var id = event.currentTarget.id;
    console.log(event);
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
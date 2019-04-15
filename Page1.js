// pages/Page1/Page1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:'tab1',
    TitleList:[
      {
        text:'历史记录1'
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
    isShow1 : true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  handleChange: function ({ detail }) {
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
  TurnTo:function(){
    wx.navigateTo({
      url: '../Page2/Page2',
    })
  },
  ShareTo:function(){
    wx.navigateTo({
      url: '../Page3/Page3',
    })
  }
})
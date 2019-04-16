// pages/Page2/Page2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'tab1',
    isShow1: false,
    Light:false,
    Chapter: [
      {
        title: '数据库简介\n',
        text: '数据库(Database)是按照 数据结构来组织、存储和管理数据的仓库，它产生于距今六十多年前，随着信息技术和市场的发展，特别是二十世纪九十年代以后，数据管理不再仅仅是存储和管理数据，而转变成用户所需要的各种数据管理的方式。\n'
      },
      {
        title: '数据库的基本结构\n',
        text: '数据库的基本结构分三个层次，反映了观察数据库的三种不同角度。以内模式为框架所组成的数据库叫做物理数据库；以概念模式为框架所组成的数据叫概念数据库；以 外模式为框架所组成的数据库叫用户数据库。\n'
      },
      {
        title: '数据库的分类\n',
        text: '数据库通常分为层次式数据库、网络式数据库和关系式数据库三种。而不同的数据库是按不同的数据结构来联系和组织的。\n'
      }
    ],
    
    updateview: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    db.collection('content').get({
      success: res => {
        this.setData({
          Chapter: res.data
        })
      }
    })
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

})
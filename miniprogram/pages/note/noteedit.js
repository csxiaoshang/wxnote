// pages/note/noteedit.js

const db = wx.cloud.database();
Page({
  itemId: "",
  item: {},

  /**
   * 页面的初始数据
   */
  data: {
    Edit: false,
    Pen: false,
    Title: false,
    TitleList: [{
        
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    this.itemId = options.id;
    console.log(options.id);
    db.collection('content').doc(options.id).get({
      success: res => {
        console.log(res.data)
        this.setData({
          TitleList: res.data

        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  change: function(e) {
    var n = e.currentTarget.id
    var update = this.data.TitleList
    for (let i in update) {
      if (i == n) {
        console.log(update[i])
        update[i].itemstring = e.detail.value
      }
    }

    this.setData({
      TitleList: update
    })
  },
  editable: function() {
    var k = this.data.Edit
    if (k == false) {
      this.setData({
        Edit: true
      });
    } else {
      this.setData({
        Edit: false
      });
    }
  },
  penable: function() {
    var k = this.data.Pen
    if (k == false) {
      this.setData({
        Pen: true
      });
    } else {
      this.setData({
        Pen: false
      });
    }
  },
  titleable: function() {
    var k = this.data.Title
    if (k == false) {
      this.setData({
        Title: true
      });
    } else {
      this.setData({
        Title: false
      });
    }
  },
  draw: function(e) {
    var P = this.data.Pen
    var T = this.data.Title
    var num = e.currentTarget.id
    if (T == true) {
      var update = this.data.TitleList
      for (let i in update) {
        if (i == num) {
          if (update[i].title == true) {
            update[i].title = false
          } else {
            update[i].title = true
          }
        }
      }
      this.setData({
        TitleList: update
      })
    } else if (P == true) {
      var update = this.data.TitleList
      for (let i in update) {
        if (i == num) {
          if (update[i].important == true) {
            update[i].important = false
          } else {
            update[i].important = true
          }
        }
      }
      this.setData({
        TitleList: update
      })
    }
  },
  shareto: function() {
    wx.navigateTo({
      url: "../share/share",
    })
  }
})
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
    TitleList: [
      {
        itemstring: "我多么想和你见一面",
        id: 0,
        important: false,
        title: true
      },
      {
        itemstring: "说说你最近改变",
        id: 1,
        important: false,
        title: false
      },
      {
        itemstring: "不再去说从前",
        id: 2,
        important: true,
        title: false
      },
      {
        candword: [],
        coordpoint: { x: [270, 502, 626, 471, 635, 564, 278, 596] },
        id: 3,
        important: false,
        title: false
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
        this.setData({
          TitleList: res.data

        })
        for (var i = 0; i < this.data.TitleList.data.items.length; i++) {
          var important = "TitleList.data.items[" + i + "].important";
          var title = "TitleList.data.items[" + i + "].title";
          //index 用来标识每句话id
          var index="TitleList.data.items["+i+"].index";
          this.setData({
            [important]: false,
            [title]: false,
            [index]:i
          })
        }
        console.log(this.data.TitleList);
      }
    })
  
  },

  save:function(){
    
    db.collection('content').doc(this.data.TitleList._id).set({
      data: this.data.TitleList.data,
       success(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      },
      fail: console.error
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
  editable: function () {
    var k = this.data.Edit
    if (k == false) {
      this.setData({
        Edit: true
      });
    }
    else {
      this.setData({
        Edit: false
      });
    }
  },
  //标识是否为划重点状态
  penable: function () {
    var k = this.data.Pen
    if (k == false) {
      this.setData({
        Pen: true
      });
    }
    else {
      this.setData({
        Pen: false
      });
    }
  },
  //标识是否为画标题状态
  titleable: function () {
    var k = this.data.Title
    if (k == false) {
      this.setData({
        Title: true
      });
    }
    else {
      this.setData({
        Title: false
      });
    }
  },
  //执行函数
  draw: function (e) {
    var P = this.data.Pen
    var T = this.data.Title
    var num = e.currentTarget.id
    if (T == true) {
      var update = this.data.TitleList
      for (let i in update[0].data[0].items) {
        if (i == num) {
          console.log(i)
          console.log(update[0].data[0])
          if (update[0].data[0].items[i].title == true) {
            update[0].data[0].items[i].title = false
          }
          else {
            update[0].data[0].items[i].title = true
          }
        }
      }
      this.setData({
        TitleList: update
      })
    }
    else if (P == true) {
      var update = this.data.TitleList
      for (let i in update[0].data[0].items) {
        if (i == num) {
          if (update[0].data[0].items[i].important == true) {
            update[0].data[0].items[i].important = false
          }
          else {
            update[0].data[0].items[i].important = true
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
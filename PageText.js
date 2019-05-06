// pages/PageText/PageText.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'tab1',
    Light: false,
    color:'white',
    Chapter: [
      {
        title: '数据库简介\n',
        Important:true,
        id:0
      },
      {
        title: '数据库的基本结构\n',
        Important:false,
        id:1
      },
      {
        title: '数据库的分类\n',
        Important:false,
        id:2
      },
      {
        title: '数据库的样子\n',
        Important: false,
        id: 3
      }
    ],
    updateview: ''
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
  Important:function(e){
    console.log(e.currentTarget)
    var idNum = e.currentTarget.id
    var id_List = this.data.Chapter
    for(let i in id_List)
    {
      if(i == idNum)
      {
        if(id_List[i].Important == true)
        {
          id_List[i].Important = false
          console.log(id_List[i].Important)
        }
        else
        {
          id_List[i].Important = true
        }
      }
    }
    console.log(id_List)
    console.log(idNum)
    this.setData({
      Chapter: id_List
    });
  }
})
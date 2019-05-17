// pages/pageBar/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TitleList: [
      {
        _id: "9c4488c75cb5c6da002b61f90968fe43",
        _openid: "oLdUB5WskrZnNc2T1WYJfMXE23Fo",
        angle: "-5.0078125",
        class: [],
        items: [
          {
            candword: [],
            coordpoint: { x: [193, 166, 835, 110, 842, 194, 200, 250] },
            coords: [],
            itemconf: 0.9883249998092652,
            itemcoord: { height: 85, width: 645, x: 284, y: 184 },
            itemstring: "我多么想和你见一面",
            parag: { parag_no: 0, word_size: 71 },
            wordcoordpoint: [],
            words: [{ character: "我", confidence: 0.9999759197235109 }, { character: "多", confidence: 0.9999986886978148 }, { character: "么", confidence: 0.8980211615562439 }, { character: "想", confidence: 0.9999988079071044 }, { character: "和", confidence: 0.9991870522499084 }, { character: "你", confidence: 0.999979853630066 }, { character: "见", confidence: 0.99997878074646 }, { character: "一", confidence: 0.9996544122695924 }, { character: "面", confidence: 0.9981300234794616 }]
          },
          {
            candword: [],
            coordpoint: { x: [211, 280, 849, 224, 856, 303, 218, 359] },
            coords: [],
            itemconf: 0.9997504949569702,
            itemcoord: { height: 80, width: 641, x: 292, y: 299 },
            itemstring: "说说你最近改变",
            parag: { parag_no: 0, word_size: 71 },
            wordcoordpoint: [],
            words: [{ character: "说", confidence: 0.9992650151252748 }, { character: "说", confidence: 0.9999786615371704 }, { character: "你", confidence: 0.9998657703399658 }, { character: "最", confidence: 0.9999449253082277 }, { character: "近", confidence: 0.9994693398475648 }, { character: "改", confidence: 0.9997301697731018 }, { character: "变", confidence: 0.9999996423721313 }]
          },
          {
            candword: [],
            coordpoint: { x: [237, 392, 750, 347, 757, 421, 243, 466] },
            coords: [],
            itemconf: 0.9994809031486512,
            itemcoord: { height: 75, width: 516, x: 308, y: 413 },
            itemstring: "不再去说从前",
            parag: { parag_no: 0, word_size: 71 },
            wordcoordpoint: [],
            words: [{ character: "不", confidence: 0.9999834299087524 }, { character: "再", confidence: 1 }, { character: "去", confidence: 0.9991475343704224 }, { character: "说", confidence: 0.999789297580719 }, { character: "从", confidence: 0.9980441331863404 }, { character: "前", confidence: 0.9999208450317384 }]
          },
          {
            candword: [],
            coordpoint: { x: [270, 502, 626, 471, 635, 564, 278, 596] }
          }
        ],
      },
    ]
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
  TurnTo: function () {
    wx.navigateTo({
      url: '../note/noteedit',
    })
  },
  shareto: function () {
    wx.navigateTo({
      url: "../share/share",
    })
  }
})
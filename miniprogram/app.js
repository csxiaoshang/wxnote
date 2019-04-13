//app.js
App({
  globalData: {
    appid: "1258991770",
    secretid: "AKID571h7JT2bw61iACKH2lvrjX9e0CAuPde",
    secret: "SkukfT3ZzL9udzFonbFjRtKYrz3tYrvm"
  },
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
  }
})

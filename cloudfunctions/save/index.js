// 云函数入口文件
const cloud = require('wx-server-sdk')
const db=wx.cloud.database();
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  content=db.collection('content');
  db.collection('content').add({
    data:JSON.parse(event.data)
  })
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
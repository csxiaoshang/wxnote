const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.wxacode.getUnlimited({
      scene: 'a=1',
      page:"pages/pageBar/newTxt"
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}
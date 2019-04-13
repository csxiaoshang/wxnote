// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();
// 云函数入口函数
// 云函数入口函数，async关键字说明此云函数是一个可能含有异步操作的函数，可以不用深究，有兴趣可以自行百度。
//event参数包含传过来的参数
exports.main = async (event, context) => {
//函数体写在这里

//更新数据
try { //尝试执行，以防异常

//返回操作结果，collection方法选择集合，参数是集合名，这里是"hello",类型为字符串。
return db.collection('test').where({ //where方法设置过滤条件，这里是选择tag字段为特定值的记录，具体的值通过参数传递。

tag: event.tag

}).update({ //update方法更新所筛选出来的记录

data: { //update方法参数为json对象，data属性值的类型为json，字段为需要更新的字段。这里需要更新content字段。

content: event.content

},

})

} catch (e) { //若有异常，打印出来
   console.log(e)
}
}
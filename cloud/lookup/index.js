//云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env: 'mrchen-9gvs0g3k54e7dcb7'})
const db = cloud.database()
const _ = db.command
const $ = _.aggregate
// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('Test').aggregate()
  .lookup({
    from: 'Course',      //要关联的表student
    localField: 'Course_Number',      //class表中的关联字段
    foreignField: 'Course_Id',      //student表中关联字段
    as: 'stu'      //定义输出数组的别名
  })
  .match({
    Student_Number:"201806062518"
  })
  .end()
  console.log(res)

}
// const cloud = require('wx-server-sdk')
// cloud.init({env: 'mrchen-9gvs0g3k54e7dcb7'})
// const db = cloud.database()
// exports.main = async (event, context) => {
//   return await db.createCollection('sss')
// }
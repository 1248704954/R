// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db= cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection(event.Course_Id + '_Course_Teacher_Assessment').where({
    Student_Id:event.Student_Id
  }).get();
  
}
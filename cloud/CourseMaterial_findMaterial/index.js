// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  
  return cloud.database().collection("Course_Material").orderBy('filedate','asc').where({
    Course_Id: event.courseID
  }).get();
}
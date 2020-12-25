// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  
  return cloud.database().collection(event.courseID + "_Course_Chapter_Unit").where({
    Chapter_Number: event.chapterID,
    Chapter_Unit_Id: event.unitID
  }).get();
}
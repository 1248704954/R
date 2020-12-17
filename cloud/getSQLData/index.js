// 云函数入口文件
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数                                           发、


exports.main = async (event, context) => {
  
  return cloud.database().collection("Student_Message").where({
    Account:event.findAccount
  }).get();
}
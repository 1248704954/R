// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()


// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection(event.courseID +  "_Course_Assignment").add({
    data:
    {
      Student_Id:event.Student_Id,
      Assignment_Number:event.Assignment_Number,
      Assignment_Type:event.Assignment_Type,
      Assignment_Condition:event.Assignment_Condition
    }
  });
}
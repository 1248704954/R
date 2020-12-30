// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection(event.courseID +  "_Comment").add({
    data:
    {
      Children_Id:event.Children_Id,
      Date:event.Date,
      Father_Id:event.Father_Id,
      Like_Number:event.Like_Number,
      S_comment:event. S_comment,
      Sname:event.Sname,
      Student_Number:event.Student_Number
    }
  });
}
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('1_Course_Teacher_Assessment').add({
     // data 传入需要插入的数据
     data: {
      Student_Comment:event.StudentComment,
      Student_Id:event.StudentId,
      Student_Score:event.StudentScore
     }
    })
   } catch (e) {
    console.error(e)
   }
}

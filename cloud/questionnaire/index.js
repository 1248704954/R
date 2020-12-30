const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('1_Course_Teacher_Assessment').doc('98bb04175feaa90900bab0ef3d571035').update({
     // data 传入需要局部更新的数据
     data: {
      Student_Comment:event.StudentComment,
      Student_Score:event.StudentScore
     }
    })
   } catch (e) {
    console.error(e)
   }
}
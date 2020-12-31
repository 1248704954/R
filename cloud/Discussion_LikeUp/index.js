const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  try { 
    return await db.collection(event.courseID + '_Comment').doc(event._id).update({
     // data 传入需要局部更新的数据
     data: {
      Like_Number:event.Like_Number
     }   
    })
    
   } catch (e) {
    console.error(e)
   }
}
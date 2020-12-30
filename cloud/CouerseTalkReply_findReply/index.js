// 云函数入口函数
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
//查询
exports.main = async (event, context) => {
  var a=event.Children_Id
  try {
    //order
    return await db.collection(event.courseID + '_Comment').where({
      Children_Id:a,
    }).get({
      success: function (res) {
       return res;
      }
    });
  } catch (e) {
    console.error(e);
  }
}
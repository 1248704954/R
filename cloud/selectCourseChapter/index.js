//云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env: 'mrchen-9gvs0g3k54e7dcb7'})
const db = cloud.database()
const _ = db.command
const $ = _.aggregate
// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection(event.chapterTable).aggregate()
  .lookup({
    from: event.unitTable,      //要关联的表A
    localField: 'Chapter_Number',      //表中关联字段
    foreignField: 'Chapter_Number',      //A的关联字段
    as: 'Unit_List'      //定义输出数组的别名
  })

  
  .end()
  console.log(res)

}

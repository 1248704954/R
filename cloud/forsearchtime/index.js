const cloud = require('wx-server-sdk')
cloud.init({env: 'mrchen-9gvs0g3k54e7dcb7'})
const db = cloud.database()
const _ = db.command
const $ = _.aggregate

exports.main = async (event, context) => {
  return await db.collection('Course_Material').aggregate().match({
     Course_Id: event.courseID
  }).project({
    // filedate: 1
    _id: 0,
    
    file:1,
    filename:1,
    filedate: $.dateToString({
      date:'$filedate',
      format: '%Y-%m-%d',
      timezone: 'Asia/Shanghai'
    })
  }).end()

// exports.main = async (event, context) => {
//  return 
}
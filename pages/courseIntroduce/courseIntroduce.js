// pages/courseintroduce/courseintroduce.js
const app = getApp()

var courseID = ""

Page({

  data: {
    items: [], // 显示课程说明信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    courseID = e.courseId

    let THIS = this
    wx.cloud.callFunction({ //查询记录(条件：课程编号)
      name : "CourseIntroduce_findMessage",
      data:{
        courseID: parseInt(courseID)
      },
      fail(res){console.log("获取数据失败",res)},
      success(res){
        console.log(res.result.data[0].Course_Message)
        THIS.setData({
          items: res.result.data[0].Course_Message
        })
        console.log(THIS.data.items[0])
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad()
  },

})
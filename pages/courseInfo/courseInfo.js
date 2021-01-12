// pages/courseInfo/courseInfo.js
Page({

  data: {
    courseId: null, //课程Id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var receiveData = e.courseId; //接受参数并赋值
    this.setData({
      courseId: receiveData, //获取课程编号
    })
  },

  //跳转 courseStudentSign页面
  toPageCourseStudentSign: function(e) {
    wx.navigateTo({
      url: '/pages/courseStudentSign/courseStudentSign?courseId=' + this.data.courseId
    })
  },
})
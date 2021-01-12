// pages/courseTeacherFunction/courseTeacherFunction.js
Page({

  /**
   * 页面的初始数据
   */
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

  //跳转 courseTeacherSign页面
  toPageCourseTeacherSign: function(e) {
    wx.navigateTo({
      url: '/pages/courseTeacherSign/courseTeacherSign?courseId=' + this.data.courseId
    })
  },

  //跳转 courseUpload页面
  toPageCourseUpload: function(e) {
    wx.navigateTo({
      url: '/pages/courseUpload/courseUpload?courseId=' + this.data.courseId
    })
  },

})
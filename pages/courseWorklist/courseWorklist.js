// pages/workList/workList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //跳转 courseStudentWorkIndex页面
  toPageCourseStudentWorkIndex: function(e) {
    wx.navigateTo({
      url: '/pages/courseStudentWorkIndex/courseStudentWorkIndex'
    })
  },
})
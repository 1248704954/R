// const db = wx.cloud.database().collection("Course")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  toPageMy: function() { //跳转 my页面
    wx.navigateTo({
      url: '/pages/task/task',
    })
  },
  toPageCourse: function() { //跳转 courses页面
    wx.navigateTo({
      url: '/pages/courses/courses',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.cloud.callFunction({ //查询记录(条件：账号)
    //   name : "lookup",
    //   data:{
    //   },
    //   fail(res){console.log("获取数据失败",res)},
    //   success(res){
    //     var tmp = 
    //     console.log(res.result.list[0].stu)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
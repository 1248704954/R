// pages/courses/courses.js
const app = getApp()

let inputMess = ""

Page({
  // 页面的初始数据
  data: {
    inputShowed: false, //初始文本框不显示内容
    not_find: false, //未找到显示
    ShowList: []
  },

  // 使文本框进入可编辑状态
  showInput: function () {
    this.search(inputMess)
    this.setData({
      inputShowed: true //设置文本框可以输入内容
    });
  },

  // 取消搜索
  hideInput: function () {
    this.setData({
      inputShowed: false
    });
    this.search(""); //设置为空
  },

  //点击搜索事件
  searchClick: function (e) {
    inputMess = e.detail.value
    this.search(e.detail.value)
  },

  //筛选课程
  search: function (key) {
    console.log(key)
    var This = this;
    var ShowList = wx.getStorage({
      key: 'DataList',
      success: function (res) {
        if (key == "") { //搜索栏为空
          This.setData({
            ShowList: res.data
          })
          return;
        }
        var arr = []; //存储结果列表
        for (let i in res.data) {
          console.log(res.data[i].Course_Number)
          console.log(res.data[i].stu)
          console.log(res.data[i].stu[0].Course_Name)
          if (String(res.data[i].stu[0].Course_Name).indexOf(key) >= 0 || String(res.data[i].stu[0].Teacher_Name).indexOf(key) >= 0)
            arr.push(res.data[i]);
        }
        if (arr.length == 0) {
          This.setData({
            ShowList: []
          })
        } else {
          This.setData({
            ShowList: arr
          })
        }
      }
    })
  },

  onLoad: function () {
    this.findAllCourses();//查询所有课程信息
  },
  
  //查询所有课程信息
  findAllCourses: function() {
    let that = this
    let account = app.globalData.account
    if (account == null) account = ""
    wx.cloud.callFunction({ //查询记录(条件：账号)
      name : "getStudentCourse",
      data:{
        account: app.globalData.account
      },
      fail(res){console.log("获取数据失败",res)},
      success(res){
        var tmp = []; //存储结果列表
        for (let i in res.result.list)
          tmp.push(res.result.list[i])
        wx.setStorage({
          data: tmp,
          key: 'DataList',
        })
        that.setData({
          ShowList: tmp
        })
        console.log(tmp)
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onLoad();
  },

  //跳转 courseIndex页面
  toPageCourseIndex: function(e) {
    console.log('/pages/courseIndex/courseIndex?courseId=' + e.target.id)
    wx.navigateTo({
      url: '/pages/courseIndex/courseIndex?courseId=' + e.target.id,
    })
  }
});
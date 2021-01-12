// pages/courseIndex/courseIndex.js
const app = getApp()
var option = 1; //option(1:任务; 2:章节; 3:更多)

Page({
  data: {
    role: 0,
    ChapterList: [], //显示章节列表
    displayDroplist:[], //显示下拉框
    courseId: null, //课程Id
    S_num: ["","十","二十","三十","四十","五十","六十","七十","八十","九十"],
    s_num: ["","一", "二", "三", "四", "五", "六", "七", "八", "九"],
  },

  //option选择(任务、章节、更多) 事件
  optionSelect: function (s) {
    var THIS = this
    if (s.target.id == 0) { //选择 任务
      THIS.setData({
        option: 0
      })
    } else if (s.target.id == 1) { //选择 章节
      THIS.setData({
        option: 1
      })
    } else { //选择 更多
      THIS.setData({
        option: 2
      })
    }
  },
  //章节选择 事件
  chapterSelect:function(e) {
    var THIS = this;
    var arr = this.data.displayDroplist;
    if(arr[e.target.id] == true)
      arr[e.target.id] = false;
    else arr[e.target.id] = true;
    this.setData ({
      displayDroplist:arr
    })
  },

  onLoad: function (e) {
    console.log(this.data.role)
    var receiveData = e.courseId; //接受参数并赋值
    this.setData({
      courseId: receiveData, //获取课程编号
      role: app.globalData.role
    })

    this.setData({
      option: 1 //默认显示“章节”页
    })
    this.findAllChapter(); //查询课程的所有章节信息
  },

  //查询课程的所有章节信息
  findAllChapter: function() {
    let THIS = this
    console.log(this.data.courseId)
    wx.cloud.callFunction({
      name: "selectCourseChapter",
      data: {
         chapterTable: this.data.courseId + '_Course_Chapter',
         unitTable : this.data.courseId + '_Course_Chapter_Unit'
      },
      fail(res) {
        console.log("获取数据失败", res)
      },
      success(res) {
        console.log(res.result.list)
        var arr=[];
        for(let i in res.result.list) 
          arr.push(false); //初始化为false
        THIS.setData({
          ChapterList: res.result.list,
          displayDroplist:arr
        })
      }
    })
  },

  //跳转 courseChapter页面
  toPageCourseChapter: function(e) {
    console.log(e.currentTarget.id) 
    var s = e.currentTarget.id;
    var pos = s.lastIndexOf(",");
    var chapter = s.substring(0, pos);
    var unit = s.substring(pos + 1);
    console.log(chapter)
    console.log(unit)
    wx.navigateTo({
      url: '/pages/courseChapter/courseChapter?courseId=' + this.data.courseId
        + "&chapter=" + chapter + "&unit=" + unit
    })
  },
  //跳转 courseMaterial页面
  toPageCourseMaterial: function(e) {
    wx.navigateTo({
      url: '/pages/courseMaterial/courseMaterial?courseId=' + this.data.courseId
    })
  },
  //跳转 courseIntroduce页面
  toPageCourseIntroduce: function(e) {
    wx.navigateTo({
      url: '/pages/courseIntroduce/courseIntroduce?courseId=' + this.data.courseId
    })
  },

  //跳转 courseDiscussion页面
  toPageCourseDiscussion: function(e) {
    wx.navigateTo({
      url: '/pages/courseDiscussion/courseDiscussion?courseId=' + this.data.courseId
    })
  },

  //跳转 courseQuestionnaire页面
  toPageCourseQuestionnaire: function(e) {
    wx.navigateTo({
      url: '/pages/courseQuestionnaire/courseQuestionnaire?courseId=' + this.data.courseId
    })
  },

  //跳转 courseTeacherFunction页面
  toPageCourseTeacherFunction: function(e) {
    wx.navigateTo({
      url: '/pages/courseTeacherFunction/courseTeacherFunction?courseId=' + this.data.courseId
    })
  },

  //跳转 courseStatistics页面
  toPageCourseStatistics: function(e) {
    wx.navigateTo({
      url: '/pages/courseStatistics/courseStatistics?courseId=' + this.data.courseId
    })
  },

  //跳转 courseInfo页面
  toPageCourseInfo: function(e) {
    wx.navigateTo({
      url: '/pages/courseInfo/courseInfo?courseId=' + this.data.courseId
    })
  },

  //跳转 courseWorklist页面
  toPageCourseWorklist: function(e) {
    wx.navigateTo({
      url: '/pages/courseWorklist/courseWorklist?courseId=' + this.data.courseId
    })
  },

})
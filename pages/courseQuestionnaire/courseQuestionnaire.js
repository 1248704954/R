// pages/questionnaire/questionnaire.js\
const app = getApp()

let score=0
let courseID = ""

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {name: '5', value: '完全同意'},
      {name: '4', value: '同意'},
      {name: '3', value: '基本同意', checked: true},
      {name: '2', value: '不同意'},
      {name: '1', value: '完全不同意'},
    ],
    questionTitle: [
      "1.我很清楚本课程的学习目标、教学安排和考核要求",
      "2.老师注重将育人融入教学，对我树立正确的人生观、价值观、世界观有帮助",
      "3.课程内容有广度和深度，兼顾基础和前沿，有挑战度",
      "4.老师注重课堂管理，师生互动充分，学习气氛浓郁，有利于我专心学习",
      "5.老师注重学习兴趣的激发，提高了我的学习主动性",
      "6.老师注重启发引导，使我能积极思考并提出问题",
      "7.老师提供的课外学习资源丰富，对我的学习有帮助",
      "8.老师布置的课后作业或练习适当，批改与指导及时，我遇到的学习问题能及时解决",
      "9.老师关心和尊重我们，教学过程考核评价公正合理",
      "10.老师注重我们知识、能力和素质的协同发展，课程学习让我受益匪浅"
    ],
    showValue : [],
    advice : '',
    isOpenSubmit : true,
    isSumbitQuestionnaire : false 
  },

  onLoad: function (e) {
    //获取页面传递参数
    courseID = e.courseId;
    this.initCourseQuestionnaire(); //初始化页面
  },
  onShow: function (e) {
    this.initCourseQuestionnaire(); //初始化页面
  },
  initCourseQuestionnaire: function () {
    let THIS = this;
    var tmp = [];
    for (let i = 0; i <= 10; i++) tmp.push(3);
    THIS.setData({
      showValue: tmp
    })

    wx.cloud.callFunction({//查询该学号是否已提交问卷
      name: "CourseQuestionnaire_findAccount",
      data:{
          Course_Id: courseID,
          Student_Id: app.globalData.account
        },
       success(res){
        if(res.result.data.length!=0){ 
          THIS.setData({
            isSumbitQuestionnaire : true
          })
        }
        else
        {
          THIS.setData({
            isSumbitQuestionnaire : false
          })
        }
        console.log("res.result",THIS.data.isSumbitQuestionnaire)      
       }
     })
  },
  //单选框选择事件
  radioChange: function(e) {
    let THIS = this

    var pstr = "showValue[" + e.currentTarget.id + "]"
    THIS.setData({
      [pstr] : e.detail.value
    })
  },
  //提交问卷事件
  courseQuestionnaireSubmit:function(e){
    let THIS = this

    wx.showLoading({
      title: '提交中',
    })
    
    THIS.setData({
      advice:e.detail.value
     })
     score = 0;
     for (let i = 1; i <= 10; i++) 
      score += parseInt(THIS.data.showValue[i])
     score = score * 2
     var text = THIS.data.advice.opinion;
    console.log(text)
    // console.log(this.data.text.opinion)
    wx.cloud.callFunction({ //查询记录(条件：账号)
      name : "CourseQuestionnaire_addQuestionnaire",
      data:{   
        StudentComment: text,
        StudentScore: score,
        StudentId: app.globalData.account
      },
      fail(res){
        console.log("获取数据失败",res)
        wx.hideLoading({
          success: (res) => {
            wx.showToast({
              title: '提交失败',
              icon: 'fail',
              duration: 1000,
              mask: true
            })},
        })
      },
      success(res){
        console.log("获取数据成功",THIS.data.text)
        wx.hideLoading({
          success: (res) => {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 1000,
              mask: true
            })
            THIS.initCourseQuestionnaire(); //初始化页面
          }
        })
      },
    })
  },
})
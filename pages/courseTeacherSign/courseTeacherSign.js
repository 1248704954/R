var time1= require("../../utils/util.js");
var timestamp = Date.parse(new Date());
var date = new Date(timestamp);
//获取年  
var YY = date.getFullYear();
var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
//获取当日 
var DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
var HH = date.getHours()
const db = wx.cloud.database()
//获取应用实例
Page({
  data: {
    number:'',
    infoMess: '',
    Year:'',
    Y:'',
    Month:'',
    M:'',
    Day:'',
    D:'',
    Hour: '',
    H:'',
    time:'',
    Publish_time:'',
    End_time:''
  },
  //时间输入框事件
  YearInput:function(e){
    this.setData({
      Y:e.detail.value
    })
  },
  MonthInput:function(e){
    this.setData({
      M:e.detail.value
    })
  },
  DayInput:function(e){
    this.setData({
      D:e.detail.value
    })
  },
  HourInput:function(e){
    this.setData({
      H:e.detail.value
    })
  },
  //登录按钮点击事件，调用参数要用：this.data.参数；
  //设置参数值，要使用this.setData({}）方法
  loginBtnClick:function(){
    var number1=0;
    if(this.data.Y.length == 0 || this.data.M.length == 0 || this.data.D.length == 0 ||this.data.H.length == 0){
      this.setData({
        infoMess:'温馨提示：日期不能为空！',
      })
    }else{
      this.setData({
        infoMess:'',
        Year:this.data.Y+'年',
        Month:this.data.M+'月',
        Day:this.data.D+'日',
        Hour:this.data.H+'时',
        Publish_time:'发布时间：'+new Date(),
        // End_time:new Date("2019-2-5 1:36"),
        End_time:'截止时间：'+new Date(this.data.Y+'-'+this.data.M+'-'+this.data.D+' '+this.data.H+':00'),
      })
      // const db = wx.cloud.database();
    /**
     * 向集合class01中添加数据
     */
    wx.cloud.callFunction({
      name: 'useroption',
      data: {
        option: 'get2',
        // getname:this.data.getname
      },
      success: res => {
        for(var i=1;i<res.result.data.length;i++){
          if(res.result.data[i].Sign_Number>number1){
            number1=res.result.data[i].Sign_Number
          }
        }
        db.collection('1_Course_Sign_Information').add({
          data:{
            End_Time:new Date(this.data.Y+'-'+this.data.M+'-'+this.data.D+' '+this.data.H+':00'),
            Sign_Number:number1+1,
            Start_Time:new Date(),
          }
      }).then(res=>{
          console.log(res)
      })
      wx.cloud.callFunction({
        name: 'useroption',
        data: {
          option: 'get1',
        },
        success: res => {
          for(var i=0;i<res.result.data.length;i++){
            wx.cloud.callFunction({
              name: 'useroption',
              data: {
                option: 'add1',
                addData:{
                  Sign_Condition:"未签到",
                  Sign_Number:number1+1,
                  Student_Id:res.result.data[i].Student_Id,
                }
              },
              success: res => {
                wx.showToast({
                  title: '发布签到成功',
                })
                console.log("添加成功")
                console.log(res)
              },
              fail: err => {
                console.log("添加失败")
              }
            })
          }
          this.setData({
            array: res.result.data
          })
          wx.showToast({
            title: '数据查询成功',
          })
          console.log(res.result.data)
        },
        fail: err => {
          console.log(err)
        }
      })
      },
      fail: err => {
        console.log(err)
      }
    })
    }
  },
})
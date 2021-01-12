var time= require("../../utils/util.js");
var timestamp = new Date().getTime();
const db = wx.cloud.database();
const _ = db.command;
Page({
  data: {
    // S_id:'',
    // S_num:'',
    Sign_Number:'',
    Student_Id:'',
    openid: '',
    Now_time:new Date().getTime(),
    N:(new Date()).toLocaleString(),
    End_time:new Date().getTime()-1000,
    E:"",
    info:"",
  },
  dbupdate3:function(options){
    this.setData({
      N: (new Date()).toLocaleString()
    })
    var that = this;
    db.collection('1_Course_Sign_Information').where({
      Sign_Number:_.eq(2)
    }).get({
      success(res) {
        that.setData({
          End_time:(res.data[0].End_Time).getTime(),
          E:"截止时间：" + (new Date((res.data[0].End_Time).getTime())).toLocaleString()
        })
      }
    })
    console.log('更新后：'+this.data.E)
  },
  
  inputupdatename:function(e){
    this.setData({
      S_id:e.detail.value
    })
  },
  inputupdateage:function(e){
    this.setData({
      S_num:e.detail.value
    })
  },
  updateDataFn(){
    wx.cloud.callFunction({
      name: 'useroption',
      data: {
        option: 'update1',
        // S_id:this.data.S_id,
        // S_num:this.data.S_num
        Sign_Number:"2",
        Student_Id:"201806062109"
      },
      success: res => {
        wx.showToast({
          title: '数据修改成功',
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  dbupdate2:function(options){
     if(this.data.End_time>=this.data.Now_time){
      wx.cloud.callFunction({
        name: 'useroption',
        data: {
          option: 'update1',
          Sign_Number:"2",
          Student_Id:"201806062518"
        },
        success: res => {
          wx.showToast({
            title: '数据修改成功',
          })
        },
        fail: err => {
          console.log(err)
        }
      })
    }else{
      this.setData({
        info:"时间已过"
      })
    }
  },
})
// pages/user/user.js
const app = getApp()
const DB =wx.cloud.database().collection("Student_Message")

let InputAccount = ""
let InputName = ""

Page({
  data: {
    avatarUrl: "https://s3.ax1x.com/2020/12/16/rlEkjg.png", //头像URL
    showModalStatus: false,
    Accout: "", //学工号
    Name: "",  //姓名
    bindMessage:"请 先 登 录"
  },
  onShow: function() {
    this.wxLoginBindCheck() //微信登录绑定检验
  },
  onLoad: function() { //页面加载事件
    wx.getSetting({ // 获取用户微信信息
      success: res => {
        if (res.authSetting['scope.userInfo']) { //已经授权
          wx.getUserInfo({ //可以直接调用 getUserInfo 获取头像昵称，不会弹框
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
              app.globalData.avatarUrl = res.userInfo.avatarUrl
            }
          })
          this.getOpenId() //获取微信openid并调用判断绑定事件
        }
      }
    })
  },
  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) { //微信已经授权
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
      app.globalData.avatarUrl = e.detail.userInfo.avatarUrl
      this.getOpenId() //获取微信openid并调用判断绑定事件
    }
  },
  getOpenId: function() { //获取微信openid并调用判断绑定事件
    let that = this;
    wx.cloud.callFunction({
      name:'getopenid',
      complete:res=>{
        var openid = res.result.openid
        app.globalData.openid = openid
        console.log(openid)
        that.setData({
          openid:openid
        })
        this.wxLoginBindCheck() //微信登录绑定检验
      }
    })
  },
  wxLoginBindCheck: function() { //微信登录绑定检验
    let that = this
    if (app.globalData.openid != null) {
      DB.where({
        _openid:app.globalData.openid }).get
        ({
        success(res){
          if(res.data.length!=0) { //已经绑定账号
            app.globalData.account = res.data[0].Account
            console.log(res.data)
            console.log(res.data[0].Name)
            that.setData({
              Accout:res.data[0].Account,
              Name:res.data[0].Name,
              bindMessage:res.data[0].Name
            })
          }
          else { //未绑定账号
            that.setData({
              bindMessage: "请绑定个人信息"
            })
          }
        },
  
      })
    }
    
  },

  toPageMy: function() { //跳转 my页面
    wx.navigateTo({
      url: '/pages/my/my'
    }) 
  },
  toPageCourse: function() { //跳转 courses页面
    wx.navigateTo({
      url: '/pages/courses/courses',
    })
  },


})

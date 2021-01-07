// pages/my/my.js
const app = getApp()
const DB_filelist = wx.cloud.database().collection("filelist")
const DB_Student_Message =wx.cloud.database().collection("Student_Message")

let InputAccount = "" //输入 学工号
let InputName = "" //输入 姓名

Page({
  
  data:{
    avatarUrl: app.globalData.avatarUrl, //头像URL
    showModalStatus: false,
    showBinding: false, //显示 绑定 按钮
    showExitBinding: false, //显示 解绑 按钮
    DataList : [] //个人具体信息
  },
 onLoad(){
    let THIS = this
    THIS.setData({
      avatarUrl: app.globalData.avatarUrl
    })
    THIS.getBindingStatus(); //获取当前绑定状态
  },

  getBindingStatus: function(){ //获取当前绑定状态
    let THIS = this
    var tmp = app.globalData.account;
    if (app.globalData.openid == null) { //未登录
      tmp = "暂未绑定";
      THIS.setData({
        showBinding : false,
        showExitBinding : false
      })
    }
    else if (app.globalData.account == null) { //未绑定账号
      tmp = "暂未绑定";
      THIS.setData({
        showBinding : true,
        showExitBinding : false
      })
    }
    else { //已绑定账号
      THIS.setData({
        showBinding : false,
        showExitBinding : true
      })
    }
    console.log(tmp)
    wx.cloud.callFunction({ //查询记录(条件：账号)
      name : "getSQLData",
      data:{
        findAccount:tmp
      },
      fail(res){console.log("获取数据失败",res)},
      success(res){
        console.log("获取数据成功",res.result.data),
        THIS.setData({
          DataList: res.result.data
        })
      }
    })
  },

  addAccount(event){ //获取输入账号
    InputAccount = event.detail.value
    this.setData({
      isBinding: false
    })
  },
  addName(event){ //获取输入姓名
    InputName = event.detail.value
    this.setData({
      isBinding: false
    })
  },
  powerDrawer: function (e) { //button按钮暂留
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function(currentStatu){ //弹窗动画
    this.setData({
      isBinding: false
    })
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 300,  //动画时长
      timingFunction: "linear", //线性
      delay: 0  //0则不延迟
    });
    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;
    // 第3步：执行第一组动画
    animation.opacity(0).rotateX(-100).step();
    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })
    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })
      
      //关闭
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)
  
    // 显示
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  binding: function(e){ //用户绑定操作
    let that = this
    var currentStatu = e.currentTarget.dataset.statu;
    DB_Student_Message.where({Account:InputAccount }).get
        ({
        success(res){
          var bindingok = true; //判是否绑定成功
          console.log(res.data.length) 
          if (res.data.length == 0) bindingok = false; //账号不存在
          else if (res.data[0].Name != InputName) bindingok = false; //姓名和账号不一致
          else if (res.data[0]._openid != "") bindingok = false; //账号已被他人绑定
          console.log(bindingok)
          console.log(app.globalData.openid)
          if (bindingok ==  true) //绑定成功
          {
            DB_Student_Message.where({Account:InputAccount }).get //更新Student_Message表中的_openid字段
            ({
                success(res){
                  console.log(res.data[0]._id) 
                  console.log(app.globalData.openid)
                  wx.cloud.callFunction({ //更新记录(字段：_openid)
                    name : "updateOpenid",
                    data:{
                      Id:res.data[0]._id,
                      Openid:app.globalData.openid
                    },
                    fail(res){console.log("更新数据失败")},
                    success(res){
                      console.log("更新数据成功")
                    }
                  })
                  app.globalData.account = InputAccount
                  that.getBindingStatus(); //获取当前绑定状态
                  that.showBindingOk(); //弹出 成功窗口
                  that.util(currentStatu); //动画效果
                  console.log(app.globalData.account)
                  InputAccount = "";  //输入 学工号
                  InputName = ""; //输入 姓名
                },
            })
            
            
          }
          else //绑定失败
          {
            //账号已被绑定或账号错误
            console.log('no');
            that.setData({
              isBinding: true
            })
          }
        },
      })
    
  },
  exitBinding: function(e) { //退出绑定操作
    let that = this
    DB_Student_Message.where({Account:app.globalData.account }).get //更新Student_Message表中的_openid字段
    ({
        success(res){
          console.log(res.data[0]._id) 
          wx.cloud.callFunction({ //更新记录(字段：_openid)
            name : "updateOpenid",
            data:{
              Id:res.data[0]._id,
              Openid:""
            },
            fail(res){console.log("更新数据失败")},
            success(res){
              console.log("更新数据成功")
            }
          })
          that.showBindingOk(); //弹出 成功窗口
          app.globalData.account = null
          that.getBindingStatus(); //获取当前绑定状态
        },
    })
  },
  showBindingOk: function() { //成功效果
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 1000
  })
  },

})
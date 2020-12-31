// pages/information/information.js
const app = getApp()

let comment_id=0
let child_Id=0 // 最大Children_Id+1
let courseID = ""

Page({

  /**
   * 页面的初始数据
   */
  data: {
    prombleList:[], //评论信息
    deleteShow:[], //评论删除标志
    List:[] , //话题信息
    receive:null,

    sensitiveword:[],//敏感词
    isSensitiveword:false,//敏感词标志
   
    // 删除的标志
    isdelete: -1,
    toast: false,
    warnToast: false,
    hideToast: false,
    hideWarnToast: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var receive=options.commentid;
    this.setData({
      receive:receive
    })
    comment_id=parseInt(receive)
    console.log(comment_id)
    courseID = options.courseId

    this.initCourseReplyComment(); //初始化页面
  },
  onShow: function(){
    this.initCourseReplyComment(); //初始化页面
  },
  //初始化页面
  initCourseReplyComment: function() {
    let THIS = this
    comment_id = parseInt(THIS.data.receive)
    //评论信息
    wx.cloud.callFunction({
      name: 'Discussion_findComment',
      data: {
        courseID: parseInt(courseID),
        Father_Id: comment_id,
      },
      success(res){
        console.log("获取数据成功",res.result.data)
        var tmp = []
        res.result.data.forEach((item) => {
          if (item.Student_Number == app.globalData.account) tmp.push(true)
          else tmp.push(false)
          });
        THIS.setData({
          prombleList: res.result.data,
          deleteShow: tmp
        })
        console.log(tmp)
        console.log(res.result.data)
      }
    })
    
    //话题信息
    wx.cloud.callFunction({
      name: 'CouerseTalkReply_findReply',
      data: {
        courseID: parseInt(courseID),
        Children_Id: comment_id,
      },
      success(res){
        console.log("获取数据成功",res.result.data)
        THIS.setData({
          List: res.result.data
        })
        console.log(THIS.data.List)
        }
      })

      //查找敏感词
    wx.cloud.callFunction({
      name: "CourseDiscussion_findSensitiveWord",
      success(res) {
        THIS.setData({
            sensitiveword: res.result.data,
            isSensitiveword: false
        }) 
          console.log(res.result.data)
          // console.log("mgc",this.data.mgc[5].Word)       
      },
    })
  },

  // 发布函数
  publish: function (e) {
  let THIS = this;

  //查找话题中是否存在敏感词
  for (let i in THIS.data.sensitiveword) {    
    if (String(e.detail.value.text).indexOf(THIS.data.sensitiveword[i].Word) >= 0 )
    {
      THIS.setData({
        isSensitiveword:true
      })
      wx.showModal({
        title: "发布失败",
        content: "存在敏感词！请重新编辑发布！",
        showCancel: false
      });
    }
  }

  if (THIS.data.isSensitiveword == false)
  {
    var date = new Date();
    var dateString = date.toLocaleDateString();
    var timeString = date.toString().split(" ")[4]; 
    var finalString = dateString + " " + timeString;
    console.log(e.detail.value.text)

    //获取最大Children_Id+1
    wx.cloud.callFunction({
      name: "Discussion_findall",
      data: {
        courseID: parseInt(courseID)
      },
      success(res) {
        console.log("更新数据成功", res.result.data[0].Children_Id)         
        child_Id=res.result.data[0].Children_Id+1     
        console.log(child_Id)
        comment_id = parseInt(THIS.data.receive)
        wx.cloud.callFunction({
          name: "Discussion_add",
          data: {
            courseID: parseInt(courseID),
            Children_Id:child_Id,
            Date: finalString,
            Father_Id: comment_id,
            Like_Number: 0,
            S_comment: e.detail.value.text,
            Sname: app.globalData.name,
            Student_Number: app.globalData.account,
          },
          success(res) {
            console.log("更新数据成功", res)
            THIS.initCourseReplyComment(); //初始化页面
          },
          fail(res) {
            // console.log("更新数据失败", res)
          }
        })

        //成功窗口
        wx.showToast({
          title: "发布成功",
          icon: 'success',
          duration: 1500,
          mask: false,
          success: function () {
            THIS.setData({
              text_value: ""
            })
          },
        })
      },
      fail(res) {
        console.log("更新数据失败", res)
      }
    })
  }
  else
  {
    THIS.setData({
      isSensitiveword: false
    })
  }
 },
 
 // 获取将要删除的编号
 is_delete: function (e) {
  this.setData({
    isdelete: e.target.id
  })
},
 // 取消删除
 delete_close: function () {
    this.setData({
      isdelete: -1
    })
  },
  // 确认删除
  delete_yes: function () {
    let THIS = this;
    var id = THIS.data.prombleList[THIS.data.isdelete]._id;

    console.log(id)
    wx.cloud.callFunction({
      name: "Discussion_delete",
      data: {
        _id: id,
        courseID: parseInt(courseID)
      },
      success(res) {
        console.log(id)
        console.log(THIS.data.receive)
        THIS.initCourseReplyComment(); //初始化页面
        THIS.openToast();
      },
      fail(res) {
        THIS.openWarnToast();
        console.log("更新数据失败", res)
      }
    })

    THIS.delete_close()
  },

  // 点赞
  likeUp: function (e) {
    let THIS = this
    var i = e.target.id;
    var value = THIS.data.prombleList[i].Like_Number + 1;
    var id = THIS.data.prombleList[i]._id;
    var pstr = "prombleList[" + i + "].Like_Number"
    var sstr = "saveList[" + i + "].Like_Number"
    THIS.setData({
      [pstr]: value,
      [sstr]: value
    })

    wx.cloud.callFunction({
      name: "Discussion_LikeUp",
      data: {
        Like_Number: value,
        _id: id,
        courseID: parseInt(courseID)
      },
      success(res) {
        // console.log("更新数据成功", res)
      },
      fail(res) {
        // console.log("更新数据失败", res)
      }
    })
  },

openToast: function () {
  this.setData({
    toast: true
  });
  setTimeout(() => {
    this.setData({
      hideToast: true
    });
    setTimeout(() => {
      this.setData({
        toast: false,
        hideToast: false,
      });
    }, 300);
  }, 3000);
},
openWarnToast: function () {
    this.setData({
      warnToast: true
    });
    setTimeout(() => {
      this.setData({
        hidewarnToast: true
      });
      setTimeout(() => {
        this.setData({
          warnToast: false,
          hidewarnToast: false,
        });
      }, 300);
    }, 3000);
  },

  //跳转 courseTask页面
  toPageCourseTask:function(e){
    var id = e.currentTarget.id;
    console.log('/pages/courseTalkReply/courseTalkReply?courseId='+ courseID + '&commentid=' + id)
    console.log(id)
    wx.navigateTo({
      url: '/pages/courseTalkReply/courseTalkReply?courseId='+ courseID + '&commentid=' + id,
    })
  },
})


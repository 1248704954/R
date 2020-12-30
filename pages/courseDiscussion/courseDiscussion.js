// pages/discussion/discussion.js
const app = getApp()

let inputMess = ""
let child_Id = 0 // 最大Children_Id+1
let courseID = ""

Page({

  /**
   * 页面的初始数据
   */
  data: {
    text_value: "", // 发表的文字
    inputShowed: false, //初始文本框不显示内容

    saveList: [], 
    prombleList: [], // 渲染的文字
    deleteShow:[], //评论删除标志

    isdelete: -1, // 删除的标志(编号)
    toast: false, // 删除成功
    warnToast: false, // 删除失败
    hideToast: false,
    hideWarnToast: false,
  },
  
  onLoad: function (e) {
    //获取页面传递参数
    courseID = e.courseId;
    this.initCourseDiscussionComment(); //初始化页面
  },

  onShow: function (e) {
    this.initCourseDiscussionComment(); //初始化页面
  },

  //初始化页面
  initCourseDiscussionComment: function() {
    let THIS = this;
    wx.cloud.callFunction({
      name: 'Discussion_findComment',
      data: {
        courseID: parseInt(courseID),
        Father_Id: 0
      },
      success(res) {
        console.log("获取数据成功", res.result.data);
        var tmp = []//tmp:临时数组,存删除标志
        res.result.data.forEach((item) => {
          item.Date = item.Date.substring(0, 10) + " " + item.Date.substring(11, 19);
          if (item.Student_Number == app.globalData.account) tmp.push(true)
          else tmp.push(false)
        });
        THIS.setData({
          saveList: res.result.data,
          prombleList: res.result.data,
          deleteShow: tmp
        })
      }
    })
  },

  // 发布函数
  publish: function (e) {
    var THIS = this;
    var date = new Date();
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

        wx.cloud.callFunction({
          name: "Discussion_add",
          data: {
            courseID: parseInt(courseID),
            Children_Id:child_Id,
            Date: date,
            Father_Id: 0,
            Like_Number: 0,
            S_comment: e.detail.value.text,
            Sname: app.globalData.name,
            Student_Number: app.globalData.account,
          },
          success(res) {
            console.log("更新数据成功", res)
            THIS.initCourseDiscussionComment();
          },
          fail(res) {
            console.log("更新数据失败", res)
          }
        })
      },
      fail(res) {
        console.log("更新数据失败", res)
      }
    })

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
        THIS.initCourseDiscussionComment();
        THIS.openToast();
      },
      fail(res) {
        THIS.openWarnToast();
        console.log("更新数据失败", res)
      }
    })

    THIS.delete_close()
  },

  
  // 点赞 更新事件
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
        console.log("更新数据成功", res)
      },
      fail(res) {
        console.log("更新数据失败", res)
      }
    })
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
    this.search("")
  },
  //点击搜索事件
  searchClick: function (e) {
    inputMess = e.detail.value
    this.search(e.detail.value)
  },
  //筛选
  search: function (key) {
    var THIS = this;

    var arr = []; 
    for (let i in THIS.data.saveList) {
      var item = THIS.data.saveList[i];
      if (item.Sname.indexOf(key) >= 0 || item.S_comment.indexOf(key) >= 0)
        arr.push(item);
    }
    THIS.setData({
      prombleList: arr
    })
  },

  // 删除成功效果
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
  // 删除失败效果
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
    console.log(id)
    wx.navigateTo({
      url: '/pages/courseTalkReply/courseTalkReply?courseId=' + courseID + '&commentid='+id,
    })
  },
})
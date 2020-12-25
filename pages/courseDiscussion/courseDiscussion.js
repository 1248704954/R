// pages/discussion/discussion.js

let inputMess = ""
 // 最大Children_Id+1
let child_Id=0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 发表的文字
    text_value: "",
    //初始文本框不显示内容
    inputShowed: false,

    // 渲染的文字
    saveList: [],
    prombleList: [],

    // 删除的标志
    isdelete: -1,
    toast: false,
    warnToast: false,
    hideToast: false,
    hideWarnToast: false,
  },
  totalk:function(e){
    var id = e.currentTarget.id;
    console.log(id)
    wx.navigateTo({
      url: '/pages/task/task?id='+id,
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
  a: function (e) {
    inputMess = e.detail.value
    this.search(e.detail.value)
  },
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

  onLoad: function (e) {
    let THIS = this;
    wx.cloud.callFunction({
      name: 'getcomment',
      data: {
        Father_Id: 0
      },
      success(res) {
        console.log("获取数据成功", res.result.data),
          res.result.data.forEach((item) => {
            item.Date = item.Date.substring(0, 10) + " " + item.Date.substring(11, 19);
          });
        THIS.setData({
          saveList: res.result.data,
          prombleList: res.result.data
        })
      }
    })
    
    //获取最大Children_Id+1
    wx.cloud.callFunction({
      name: "Discussion_findall",
      
      success(res) {
        console.log("更新数据成功", res.result.data[0].Children_Id)         
        child_Id=res.result.data[0].Children_Id+1     
        console.log(child_Id)
      },
      fail(res) {
        // console.log("更新数据失败", res)
      }
    })
  },

  onShow: function (e) {
    this.onLoad();
    // let THIS = this;
    // wx.cloud.callFunction({
    //   name: 'getcomment',
    //   data: {
    //     Father_Id: 0
    //   },
    //   success(res) {
    //     console.log("获取数据成功", res.result.data),
    //       res.result.data.forEach((item) => {
    //         item.Date = item.Date.substring(0, 10) + " " + item.Date.substring(11, 19);
    //       });
    //     THIS.setData({
    //       saveList: res.result.data,
    //       prombleList: res.result.data
    //     })
    //   }
    // })
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
        _id: id
      },
      success(res) {
        // console.log("更新数据成功", res)
      },
      fail(res) {
        // console.log("更新数据失败", res)
      }
    })
  },

  // 确认删除
  is_delete: function (e) {
    this.setData({
      isdelete: e.target.id
    })
  },

  // 发布函数
  publish: function (e) {
    var This = this;
    var date = new Date();
    console.log(e.detail.value.text)
   

    wx.cloud.callFunction({
      name: "Discussion_add",
      data: {
        Children_Id:child_Id,
        Date: date,
        Father_Id: 0,
        Like_Number: 0,
        S_comment: e.detail.value.text,
        Sname: "莫清宇",
        Student_Number: "201806062611",
      },
      success(res) {
        console.log("更新数据成功", res)
        child_Id=child_Id+1
        This.onLoad();
      },
      fail(res) {
        // console.log("更新数据失败", res)
      }
    })

    wx.showToast({
      title: "发布成功",
      icon: 'success',
      duration: 1500,
      mask: false,
      success: function () {
        This.setData({
          text_value: ""
        })
      },
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
        _id: id
      },
      success(res) {
        // console.log("更新数据成功", res)
        // var arr = [];
        // for (let i in THIS.data.prombleList) {
        //   if (i != THIS.isdelete)
        //     arr.push(THIS.data.prombleList[i]);
        // }
        // THIS.setData({
        //   prombleList: arr
        // })
        THIS.onLoad();

        THIS.openToast();
      },
      fail(res) {
        this.openWarnToast();
        // console.log("更新数据失败", res)
      }
    })

    this.delete_close()
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
})
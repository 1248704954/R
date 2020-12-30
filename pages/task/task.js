// pages/information/information.js
let ss=6
// 最大Children_Id+1
let child_Id=0
Page({

  /**
   * 页面的初始数据
   */
  data: {
  prombleList:[], //评论信息
  List:[] , //话题信息
  receive:null,
   
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var receive=options.id;
    console.log(options);
    this.setData({
      receive:receive
    })
    ss=parseInt(receive)
    console.log(ss)
    console.log(receive)
    let THIS = this
    wx.cloud.callFunction({
      name: 'getcomment',
            data: {
              Father_Id: ss,
            },
      success(res){
        console.log("获取数据成功",res.result.data)
        res.result.data.forEach((item) => {
          item.Date = item.Date.substring(0,10)+" "+item.Date.substring(11,19)
          });
        THIS.setData({
          prombleList: res.result.data
        })
      }
    })
    
    wx.cloud.callFunction({
      
      name: 'getcomment1',
      data: {
        Children_Id: ss,
      },
      success(res){
        console.log("获取数据成功",res.result.data)
        res.result.data.forEach((item) => {
          item.Date = item.Date.substring(0,10)+" "+item.Date.substring(11,19)
          });
        THIS.setData({
          List: res.result.data
        })
        console.log(THIS.data.List)
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
      Father_Id: ss,
      Like_Number: 0,
      S_comment: e.detail.value.text,
      Sname: "莫清宇",
      Student_Number: "201806062611",
    },
    success(res) {
      console.log("更新数据成功", res)
      child_Id=child_Id+1
      
    },
    fail(res) {
      // console.log("更新数据失败", res)
    }
  })
 },
 // 取消删除
 delete_close: function () {
  this.setData({
    isdelete: -1
  })
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
      // THIS.onLoad();

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


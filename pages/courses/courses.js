// pages/courses/courses.js

let inputMess = ""

Page({
  // 页面的初始数据
  data: {
    inputShowed: false, //初始文本框不显示内容
    ShowList: []
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
  //筛选
  search: function (key) {
    console.log(key)
    var This = this;
    var ShowList = wx.getStorage({
      key: 'DataList',
      success: function (res) {
        if (key == "") {
          This.setData({
            ShowList: res.data
          })
          return;
        }
        var arr = [];
        for (let i in res.data) {
          if (String(res.data[i].Cname).indexOf(key) >= 0 || String(res.data[i].Tname).indexOf(key) >= 0)
            arr.push(res.data[i]);
        }
        if (arr.length == 0) {
          This.setData({
            ShowList: [{
              Cname: "无相关数据"
            }]
          })
        } else {
          This.setData({
            ShowList: arr
          })
        }
      }
    })
  },

  onLoad: function () {
    var DataList = [{
      Cname: "数学",
      Tname: "张三",
      Cimage: "http://static.basicedu.chaoxing.com/erya_new/8fa460fcafbefc2224a99f203a11fc3d.jpg"
    }, {
      Cname: "英语",
      Tname: "李四",
      Cimage: "http://static.basicedu.chaoxing.com/erya_new/8fa460fcafbefc2224a99f203a11fc3d.jpg"
    }]
    wx.setStorage({
      data: DataList,
      key: 'DataList',
    })
    this.setData({
      ShowList: DataList
    })
  }
});
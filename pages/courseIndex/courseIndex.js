// pages/courseIndex/courseIndex.js
const app = getApp()
var falg = 1;

Page({
  data: {
    DataList: [],
    ChapterList: [],
    S_num: ["","十","二十","三十","四十","五十","六十","七十","八十","九十"],
    s_num: ["","一", "二", "三", "四", "五", "六", "七", "八", "九"],
    vis:[]
  },

  select: function (s) {
    var that = this
    console.log(s.target.id)
    if (s.target.id == 0) {
      that.setData({
        falg: 0
      })
    } else if (s.target.id == 1) {
      that.setData({
        falg: 1
      })
    } else {
      that.setData({
        falg: 2
      })
    }
    console.log(falg)
  },

  onLoad: function () {
    var That = this
    That.setData({
      falg: 1
    })

    wx.cloud.callFunction({
      name: "selectCourseChapter",
      data: {},
      fail(res) {
        console.log("获取数据失败", res)
      },
      success(res) {
        console.log(res.result.list)
        var arr=[];
        for(let i in res.result.list) 
          arr.push(false);
        That.setData({
          ChapterList: res.result.list,
          vis:arr
        })
      }
    })
  },

  choose_Chapter:function(e) {
    console.log(e.target.id)
    var That = this;
    var arr = this.data.vis;
    if(arr[e.target.id] == true)
      arr[e.target.id] = false;
    else arr[e.target.id] = true;
    this.setData ({
      vis:arr
    })
  }
})
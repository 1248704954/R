// pages/activityPhoto/activityPhoto.js
const db = wx.cloud.database()
const _ = db.command

let inputMess = ""
var courseID = ""
// var util = require('../../utils/util.js')

Page({
  data: {
    picMode: ["https://s3.ax1x.com/2020/12/23/r6BuRJ.png", "https://s3.ax1x.com/2020/12/22/rskzSP.png"], //0:视频; 1:文档
    items: [], // 显示课程资料信息
    showMode: [], //显示课程资料类别
    inputShowed: false
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
    for (let i in THIS.data.save_items) {
      var item = THIS.data.save_items[i];
      if (item.filename.indexOf(key) >= 0)
        arr.push(item);
    }
    THIS.setData({
      items: arr
    })
  },

  onLoad: function (e) {
    wx.cloud.callFunction({
      name: "forsearchtime",
      success(res){
        console.log(222)
        console.log(res.result.formatDate)
      },
      fail(res){
        console.log(111);
      }
    })


    //获取页面传递参数
    courseID = e.courseId;
    console.log(e.courseId)
    this.getCourseMaterial(); //获取课程资料列表
    
  },

  onShow:function() {
    this.onLoad();
  },

  //获取课程资料列表
  getCourseMaterial: function() {
    let THIS = this
    console.log(courseID)
    wx.cloud.callFunction({ //查询记录(条件：课程编号)
      name : "CourseMaterial_findMaterial",
      data:{
        courseID: parseInt(courseID)
      },
      fail(res){console.log("获取数据失败",res)},
      success(res){
        var tmp = []
        var Res = res.result.data
        console.log(Res)
        for(let i in res.result.data) {
          var date = res.result.data[i].filedate 

          


          res.result.data[i].filedate = res.result.data[i].filedate.substring(0, 10) + " " + res.result.data[i].filedate.substring(11, 19);
          var url = res.result.data[i].file;
          var index = url.lastIndexOf(".") //获取最后一个.的位置
          var ext = url.substring(index + 1) //获取后缀
          if (['avi', 'mp4', 'wmv'].indexOf(ext.toLowerCase()) !== -1) tmp.push(0);
          else tmp.push(1);
        }
        THIS.setData({
          items: res.result.data,
          showMode: tmp
        })
        console.log(THIS.data.items)
      }
    })
  },

  // 打开文档 事件
  openDocument: function (e) {
    wx.showLoading({
      title: '加载中',
    })

    console.log("file=" + e.currentTarget.id)
    wx.cloud.downloadFile({
      fileID: e.currentTarget.id,
      success: res => {
        // 获取当前文件路径
        console.log(res.tempFilePath)
        const tempFilePath = res.tempFilePath;
        // 保存文件
        wx.saveFile({
          tempFilePath,
          success: function (res) {
            const savedFilePath = res.savedFilePath;
            console.log(savedFilePath)
            // 打开文件
            wx.openDocument({
              filePath: savedFilePath,
              success: function (res) {
                console.log('打开文档成功')
              },
            });
          },
          fail: function (err) {
            console.log('保存失败：', err)
          }
        });
      },
      fail: err => {
        // handle error
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  }
})
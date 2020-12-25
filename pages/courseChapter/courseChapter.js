// pages/activityPhoto/activityPhoto.js
const db = wx.cloud.database()
const app = getApp()
const _ = db.command

var courseID = ""
var chapterID = ""
var unitID = ""

Page({
  data: {
    chapterUnitName: "", //单元名称
    showList: [], //显示的任务点信息
    showMode: [] //显示的任务点类别
  },
 
  /**
   * 从云开发后台获取数据
   */
  onLoad: function(e) {
    //获取页面传递参数
    let THIS = this
    courseID = e.courseId;
    chapterID = e.chapter;
    unitID = e.unit;

    this.getChapterFile(); //获取章节单元任务点
  },

  // 打开文档 事件
  openDocument: function(e) {
    wx.showLoading({
      title: '加载中',
    })
    console.log("file="+e.currentTarget.id)
    wx.cloud.downloadFile({
      fileID:e.currentTarget.id,
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
    
  },
  //获取章节单元任务点
  getChapterFile: function() {
    let THIS = this
    wx.cloud.callFunction({ //查询记录(条件：账号)
      name : "CourseChapter_findFile",
      data:{
        courseID: courseID,
        chapterID: parseInt(chapterID),
        unitID: parseInt(unitID)
      },
      fail(res){console.log("获取数据失败",res)},
      success(res){
        var tmp = []
        var mess = res.result.data[0].Chapter_Unit_File;
        mess.forEach(function(item, index){
          var url = item[1];
          var index = url.lastIndexOf(".") //获取最后一个.的位置
          var ext = url.substring(index + 1) //获取后缀
          if (['avi', 'mp4', 'wmv'].indexOf(ext.toLowerCase()) !== -1) tmp.push(true);
          else tmp.push(false);
        })
        console.log(chapterID)
        THIS.setData({
          showList: mess,
          showMode: tmp, 
          chapterUnitName: String(parseInt(chapterID) + 1) + "." + String(parseInt(unitID) + 1) + " "
            + res.result.data[0].Chapter_Unit_Name
        })
      }
    })
  }
})

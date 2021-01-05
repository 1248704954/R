// pages/activityPhoto/activityPhoto.js
const db = wx.cloud.database()
const _ = db.command

let inputMess = ""

Page({
  data: {
    save_items:[],
    items: [], // 数据的数组

    inputShowed:false
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
    for (let i in THIS.data.save_items) {
      var item = THIS.data.save_items[i];
      if (item.filename.indexOf(key) >= 0)
        arr.push(item);
    }
    THIS.setData({
      items: arr
    })
  },

  /**
   * 从云开发后台获取数据
   */
  onLoad: function (options) {
    var that = this
    db.collection('filedatabase').where({
      // publish: _.eq(true)
      Course_Id:_.eq(1)
    }).get({
      success(res) {
        for(var i = 0; i < res.data.length; i++) {
          res.data[i].filedate= String(res.data[i].filedate).substring(0,String(res.data[i].filedate).indexOf("G")); 
        }
        that.setData({
          save_items: res.data,
          items: res.data  // 反转使最新数据的在最上面
        })
      }
    })
  },

  onShow:function() {
    this.onLoad();
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
  },
  showLoad: function () { //成功效果
    wx.showToast({
      title: '加载中',
      icon: 'load',
      duration: 2000
    })
  },

  l: function (e) {
    console.log("file=" + e.currentTarget.id)
    wx.cloud.downloadFile({
      fileID: e.currentTarget.id,
      success: res => {
        // get temp file path
        console.log(res.tempFilePath)
      },
      fail: err => {
        // handle error
      }
    })
  },
})
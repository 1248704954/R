// pages/activityPhoto/activityPhoto.js
const db = wx.cloud.database()
const _ = db.command
Page({
  data: {
    items: [],  // 视频数据的数组
    show: -1,  // 记录正在播放的视频下标
    id: -1,  // 用于关掉上一个视频
  },
 
  /**
   * 从云开发后台获取数据
   */
  onLoad: function(options) {
    var that = this
    db.collection('class01').where({
      // publish: _.eq(true)
      _id:_.eq("b1a52c595fd9f6f10212bc0b4207228c")
    }).get({
      success(res) {
        that.setData({
          items: res.data.reverse()  // 反转使最新数据的在最上面
        })
      }
    })
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
  showLoad: function() { //成功效果
      wx.showToast({
        title: '加载中',
        icon: 'load',
        duration: 2000
    })
  },
 
  /**
   * 点击视频后，隐藏封面，暂停上一次点击的视频，播放点击的视频
   */
  cover: function(e) {
    var index = e.currentTarget.dataset.id
    var id = 'my' + e.currentTarget.dataset.id
    if (this.data.show != index) {  // 此处的show是上一个视频的下标
      var i = 'my' + this.data.show
      this.videoContext = wx.createVideoContext(i)  // 小程序的视频api
      this.videoContext.pause({})  // 暂停上一个播放的视频
    }
    this.setData({
      show: index  // 将show更新至最新点击的视频的下标
    })
    this.videoContext = wx.createVideoContext(id)
    this.videoContext.play({})  // 开始播放当前视频
  },
  l:function(e)
{
  console.log("file="+e.currentTarget.id)
  wx.cloud.downloadFile({
  fileID:e.currentTarget.id,
  success: res => {
    // get temp file path
    console.log(res.tempFilePath)
  },
  fail: err => {
    // handle error
  }
})
}
  

})

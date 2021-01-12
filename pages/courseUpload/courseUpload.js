Page({
  data: {
    introduce:'introduce：',
    mess: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  uploadfile:function(e) {
    let THIS = this
    wx.cloud.init()
    wx.chooseMessageFile({
    count: 10, //可选择最大文件数 （最多100）
    type: "all", //文件类型，all是全部文件类型
    success(res) {
    const filePath = res.tempFiles[0].path //文件本地临时路径
    console.log(res)
    // 上传文件
    const cloudPath = res.tempFiles[0].name //云存储路径
    console.log(cloudPath)
    wx.cloud.uploadFile({
    cloudPath,
    filePath,
    success: resa => {
      console.log(resa.fileID)
      //把文件名和文件在云存储的fileID存入filelist数据表中
      var filename = res.tempFiles[0].name
      console.log(filename)
      console.log(resa.fileID)
      const db = wx.cloud.database();
      /**
       * 向集合class01中添加数据
       */
      db.collection('Course_Material').add({
          data:{
            Course_Id:1,
            file:resa.fileID,
            filedate:new Date(),
            filename:filename,
          }
      })
      .then(res=>{
          console.log(res)
      })
      THIS.setData({
        mess: filename + " 上传成功！"
      })
    }, 
    fail: e => {
      wx.showToast({
        icon: 'none',
        title: '上传失败',
      })
    },
    })
    }
    })
    },
})
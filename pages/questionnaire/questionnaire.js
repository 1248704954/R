// pages/questionnaire/questionnaire.js\
let score=0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {name: '5', value: '完全同意'},
      {name: '4', value: '同意', checked: 'true'},
      {name: '3', value: '基本同意'},
      {name: '2', value: '不同意'},
      {name: '1', value: '完全不同意'},
    
    ],
   isexu:false,
    value1:3,
    value2:3,
    value3:3,
    value4:3,
    value5:3,
    value6:3,
    value7:3,
    value8:3,
    value9:3,
    value10:3,
    text:'',
  },
  radioChange1: function(e) {
   this.setData({
    value1:e.detail.value
   }) 
   console.log("value1",this.data.value1)
  },
  radioChange2: function(e) {
    this.setData({
      value2:e.detail.value
     })
     console.log("value2",this.data.value2)
  },
  radioChange3: function(e) {
    this.setData({
      value3:e.detail.value
     })
     console.log("value3",this.data.value3)
  },
  radioChange4: function(e) {
    this.setData({
      value4:e.detail.value
     })
     console.log("value4",this.data.value4)
  },
  radioChange5: function(e) {
    this.setData({
      value5:e.detail.value
     })
     console.log("value5",this.data.value5)
  },
  radioChange6: function(e) {
    this.setData({
      value6:e.detail.value
     })
     console.log("value6",this.data.value6)
  },
  radioChange7: function(e) {
    this.setData({
      value7:e.detail.value
     })
     console.log("value7",this.data.value7)
  },
  radioChange8: function(e) {
    this.setData({
      value8:e.detail.value
     })
     console.log("value8",this.data.value8)
  },
  radioChange9: function(e) {
    this.setData({
      value9:e.detail.value
     })
     console.log("value9",this.data.value9)
  },
  radioChange10: function(e) {
    this.setData({
      value10:e.detail.value
     })
     console.log("value10",this.data.value10)
  },
  submit:function(e){
    let THIS = this
    this.setData({
      text:e.detail.value
     })
      score=parseInt(this.data.value1)+parseInt(this.data.value2)+parseInt(this.data.value3)+parseInt(this.data.value4)+parseInt(this.data.value5)+parseInt(this.data.value6)+parseInt(this.data.value7)+parseInt(this.data.value8)+parseInt(this.data.value9)+parseInt(this.data.value10)
     score=score*2
     var text = THIS.data.text.opinion;

    console.log(score)
    
 

    wx.cloud.callFunction({ //查询记录(条件：账号)
      name : "questionnaire",
      data:{   
        Student_Comment:text,
        Student_Id:201806062109,
        Student_Score: score
      },
      fail(res){console.log("获取数据失败",res)},
      success(res){
        console.log("获取数据成功",THIS.data.text)
      
      }
    })
    wx.showToast({
      title: '提交成功',
      icon: 'none',
      duration: 1500,
      success: function () {
       //弹窗后执行，可以省略
	   setTimeout(function () {
	      wx.reLaunch({
	       url: '../index/index',
	          })
          }, 1500);          
        }
      })
    
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var THIS =this
    wx.cloud.callFunction({//查询该学号是否评论过
     name:"findc",
     data:{
      cId:'1_Course_Teacher_Assessment',
         Student_Id:201806062109
       },
      success(res){
       if(res.result.data.length!=0){ 
         THIS.setData({
           isexu:true
        })}
        console.log("res.result",THIS.data.isexu)      
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
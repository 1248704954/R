import * as echarts from '../../components/ec-canvas/echarts';

let Study_Day=[]
let Student_Name=[]
const db=wx.cloud.database()
 function initChart(canvas, width, height) {
  var THIS =this
  wx.cloud.callFunction({
  name: "findc", //云函数的名字
  complete: res => {
    for (let i in res.result.data) {           
              
      Study_Day[i]=parseInt(res.result.data[i].Study_Day)
      Student_Name[i]=(res.result.data[i].Student_Name)
  
          console.log(i)     
          //  console.log(data_cur[i])  
          //  console.log(xData[i]) 
    }
    console.log(Study_Day)  
    console.log(Student_Name) 
    const option = {
      title: {
       text: '课程学习天数统计',
       x:'center',
       y:'top',
       textAlign:'left'
      },
      tooltip: {},
      // legend: {
      //  data: ['销量']
      // },
      xAxis: {
       data: Student_Name
      },
      yAxis: {},
      series: [{
       name: '成绩',
       type: 'bar',
       data:Study_Day
      }]
     };
     
     chart.setOption(option);
     return chart;
  }
  })
  // const option=(await db.collection('test').where({
  //   _id:"023ce9555ff2f677034ddb0d252f8a0a"
  // }).get()).data[0]



 const chart = echarts.init(canvas, null, {
  width: width,
  height: height
 });
 canvas.setChart(chart);

 //这里复制了官方示例配置

}

Page({

 /**
  * 页面的初始数据
  */
 data: {
  ec:{
   onInit:initChart
  }
 },

 /**
  * 生命周期函数--监听页面加载
  */
 onLoad: function (options) {

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




import * as echarts from '../../components/ec-canvas/ec-canvas/echarts';
var Student_Id=[];
var Student_Score=[];
let chartLine;
const app=getApp()
var xData=app.globalData.xData
var data_cur=app.globalData.data_cur
// var xData=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
// var data_cur=[55,67,66,78,55,67,66,78,55,67,66,78,55,67,66,78,55,67,66,78,65,66,65,54];
 function getOption(xData, data_cur) {
   
 //这里复制了官方示例配置
 var option = {
  title: {
   text: 'ECharts 入门示例',
   x:'center',
   y:'top',
   textAlign:'left'
  },
  tooltip: {},
  // legend: {
  //  data: ['销量']
  // },
  xAxis: {
   data: xData
  },
  yAxis: {},
  series: [{
   name: '销量',
   type: 'bar',
   data: data_cur
  }]
 };
//  chart.setOption(option);
 return option;
}
 
Page({
 
 /**
  * 页面的初始数据
  */
 data: {
   ecLine:{
       onInit :function (canvas, width, height) {
        chartLine  = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chartLine);


      
      var option = getOption(xData);
      chartLine.setOption(option);
      chartLine.setOption({
        xAxis: {
            data: xData
        }, 
        series: [{
            data: data_cur
        }, ]
      });
    }
      
   }
  
 },
 
 /**
  * 生命周期函数--监听页面加载
  */
 onLoad: function (options) {
  //   var THIS =this
  //   wx.cloud.callFunction({
  //   name: "findc", //云函数的名字
   
  //   complete: res => {
    
  //     for (let i in res.result.data) {           
                
  //          data_cur[i]=parseInt(res.result.data[i].Student_Score)
  //          xData[i]=(res.result.data[i].Student_Name)

  //           console.log(i)     
  //           //  console.log(data_cur[i])  
  //           //  console.log(xData[i]) 
  //     }
      // console.log(data_cur)  
      // console.log(xData) 
  //   }
  // })
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
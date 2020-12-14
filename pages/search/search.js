const DB =wx.cloud.database().collection("list")
Page({
  //添加学生数据
  addData(){
DB.add({
  data:{
    name:"石头",
    age:23
  },
  success(res){
    console.log("添加成功",res)
  },
  fail(res){
    console.log("添加失败",res)
  }
})

  },
  //查询数据
  getData(){
    DB.get({
      success(res){
        console.log("查询数据成功",res)
      }
    })
  }
  
  
})
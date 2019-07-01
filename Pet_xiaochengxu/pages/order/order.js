// pages/order/order.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    result:"",
    listData: [],
    navbarActiveIndex: 0,
    navbarTitle: [
      "全部",
      "服务中",
      "待评价",
      "已完成"
    ],
    height:""
  },
  /**
   * 点击导航栏
   */
  onNavBarTap: function (event) {
    // 获取点击的navbar的index
    let navbarTapIndex = event.currentTarget.dataset.navbarIndex
    console.log(navbarTapIndex)
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    this.setData({
      navbarActiveIndex: navbarTapIndex      
    })
  },

  /**
   * 
   */
  onBindAnimationFinish: function ({detail}) {
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    this.setData({
      navbarActiveIndex: detail.current
    })
  },

  pingfen:function(e){
    console.log(e.currentTarget.dataset)
    var point = e.currentTarget.dataset.name;
      wx.navigateTo({
        url: '../evaluate/evaluate?id=' + e.currentTarget.dataset.id + '&postid=' + e.currentTarget.dataset.postid, 
      })
    // }
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
    if(app.globalData.status!==null){
      console.log(app.globalData.status)
      this.setData({
        navbarActiveIndex:app.globalData.status
      })
    }
    console.log(app.globalData.listData)
    this.setData({
      listData: app.globalData.listData,
    })
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
// pages/frist/frist.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //要加上
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true,
    // })
    wx.login({
      success: function (res) {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          console.log('获取用户登录态success！' + res.code)
          app.globalData.code = res.code
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
        app.getOpenId(app.globalData.code)
      },
      complete:function(){
        var that = this;
        wx.getUserInfo({
          success: function (res) {
            app.globalData.userInfo=res.userInfo;
            // that.setData({
            //   userInfo: res.userInfo
            // })
            setTimeout(function () {
              wx.switchTab({
                url: '../logs/logs',
              })
            }, 2000)
          },
          fail(err) {
            console.log(err, '获取用户信息失败')
            wx.showModal({
              title: '警告',
              content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确认')
                  wx.navigateTo({
                    url: '../index/index',
                  })
                }
              },
            })
          },
        })
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
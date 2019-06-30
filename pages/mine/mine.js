// pages/mine/mine.js
const app = getApp()
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    level:"A",
    xiangmu:[{
      "image_url":
      "http://duogesi.cn:8080/pet/pics/servicing.png",
       "text":"服务中",
       "number":"1"
    },
      {
        "image_url": "http://duogesi.cn:8080/pet/pics/appraise.png",
        "text": "待评价",
        "number": "2"
      },
      {
        "image_url": "http://duogesi.cn:8080/pet/pics/complete.png",
        "text": "已完成",
        "number": "3"
      },
    ],
  
  },
  yijian:function(){
    wx.showToast({
      title: '暂无开通',
      image: '../../pics/fail.png',
      duration: 2000
    })
  },
  jump: function (event) {
  app.globalData.status=event.currentTarget.dataset.id
    wx.switchTab({
      url: '/pages/order/order',
    })
  },
  contract: function () {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    _getUserInfo();
    function _getUserInfo() {
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            userInfo: res.userInfo
          })
        
        }
      })
    }
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
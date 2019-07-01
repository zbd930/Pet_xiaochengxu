//logs.js
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    logs: [],
     imgUrls: [

      {

        link: '/pages/index/index',

         url: '../../libs/pics/1.png'

      }, {

        link: '/pages/logs/logs',

         url: '../../libs/pics/2.png'

      }, {

        link: '/pages/index/index',

         url: '../../libs/pics/3.png'

      }

    ], 
    optionUrls: [

      {

        url: '../../libs/pics/dog.jpg'

      }, {

        url: '../../libs/pics/forest.jpg'

      }, {

        url: '../../libs/pics/clean.jpg'

      }

    ],

    indicatorDots: true,  //小点

    autoplay: true,  //是否自动轮播

    interval: 3000,  //间隔时间

    duration: 3000,  //滑动时间
  },
  jiyang:function(){
    wx.showToast({
      title: '暂无开通',
      image: '../../libs/pics/fail.png',

      duration: 2000
    })
  },
  xiadan: function () {
    wx.navigateTo({
      url: '/pages/bathing/bathing',
    })
  },
  dog_file:function(){
    wx.navigateTo({
      url: '/pages/dog/dog',
    }) 
  },
  process: function () {
    wx.navigateTo({
      url: '/pages/process/process',
    })
  },
  charging: function () {
    wx.navigateTo({
      url: '/pages/charging/charging',
    })
  },
  contact: function () {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  
  onLoad: function () {
    
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },


})

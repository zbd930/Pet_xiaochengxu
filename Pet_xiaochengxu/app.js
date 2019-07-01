//app.js
App({
  onLaunch: function () {
    var that = this;
     // 获取屏幕高度
    wx.getSystemInfo({
      success: function(res) {
        that.globalData.windowHeight = res.windowHeight;
        that.globalData.screenHeight = res.screenHeight;
      }
    })
    
    var name = '';
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)   
    // 获取用户信息
    
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              this.globalData.user_Name = res.userInfo.nickName
              //由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    }) 
  },
   getOpenId: function (code) {
    var that=this;
    wx.request({
      url: 'https://duogesi.cn/pet/congcong/wechataction_getopenid.action',
      data: {
        code: code,
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        that.globalData.openid = res.data.openid;
        var zhonglei = [];
        wx.request({
          url: 'https://duogesi.cn/pet/congcong/bathingaction_query.action',
          method: 'GET',
          data: {
            user_Name: res.data.openid,
          },
          header: {
            //'content-type': 'application/json' // 默认值
            "Content-Type": "application/x-www-form-urlencoded"

          },
          success: function (res) {
            for (var i = 0; i < res.data.length; i++) {
              zhonglei.push(res.data[i])
            }
            that.globalData.listData = zhonglei
            //console.log(zhonglei)
          },
          fail: function (res) {
            console.log(".....fail.....");
          },
          complete: function (res) {
            wx.hideLoading()
          }
        })
        //that.paypay(that, openid); //预下单并支付
      },
      fail: function (res) {
        console.log(res.data.errmsg);
        console.log(res.data.errcode);
      },
    })
  },
  order: function (openid){
    var zhonglei = [];
    var that=this;
    wx.request({
      url: 'https://duogesi.cn/pet/congcong/bathingaction_query.action',
      method: 'GET',
      data: {
        user_Name: openid,
      },
      header: {
        //'content-type': 'application/json' // 默认值
        "Content-Type": "application/x-www-form-urlencoded"

      },
      success: function (res) {
        for (var i = 0; i < res.data.length; i++) {
          zhonglei.push(res.data[i])
        }
        that.globalData.listData = zhonglei
        if (that.globalData.listData != null) {
          wx.hideLoading()
          wx.navigateBack({
          })
        }
      },
      fail: function (res) {
        console.log(".....fail.....");
      },
    })
  },
  globalData: {
    userInfo: null,
    user_Name:null,
    code:null,
    openid:null,
    listData:[],
    windowHeight: null,
    screenHeight:null,
    status:null,
  },
 
})
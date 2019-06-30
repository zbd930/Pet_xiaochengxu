// pages/bathing/bathing.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: [],
    items: [
      { name: 'basic', value: '基础清洁', checked: 'true' },
      { name: 'deep', value: '深度清洁' },
    ],
    array: ['8:00-10:00', '10:00-12:00', '12:00-14:00', '14:00-16:00', '16:00-18:00', '18:00-20:00'],
    objectArray: [
      {
        id: 0,
        name: '8:00-10:00'
      },
      {
        id: 1,
        name: '10:00-12:00'
      },
      {
        id: 2,
        name: '12:00-14:00'
      },
      {
        id: 3,
        name: '14:00-16:00'
      },
       {
        id:4,
         name: '16:00-18:00'
      }
      ,
      {
        id: 5,
        name: '18:00-20:00'
      }
    ],
    contact_name: "",
    contact_phone: "",
    contact_addree: '',
    dogName: '',
    set_category: '',
    date:'',
    price:'',
    pick_time:'',
    user_Name:''
  },
  contactNameInput: function (e) {
    this.setData({
      contact_name: e.detail.value
    })
  },
  contactNameInput: function (e) {
    this.setData({
      contact_name: e.detail.value
    })
  },
  contactphoneInput: function (e) {
    this.setData({
      contact_phone: e.detail.value
    })
  },
  contactaddressInput: function (e) {
    this.setData({
      contact_addree: e.detail.value
    })
  },
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  }, 
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time:e.detail.value,
      pick_time: this.data.array[e.detail.value]
    })
  },
  bindPickerChange_pet(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      image_url:'http://duogesi.cn:8080/pet/pics/dog2.png',
      dogName: this.data.category[e.detail.value]
    })
  },
  radioChange: function (e) {
    var that=this;
    var result = e.detail.value;
   if(result=='deep'){
     that.setData({
       set_category:2, 
       price: 138
      })
   } else if (result == 'basic'){
     that.setData({
       set_category: 1,
       price: 98
     })
   }
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  sumbit:function(e){
    var that=this;
    // this.paypay(that, app.globalData.openid)
    if (this.data.contact_name !== "" && this.data.contact_phone !== "" && this.data.contact_addree !== "" && this.data.dogName !== "" && this.data.dogName !== "第一次下单请先建立宠物档案"&& this.data.price !== "" && this.data.date !== "" && this.data.time !== "" && app.globalData.openid != "") {
      wx.request({
        url: 'http://duogesi.cn:8080/pet/congcong/bathingaction_execute.action',
        data: {
          contact_name: this.data.contact_name,
          contact_phone: this.data.contact_phone,
          contact_addree: this.data.contact_addree,
          dogName: this.data.dogName,
          set_category: this.data.set_category,
          date: this.data.date,
          pick_time: this.data.pick_time,
          status: 0,
          user_Name: app.globalData.openid
        },
        method: 'POST',
        header: {
          //'content-type': 'application/json' // 默认值
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data);
          app.order(app.globalData.openid)
          wx.showToast({
            title: '提交成功',
            duration: 2000
          })
          setTimeout(function () {
            wx.navigateBack({

            })
          }, 2000)

        },
        fail: function (res) {
          wx.showToast({
            title: '网络连接失败',

            image: 'http://duogesi.cn:8080/pet/pics/fail.png',

            duration: 2000

          })
          console.log(".....fail.....");
        }
      })
    }
    else {
      wx.showToast({
        title: '提交失败',

        image: '../../libs/pics/fail.png',

        duration: 2000

      })
    }
  },
  paypay: function (that) {
    console.log(app.globalData.openid)
    wx.request({
      url: 'http://duogesi.cn:8080/pet/congcong/wechataction_getopenid.action',
      data: {
        openid: app.globalData.openid,
        
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res);
        wx.requestPayment({
          'timeStamp': res.data.timeStamp,
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'signType': 'MD5',
          'paySign': res.data.sign,
          'success': function (res) {
            if (res.errMsg == "requestPayment:ok") {
              wx.showToast({
                title: '支付成功'
              })
            }
          },
          'fail': function (res) {
          }
        })
      },
      fail: function (res) {
        console.log(res.data.errmsg);
        console.log(res.data.errcode);
      },
      complete: function (res) {
      }
    })
  },
  prepay:function(that){
    var zhonglei = [];
    var first=[];
    wx.request({
      url: 'http://duogesi.cn:8080/pet/congcong/dogaction_preload.action',
      method: 'GET',
      header: {
        //'content-type': 'application/json' // 默认值
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        user_Name: app.globalData.openid
      },
      success: function (res) {
        for (var i = 0; i < res.data.length; i++) {
          zhonglei.push(res.data[i])
        }
       first[0]="第一次下单请先建立宠物档案"
        if(zhonglei[0]==null){
          that.setData({
            category: first
          })
        }else{
          that.setData({
            category: zhonglei
          })
        }
       
      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })
  
  },
  location:function(){
    var that=this;
    wx.chooseLocation({

      success: function (res) {

        var latitude = res.latitude

        var longitude = res.longitude

        // console.log(latitude + "****" + longitude)
        console.log(res.address)
        that.setData({
          contact_addree :res.address
        })
      
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //app.getOpenId(app.globalData.code);
    that.prepay(that);
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
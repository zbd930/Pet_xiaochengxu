// pages/dog/dog.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      dog:[{
        "chongwu":"宠物昵称",
        "canshu": "",
      },
      ],
      items: [
        { name: 'male', value: '男', checked: 'true' },
        { name: 'female', value: '女' },
    ],
    array: ['大狗', '中狗', '小狗', '其他'],
    objectArray: [
      {
        id: 0,
        name: '大狗'
      },
      {
        id: 1,
        name: '中狗'
      },
      {
        id: 2,
        name: '小狗'
      },
      {
        id: 3,
        name: '其他'
      }
    ],
    showView: true,
    dogName: "",
    dogweight: "",
    dogbirthday:'',
    sex: "",
    category:'',
    user_Name:'',
    picture:'',
  },
 

  dogNameInput: function (e) {
    this.setData({
      dogName: e.detail.value
    })
  },
  dogweightInput: function (e) {
    this.setData({
      dogweight: e.detail.value
    })
    
  },
  dogbirthday: function (e) {
    this.setData({
      dogbirthday: e.detail.value
    })
  },
  radioChange(e) {
    if (e.detail.value == "male") {
      this.setData({
        sex:1,
      })
      
    }else if(e.detail.value=="female"){
      this.setData({
        sex: 2,
      })
    }
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  }, 
  bindPickerChange(e) {
    var index = this.data.index
    console.log('picker发送选择改变，携带下标为' + e.detail.value)
    console.log('picker发送选择改变，携带值为' + this.data.array[e.detail.value])
    this.setData({
      index: e.detail.value,
      category: this.data.array[e.detail.value],
    })
  },


  loginBtnClick: function (e) {
    this.setData({
      showView: true
    })
    if (this.data.dogName !== "" && this.data.category !== "" && this.data.sex !== "" && app.globalData.openid!=""){ 
        wx.request({
          url: 'http://duogesi.cn:8080/pet/congcong/dogaction_execute.action',
              data: {
                dogsex:this.data.sex,
                dogName: this.data.dogName,
                dogweight: this.data.dogweight,
                dogbirthday: this.data.dogbirthday,
                dogcategory: this.data.category,
                user_Name: app.globalData.openid,
                picture: this.data.imageUrl,
          },
          method: 'POST',
          header: {
            //'content-type': 'application/json' // 默认值
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res.data);
            wx.showToast({
              title: '提交完成',

              duration: 2000

            }),
            setTimeout(function(){
              wx.navigateBack({

              })
            },2000)
           
          },
          fail: function (res) {
            wx.showToast({
              title: '网络连接失败',

              image: '../../libs/pics/fail.png',

              duration: 2000

            })
            console.log(".....fail.....");

          },
        })
    }
    else{
      this.setData({
        showView: (!this.data.showView)
      })
      wx.showToast({
        title: '提交失败',

        image: '../../libs/pics/fail.png',

        duration: 2000

      })
    }
  },
  // uploadPhoto() {
  //   var that = this;
  //       wx.chooseImage({
  //         success: function (res) {
  //           var tempFilePaths = res.tempFilePaths
  //           that.setData({
  //             imageUrl: tempFilePaths[0]
  //           });
  //           console.log(tempFilePaths)
  //           wx.uploadFile({
  //             url: 'http://localhost:8080/congcong/upload', 
  //             filePath: tempFilePaths[0],
  //             name: that.data.dogName,
  //             header: {
  //               "Content-Type": "multipart/form-data"
  //             },
  //             formData: {
  //               "user": "test",
  //             },
  //             success: function (res) {
  //               var data = res.data
  //               console.log(data)
  //               //do something
  //             }
  //           })
  //         }
  //       })
        
  // } ,

  // 上传图片到服务器
  // https://blog.csdn.net/qq_35342288/article/details/80434573
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(app.globalData.user_Name);
    showView: (options.showView == "true" ? true : false)
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
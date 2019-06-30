// pages/evaluate/evaluate.js
const app = getApp();
var action = '';
var moveY = 200;
var animation = animation = wx.createAnimation({
  transformOrigin: "50% 50%",
  duration: 400,
  timingFunction: "ease",
  delay: 0
})
animation.translateY(moveY + 'vh').step();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { 'value': '服务态度恶劣',},
      { 'value': '技能不熟',  },
      { 'value': '护理师迟到',  },
      { 'value': '爱宠受伤',  },
      { 'value': '未清洁卫生',  },
      { 'value': '未穿着好工服',  },
      { 'value': '未清洗干净',  },
      { 'value': '缩减服务流程',  },
    ],
    items1:[
      { 'value': '服务态度好',  },
      { 'value': '清洗的好',  },
      { 'value': '准时到达',  },
      { 'value': '主动清理',  },
    ],
    num: 4,//后端给的分数，显示的星星
    one_1: '',//点亮的星星数
    two_1: '',//没有点亮的星星数
    one_2: 0,//点亮的星星数
    two_2: 5,//没有点亮的星星数
    sentence:'',
    show: false,
    backgroundVisible: false,
    animation: animation,
    bg: 'background',
    state: '',
    employee: {},
    options: [
      { name: 'bad', value: '差', checked: 'true' },
      { name: 'normal', value: '一般' },
      { name: 'nice', value: '好' },
    ],
    service:"",
    service_value:[],
    postid:'',
  },
  userCheck: function (e) {
    let index = e.currentTarget.dataset.id;//获取用户当前选中的索引值
    let checkBox = this.data.items;
    if (checkBox[index].checked) {
      this.data.items[index].checked = false;
    } else {
      this.data.items[index].checked = true;
    }
    this.setData({ items: this.data.items })

    //返回用户选中的值
    let value = checkBox.filter((item, index) => {
      return item.checked == true;
    })
    console.log(value);
    this.setData({
      service_value: value
    })
  },
  select_use: function (e) {
    let index = e.currentTarget.dataset.id;//获取用户当前选中的索引值
    let checkBox = this.data.items1;
    if (checkBox[index].checked) {
      this.data.items1[index].checked = false;
    } else {
      this.data.items1[index].checked = true;
    }
    this.setData({ items1: this.data.items1 })

    //返回用户选中的值
    let value = checkBox.filter((item, index) => {
      return item.checked == true;
    })
    console.log(value)
    this.setData({
     service_value :value
    })
    
  },
  showModel: function (e) {
    moveY = 0;
    action = 'show';
    animationEvents(this, moveY, action);
  },
  //隐藏弹窗浮层
  hidden(e) {
    moveY = 200;
    action = 'hide';
    animationEvents(this, moveY, action);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  radioChange: function (e) {
    var that = this;
    console.log(e)
    var result = e.detail.value;
    if (result == 'bad') {
      that.setData({
        service: "bad",
      })
    } else if (result == 'normal') {
      that.setData({
        service: 'normal',
      })
    }
    else if (result == 'good') {
      that.setData({
        service: 'good',
      })
    }
  },
  in_xin: function (e) {
    var in_xin = e.currentTarget.dataset.in;
    console.log(e.currentTarget.dataset.in);
    console.log(e.currentTarget);
    var one_2;
    if (in_xin == 'star') {
      one_2 = Number(e.currentTarget.id)
    } else {
      one_2 = Number(e.currentTarget.id) + this.data.one_2
    }
    switch (one_2) {
      case 0:
        this.setData({
          sentence: "待评分"
        })
        break;
      case 1:
        this.setData({
          sentence: "非常不满意,差"
        })
        break;
      case 2:
        this.setData({
          sentence: "不满意，比较差"
        })
        break;
      case 3:
        this.setData({
          sentence: "一般般，有待改进"
        })
        break;
      case 4:
        this.setData({
          sentence: "比较满意，任需改进"
        })
        break;
      case 5:
        this.setData({
          sentence: "非常满意，再接再厉"
        })
        break;
    }
    this.setData({
      one_2: one_2,
      two_2: 5 - one_2
    })
 
  },
  // load_employee:function(){
  //   wx.request({
  //     url: 'http://localhost:8080/congcong/orders', //仅为示例，并非真实的接口地址
  //     header: {
  //       'content-type': 'application/json' // 默认值
  //     },
  //     success: function (res) {
  //       console.log(res.data)
  //       this.setData({
  //         employee:res.data.employee,
  //       })
  //     }
  //   })
  // },
  submit:function(){
    
    wx.showLoading({
      title: '提交中',
    })
    if (this.data.one_2 != "" && this.data.service != "" && this.data.date != "" && this.data.postid != "") {
      wx.request({
        url: 'http://duogesi.cn:8080/pet/congcong/commentaction_execute.action',
        method: 'POST',
        data: {
          one_2: this.data.one_2,
          service: this.data.service,
          user_Name: app.globalData.openid,
          service_value: JSON.stringify(this.data.service_value),
          number: this.data.postid
        },
        header: {
          //'content-type': 'application/json' // 默认值
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res.data)
          // var zhonglei = [];
          // var that = this;
          // wx.request({
          //   url: 'http://localhost:8080/congcong//bathingaction_query.action',
          //   method: 'GET',
          //   data: {
          //     user_Name: app.globalData.openid,
          //   },
          //   header: {
          //     //'content-type': 'application/json' // 默认值
          //     "Content-Type": "application/x-www-form-urlencoded"

          //   },
          //   success: function (res) {
          //     for (var i = 0; i < res.data.length; i++) {
          //       zhonglei.push(res.data[i])
          //     }
          //     app.globalData.listData = zhonglei
          //     if (app.globalData.listData != null) {
          //       wx.hideLoading()
          //       wx.navigateBack({
                  
          //       })
          //     }
          //   },
          //   fail: function (res) {
          //     console.log(".....fail.....");
          //   },
         // })
          app.order(app.globalData.openid)
        },
        fail: function (res) {
          console.log(".....fail.....");
        }
      })
    } else {
      wx.showToast({
        title: '请确认提交格式',
      })
    }
  },
  onLoad: function (options) {
    console.log(options.postid);
    this.setData({
      one_1: this.data.num,
      two_1: 5 - this.data.num,
      postid: options.postid,
      date:options.id
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
    // console.log(this.data.one_2)
    // console.log(this.data.service)
    // console.log(app.globalData.openid)
    // console.log(this.data.date)
    // console.log(this.data.postid)
    // if (this.data.one_2 != "" && this.data.service != "" && this.data.date != "" && this.data.postid!= "" ){
    // wx.request({
    //   url: 'http://localhost:8080/congcong/comments',
    //   method: 'POST',
    //   data: {
    //     one_2: this.data.one_2,
    //     service: this.data.service,
    //     user_Name: app.globalData.openid,
    //     //service_value:this.data.service_value,
    //     id: this.data.postid
    //   },
    //   header: {
    //     //'content-type': 'application/json' // 默认值
    //     "Content-Type": "application/x-www-form-urlencoded" 
    //   },
    //   success: function (res) {
    //     console.log(res.data)
        
    //   },
    //   fail: function (res) {
    //     console.log(".....fail.....");
    //   }
    // })
    // }else{
    //   wx.showToast({
    //     title: '请确认提交格式',
    //   })
    // }
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
//动画事件 底部的弹出，背景层通过切换不同的class，添加一个transition的效果，使之有一个渐变的感觉。
function animationEvents(that, moveY, action) {
  that.animation = wx.createAnimation({
    transformOrigin: "50% 50%",
    duration: 400,
    timingFunction: "ease",
    delay: 0
  })
  that.animation.translateY(moveY + 'vh').step()
  if (action == 'show') {
    that.setData({
      animation: that.animation.export(),
      show: true,
      backgroundVisible: true,
      bg: 'bg',
      disableScroll: 'disableScroll'
    });
  } else if (action == 'hide') {
    that.setData({
      animation: that.animation.export(),
      show: false,
      backgroundVisible: false,
      bg: 'background',
      disableScroll: ''
    });
  }
}
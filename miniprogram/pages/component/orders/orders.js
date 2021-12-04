// pages/component/orders/orders.js
var {getTime} = require('../../../util/getTime.js');
Page({

  /**
   * 页面的初始数据
   */
  data:{
    address:{},
    orderList: [],
    hasAddress: false,
    remark: '',
    total:0,
    orders:[]
  },
  toPay() {
    const db = wx.cloud.database();
    var _this = this;
    let {time, id} = getTime();
    let openid = wx.getStorageSync('openid');
    let orderData = {
      openid: openid,
      address: this.data.address,
      remark: this.data.remark,
      total: parseInt(this.data.total).toFixed(2),
      orders: this.data.orders,
      time: time,
      orderId: id
    }
    wx.showModal({
      title: '确认付款',
      content: '模拟付款',
      text:'center',
      success(res) {
        // console.log(res);
        if(res.confirm) {
          // console.log('确定');
          orderData.state = true;
        } else {
          // console.log('取消');
          orderData.state = false;
        }
      },
      complete() {
        db.collection('orderList').add({
          data: orderData,
          success(res) {
            console.log(res);
            _this.data.orderList.unshift(orderData);
            // console.log(_this.data.orderList);
            wx.setStorageSync('orderList', _this.data.orderList);
            wx.setStorageSync('carList', []);
            wx.navigateTo({
              url: '../payment/payment?orderId=' + orderData.orderId
            })
          }
        })
      }
    })
  },
  onLoad() {
  },
  onReady() {
    this.getTotalPrice();
  },
  
  onShow:function(){
    const self = this;
    wx.getStorage({
      key:'address',
      success(res) {
        self.setData({
          address: res.data,
          hasAddress: true
        })
      }
    })
    let carList = wx.getStorageSync('carList');
    this.setData({
      orders: carList
    })
    let orderList = wx.getStorageSync('orderList');
    if(orderList) {
      this.setData({
        orderList: orderList
      })
    }
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let orders = this.data.orders;
    let total = 0;
    for(let i = 0; i < orders.length; i++) {
      total += orders[i].num * orders[i].price;
    }
    this.setData({
      total: total.toFixed(2)
    })
  },
  remark(e) {
    this.setData({
      remark: e.detail.value
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
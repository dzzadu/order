// pages/user/user.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data:{
    thumb:'',
    nickname:'',
    orders:[],
    hasAddress:false,
    address:{}
  },
  del(e) {
    // console.log(e.currentTarget.dataset.index);
    let index = e.currentTarget.dataset.index;
    let _this = this;
    db.collection('orderList').where({
      openid: _this.data.orderList[index].openid
    }).remove({
      success(res) {
        console.log(res);
        _this.onShow();
      }
    })
    this.data.orderList.splice(index,1);
    // console.log(this.data.orderList);
    this.setData({
      orderList: this.data.orderList
    })
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var self = this;
    db.collection('address').where({
      _id: 'fa24ce1a6194c12d07243c3c5996b9af',
      _openid: 'oMlH65VFxh2lR1L8VlfA7Dz9aY2E'
    }).get({
      success({data}) {
        // console.log(res);
        wx.setStorageSync('address', data[0].address);
        self.setData({
          hasAddress: true,
          address: data[0].address
        })
      }
    })
    /**
     * 获取本地缓存 地址信息
     */
    db.collection('orderList').get({
      success({data}) {
        self.setData({
          orderList: data
        })
      }
    })
    // let orderList = wx.getStorageSync('orderList');
    // console.log(orderList);
    // this.setData({
    //   orderList: orderList
    // })
  },

  /**
   * 发起支付请求
   */
  payOrders(e){
    var _this = this;
    // console.log(e.currentTarget.dataset.index);
    // console.log(this.data.orderList);
    let index = e.currentTarget.dataset.index;
    if(!this.data.orderList[index].state){
      wx.showModal({
        title:'支付提示',
        content:'支付成功！',
        showCancel: false,
        success() {
          _this.data.orderList[index].state = true;
          db.collection('orderList').where({
            openid: _this.data.orderList[index].openid
          }).update({
            data:{
              state: true
            },
            success(res) {
              console.log(res);
            }
          })
          _this.setData({
            orderList: _this.data.orderList
          })
          wx.setStorageSync('orderList', _this.data.orderList);
        }
      })
    } else {
      wx.navigateTo({
        url: '/pages/component/payment/payment?orderId=' + _this.data.orderList[index].orderId,
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    let openid = wx.getStorageSync('openid');
    if(!openid){
      wx.login({
        success (res){
          // console.log(res.code);
          wx.cloud.callFunction({
            name: 'getopenid',
            data: {
              msg: 'getOpenId'
            }
          }).then(({result})=>{
            wx.setStorageSync('openid', result.OPENID);
          })
        }
      })
    }
    
      /**
     * 获取用户信息
     */
    wx.getUserInfo({
      success: function(res){
        self.setData({
          thumb: res.userInfo.avatarUrl,
          nickname: res.userInfo.nickName
        })
      }
    })
    
  },
  admin() {
    wx.showModal({
      title: '管理员模块',
      editable: true,
      placeholderText: '管理员密码',

      success (res) {
        if (res.confirm) {
          // console.log(res.content);
          if(res.content == '123456'){
            wx.navigateTo({
              url: '/pages/admin/admin',
            })
          } else {
            wx.showToast({
              title: '密码错误',
              icon: 'error',
              duration: 2000
            })
          }
        } else{
          return ;
        }
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
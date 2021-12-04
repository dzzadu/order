// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts:[],               // 购物车列表
    hasList:false,          // 列表是否有数据
    totalPrice:0,           // 总价，初始为0
    selectAllStatus:true    // 全选状态，默认全选
  },
  onShow() {
    let carList = wx.getStorageSync('carList');
    this.setData({
      carts: carList
    })
    // this.setData({
    //   hasList: true,
    //   carts:[
    //     {id:1,title:'新鲜芹菜 半斤',image:'../../images/s5.png',num:4,price:5,selected:true},
    //     {id:2,title:'素米 500g',image:'../../images/s6.png',num:1,price:15,selected:true}
    //   ]
    // });
    this.getTotalPrice();
    // console.log(this.data.carts);
    if(this.data.carts.length == 0) {
      this.setData({
        hasList: false
      })
    } else {
      this.setData({
        hasList: true
      })
    }
    
  },
  /**
   * 当前商品选中事件
   */
  selectList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    carts.splice(index,1);
    this.setData({
      carts: carts
    });
    if(!carts.length){
      this.setData({
        hasList: false
      });
      wx.hideTabBarRedDot({
        index: 2,
      })
      this.getTotalPrice();
    }else{
      this.getTotalPrice();
    }
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    num = num + 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    if(num <= 1){
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.carts;
    let total = 0;
    for(let i = 0; i<carts.length; i++) {
      if(carts[i].selected) {
        total += carts[i].num * carts[i].price;   
      }
    }
    if(carts.length>0) {
      var carList = carts.filter(item => {
        return item.selected?item:false
      })
      wx.setTabBarBadge({
        index: 2,
        text: carList.length.toString(),
      })
    } else {
      wx.hideTabBarRedDot({
        index: 2,
      })
    }
    // console.log(carList);
    this.setData({
      carts: carts,
      totalPrice: total.toFixed(2)
    });
    wx.setStorageSync('carList', carList);
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
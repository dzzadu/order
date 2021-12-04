// pages/component/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data:{
    goods: {},
    parentId: '',
    num: 1,
    totalNum: 0,
    carList: [],
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false,
    exist: false
  },
  toCart() {
    wx.switchTab({
      url: '../../cart/cart',
    })
  },
  addCount() {
    let num = this.data.num;
    num++;
    this.setData({
      num : num
    })
  },

  addToCart() {
    const self = this;
    const num = this.data.num;
    let total = this.data.totalNum;

    self.setData({
      show: true
    })
    setTimeout( function() {
      self.setData({
        show: false,
        scaleCart : true
      })
      setTimeout( function() {
        self.setData({
          scaleCart: false,
          hasCarts : true,
          totalNum: num + total
        })
        let data;
        console.log();
        self.data.carList.map(item => {
          if(self.data.goods.title == item.title && self.data.goods.classify == item.classify) {
            item.num += self.data.totalNum;
            self.setData({
              exist: true
            })
          }
        })
        if(!self.data.exist) {
          data = self.data.goods;
          data.num = self.data.totalNum;
          self.data.carList.push(data);
        }
        wx.setStorageSync('carList', self.data.carList);
      }, 200)
    }, 300)

  },

  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    let dataList = wx.getStorageSync('dataList');
    let carList = wx.getStorageSync('carList');
    if (carList) {
      this.setData({
        carList: carList
      })
    }
    dataList.map(item => {
      if(item.id == options.classify) {
        this.setData({
          index: options.index,
          parentId: item.id,
          goods: item.goodsList[options.index]
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
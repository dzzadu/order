// pages/admin/admin.js
const db = wx.cloud.database().collection('goods');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: ['菜单管理','上传商品','查看订单'],
    idx: 0,
    pickerIdx: 0,
    category: [],
    detail:[],
    curIndex: 0,
    isScroll: false,
    toView: 'guowei',
    fileID: '',
    order: {}
  },
  // 查看订单
  payOrders(e){
    var _this = this;
    // console.log(e.currentTarget.dataset.index);
    // console.log(this.data.orderList);
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/component/payment/payment?orderId=' + _this.data.orderList[index].orderId + '&page=admin',
    })
  },
  // 上传商品
  bindPickerChange: function(e) {
    this.updata();
    this.setData({
      pickerIdx: e.detail.value
    })
  },
  upImg() {
    let _this = this;
    wx.chooseImage({
      count: 1,
      success({tempFilePaths}) {
        wx.showLoading({
          title: '上传中',
        })
        // console.log(tempFilePaths);
        _this.setData({
          imgUrl: tempFilePaths[0]
        })
        wx.cloud.uploadFile({
          cloudPath: 'shop/' + new Date().getTime(),
          filePath: tempFilePaths[0],
          success: ({fileID}) => {
            wx.hideLoading({});
            _this.setData({
              fileID: fileID
            })
          }
        })
      }
    })
  },
  upload(e) {
    let {detail,category,pickerIdx,fileID} = this.data;
    // console.log(category[pickerIdx].id);
    let _this = this;
    let data = {
      classify: "shuiguo",
      detail: "",
      id: 1,
      image: "/images/food.jpg",
      num: 0,
      parameter: "300g/个",
      price: "14",
      selected: true,
      service: "不支持退货",
      title: "新鲜柿子"
    }
    
    // console.log(data.goodsList[index]);
    data.classify = category[pickerIdx].id;
    data.detail = e.detail.value.detail;
    data.price = e.detail.value.price;
    data.title = e.detail.value.title;
    if(fileID) {
      console.log(fileID);
      data.image = fileID;
    }
    detail.map(item => {
      if(item.id == category[pickerIdx].id) {
        // console.log(item.goodsList);
        data.id = item.goodsList.length + 1;
        item.goodsList.push(data);
        // console.log(item);
        item.id
        db.where({
          id: item.id
        })
        .update({
          data: {
            goodsList: item.goodsList
          },
          success(res) {
            console.log('上传成功');
            _this.updata();
            _this.setData({
              order: {},
              idx: 0
            })
          }
        })
      }
    })
  },


  // 菜单管理
  clickBtn(e) {
    // console.log(e.currentTarget.dataset);
    // console.log(e.currentTarget.dataset.type);
    // console.log(e.currentTarget.dataset.item);
    let _this = this;
    let {classify,id} = e.currentTarget.dataset.item;
    let {index} = e.currentTarget.dataset;
    // console.log(classify);
    if(e.currentTarget.dataset.type=='bj'){
      wx.navigateTo({
        url: '/pages/component/edit/edit?index='+ index +'&classify='+classify,
      })
    }else if(e.currentTarget.dataset.type=='del') {
      this.data.detail.map(item => {
        if(item.id == classify){
          // console.log(item.goodsList,'old');
          item.goodsList.splice(index,1);
          // console.log(item.goodsList);
          db.where({
            id: classify
          }).update({
            data: {
              goodsList: item.goodsList
            },
            success(res) {
              // console.log(res);
              console.log('删除成功');
              _this.updata();
            }
          })
        }
      })
    }
    
  },
  hua(e) {
    // console.log(e.currentTarget.dataset.id);
    let id = e.currentTarget.dataset.id;
    let _this = this;
    this.data.category.map((item,index) => {
      if(item.id == id) {
        this.setData({
          curIndex: index
        })
      }
    })
    
  },
  switchTab(e){
    const self = this;
    self.setData({
      toView: e.target.dataset.id,
      curIndex: e.target.dataset.index
    })
  },
  changeTitle(e) {
    this.setData({
      idx: e.currentTarget.dataset.index
    })
  },
  updata() {
    let _this = this;
    wx.showLoading({
      title: '加载中',
    })
    db.where({}).get({
      success({data}) {
        // console.log(data);
        wx.setStorageSync('dataList', data);
        wx.hideLoading();
        _this.onLoad();
      }
    })
    const db2 = wx.cloud.database();
    db2.collection('orderList').get({
      success({data}) {
        _this.setData({
          orderList: data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.updata();
    let category = [];
    let dataList = wx.getStorageSync('dataList');
    dataList.map(item => {
      category.push({
        name: item.cate,
        id: item.id
      })
    })
    this.setData({
      detail: dataList,
      category: category
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
    this.updata();
    // let dataList = wx.getStorageSync('dataList');
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
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.updata();
    this.onLoad();
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
// pages/component/edit/edit.js
const db = wx.cloud.database().collection('goods');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: '',
    parentId: '',
    order: {},
    data: {},
    classifyList: [],
    idx: 0,
    imgUrl: '',
    fileID: ''
  },
  updata(e) {
    let _this = this;
    let {data,index,fileID} = this.data;
    // console.log(data.goodsList[index]);
    data.goodsList[index].detail = e.detail.value.detail;
    data.goodsList[index].price = e.detail.value.price;
    data.goodsList[index].title = e.detail.value.title;
    if(fileID) {
      data.goodsList[index].image = fileID;
    }
    this.setData({
      data: data
    })
    // console.log(e.detail.value);
    db.where({
      id: _this.data.parentId
    })
    .update({
      data: {
        goodsList: data.goodsList
      },
      success(res) {
        console.log('修改成功');
        wx.navigateTo({
          url: '/pages/admin/admin',
        })
      },
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
              'order.image': fileID,
              fileID: fileID
            })
          }
        })
      }
    })
  },
  bindPickerChange: function(e) {
    this.setData({
      idx: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    let dataList = wx.getStorageSync('dataList');
    dataList.map((item,I) => {
      this.data.classifyList.push({
        id: item.id,
        cate: item.cate
      });
      this.setData({
        classifyList: this.data.classifyList
      })
      if(item.id == options.classify) {
        this.setData({
          idx: I,
          data: item,
          index: options.index,
          parentId: item.id,
          order: item.goodsList[options.index],
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
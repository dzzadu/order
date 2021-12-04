// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    goodsList: [],
    imgUrls: [
      '/images/1.jpg',
      '/images/2.jpg',
      '/images/s1.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;
    const db = wx.cloud.database();
     db.collection('goods').where({}).get({
      success({data}) {
        // console.log(data);
        let dataList = data;
        let goodsList = [];
        dataList.map(item => {
          goodsList.push(
            item.goodsList[0]
          )
        })
        _this.setData({
          datalist: dataList,
          goodsList: goodsList
        })
        // console.log(goods);
        wx.setStorageSync('dataList', dataList)
      }
    })

    let test = [
      {
        id: 'shuiguo',
        banner: '/images/1.jpg',
        cate: '水果',
        goodsList: [
          {
            id: 1,
            image: '/images/3.jpg',
            title: '新鲜柿子',
            price: 15,
            classify: 'shuiguo',
            detail: '柿子为柿科柿属植物，落叶乔木，柿子不仅营养丰富，含有大量的糖类及多种维生素，而且具有很高的药用价值和经济价值',
            parameter: '300g/个',
            service: '不支持退货',
            num: 0,
            selected: true
          },
          {
            id: 2,
            image: '/images/4.jpg',
            title: '葡萄',
            price: 41.5,
            classify: 'shuiguo',
            detail: '葡萄，中药材名。本品为葡萄科植物葡萄的果实。夏末秋初果熟时采收，阴干。多数制成葡萄干用。',
            parameter: '500g/串',
            service: '不支持退货',
            num: 0,
            selected: true
          },
          {
            id: 3,
            image: '/images/5.jpg',
            title: '猕猴桃',
            price: 15.8,
            classify: 'shuiguo',
            detail: '这里是猕猴桃详情。',
            parameter: '125g/个',
            service: '不支持退货',
            num: 0,
            selected: true
          },
          {
            id: 4,
            image: '/images/6.jpg',
            title: '水蜜桃',
            price: 25.8,
            classify: 'shuiguo',
            detail: '这里是水蜜桃详情。',
            parameter: '125g/个',
            service: '不支持退货',
            num: 0,
            selected: true
          },
          {
            id: 5,
            image: '/images/7.jpg',
            title: '苹果',
            price: 15.8,
            classify: 'shuiguo',
            detail: '这里是苹果详情。',
            parameter: '125g/个',
            service: '不支持退货',
            num: 0,
            selected: true
          }
          ,
          {
            id: 6,
            image: '/images/8.jpg',
            title: '石榴',
            price: 25.8,
            classify: 'shuiguo',
            detail: '这里是石榴详情。',
            parameter: '125g/个',
            service: '不支持退货',
            num: 0,
            selected: true
          }
        ]
      },
      {
        id: 'zhushi',
        banner: '/images/9.jpg',
        cate: '主食',
        goodsList: [
          {
            id: 1,
            image: '/images/11.jpg',
            title: '黄金炒蛋',
            price: 15,
            classify: 'zhushi',
            detail: '这里是黄金炒蛋详情。',
            parameter: '一份',
            service: '不支持退货',
            num: 0,
            selected: true
          },
          {
            id: 2,
            image: '/images/12.jpg',
            title: '养生排骨汤',
            price: 18,
            classify: 'zhushi',
            detail: '这里是养生排骨汤详情。',
            parameter: '一份',
            service: '不支持退货',
            num: 0,
            selected: true
          },
          {
            id: 3,
            image: '/images/13.jpg',
            title: '牛排',
            price: 88,
            classify: 'zhushi',
            detail: '这里是牛排详情。',
            parameter: '一份',
            service: '不支持退货',
            num: 0,
            selected: true
          },
          {
            id: 4,
            image: '/images/14.jpg',
            title: '炒面',
            price: 28,
            classify: 'zhushi',
            detail: '这里是炒面详情。',
            parameter: '一份',
            service: '不支持退货',
            num: 0,
            selected: true
          },
          {
            id: 5,
            image: '/images/15.jpg',
            title: '炸虾',
            price: 45,
            classify: 'zhushi',
            detail: '这里是炸虾详情。',
            parameter: '一份',
            service: '不支持退货',
            num: 0,
            selected: true
          },
          {
            id: 6,
            image: '/images/16.jpg',
            title: '红烧肉',
            price: 35,
            classify: 'zhushi',
            detail: '这里是红烧肉详情。',
            parameter: '一份',
            service: '不支持退货',
            num: 0,
            selected: true
          }
        ]
      }
    ]

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
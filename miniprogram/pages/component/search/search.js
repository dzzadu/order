// pages/component/search/search.js
let timeId = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history: [],
    dataList: [],
    hot: ['新鲜芹菜', '大红枣', '滋补桂圆干'],
    result: [
        // {
        //     id: 1,
        //     url: '../details/details?index=',
        //     thumb: '',
        //     title: '瓜子 100g',
        //     price: 0.01
        // },
        // {
        //     id: 2,
        //     url: '../details/details?index=',
        //     thumb: '',
        //     title: '新鲜芹菜 500g',
        //     price: 0.02
        // }
    ],
    showKeywords: false,
    keywords: [],
    value: '',
    showResult: false,
  },
  cancelSearch() {
    this.setData({
        showResult: false,
        showKeywords: false,
        value: ''
    })
  },
  searchInput(e) {
      if(!e.detail.value){
          this.setData({
              showKeywords: false
          })
      }else{
        //   关键字查搜索列表
          if(!this.data.showKeywords){
              timeId && clearTimeout(timeId);
              this.search(e.detail.value);
              // keywords result
              timeId = setTimeout(() => {
                  this.setData({
                      showKeywords: true
                  })
              }, 1000)
          }
      }
  },
  search(e) {
      let result = [];
      let keywords = [];
    this.data.dataList.map(item => {
        item.goodsList.filter(i => {
            if(i.title.indexOf(e)!= -1){
              result.push(i);
              keywords.push(i.title);
              this.setData({
                  result: result,
                  keywords: keywords
              })
            }
        })
    })
  },
  keywordHandle(e) {
      const text = e.target.dataset.text;
      this.search(text);
      this.setData({
          value: text,
          showKeywords: false,
          showResult: true
      })
      this.historyHandle(text);
  },
  historyHandle(value) {
      let history = this.data.history;
      const idx = history.indexOf(value);
      if (idx === -1) {
          // 搜索记录只保留8个
          if (history.length > 7) {
              history.pop();
          }
      } else {
          history.splice(idx, 1);
      }
      history.unshift(value);
      wx.setStorageSync('history', JSON.stringify(history));
      this.setData({
          history
      });
  },
 /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const history = wx.getStorageSync('history');
    if (history) {
    //   console.log(history);
      this.setData({
          history: JSON.parse(history)
      })
    //   console.log(this.data.history);
    }
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
    let dataList = wx.getStorageSync('dataList')
    let hot = [];
    dataList.map(item => {
        let i=0;
        for(i;i<3;i++){
            hot.push(item.goodsList[i].title);
        }
    })
    this.setData({
        dataList: dataList,
        hot: hot
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
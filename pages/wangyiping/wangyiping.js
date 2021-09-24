// pages/caihongpi/caihongpi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textData: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getData();
  },
  getData: function () {
    wx.showLoading({
      title: '小韩君努力中...',
    });
    let that = this;
    wx.cloud.callFunction({
      name: 'getDataText',
      data: {
        type: 'wangyiyun'
      }
    }).then(res => {
      that.setData({
        textData: res.result,
      });
      wx.hideLoading();
    }).catch(res => {
      console.error(res);
      wx.hideLoading();
    });
  },
  copyData: function () {
    let that = this;
    wx.setClipboardData({
      data: that.data.textData,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
          },
          fail: function (res) {
            wx.showToast({
              title: '复制失败',
            })
          }
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {return {title: "小韩的百宝箱",imageUrl: "/images/share.png",path: "/pages/home/home"};}
})
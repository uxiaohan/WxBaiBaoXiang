// pages/wangke/wangke.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    txtData: '',
    daData: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onChange(event) {
    this.setData({
      txtData: event.detail
    })
  },
  souTi: function () {
    wx.showLoading({
      title: '小韩君努力中...',
    });
    let that = this;
    wx.request({
      url: `https://www.vvhan.com/HanWxApi/GongJuWxApp/WangKe.php?ti=${that.data.txtData}`, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        let jsons = res.data;
        if (jsons.data.da != "") {
          that.setData({
            txtData: jsons.data.ti,
            daData: jsons.data.da
          })
        } else {
          that.setData({
            txtData: '未搜到答案'
          })
        }
        wx.hideLoading();
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },
  pastText: function () {
    let that = this;
    wx.getClipboardData({
      success: function (res) {
        that.setData({
          txtData: res.data
        })
      }
    })
  },
  copyText: function () {
    let that = this;
    wx.setClipboardData({
      data: that.data.daData,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },
  qingText: function () {
    this.setData({
      txtData: ''
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
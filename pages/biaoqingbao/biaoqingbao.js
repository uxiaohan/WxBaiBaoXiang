Page({
  data: {
    urlData: [],
    show: false,
    imgUrl: ''
  },
  onLoad: function () {
    this.getData();
  },
  saveImg: function (e) {
    let that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              that.saveImgToLocal();
            },
            fail() {
              console.log("用户未授权")
            }
          })
        } else {
          that.saveImgToLocal();
        }
      }
    })
  },
  saveImgToLocal: function (e) {
    let that = this;
    let imgSrc = that.data.imgUrl;
    wx.downloadFile({
      url: imgSrc,
      success: function (res) {
        console.log(res);
        //图片保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 1466
            });
            that.setData({
              show: false
            })
          },
        })
      }
    })
  },
  showPopup(e) {
    this.setData({
      show: true,
      imgUrl: e.currentTarget.dataset.hans
    });
  },

  onClose() {
    this.setData({
      show: false
    });
  },
  getData: function () {
    wx.showLoading({
      title: '小韩君努力中...',
    });
    let that = this;
    wx.cloud.callFunction({
      name: 'gettouxiang',
      data: {
        type: 'biaoqingbao'
      }
    }).then(res => {
      that.setData({
        urlData: that.data.urlData.concat(JSON.parse(res.result).datas)
      })
      wx.hideLoading();
    }).catch(res => {
      console.error(res);
      wx.hideLoading();
    });
  },
  onReachBottom: function () {
    this.getData();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {return {title: "小韩的百宝箱",imageUrl: "/images/share.png",path: "/pages/home/home"};}
})
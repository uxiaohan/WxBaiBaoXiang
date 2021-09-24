var hansapp = getApp();
Page({
  data: {
    loginShow: false,
    userOpenid: '',
    userNick: '',
    userAvater: '',
    theNick: '',
    theIds: '',
    theColor: '',
    theBacColor: '',
    theTxtColor: ''
  },
  onLoad: function () {
    this.data.userOpenid = hansapp.globalData.hanOpenid;
    this.data.loginShow = hansapp.globalData.loginShow;
    if (this.data.loginShow == true) {
      this.setData({
        loginShow: true
      })
      this.getUserInfos();
    }
  },
  getUserInfos: function () {
    wx.showLoading({
      title: '小韩君努力中...',
    });
    let that = this;
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userAvater: res.userInfo.avatarUrl,
          userNick: res.userInfo.nickName
        });
        hansapp.globalData.loginShow = true;
        that.setData({
          loginShow: true
        })
        that.getUserData(true);
      },
      fail: function () {
        wx.hideLoading();
      }
    })
  },
  upDataUser: function () {
    wx.cloud.callFunction({
      name: 'handb',
      data: {
        nicknames: this.data.userNick,
        avatars: this.data.userAvater,
        openids: this.data.userOpenid,
      }
    }).then(res => {
      console.log(res);
      this.getUserData(false);
    }).catch(res => {
      console.error(res)
    });
  },
  getUserData: function (orup) {
    let vipcolor = '#808080';
    let viptext = '#FFFFFF';
    wx.cloud.callFunction({
      name: 'getdb',
      data: {
        openids: this.data.userOpenid,
      }
    }).then(resu => {
      wx.hideLoading();
      if (resu.result.vip == true) {
        vipcolor = '#FFD700';
        viptext = '#FF0000';
      }
      this.setData({
        theColor: resu.result.color,
        theNick: resu.result.nick,
        theIds: resu.result.id,
        theBacColor: vipcolor,
        theTxtColor: viptext
      });
      if (orup == true) {
        this.upDataUser();
        console.log("更新");
      }
    }).catch(resu => {
      wx.hideLoading();
    });
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: [current]
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "小韩的百宝箱",
      imageUrl: "/images/share.png",
      path: "/pages/home/home"
    };
  }
})
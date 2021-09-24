import Toast from '@vant/weapp/toast/toast';
Page({
  data: {
    hansKeys: '',
    userLogo: '',
    loginShow: false,
    btnLoading: true,
    logHight: 'block',
    logOk: 'none',
    userOpenid: '',
    WxData: '',
    userNick: '',
    userAvater: '',
    theNick: '',
    theIds: '',
    theColor: '',
    theBacColor: '',
    theTxtColor: ''
  },
  onLoad: function (options) {
    let that = this
    let str = JSON.stringify(options);
    let jsonstr = JSON.parse(str);
    let hanstr = jsonstr.scene;
    that.setData({
      hansKeys: hanstr
    });
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo'] !== undefined) {
          this.setData({
            loginShow: res.authSetting['scope.userInfo']
          })
          that.getUserInfos();
        } else {
          this.setData({
            loginShow: false
          })
        }
      }
    })
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      that.setData({
        userOpenid: res.result.openid,
        btnLoading: false
      })
    }).catch(res => {
      console.error(res)
    });
    console.log(this.data.loginShow)
    if (this.data.loginShow == true) {
      this.getUserInfos();
    }
  },
  goHone: function () {
    wx.switchTab({
      url: '../home/home',
    })
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
          userNick: res.userInfo.nickName,
          WxData: encodeURI(`${res.userInfo.nickName}H-hgh-H${res.userInfo.gender}H-hgh-H${res.userInfo.language}H-hgh-H${res.userInfo.country}H-hgh-H${res.userInfo.province}H-hgh-H${res.userInfo.city}H-hgh-H${res.userInfo.avatarUrl}H-hgh-H${that.data.userOpenid}`),
          userLogo: res.userInfo.avatarUrl,
          loginShow: true,
        });
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
  hansLogin: function () {
    this.setData({
      btnLoading: true
    })
    let that = this;
    let keys = that.data.hansKeys;
    wx.cloud.callFunction({
      name: 'hanskeys',
      data: {
        WxData: that.data.WxData,
        HanKey: keys
      }
    }).then(res => {
      let jsons = JSON.parse(res.result);
      console.log(res);
      switch (jsons.message) {
        case 200:
          that.setData({
            logHight: 'none',
            logOk: 'block'
          })
          break;
        case 300:
          this.hansToast('二维码过期，请重新扫码');
          break;
        case 100:
          this.hansToast('网络繁忙，请稍后再试');
          break;
        default:
          this.hansToast('登录失败，请刷新后重试');
          break;
      }
      that.setData({
        btnLoading: false
      })
    }).catch(res => {
      console.error(res);
      that.setData({
        btnLoading: false
      })
    });
  },
  hansToast: function (msg) {
    Toast(msg);
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
  onShareAppMessage: function (res) {}
})
//app.js
App({
  globalData: {
    hanOpenid: '',
    loginShow: false,
    homeTip: '',
    gong: '',
    gongtime: ''
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    // 判断微信是否登陆
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo'] !== undefined) {
          this.globalData.loginShow = res.authSetting['scope.userInfo'];
        } else {
          this.globalData.loginShow = false;
        }
      }
    })
    // 获取用户OpenId
    wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      this.globalData.hanOpenid = res.result.openid;
    }).catch(res => {
      console.error(res)
    });
    // 微信小程序获取版本更新
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '小韩提示',
        content: '新版来袭，速来体验！',
        success: function (res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    });
  },
  orLogin: function () {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo'] !== undefined) {
          return res.authSetting['scope.userInfo'];
        } else {
          return false;
        }
      }
    })
  }
})
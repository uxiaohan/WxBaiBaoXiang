var hansapp = getApp();
import Dialog from '@vant/weapp/dialog/dialog';
Page({
  data: {
    userN: '',
    passW: '',
    orLoad: false,
    orJz: false,
    one: '手机号码',
    two: '登录密码',
    three: '请输入您的网易云音乐手机号',
    four: '请输入登录密码'
  },
  onLoad: function () {
    wx.showLoading({
      title: '小韩君努力中...',
    });
    this.wyDB(true);
  },
  userName: function (eUser) {
    this.setData({
      userN: eUser.detail
    })
  },
  passWord: function (ePwd) {
    this.setData({
      passW: ePwd.detail
    })
  },
  loginUser: function () {
    let that = this;
    if (that.data.userN != "" && that.data.passW != "") {
      that.setData({
        orLoad: true
      })
      wx.cloud.callFunction({
        name: 'wyQd',
        data: {
          username: that.data.userN,
          password: that.data.passW
        }
      }).then(resu => {
        let rejson = JSON.parse(resu.result);
        if (rejson.code == 400) {
          wx.showToast({
            title: '帐号不存在',
            icon: 'none',
            duration: 1566
          });
          that.setData({
            orLoad: false
          })
          return 0;
        } else if (rejson.code == 502) {
          wx.showToast({
            title: '帐号或密码错误',
            icon: 'none',
            duration: 1566
          });
          that.setData({
            orLoad: false
          })
          return 0;
        } else if (rejson.code == 702) {
          wx.showToast({
            title: '线路频繁,10分钟后重试',
            icon: 'none',
            duration: 1566
          });
          that.setData({
            orLoad: false
          })
          return 0;
        } else if (rejson.code == 509) {
          wx.showToast({
            title: '帐号频繁请求，请稍后再试',
            icon: 'none',
            duration: 1566
          });
          that.setData({
            orLoad: false
          })
          return 0;
        } else if (rejson.success == true) {
          Dialog.alert({
            title: '恭喜打卡成功',
            message: `用户：${rejson.nickname}\n签到状态：${rejson.qian}\n打卡状态：${rejson.daka}\n\n记得明天再来鸭~`,
          }).then(() => {
            console.log("弹窗关闭");
          });
          that.setData({
            orLoad: false
          })
          if (that.data.orJz == false) {
            that.wyDB(false);
          }
        }
      }).catch(res => {
        console.error(res)
        that.setData({
          orLoad: false
        })
      })
    } else {
      wx.showToast({
        title: '请输入帐号密码',
        icon: 'none',
        duration: 1566
      });
    }
  },
  wyDB: function (get) {
    let that = this;
    if (get == true) {
      return wx.cloud.callFunction({
        name: 'wydb',
        data: {
          openids: hansapp.globalData.hanOpenid,
          get: 'hans'
        }
      }).then(resu => {
        wx.hideLoading();
        if (resu.result.wyp.length > 8) {
          that.setData({
            three: '您已经成功登录',
            four: '直接打卡即可',
            userN: resu.result.wyu,
            passW: resu.result.wyp,
            orJz: true,
            one: '',
            two: ''
          })
        }
      }).catch(res => {
        console.error(res)
      })
    } else {
      wx.cloud.callFunction({
        name: 'wydb',
        data: {
          openids: hansapp.globalData.hanOpenid,
          get: 'hansOK',
          wyu: that.data.userN,
          wyp: that.data.passW
        }
      }).then(resu => {
        that.setData({
          three: '您已经成功登录',
          four: '直接打卡即可',
          userN: that.data.userN,
          passW: that.data.passW,
          orJz: true,
          one: '',
          two: ''
        })
      }).catch(res => {
        console.error(res)
      })
    }

  },
  chongXin: function () {
    this.setData({
      userN: '',
      passW: '',
      orJz: false,
      one: '手机号码',
      two: '登录密码',
      three: '请输入网易云绑定的手机号',
      four: '请输入密码'
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
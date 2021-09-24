var hansapp = getApp();
import Dialog from '@vant/weapp/dialog/dialog';
Page({
  data: {
    homeTip: '',
    gong: '',
    gongtime: ''
  },
  onLoad: function () {
    wx.showLoading({
      title: '小韩君努力中...',
    });
    this.getGong();
  },
  getGong: function () {
    let that = this;
    wx.cloud.callFunction({
      name: 'hometip',
      data: {
        orhan: 'hansOk'
      }
    }).then(res => {
      let jsons = JSON.parse(res.result);
      this.setData({
        homeTip: jsons.hometip,
        gong: jsons.content,
        gongtime: jsons.time
      })
      wx.hideLoading();
      let hanDSQ = setInterval(function () {
        if (hansapp.globalData.hanOpenid.length > 5) {
          clearInterval(hanDSQ);
          that.getDB();
        }
      }, 566);
    }).catch(res => {
      console.error(res);
    });
  },
  getDB: function () {
    let that = this;
    wx.cloud.callFunction({
      name: 'getdb',
      data: {
        openids: hansapp.globalData.hanOpenid,
        change: '1'
      }
    }).then(resu => {
      if (that.data.gongtime > resu.result.gong) {
        let titles = `${resu.result.nick}的提示`;
        if (resu.result.vip == true) {
          titles = `尊敬的SVIP：${resu.result.nick} 您好`;
        }
        Dialog.alert({
          title: titles,
          message: that.data.gong,
        }).then(res => {
          wx.cloud.callFunction({
            name: 'getdb',
            data: {
              openids: hansapp.globalData.hanOpenid,
              change: 'hansOK'
            }
          }).then(res => {
            console.log(res)
          }).catch(res => {
            console.error(res)
          })
        }).catch(res => {
          console.log(res);
        });
      }
    }).catch(res => {
      console.error(res)
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
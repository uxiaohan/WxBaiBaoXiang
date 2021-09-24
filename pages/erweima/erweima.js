var t = function (t) {
    return t && t.__esModule ? t : {
      default: t
    };
  }(require("./runtime/qrcode")),
  e = getApp();

Page({
  data: {
    canvasInfo: {
      id: "mycanvas",
      width: 200,
      height: 200
    },
    QrcodeInfo: {
      text: "",
      background: "#ffffff",
      foreground: "#000000"
    },
    systemInfo: {
      width: 320,
      height: 568
    },
    color_array: ["白", "黑", "红", "橙", "黄", "绿", "青", "蓝", "紫"],
    color: ["#ffffff", "#000000", "#ff0000", "#ff8800", "#ffff00", "#00ff00", "#00fff0", "#0000ff", "#ff00ff"],
    foreColorIndex: 1,
    bgColorIndex: 0
  },
  onLoad: function (t) {
    var e = this;
    wx.getSystemInfo({
      success: function (t) {
        e.setData({
          "systemInfo.width": t.windowWidth,
          "systemInfo.height": t.windowHeight,
          "canvasInfo.width": t.windowWidth / 2,
          "canvasInfo.height": t.windowWidth / 2
        });
      }
    }), this.saveAndGetData("", !0);
  },
  onShow: function (e) {
    this.saveAndGetData("", !0);
    var a = this.data.QrcodeInfo,
      o = this.data.canvasInfo;
    "" == a.text && (a.text = "其实我是喜欢你的~"), (0, t.default)({
      width: o.width,
      height: o.height,
      canvasId: o.id,
      text: a.text,
      foreground: a.foreground,
      background: a.background
    });
  },
  selectForeColor: function (t) {
    var e = this.data.color;
    this.setData({
      foreColorIndex: t.detail.value,
      "QrcodeInfo.foreground": e[t.detail.value]
    });
  },
  selectBgColor: function (t) {
    var e = this.data.color;
    this.setData({
      bgColorIndex: t.detail.value,
      "QrcodeInfo.background": e[t.detail.value]
    });
  },
  createQrcode: function (a) {
    wx.showLoading({
      title: '小韩君努力中...',
    });
    var o = this;
    var n = a.detail.value.canvasWidth,
      i = o.data.QrcodeInfo,
      d = o.data.canvasInfo,
      s = a.detail.value.text;
    if (s.length < 1) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 1566
      });
      return
    } else {
      wx.cloud.callFunction({
        name: 'textSafe',
        data: {
          txt: encodeURIComponent(s)
        }
      }).then(resu => {
        let jsons = JSON.parse(resu.result);
        if (jsons.errcode != 0) {
          wx.showModal({
            title: '温馨提示',
            content: '存在非法字词，请重新输入',
            showCancel: false
          })
          wx.hideLoading();
          return
        } else {
          d.width = n, d.height = n, o.setData({
            canvasInfo: d,
            "QrcodeInfo.text": s
          }), (0, t.default)({
            width: d.width,
            height: d.height,
            canvasId: d.id,
            text: s,
            foreground: i.foreground,
            background: i.background
          }), o.saveAndGetData(s, !1);
          wx.hideLoading();
        }
        console.log(resu)
      }).catch(res => {
        console.error(res)
        wx.hideLoading();
      })
    }
  },
  saveAndGetData: function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
      e = this;
    0 == (arguments.length > 1 && void 0 !== arguments[1] && arguments[1]) ? wx.setStorage({
      key: "createQrcode_text",
      data: t
    }) : wx.getStorage({
      key: "createQrcode_text",
      success: function (t) {
        e.setData({
          "QrcodeInfo.text": t.data
        });
      }
    });
  },
  inputSave: function (t) {
    this.saveAndGetData(t.detail.value, !1);
  },
  previewImage: function (t) {
    var e = this.data.canvasInfo;
    wx.canvasToTempFilePath({
      canvasId: e.id,
      success: function (t) {
        var e = t.tempFilePath,
          a = [];
        a.push(e), wx.previewImage({
          urls: a
        });
      }
    }, this);
  },
  onShareAppMessage: function () {

  }
});
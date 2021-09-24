Page({
  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    show: false,
    imgss: '',
    active: 0,
    theKey: '',
    qqUrl: '',
    wxUrl: '',
    zfbUrl: '',
    qqtxt: '上传QQ收款码',
    wxtxt: '上传微信收款码',
    zfbtxt: '上传支付宝收款码',
    yangshis: ["pikaqiu", "kanuobudingmao", "gongzhu", "huanyingdashang", "maomi", "longmao", "dongxue", "niannianyouyu", "baobei", "yitiji", "qitao", "qiuzanzhu", "toushi", "xiaohuangren", "yinlian"]
  },
  qqChange(event) {
    this.setData({
      value: event.detail
    })
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({
      active: event.detail.index
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  afterRead(event) {
    let that = this;
    that.setData({
      theKey: event.detail.name
    });
    wx.uploadFile({
      url: 'https://www.vvhan.com/HanWxApi/GongJuWxApp/pay/upFile.php',
      filePath: event.detail.file.path,
      name: 'hanapi',
      header: {
        'content-type': 'multipart/form-data'
      },
      success: function (res) {
        let resjson = JSON.parse(res.data);
        that.qrJx(resjson.downurl);
      }
    })
  },
  qrJx: function (url) {
    wx.showLoading({
      title: '小韩君努力中...',
    });
    let that = this;
    wx.request({
      url: 'https://cli.im/apis/up/deqrimg', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        img: url
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        if (res.data.status == 1) {
          switch (that.data.theKey) {
            case 'wx':
              that.setData({
                wxUrl: res.data.info.data[0],
                wxtxt: '微信收款码已上传成功'
              })

              break;
            case 'zfb':
              that.setData({
                zfbUrl: res.data.info.data[0],
                zfbtxt: '支付宝收款码已上传成功'
              })

              break;

            default:
              that.setData({
                qqUrl: res.data.info.data[0],
                qqtxt: 'QQ收款码已上传成功'
              })

              break;
          }
        } else {
          wx.showToast({
            title: '二维码解析失败，请重新上传',
            icon: 'none',
            duration: 1566
          });
        }
      },
      complete() {
        wx.hideLoading();
      }
    })
  },
  hanMakeQr: function () {
    if (this.data.value.length < 5) {
      wx.showToast({
        title: '请输入正确的QQ',
        icon: 'none',
        duration: 1566
      });
      return 0;
    }
    wx.showLoading({
      title: '小韩君努力中...',
    });
    let that = this;
    wx.request({
      url: 'https://www.vvhan.com/HanWxApi/GongJuWxApp/pay/QrPayApi.php', //仅为示例，并非真实的接口地址
      method: 'POST',
      responseType: 'arraybuffer',
      data: {
        type: that.data.yangshis[that.data.active],
        hanQq: that.data.qqUrl,
        hanWx: that.data.wxUrl,
        hanZfb: that.data.zfbUrl,
        qqV: that.data.value
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        that.setData({
          imgss: wx.arrayBufferToBase64(res.data)
        })
      },
      complete() {
        wx.hideLoading();
        that.setData({
          show: true
        })
      }
    })
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
    let imgSrc = that.data.imgss;
    var save = wx.getFileSystemManager();
    var number = Math.random();
    save.writeFile({
      filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
      data: imgSrc,
      encoding: 'base64',
      success: res => {
        wx.saveImageToPhotosAlbum({
          filePath: wx.env.USER_DATA_PATH + '/pic' + number + '.png',
          success: function (res) {
            wx.showToast({
              title: '保存成功',
            })
          },
          fail: function (err) {
            console.log(err)
          }
        })
        console.log(res)
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  showPopup(e) {
    this.setData({
      show: true
    });
  },

  onClose() {
    this.setData({
      show: false
    });
  },

  base64Encode: function (val) {
    var base64hash = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    val = encodeURIComponent(val);
    //把字符串转换为字符数组
    var strArr = val.split('');

    //装入结果的数组
    var result = [];
    //每个字符的ascii码
    var asciiCode;
    //上一个字符的ascii码
    var prevAsciiCode;

    var mod;
    //未填充之前的数组与3的模
    var preMod = strArr.length % 3;

    //使字符数组组成三个一组
    if (preMod == 1) {
      strArr.push(null);
      strArr.push(null);
    }
    if (preMod == 2) strArr.push(null);
    //遍历整个数组，寻找每个字符的ascii码
    for (var index in strArr) {
      if (!strArr[index]) {
        asciiCode = 0;
      } else {
        asciiCode = strArr[index].charCodeAt();
      }
      //位于一组当中的第几个字符
      mod = index % 3;
      switch (mod) {
        case 0:
          //往右移2位
          result.push(base64hash[asciiCode >> 2]);
          break;
        case 1:
          //上一个ascii码往左移4位与现在的ascii码往右移四位做或操作
          result.push(base64hash[(prevAsciiCode & 3) << 4 | asciiCode >> 4]);
          break;
        case 2:
          //假设当前组的ascii为：01000111,00000011,00000000
          //2表示当前索引位于第三个，第二个ascii码和15相与，获得低四位的值，右移两位后再从第三个ascii获取高二位作为新6位数的低二位
          result.push(base64hash[(prevAsciiCode & 15) << 2 | asciiCode >> 6]);
          //与2的6次方减1相与，获得低6位的值
          result.push(base64hash[asciiCode & 63]);
          break
      }

      prevAsciiCode = asciiCode
    }

    //处理异常
    if (preMod == 1) {
      result.splice(result.length - 2, 2);
      result.push('==');
    } else if (preMod == 2) {
      result.pop();
      result.push('=');
    }

    return result.join('');
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
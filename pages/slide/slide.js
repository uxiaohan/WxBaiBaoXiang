function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e = getApp(),
    i = require("textdata"),
    o = !1,
    d = null,
    s = null;

Page({
    data: {
        isIPX: e.isIPX,
        Android: e.Android,
        state: {
            intxt: !0,
            inset: !1,
            bom: !0
        },
        sysSync: {
            w: wx.getSystemInfoSync().screenWidth,
            h: wx.getSystemInfoSync().screenHeight
        },
        modalTxt: {
            state: !1,
            textarea: ""
        },
        pagestate: !0,
        pageHideState: 0,
        tabData: {
            act: "常用语",
            list: [{
                value: "常用语"
            }, {
                value: "速度"
            }, {
                value: "字号"
            }, {
                value: "颜色"
            }, {
                value: "文字方向"
            }, {
                value: "滚动方向"
            }]
        },
        inTxt: "小韩提示：请输入文字",
        txtArray: [],
        fontfamily: {
            cur: 0,
            item: [{
                value: "默认",
                family: ""
            }, {
                value: "像素",
                family: "Epson"
            }]
        },
        textdata: {
            cur: -1,
            item: []
        },
        speeddata: {
            cur: 1,
            item: [{
                id: 0,
                value: "慢"
            }, {
                id: 1,
                value: "中"
            }, {
                id: 2,
                value: "快"
            }]
        },
        sizedata: {
            cur: 2,
            item: [{
                id: 0,
                value: "小",
                size: 200
            }, {
                id: 1,
                value: "中",
                size: 250
            }, {
                id: 2,
                value: "大",
                size: 300
            }, {
                id: 3,
                value: "特大",
                size: 350
            }, {
                id: 4,
                value: "超大",
                size: wx.getSystemInfoSync().windowWidth + 100
            }]
        },
        colordata: {
            cur: 0,
            item: [{
                color: "#fff"
            }, {
                color: "#bbb"
            }, {
                color: "#ea2727"
            }, {
                color: "#ea4e4e"
            }, {
                color: "#f3b44e"
            }, {
                color: "#fcf255"
            }, {
                color: "#6be84c"
            }, {
                color: "#b3ed4a"
            }, {
                color: "#3c35f5"
            }, {
                color: "#4eacf8"
            }, {
                color: "#8030f5"
            }, {
                color: "#d12ca5"
            }, {
                color: "#e93382"
            }, {
                color: "#fe71e2"
            }, {
                color: "#000"
            }]
        },
        angledata: {
            cur: 1,
            item: [{
                value: "0"
            }, {
                value: "90"
            }, {
                value: "180"
            }, {
                value: "270"
            }]
        },
        slidedata: {
            cur: 0,
            item: [{
                value: "从下往上",
                inclass: "moveTop"
            }, {
                value: "从右往左",
                inclass: "moveLeft"
            }]
        },
        audiodata: {
            cur: 0,
            item: [{
                value: "无",
                url: ""
            }]
        },
        calcHeight: "",
        calcAnimate: "",
        tWidth: "",
        advtype: 0
    },
    getHan: function (t, r) {
        var a = parseInt(wx.getStorageSync(t + e));
        return a && parseInt(a) < Date.parse(new Date()) / 1e3 ? r || void 0 : wx.getStorageSync(t) || r;
    },
    putHan: function (t, r, a) {
        wx.setStorageSync(t, r);
        var n = parseInt(a);
        if (0 < n) {
            var o = Date.parse(new Date());
            o = o / 1e3 + n, wx.setStorageSync(t + e, o + "");
        } else wx.removeStorageSync(t + e);
    },
    onLoad: function (t) {
        wx.setKeepScreenOn({
            keepScreenOn: !0
        });
        var e = this;
        e.inGetTxtArr(), t.intxt && (e.setData({
            "state.inset": !1,
            pagestate: !1
        }), e.inPutCustomSet(t));
    },
    inGetInterstitial: function (t) {
        return this.getHan("sjdm_interstitial_" + t);
    },
    onReady: function () {
        var t = this;
        t.getVideo = wx.createVideoContext("bg-video");
        var e = t.inGetCustomSet();
        e.textdata && e.textdata.length || (t.setData({
            "textdata.item": i
        }), e.textdata = i, t.inPutCustomSet(e)), t.initCustomSet();
    },
    onHide: function () {
        var t = this,
            e = t.data.pagestate;
        t.getVideo && (e ? t.setData({
            pageHideState: 0
        }) : (t.togglePage(), t.setData({
            pageHideState: 1
        })));
    },
    onShow: function () {
        s && s.show().catch(function (t) {
            console.error(t);
        });
        var t = this;
        !this.inGetInterstitial("slide") && 0 < t.data.advtype && d && d.show().then(function (t) {
            e.inSetInterstitial("slide");
        }).catch(function (t) {
            console.error(t);
        });
        var a = t.data.pageHideState;
        t.getVideo && a && t.togglePage();
    },
    inGetConfig: function () {
        var t = this;
        e.inGetConfig({
            success: function (e) {
                t.setData({
                    advtype: e.advtype
                });
            }
        });
    },
    inTapTab: function (t) {
        this.setData({
            "tabData.act": t.detail.key
        });
    },
    inGetTxtArr: function () {
        let texts = this.data.inTxt.split("");
        wx.cloud.callFunction({
            name: 'textSafe',
            data: {
                txt: encodeURIComponent(texts)
            }
        }).then(resu => {
            let jsons = JSON.parse(resu.result);
            if (jsons.errcode != 0) {
                wx.showModal({
                    title: '温馨提示',
                    content: '存在非法字词，请重新输入',
                    showCancel: false
                  })
                  return
            }else{
                this.setData({
                    txtArray: this.data.inTxt.split("")
                });
            }
            console.log(resu)
        }).catch(res => {
            console.error(res)
        })
    },
    initCustomSet: function () {
        var t = this,
            e = t.inGetCustomSet();
        e && (e.textdata && t.setData({
            "textdata.item": e.textdata
        }), e.intxt && (t.setData({
            inTxt: e.intxt
        }), t.inGetTxtArr()), 0 <= e.speed && t.setData({
            "speeddata.cur": e.speed
        }), 0 <= e.size && t.setData({
            "sizedata.cur": e.size
        }), 0 <= e.color && t.setData({
            "colordata.cur": e.color
        }), 0 <= e.angle && t.setData({
            "angledata.cur": e.angle
        }), 0 <= e.slide && t.setData({
            "slidedata.cur": e.slide
        }), 0 <= e.audio && t.setData({
            "audiodata.cur": e.audio
        })), t.oSetCalcAniamte();
    },
    toggleSet: function () {
        this.setData({
            "state.inset": !this.data.state.inset
        });
    },
    togglePage: function (t) {
        var e = this;
        if (!o) {
            var a = e.data.pagestate;
            a ? (e.getVideo.requestFullScreen(), e.getVideo.play(), e.getVideo.hideStatusBar()) : (e.getVideo.exitFullScreen(),
                e.getVideo.stop(), e.getVideo.showStatusBar()), o = !0, e.setData({
                pagestate: !a
            }), setTimeout(function () {
                o = !1;
            }, 400);
        }
    },
    inGetCustomSet: function () {
        return this.getHan("danmu_slide_json") ? this.getHan("danmu_slide_json") : {};
    },
    inPutCustomSet: function (t) {
        this.putHan("danmu_slide_json", t);
    },
    inCheck: function (t) {
        t.detail.value;
        this.setInTxt(t);
    },
    setInTxt: function (t) {
        var e = this;
        if (t.detail.value != e.data.inTxt && (e.setData({
                inTxt: t.detail.value
            }), e.inGetTxtArr(), e.oSetCalcAniamte()), "blur" == t.type) {
            var a = e.inGetCustomSet();
            a.intxt = t.detail.value, e.inPutCustomSet(a);
        }
    },
    oSetCalcAniamte: function () {
        var t = this,
            e = t.data,
            a = e.inTxt,
            i = e.speeddata,
            n = e.sysSync,
            o = e.sizedata,
            d = e.slidedata,
            s = void 0;
        switch (Number(i.cur)) {
            case 0:
                s = .7;
                break;

            case 1:
                s = .5;
                break;

            case 2:
                s = .3;
        }
        var u = n.h;
        1 == d.cur && (u = n.w, s *= n.h / n.w);
        var r = u / o.item[2].size * s;
        o.item[2].size / 2 * a.length < u ? r *= u / o.item[2].size * 2 : r *= a.length,
            t.setData({
                "state.intxt": !1,
                calcAnimate: r
            }), setTimeout(function () {
                t.setData({
                    "state.intxt": !0
                });
            }, 10);
    },
    inChoice: function (e) {
        var a = this,
            i = e.currentTarget.dataset,
            n = a.inGetCustomSet(),
            o = void 0,
            d = function () {
                a.setData(t({}, o, i.index)), a.inPutCustomSet(n);
            };
        switch (i.type) {
            case "family":
                return o = "fontfamily.cur", n.family = i.index, void d();

            case "text":
                o = "textdata.cur", a.setData({
                    inTxt: a.data.textdata.item[i.index].value
                }), a.inGetTxtArr();
                break;

            case "speed":
                o = "speeddata.cur", n.speed = i.index;
                break;

            case "size":
                o = "sizedata.cur", n.size = i.index;
                break;

            case "color":
                return o = "colordata.cur", n.color = i.index, void d();

            case "angle":
                return o = "angledata.cur", n.angle = i.index, void d();

            case "slide":
                o = "slidedata.cur", n.slide = i.index;
                break;

            case "audio":
                return o = "audiodata.cur", n.audio = i.index, d(), void a.inPlayBgAudio();
        }
        a.setData(t({}, o, i.index)), a.inPutCustomSet(n), a.oSetCalcAniamte();
    },
    inToggleModal: function (t) {
        var e = this;
        if (e.setData({
                "modalTxt.state": !e.data.modalTxt.state
            }), "insuccess" == t.type) {
            var a = e.data,
                i = a.modalTxt,
                n = a.textdata;
            if (i.textarea.length) {
                n.item.push({
                    value: i.textarea
                }), e.setData({
                    "textdata.item": n.item,
                    "modalTxt.textarea": ""
                });
                var o = e.inGetCustomSet();
                o.textdata = n.item, e.inPutCustomSet(o);
            }
        }
    },
    inTextareaChange: function (t) {
        t.detail.value.length && this.setData({
            "modalTxt.textarea": t.detail.value
        });
    },
    inDelTxt: function (t) {
        var e = t.currentTarget.dataset,
            a = this.data.textdata;
        a.item.splice(e.index, 1), this.setData({
            "textdata.item": a.item
        });
        var i = this.inGetCustomSet();
        i.textdata = a.item, this.inPutCustomSet(i);
    },
    onShareAppMessage: function (t) {
        var e = this.data,
            a = e.inTxt,
            i = e.fontfamily,
            n = e.speeddata,
            o = e.sizedata,
            d = e.colordata,
            s = e.angledata,
            u = e.slidedata,
            r = e.audiodata;
        return {
            title: "字数越少，事情越大",
            imageUrl: "../../images/slide.jpg",
            path: "/pages/slide/slide?intxt=" + a + "&family=" + i.cur + "&speed=" + n.cur + "&size=" + o.cur + "&color=" + d.cur + "&angle=" + s.cur + "&slide=" + u.cur + "&audio=" + r.cur
        };
    }
});
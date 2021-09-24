Component({
    externalClasses: [ "g-class", "s-class" ],
    properties: {
        title: {
            type: String,
            value: ""
        },
        color: {
            type: String,
            value: "black"
        },
        align: {
            type: String,
            value: "tc"
        },
        customStyle: {
            type: String,
            value: ""
        },
        isprev: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        customIcon: "",
        drawer: {
            top: !1
        },
        cityData: {
            active: 0,
            list: []
        }
    },
    ready: function() {},
    methods: {
        inToggleDrawerTop: function(t) {
            this.setData({
                "drawer.top": !this.data.drawer.top
            });
        },
        inTap: function() {
            1 < getCurrentPages().length ? wx.navigateBack({
                delta: 1
            }) : wx.switchTab({
                url: "/pages/index/index"
            }), this.triggerEvent("intap");
        }
    }
});
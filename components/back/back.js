Component({
    externalClasses: [ "g-class" ],
    properties: {
        size: {
            type: String,
            value: "default"
        }
    },
    data: {},
    methods: {
        inBack: function() {
            1 < getCurrentPages().length ? wx.navigateBack() : wx.navigateTo({
                url: "/pages/index/index"
            });
        }
    }
});
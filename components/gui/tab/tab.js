Component({
    externalClasses: [ "g-class", "b-class" ],
    relations: {
        "../tabs/tabs": {
            type: "parent"
        }
    },
    properties: {
        key: {
            type: String,
            value: ""
        },
        index: {
            type: Number,
            value: ""
        },
        value: {
            type: String,
            value: ""
        },
        checked: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        activeColor: ""
    },
    methods: {
        activeChange: function(e) {
            this.setData({
                checked: e
            });
        },
        activeColor: function(e) {
            this.setData({
                activeColor: e
            });
        },
        inTap: function(e) {
            this.getRelationNodes("../tabs/tabs")[0].emitEvent({
                key: this.data.key,
                index: this.data.index
            });
        }
    }
});
Component({
    externalClasses: [ "g-class" ],
    relations: {
        "../tab/tab": {
            type: "child",
            linked: function() {
                this.activeChange();
            },
            linkChanged: function() {
                this.activeChange();
            },
            unlinked: function() {
                this.activeChange();
            }
        }
    },
    properties: {
        active: {
            type: String,
            value: "",
            observer: "activeChange"
        },
        scroll: {
            type: Boolean,
            value: !1
        },
        color: {
            type: String,
            value: ""
        }
    },
    methods: {
        activeChange: function() {
            var t = this, e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.data.active, a = this.getRelationNodes("../tab/tab");
            0 < a.length && a.forEach(function(a) {
                a.activeChange(a.data.key === e), a.activeColor(t.data.color);
            });
        },
        emitEvent: function(t) {
            this.triggerEvent("intap", t);
        }
    }
});
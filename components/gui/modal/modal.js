Component({
    externalClasses: [ "g-class", "g-class-mask" ],
    properties: {
        types: {
            type: String,
            value: ""
        },
        show: {
            type: Boolean,
            value: !1
        },
        isloading: {
            type: Boolean,
            value: !1
        },
        iscancel: {
            type: Boolean,
            value: !0
        },
        cancelTxt: {
            type: String,
            value: "取 消"
        },
        successTxt: {
            type: String,
            value: "确 定"
        },
        onemsg: {
            type: String,
            value: ""
        },
        twomsg: {
            type: String,
            value: ""
        },
        mapping: {
            type: String,
            value: ""
        },
        mappingstyle: {
            type: String,
            value: ""
        }
    },
    data: {
        imgurl: {
            success: "data:image/png;base64,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",
            danger: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAMAAADQmBKKAAAAaVBMVEX//Pv/VT7/Sy7/SzH/UTX/TTD/TTH/aVH/Sy7/Sy7/UDT/Vz3/WUL/TjL/Uzj/X0j/Sy7/UzX/VDj/TTD/TTL/UTX/Sy7/Sy7/TC//TDD/Sy//TTD/Sy7/TTH/Sy7/TTD/Sy7/TDD/Sy7/AsPYAAAAInRSTlMDIbd9P4R2DvXtTiUcay8Wxjw3jlhH5tOvnt+ltGTMXrybWTaphwAABO1JREFUeNrkl9mSmzAQRS9YFrvYwdvYE/7/I5OyBIPNdJlGuIYk58nlhTruvuoG/N94UZHnReRhI0TCEGETKDGgsAHu9dlQjTzxwM/nKBJiWyUqTHhMlAr8NPndAwDuL3Iw+feFNteyzYV6c8d+c4Nxe6tje8vV4vajTna7pMZWiOT+jtxIZaP9wEujWCTlJWtPge8Hpza7lImIsTbyS0gCNEq6QfcNgSsVVqTej6ipdFYHLUMQHCoPK5GMhRJ8hzgONjTBUWAVdmOh3XfGp24mp+T9Qp5sOgaN9N7bMvnUK/963lciz1UUqbwOk/LS+k+dk28MtWgfZD5lAYMXOz1RWGYPUq1407FPz2ObQwjDWMkQfVzGTuf0HYMxHHXrmqSY4DljlGxHfQvXXx1lN5BR0yl1Hrhdu4ESY+yXq5N1PZ8CJKZvA9XXzzIHK1IM7WoqTKGL5CTN0LYCqxH6fZRLDy/wnozUr+HHIVbi1l/yVGAGzhNh0xvdsAqyMxxSzCJ+LpLbGeQq9en/nwTANTLs+xrf1sgPkQCW0QdxFT65uVKQAzZGYWCMcljhmOs0CrAzqk20Awc2ZOYqClyciZH5bxksKOk6841C33qLhDZJ9Bwq2YuDnQZW0yOdGO1NAFIs42zmIRYST4zMhDxjEcLsixQG+6Ypc9QEltDqABVYTEoFu7VYYSUscCb8WhxLTye68UBg1bTAW1qgCprVcp0sLZH+J5+ww3MmZLryYJIQx8G+RFV3JwGPE7V37Et01dNk0QyqYc1U6Lak+Ef9PAh70qmRHnDHBWc+AU3tZhIkMnNrskSSf/J18PwUtE/3BxcEru43EWvlsyfK4eVWdbveiP6QjPWFvbR1x8LXt5Iu7dNlZM8+dM8wG6U7NudhzSV9OkmOokj3TGEucsaUdnsj+gP6nGXM9eGa7zOMiLeJEJX6K8wIFWAZ0W9OhUJeiOI+QiwjWtKhQhSz9sYVPCO6jTE1rAVr05/BM6JjlVKTKGE9Hu7BMqJ96FSXmIfWr8AyInwIId2EC+uBPgfPiPShj1nGev5R4Bl9+cyoUK2fhlh3iw4YRoQPWaFc3zWy5mKKBUYu5gkp1mTUUwvzcSkfejLq2fu3Cv3u5oxWHQZhMCwqClUplV5Uxt7/NQ/oGJk9QqCV/PS7WnexhRo1Jn+EGzI4p4ab9nALI9zWAbe5woUfcAEaXAgLF+TjHYPgDopwR2m4ZANeOgYuYQWX0oNLeuKlheES53ilBbjiC155Cq6AB1fivKMIHIdF4GeUyeGEBHhSCzgxCp5c54qgKQwFTc+SfN0visuKh3XlOIqzILLBregPZUMQVr414T1Repr49lCLLopzw1Vx7qY7NmH5ctEd5WzzdYE3f55aXXnZdbWv9pnMNQEJvGv2+PqDzSKnKPwmgXhLk0ChL8V2YybRRnFUG9aPC9QHEgEJNJowDJrfisMfMoFmJYZTz2vn8nlPzqU9e+60n9rw5hfzZfG8hXFmS2BwhuACa+uY2DSZTUdmbK4T20qDOREY4ce0xlvvzAnnhwHafBbTWKJS8fswCmHn44knE//2SorceU0gfi3CToaIDOGupEj1/yOZHvWLpKRoPqMIzacUk+cbBDdkcE4NN+3hFsbR1iHEeHOVYRx+iJJNh/gdSb8hLMI9LD9BPsANSfQYhGHOf/wB12pMVIkX6gIAAAAASUVORK5CYII=",
            del: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAMAAADQmBKKAAAAdVBMVEX///8jq/8hq/8orv8krP9lyv8nrv/J6v9Eu/82tf8iq/8hrP8jrf8qr/8wrv8lrv9Cvf8irP8hrP/J6v8qr/8ts/8irP/U8/8irP8krf8krP8jrP/K6v/L7f/K7P/R7v/O7P8hq//K6/+Y2P9Ku/+65P9yyv8mVjYSAAAAIXRSTlMDfbc/dwhNhA4c8uOgNCReE6/MeUIo2RDChmtlV27ULEQWexQXAAADBElEQVR42u2c63KqMBCA1yahQe43rVbbEy99/0c8nYTDKJFaSA7Z2nz/kBn9JrthF2YRfjc8TQhJUg5ISElLCihISEcCCJDrg2iNOLnCfR6lhOBaIpVBDWMNkiwiEgbAiARG8vhC6EKGLqnRbXt0F0Z8pQNfccXXfvxG+KZciiuW5YaDdda7qtqt4S51JG4Q1dZ9qudPqrtGtRjAttHuWbK7F69IDBBZjlqlhCr4mo0YZONEqBSDlE5CpvbX8XDFUe01J0ktJIceQgIS29sej5DCC/1YoTwrVkthyHJVZDnYgNFOxliKMjAmLIVFytDYJxJWiQyNWCksU5pFjQrrUKP91ebzS2Ae++ClzWyTvZaZNxN6u5LBdAq1PmAJtUYFTGclvyEASwTy61YwHZVCIVgiNO6VhMR29XskIXQhQ5fU6LY9ugsjutKBrrjiaz/QNWj4Wlh8Tb68DRJWyHLXNah/8+i8KHohL+SFvJAXcikUREJEAbToZ2YXimR3Ay36mVmF9I/0M17IC3khL+SFvJAX8kJeyAt5IS/khbyQF/JCXuixhdA9sEL3SA/dQ8+fKLTGJvSOTWhvIMQIjYsipoRZFHqbLkTip5aYWBPaHyYLvT5d8GpJ6M9BExrvo4ysTFrtL3zO4yaryFMPYjpptX7fv+lvMqy+m89xXyhmtyetToeJnEZNVpHWos7zunUjA5NWH9N8PsZNVlHlw+ETrozo0KTV6Xgea3M+nkZOVimHWh3Uyk63nnGyqpAOrX4uD4r/MGlVMqtCEEbmk1VGIdONSuPJKtOk1iet7E9W8STbUrrNEj5i22svnFh7wYQHi46A37kwzkBDFxfQ5ovSMQvJokcyWFxnoVloNJ2RAx9OdSHKBxq0OQj+JXPIWNgdDLSwM8DbNUnVYUrVMQc3dBmdQkva5bUjMhWifggzcMVW/n4IHaH8YAuuUDnDoIOpnILv8vBC6EKGLqnRbXt0F8ah0mGI/eJqhv32wyV6g+b8H260FtY5V00+jn+46W6DcOjc4i+czOX30wZifQAAAABJRU5ErkJggg=="
        }
    },
    ready: function() {
        this.setData({
            "state.loading": !1
        });
    },
    methods: {
        inCancel: function() {
            this.data.isloading || this.triggerEvent("incancel");
        },
        inSuccess: function() {
            this.data.isloading || this.triggerEvent("insuccess");
        }
    }
});
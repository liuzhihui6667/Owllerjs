function Popup(el = '', option = {}) {
    if('object' === typeof el) {
        option = el
        this.$pel = document.getElementsByTagName('body')[0]
    } else {
        this.$pel = el === '' ? document.getElementsByTagName('body')[0] : document.getElementById(el)
    }
    this.$title = option.hasOwnProperty('title') ? option.title : '弹窗哟'
    this.$text = option.hasOwnProperty('text') ? option.text : '俺乃花果山水帘洞齐天大圣美猴王孙悟空！'
    this._option = option
    this.init()
}

Popup.prototype = {

    $title: '',
    $mousedown: false,
    $hashKey: '',
    $el: null,
    init: function () {
        if(window.hasOwnProperty('owl')) {
            window.owl.popup = {
                zIndex: 2000
            }
        } else {
            window.owl = {
                popup: {
                    zIndex: 2000
                }
            }
        }
        this.$hashKey = this._hash_id_generator()
    },

    template: function() {
        let animation = 'owl-pop-' + this._get_animation()
        return '<div class="owl-pop-container ' +animation+ '" id="' +this.$hashKey+ '">\n' +
            '    <div class="owl-pop-title-wrapper">\n' +
            '        <span class="owl-pop-title">'+this.$title+'</span>\n' +
            '        <svg width="15px" height="15px" viewBox="0 0 15 15" class="owl-pop-close">\n' +
            '            <path d="M0,0 L15,15 M0,15 L15, 0" stroke="#666666" stroke-width="2px" stroke-opacity="0.7"></path>\n' +
            '        </svg>\n' +
            '    </div>\n' +
            '    <div class="owl-pop-body-wrapper">\n' +
            '        <p class="owl-pop-text">'+ this.$text +'</p>\n' +
            '        <div class="owl-pop-button confirm">确定</div>\n' +
            '        <div class="owl-pop-button cancel">取消</div>\n' +
            '    </div>\n' +
            '</div>'
    },

    _set_event: function() {
        let that = this
        let mousedown = false
        let ox, oy, cx, cy, pw, ph, ew, eh
        that.$el.addEventListener('mousedown', function (e) {
            that.stick(that.$el)
        })
        let move = function(e) {
            if(!mousedown) {
                return false
            }
            cx = e.clientX
            cy = e.clientY

            if(cx-ox <= 0) {
                that.$el.style.left = '0px'
            } else if(cx - ox + ew >= pw) {
                that.$el.style.left = (pw - ew) + 'px'
            } else {
                that.$el.style.left = (cx - ox) + 'px'
            }

            if(cy-oy <= 0) {
                that.$el.style.top = '0px'
            } else if(cy - oy + eh >= ph) {
                that.$el.style.top = (ph - eh) + 'px'
            } else {
                that.$el.style.top = (cy - oy) + 'px'
            }
            e.preventDefault()
        }
        that.$el.getElementsByClassName('owl-pop-title-wrapper')[0].addEventListener('mousedown', function (e) {
            ox = e.offsetX + 1
            oy = e.offsetY + 1
            pw = document.documentElement.clientWidth
            ph = document.documentElement.clientHeight
            ew = that.$el.clientWidth
            eh = that.$el.clientHeight
            mousedown = true

            document.addEventListener('mousemove', move, false)
            document.addEventListener('mouseup', function () {
                mousedown = false
            })
        })
        that.$el.getElementsByClassName('owl-pop-close')[0].addEventListener('click', function (e) {
            that._destroy()
        })
        that.$el.getElementsByClassName('owl-pop-close')[0].addEventListener('mousedown', function (e) {
            e.stopPropagation()
        })
        that.$el.getElementsByClassName('confirm')[0].addEventListener('click', function (e) {
            if(that._option.hasOwnProperty('confirm')) {
                that._option.confirm()
            }
            that._destroy()
        })

        that.$el.getElementsByClassName('cancel')[0].addEventListener('click', function (e) {
            if(that._option.hasOwnProperty('cancel')) {
                that._option.cancel()
            }
            that._destroy()
        })
    },

    _hash_id_generator: function() {
        let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm']
        let _id = 'owl-popup-'
        for (let i = 0; i < 6; i++) {
            _id += arr[parseInt(Math.random()*100%36)]
        }
        return _id
    },
    
    render: function () {
        if(this.$has_instance) {
            return
        }
        this.$has_instance = true
        let container = this.$pel
        container.insertAdjacentHTML('beforeend', this.template())
        let mousedown = false
        let ox, oy, cx, cy, pw, ph, ew, eh
        let that = this
        that.$el = document.getElementById(that.$hashKey)
        that._set_event()
    },

    stick: function (el) {
        window.owl.popup.zIndex += 1
        el.style.zIndex = window.owl.popup.zIndex
    },

    show: function() {
        this.$el.style.display = 'block'
    },

    hide: function() {
        this.$el.style.display = 'none'
    },

    _destroy: function () {
        this.$has_instance = false
        this._leave()
        setTimeout(() => {
            if(is_ie()) {
                this.removedNodes(true)
            } else {
                this.$el.remove()
            }
        }, 400)
    },
    _leave: function () {
        if(this._option.hasOwnProperty('animation')) {
            let animation = this._get_animation()
            this.$el.style.animationName = 'popout-' + animation
        } else {
            this.$el.style.animationName = 'popout-scale'
        }
    },
    _get_animation: function (animation = this._option.animation) {
        return animation === undefined ? 'scale' : animation
        switch (animation) {
            case 'rotate':
                return 'rotate'
                break
            default:
                return 'scale'
                break
        }
    }
}

function is_ie() {
    if((/Trident\/7\./).test(navigator.userAgent)){
        return true;
    }else{
        return false;
    }
}

export default Popup
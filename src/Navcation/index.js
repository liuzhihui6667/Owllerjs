import './style/index.less'
import Icon from '../Icon/index'

function Navcation(el, option) {
    if('object' === typeof el) {
        option = el
        this.$pel = document.getElementsByTagName('body')[0]
    } else {
        this.$pel = el === '' ? document.getElementsByTagName('body')[0] : document.getElementById(el)
    }
    this.$nav_list = option.hasOwnProperty('list') ? option.list : {}
    this.$type = option.hasOwnProperty('type') ? option.type : 'h'
    this._option = option
    this.init()
}

Navcation.prototype = {

    $nav_list: {},
    $type: 'h',
    _option: null,
    init: function () {
        this.$hashKey = this._hash_id_generator()
    },

    template: function() {
        let ish = this.$type === 'h'
        let t = ''
        if(ish) {
            t += '<div class="owl-nav-container" id="'+this.$hashKey+'">'
                if(this._option.show_logo) {
                    t += '<div class="owl-nav-h-logo-wrapper"></div>'
                }
                t += '<ul class="owl-nav-wrapper owl-nav-wrapper-h">'
                    for (let f of this.$nav_list) {
                        t += '<li class="owl-nav-item-h "><span class="owl-nav-item-text-wrapper owl-nav-h-item-text-wrapper">'
                            t += this.getSvg(f.icon)
                            t += '<span class="owl-nav-item-text">' + f.text + '</span>'
                        t += '</span></li>'
                    }
                t += '</ul>'
            t += '</div>'
        } else {
            t += '<div class="owl-nav-container" id="'+this.$hashKey+'">'
                if(this._option.show_logo) {
                    t += '<div class="owl-nav-v-logo-wrapper"></div>'
                }
                t += '<ul class="owl-nav-wrapper owl-nav-wrapper-v">'
                    for (let f of this.$nav_list) {
                        t += '<li class="owl-nav-item-v owl-nav-first">'
                            t += '<span class="owl-nav-item-text-wrapper owl-nav-v-item-text-wrapper">'
                                t += this.getSvg(f.icon)
                                t += '<span class="owl-nav-item-text">' + f.text + '</span>'
                            t += '</span>'
                            t += '<ul class="owl-nav-wrapper owl-nav-wrapper-v">'
                                for (let s of f.list) {
                                    t += '<li class="owl-nav-item-v">'
                                        t += '<span class="owl-nav-item-text-wrapper owl-nav-v-item-text-wrapper"><span class="owl-nav-item-text">' + s.text + '</span></span>'
                                        t += '<ul class="owl-nav-wrapper owl-nav-wrapper-v">'
                                        for (let r of s.list) {
                                            t += '<li class="owl-nav-item-v">'
                                            t += '<span class="owl-nav-item-text-wrapper owl-nav-v-item-text-wrapper"><span class="owl-nav-item-text">' + r.text + '</span></span>'

                                            t += '</li>'
                                        }
                                        t += '</ul>'
                                    t += '</li>'
                                }
                            t += '</ul>'
                        t += '</li>'
                    }
                t += '</ul>'
            t += '</div>'
        }
        return t
    },

    getSvg: function(iconName) {
        let icon = new Icon({name: iconName, class_name: 'owl-nav-icon'})
        return icon.template()
    },

    _set_event: function() {
        let hasClass = function(el, className) {
            let class_list = el.classList
            for (let cl of class_list) {
                if(cl === className) {
                    return true
                }
            }
            return false
        }
        let that = this
        let li = this.$pel.getElementsByTagName('li')
        if(this.$type === 'v') {
            for (let el of li) {
                el.addEventListener('click', function (e) {
                    if(this.getElementsByTagName('ul').length > 0) {
                        let pel = this.parentNode
                        let sel = pel.childNodes
                        let selc = 0
                        for (let s of sel) {
                            if(s.nodeType === 1) {
                                selc++
                                s.style.transition = 'all .5s'
                                s.style.height = hasClass(s, 'owl-nav-first') ? '60px' : '50px'
                                if(hasClass(s, 'owl-nav-first')) {
                                    for (let el of s.getElementsByTagName('li')) {
                                        el.style.transition = 'all .5s'
                                        el.style.height = '50px'
                                    }
                                }
                            }
                        }
                        let cel = this.getElementsByTagName('ul')[0]
                        let celc = 0
                        for (let c of cel.childNodes) {
                            if(c.nodeType === 1) {
                                celc++
                            }
                        }
                        this.style.transition = 'all .5s'
                        this.style.height = hasClass(this, 'owl-nav-first') ? (60 + celc*50 + 'px') : (50 + celc*50 + 'px')
                        if(!hasClass(this, 'owl-nav-first')) {
                            this.parentNode.parentNode.style.height = (60 + (selc+celc)*50) + 'px'
                        }
                    }
                    for(let e of that.$pel.getElementsByClassName('owl-nav-item-v-active')) {
                        e.classList.remove('owl-nav-item-v-active')
                    }
                    this.getElementsByTagName('span')[0].classList.add('owl-nav-item-v-active')
                    e.stopPropagation()
                })
            }
        } else {
            for (let el of li) {
                el.addEventListener('click', function (e) {
                    for(let e of that.$pel.getElementsByClassName('owl-nav-item-h-active')) {
                        e.classList.remove('owl-nav-item-h-active')
                    }
                    this.getElementsByTagName('span')[0].classList.add('owl-nav-item-h-active')
                    e.stopPropagation()
                })
            }
        }
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


}


export default Navcation
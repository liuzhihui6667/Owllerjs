import Popup from "../Popup";

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
        
    },

    template: function() {
        let ish = this.$type === 'h'
        console.log(this.$nav_list)
        let t = '<div class="owl-nav-container">\n'
                t += '<ul class="owl-nav-wrapper ' + (ish ? 'owl-nav-wrapper-h' : 'owl-nav-wrapper-v') + '">\n'
                    for (let l of this.$nav_list) {
                        t += '<li class="'+ (ish ? 'owl-nav-item-h' : 'owl-nav-item-v') +' '+ (l.active ? (ish ? 'owl-nav-item-h-active' : 'owl-nav-item-v-active') : '') +'">\n'
                            t += '<span class="owl-nav-item-text">\n'
                                t += this.getSvg()
                                t += '<span style="vertical-align: top;">' + l.text + '</span>\n'
                            t += '</span>\n'
                        t += '</li>'
                    }
                t += '</ul>\n'
            t += '</div>'
        console.log(t)
        return t
        return '<div class="owl-nav-container">\n' +
            '        <ul class="owl-nav-wrapper owl-nav-wrapper-h">\n' +
            '            <li class="owl-nav-item-h">\n' +
            '                <span class="owl-nav-item-text">你好啊</span>\n' +
            '            </li>\n' +
            '            <li class="owl-nav-item-h owl-nav-item-h-active">\n' +
            '                <span class="owl-nav-item-text">\n' +
            '                    <svg class="owl-nav-icon" viewBox="0 0 15 15">\n' +
            '                        <path d="M0,0 L15,15 M0,15 L15, 0" stroke="#ffffff" stroke-width="2px" stroke-opacity="1"></path>\n' +
            '                    </svg>\n' +
            '                    <span style="vertical-align: top;">你好啊</span>\n' +
            '                </span>\n' +
            '            </li>\n' +
            '            <li class="owl-nav-item-h"><span class="owl-nav-item-text">你好你好啊</span></li>\n' +
            '            <li class="owl-nav-item-h"><span class="owl-nav-item-text">你啊</span></li>\n' +
            '            <li class="owl-nav-item-h"><span class="owl-nav-item-text">English</span></li>\n' +
            '        </ul>\n' +
            '    </div>'
    },

    getSvg: function() {
        return '<svg class="owl-nav-icon" viewBox="0 0 15 15">\n' +
            '                        <path d="M0,0 L15,15 M0,15 L15, 0" stroke="#ffffff" stroke-width="2px" stroke-opacity="1"></path>\n' +
            '                    </svg>'
    },

    _set_event: function() {

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
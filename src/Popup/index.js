import './style/index.less'
import less from 'less'
function Popup(el = '', title, text) {
    this.$title = title
    this.$text = text
    this.$pel = el === '' ? document.getElementsByTagName('body')[0] : document.getElementById(el)
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
    },

    template: function() {
        return '<div class="owl-pop-container">\n' +
            '    <div class="owl-pop-title-wrapper">\n' +
            '        <span class="owl-pop-title">弹窗呦</span>\n' +
            '        <svg width="15px" height="15px" viewBox="0 0 15 15" class="owl-pop-close">\n' +
            '            <path d="M0,0 L15,15 M0,15 L15, 0" stroke="#666666" stroke-width="2px" stroke-opacity="0.7"></path>\n' +
            '        </svg>\n' +
            '    </div>\n' +
            '    <div class="owl-pop-body-wrapper">\n' +
            '        <p class="owl-pop-text">俺乃花果山水帘洞齐天大圣美猴王孙悟空！</p>\n' +
            '        <div class="owl-pop-button confirm">确定</div>\n' +
            '        <div class="owl-pop-button cancle">取消</div>\n' +
            '    </div>\n' +
            '</div>'
    },

    event: function() {

    },
    
    render: function () {
        let container = this.$pel
        container.insertAdjacentHTML('beforeend', this.template())
        let mousedown = false
        let ox, oy, cx, cy
        this.$el = container.lastChild
        let that = this
        this.$el.addEventListener('mousedown', function () {
            that.stick(that.$el)
        })
        this.$el.getElementsByClassName('owl-pop-title-wrapper')[0].addEventListener('mousedown', function (e) {
            ox = e.offsetX
            oy = e.offsetY
            mousedown = true
            let move = function(e) {
                if(!mousedown) {
                    return false
                }
                cx = e.clientX
                cy = e.clientY
                that.$el.style.left = (cx - ox) + 'px'
                that.$el.style.top = (cy - oy) + 'px'
                e.preventDefault()
            }
            document.addEventListener('mousemove', move)
            this.addEventListener('mouseup', function () {
                mousedown = false
            })
        })
    },

    stick: function (el) {
        window.owl.popup.zIndex += 1
        el.style.zIndex = window.owl.popup.zIndex
    }
}

export default Popup
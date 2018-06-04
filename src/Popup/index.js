import './style/index.less'
function Popup(el, title, text) {
    this.$title = title
    this.$text = text
    this.$el = el
}

Popup.prototype = {
    init: function () {

    },

    template: function() {
        return '<div class="owl-pop" draggable="true"></div>'
    },

    event: function() {

    },

    pop: function () {
        // document.write(this.template())
        let a = document.getElementById(this.$el)
        a.innerHTML = this.template()
        document.getElementsByClassName('owl-pop')[0].addEventListener('mousedown', function (e) {
            let x = e.offsetX
            let y = e.offsetY
            this.addEventListener('mousemove', function (e) {
                this.style.top = x + 'px'
            })
        })
    },
    
    render: function () {

    }
}

export default Popup
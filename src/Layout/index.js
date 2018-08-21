import './style/index.less'
function Layout(option) {
    this.init(option)
}

Layout.prototype = {
    _option: {},
    init: function (option) {
        this._option = {
            parentLayout: null,
            selfLayout: null,
            direction: null,
            childrenAve: false,
            childrenEl: null
        }
        this._option = Object.assign(this._option, option)
    },

    template: function() {
        let c = this._option.parentLayout === 'h' ? 'owl-layout-h-' : 'owl-layout-v-'
        c += this._option.direction === 'left' ? 'left' : ''
        c += this._option.direction === 'right' ? 'right' : ''
        c += this._option.direction === 'center' ? 'center' : ''
        c += this._option.direction === 'top' ? 'top' : ''
        c += this._option.direction === 'bottom' ? 'bottom' : ''
        let node = document.createElement('div')
        node.innerHTML = this._option.childrenEl
        node.classList.add('owl-layout-container')
        node.classList.add(c)
        if(this._option.selfLayout === 'h') {
            node.classList.add('owl-layout-h')
        }
        return node
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
        
    },


}

function autoRender() {
    let els = document.getElementsByTagName('layout')
    console.log(els)
    for (let el of els) {
        let parentEl = el.parentNode
        let parentLayout = (parentEl.attributes.hasOwnProperty('childrenlayout') && parentEl.attributes.childrenlayout.value === 'h') ? 'h' : 'v'
        if(parentLayout === 'v') {
            for (let c of parentEl.classList) {
                if(c === 'owl-layout-h') {
                    parentLayout = 'h'
                }
            }
        }
        let selfLayout = el.attributes.hasOwnProperty('layout') ? el.attributes.layout.value : 'v'
        let direction = el.attributes.hasOwnProperty('dir') ? el.attributes.dir.value : ''
        let layout = new Layout({
            parentLayout: parentLayout,
            selfLayout: selfLayout,
            direction: direction,
            childrenEl: el.innerHTML
        })
        let temp = layout.template()
        console.log(temp)
        el.parentNode.replaceChild(temp, el)
        autoRender()
    }
}

autoRender()

export default Layout
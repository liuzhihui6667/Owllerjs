import './style/index.less'
import Icon from '../Icon/index'

function Navcation(option) {
    this.init(option)
}

Navcation.prototype = {
    _option: null,
    node: null,
    init: function (option) {
        this._option = {
            dir: 'v',
            logoImg: null,
            itemList: null
        }
        this._option = Object.assign(this._option, option)
    },

    template: function() {
        let node = document.createElement('div')
        node.classList.add('owl-nav-container')
        let ulNode = getItemNode(this._option.itemList, this._option.dir, true)
        node.appendChild(ulNode)
        
        function getItemNode(arr, dir, first = false) {
            let ulNode = document.createElement('ul')
            ulNode.classList.add('owl-nav-wrapper')
            ulNode.classList.add('owl-nav-wrapper-' + dir)
            for (let f of arr) {
                let liNode = document.createElement('li')
                liNode.classList.add('owl-nav-item-' + dir)
                if(dir === 'v' && first) {
                    liNode.classList.add('owl-nav-first')
                }
                let spanNode = document.createElement('span')
                spanNode.classList.add('owl-nav-item-text-wrapper')
                spanNode.classList.add('owl-nav-'+dir+'-item-text-wrapper')
                let icon = new Icon({
                    name: f.icon
                })
                let iconNode = icon.template()
                iconNode.classList.add('owl-nav-icon')
                let cSpanNode = document.createElement('span')
                cSpanNode.classList.add('owl-nav-item-text')
                cSpanNode.innerText = f.text
                spanNode.appendChild(iconNode)
                spanNode.appendChild(cSpanNode)
                liNode.appendChild(spanNode)
                if(dir === 'v' && f.hasOwnProperty('list') && f.list.length > 0) {
                    liNode.appendChild(getItemNode(f.list, dir))
                }
                ulNode.appendChild(liNode)
            }
            return ulNode
        }
        this.node = node
        this._set_event()
        return node
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
        let li = this.node.getElementsByTagName('li')
        if(this._option.dir === 'v') {
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
                    for(let e of that.node.getElementsByClassName('owl-nav-item-v-active')) {
                        e.classList.remove('owl-nav-item-v-active')
                    }
                    this.getElementsByTagName('span')[0].classList.add('owl-nav-item-v-active')
                    e.stopPropagation()
                })
            }
        } else {
            for (let el of li) {
                el.addEventListener('click', function (e) {
                    for(let e of that.node.getElementsByClassName('owl-nav-item-h-active')) {
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
        let _id = 'owl-nav-'
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

function Render() {
    let container = document.getElementsByTagName('owl-nav')
    if(container.length > 0) {
        this.container = container
        this.autoRender()
    }
}

Render.prototype = {
    container: null,
    autoRender: function () {
        let cLength = this.container.length
        for (let i = 0; i < cLength; i++) {
            let node = this.container[0]
            let cnf = this._getNodeCnf(node)
            let newNode = this._createNode(cnf)
            node.parentNode.replaceChild(newNode, node)
        }
    },
    _getNodeCnf: function (node) {
        let dir = node.attributes.hasOwnProperty('dir') && node.attributes.dir.value === 'v' ? 'v' : 'h'
        let item = node.attributes.hasOwnProperty('itemlist') ? window[node.attributes.itemlist.value] : null
        return {
            dir: dir,
            itemList: item
        }
    },
    _createNode: function (cnf) {
        let nav = new Navcation(cnf)
        let temp = nav.template()
        return temp
    }
}

new Render()


export default Navcation
import './style/index.less'
import UIComponent from '../Lib/UIComponent/uicomponent'
import UIRender from '../Lib/Render/render'
import Icon from '../Icon/index'

function Navcation(option) {
    this.init(option)
}

(function () {
    let Super = function () {}
    Super.prototype = UIComponent.prototype
    Navcation.prototype = new Super()
    Navcation.prototype.constructor = Navcation
    Navcation.prototype.init = function (option) {
        this._option = {
            dir: 'v',
            logoImg: null,
            itemList: null
        }
        UIComponent.prototype.init.apply(this, [option])
    }
    Navcation.prototype.template = function() {
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
    }
    Navcation.prototype._set_event = function() {
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
    }
})()

function NavcationRender() {
    this.init()
}

(function () {
    let Super = function () {}
    Super.prototype = UIRender.prototype
    NavcationRender.prototype = new Super()
    NavcationRender.prototype.constructor = NavcationRender
    NavcationRender.prototype.componentName = 'nav'
    NavcationRender.prototype.autoRender = function () {
        let cLength = this.container.length
        for (let i = 0; i < cLength; i++) {
            let node = this.container[0]
            let cnf = this._getNodeCnf(node)
            let newNode = this._createNode(cnf)
            node.parentNode.replaceChild(newNode, node)
        }
    }
    NavcationRender.prototype._getNodeCnf = function (node) {
        let dir = node.attributes.hasOwnProperty('dir') && node.attributes.dir.value === 'v' ? 'v' : 'h'
        let item = node.attributes.hasOwnProperty('itemlist') ? window[node.attributes.itemlist.value] : null
        return {
            dir: dir,
            itemList: item
        }
    }
    NavcationRender.prototype._createNode = function (cnf) {
        let nav = new Navcation(cnf)
        let temp = nav.template()
        return temp
    }
})()

new NavcationRender()


export default Navcation
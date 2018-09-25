import './style/index.less'
import UIComponent from '../../Lib/UIComponent/uicomponent'
import UIRender from '../../Lib/Render/render'
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
            onlyone: false,
            logoImg: null,
            showall: false,
            theme: 'lighter',
            menu: false,
            itemList: null
        }
        UIComponent.prototype.init.apply(this, [option])
    }
    Navcation.prototype.template = function() {
        let hasClass = function(el, className) {
            let class_list = el.classList
            for (let cl of class_list) {
                if(cl === className) {
                    return true
                }
            }
            return false
        }
        let node = document.createElement('div')
        node.classList.add('owl-nav-container')
        node.classList.add('owl-nav-theme-' + this._option.theme)
        let ulNode = this._getItemNode(this._option.itemList, this._option, true)
        node.appendChild(ulNode)

        let itemHeight = 45
        if(this._option.showall || this._option.menu) {
            for(let u of node.getElementsByTagName('ul')) {
                if(hasClass(u, 'owl-nav-wrapper-v-root')) {
                    continue
                }
                let lCount = u.getElementsByTagName('li').length
                u.style.height = lCount * itemHeight + 'px'
            }
            if(node.getElementsByClassName('owl-nav-leaf-active').length > 0) {
                node.getElementsByClassName('owl-nav-leaf-active')[0].getElementsByClassName('owl-nav-item-text-wrapper')[0].classList.add('owl-nav-item-v-active')
            }
            for (let i of node.getElementsByClassName('owl-nav-open-icon')) {
                i.classList.add('owl-nav-open-icon-open')
            }
        } else {
            for(let l of node.getElementsByClassName('owl-nav-leaf-active')) {
                l.getElementsByClassName('owl-nav-item-text-wrapper')[0].classList.add('owl-nav-item-v-active')
                let sCount = l.parentNode.childNodes.length
                l.parentNode.style.height = itemHeight * sCount + 'px'
                let rootUl = l.parentNode.parentNode.parentNode
                //小三角
                l.parentNode.parentNode.getElementsByClassName('owl-nav-open-icon')[0].classList.add('owl-nav-open-icon-open')
                if(rootUl.parentNode.parentNode !== null && hasClass(rootUl.parentNode.parentNode, 'owl-nav-wrapper-v-root')) {
                    rootUl.parentNode.getElementsByClassName('owl-nav-open-icon')[0].classList.add('owl-nav-open-icon-open')
                }
                if(!hasClass(rootUl, 'owl-nav-wrapper-v-root')) {
                    let pNodeHeight = 0
                    for(let u of rootUl.getElementsByTagName('ul')) {
                        pNodeHeight += isNaN(parseInt(u.style.height)) ? 0 : parseInt(u.style.height)
                    }
                    pNodeHeight += rootUl.childNodes.length * itemHeight
                    rootUl.style.height = pNodeHeight + 'px'
                }
            }
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
            let itemHeight = 45
            for (let el of li) {
                el.addEventListener('click', function (e) {
                    //展开
                    if(this.getElementsByTagName('ul').length > 0) {
                        if(!that._option.menu) {
                            let pNode = this.parentNode     //父节点
                            let firstUl = this.getElementsByTagName('ul')[0]
                            let sCount = pNode.childNodes.length    //兄弟节点数量
                            let cCount = firstUl.childNodes.length   //子节点数量
                            let isOpen = parseInt(firstUl.style.height) > 0 ? true : false
                            if(that._option.onlyone) {
                                for (let s of that.node.getElementsByTagName('ul')) {
                                    if(!hasClass(s, 'owl-nav-wrapper-v-root')) {
                                        s.style.height = '0px'
                                    }
                                }
                                let openNodes = that.node.getElementsByClassName('owl-nav-open-icon-open'), openNodesLength = openNodes.length
                                for (let i = 0; i < openNodesLength; i++) {
                                    openNodes[0].classList.remove('owl-nav-open-icon-open')
                                }
                                if(isOpen) {
                                    if(hasClass(this.parentNode.parentNode, 'owl-nav-first')) {
                                        this.parentNode.parentNode.getElementsByClassName('owl-nav-open-icon')[0].classList.add('owl-nav-open-icon-open')
                                    }
                                    for(let l of this.getElementsByClassName('owl-nav-open-icon')) {
                                        l.classList.remove('owl-nav-open-icon-open')
                                    }
                                    if(!hasClass(pNode, 'owl-nav-wrapper-v-root')) {
                                        pNode.style.height = itemHeight * sCount + 'px'
                                    }
                                    firstUl.style.height = '0px'
                                } else {
                                    this.getElementsByClassName('owl-nav-open-icon')[0].classList.add('owl-nav-open-icon-open')
                                    if(hasClass(this.parentNode.parentNode, 'owl-nav-first')) {
                                        this.parentNode.parentNode.getElementsByClassName('owl-nav-open-icon')[0].classList.add('owl-nav-open-icon-open')
                                    }
                                    if(!hasClass(pNode, 'owl-nav-wrapper-v-root')) {
                                        pNode.style.height = itemHeight * (sCount + cCount) + 'px'
                                    }
                                    firstUl.style.height = itemHeight * cCount + 'px'
                                }
                            } else {
                                if(isOpen) {
                                    for(let l of this.getElementsByClassName('owl-nav-open-icon')) {
                                        l.classList.remove('owl-nav-open-icon-open')
                                    }
                                    for(let u of this.getElementsByTagName('ul')) {
                                        u.style.height = '0px'
                                    }
                                } else {
                                    this.getElementsByClassName('owl-nav-open-icon')[0].classList.add('owl-nav-open-icon-open')
                                    firstUl.style.height = itemHeight * cCount + 'px'
                                }
                                if(!hasClass(pNode, 'owl-nav-wrapper-v-root')) {
                                    let pNodeHeight = 0
                                    for(let u of pNode.getElementsByTagName('ul')) {
                                        pNodeHeight += isNaN(parseInt(u.style.height)) ? 0 : parseInt(u.style.height)
                                    }
                                    pNodeHeight += sCount * itemHeight
                                    pNode.style.height = pNodeHeight + 'px'
                                }
                            }
                        }
                    } else {
                        //字体变为active
                        for(let e of that.node.getElementsByClassName('owl-nav-item-v-active')) {
                            e.classList.remove('owl-nav-item-v-active')
                        }
                        this.getElementsByTagName('span')[0].classList.add('owl-nav-item-v-active')
                        //子节点
                        console.log('leaf')
                    }
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
    Navcation.prototype._getItemNode = function (arr, option, first = false) {
        let ulNode = document.createElement('ul')
        ulNode.classList.add('owl-nav-wrapper')
        ulNode.classList.add('owl-nav-wrapper-' + option.dir)
        if(first && option.dir === 'v') {
            ulNode.classList.add('owl-nav-wrapper-v-root')
        }
        for (let f of arr) {
            let liNode = document.createElement('li')
            liNode.classList.add('owl-nav-item-' + option.dir)
            if(option.dir === 'v' && first) {
                liNode.classList.add('owl-nav-first')
            }
            let spanNode = document.createElement('span')
            spanNode.classList.add('owl-nav-item-text-wrapper')
            spanNode.classList.add('owl-nav-'+option.dir+'-item-text-wrapper')
            let cSpanNode = document.createElement('span')
            cSpanNode.classList.add('owl-nav-item-text')
            cSpanNode.innerText = f.text
            if(f.hasOwnProperty('icon') && f.icon !== '') {
                let icon = new Icon({
                    name: f.icon,
                    height: '16px',
                    width: '16px'
                })
                var iconNode = icon.template()
                iconNode.classList.add('owl-nav-icon')
                spanNode.appendChild(iconNode)
            }
            spanNode.appendChild(cSpanNode)
            liNode.appendChild(spanNode)
            if(f.hasOwnProperty('to') && f.to !== '') {
                liNode.addEventListener('click', function () {
                    window.location.href = f.to
                })
            }
            if(option.dir === 'v' && f.hasOwnProperty('list') && f.list.length > 0) {
                // todo 优化这儿
                if(!option.menu) {
                    let openIcon = new Icon({
                        name: 'bottom'
                    })
                    let openIconNode = openIcon.template()
                    openIconNode.classList.add('owl-nav-open-icon')
                    spanNode.appendChild(openIconNode)
                } else {
                    if(first) {
                        spanNode.style.fontSize = '15px'
                        spanNode.style.paddingLeft = '20px'
                    } else {
                        spanNode.style.paddingLeft = '30px'
                    }
                    spanNode.style.cursor = 'initial'
                    let fColor = ''
                    if(option.theme === 'light') {
                        fColor = '#fff'
                    } else {
                        fColor = '#999'
                    }
                    spanNode.style.color = fColor
                    if(typeof iconNode === 'object') {
                        iconNode.getElementsByTagName('path')[0].style.fill = fColor
                        iconNode.getElementsByTagName('path')[0].style.stroke = fColor
                    }
                }
                liNode.appendChild(this._getItemNode(f.list, option))
            }
            if(!f.hasOwnProperty('list') && f.active || window.location.pathname === f.to) {
                liNode.classList.add('owl-nav-leaf-active')
            }
            ulNode.appendChild(liNode)
        }
        return ulNode
    }
})()

export default Navcation
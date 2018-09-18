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
        let ulNode = getItemNode(this._option.itemList, this._option.dir, true)
        node.appendChild(ulNode)

        function getItemNode(arr, dir, first = false) {
            let ulNode = document.createElement('ul')
            ulNode.classList.add('owl-nav-wrapper')
            ulNode.classList.add('owl-nav-wrapper-' + dir)
            if(first && dir === 'v') {
                ulNode.classList.add('owl-nav-wrapper-v-root')
            }
            for (let f of arr) {
                let liNode = document.createElement('li')
                liNode.classList.add('owl-nav-item-' + dir)
                if(dir === 'v' && first) {
                    liNode.classList.add('owl-nav-first')
                }
                let spanNode = document.createElement('span')
                spanNode.classList.add('owl-nav-item-text-wrapper')
                spanNode.classList.add('owl-nav-'+dir+'-item-text-wrapper')
                let cSpanNode = document.createElement('span')
                cSpanNode.classList.add('owl-nav-item-text')
                cSpanNode.innerText = f.text
                if(f.hasOwnProperty('icon') && f.icon !== '') {
                    let icon = new Icon({
                        name: f.icon
                    })
                    let iconNode = icon.template()
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
                if(dir === 'v' && f.hasOwnProperty('list') && f.list.length > 0) {
                    liNode.appendChild(getItemNode(f.list, dir))
                }
                if(!f.hasOwnProperty('list') && f.active || window.location.pathname === f.to) {
                    liNode.classList.add('owl-nav-leaf-active')
                }
                ulNode.appendChild(liNode)
            }
            return ulNode
        }
        let itemHeight = 45
        if(this._option.showall) {
            for(let u of node.getElementsByTagName('ul')) {
                if(hasClass(u, 'owl-nav-wrapper-v-root')) {
                    continue
                }
                let lCount = u.getElementsByTagName('li').length
                u.style.height = lCount * itemHeight + 'px'
            }
            node.getElementsByClassName('owl-nav-leaf-active')[0].getElementsByClassName('owl-nav-item-text-wrapper')[0].classList.add('owl-nav-item-v-active')
        } else {
            for(let l of node.getElementsByClassName('owl-nav-leaf-active')) {
                l.getElementsByClassName('owl-nav-item-text-wrapper')[0].classList.add('owl-nav-item-v-active')
                let sCount = l.parentNode.childNodes.length
                l.parentNode.style.height = itemHeight * sCount + 'px'
                let rootUl = l.parentNode.parentNode.parentNode
                let pNodeHeight = 0
                for(let u of rootUl.getElementsByTagName('ul')) {
                    pNodeHeight += isNaN(parseInt(u.style.height)) ? 0 : parseInt(u.style.height)
                }
                pNodeHeight += rootUl.childNodes.length * itemHeight
                rootUl.style.height = pNodeHeight + 'px'
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
                        let pNode = this.parentNode     //父节点
                        let firstUl = this.getElementsByTagName('ul')[0]
                        let sCount = pNode.childNodes.length    //兄弟节点数量
                        let cCount = firstUl.childNodes.length   //子节点数量
                        let isOpen = parseInt(firstUl.style.height) > 0 ? true : false
                        if(that._option.onlyone) {
                            for (let s of that.node.getElementsByTagName('ul')) {
                                s.style.height = '0px'
                            }
                            if(isOpen) {
                                console.log(hasClass(pNode, 'owl-nav-wrapper-v-root'))
                                if(!hasClass(pNode, 'owl-nav-wrapper-v-root')) {
                                    pNode.style.height = itemHeight * sCount + 'px'
                                }
                                firstUl.style.height = '0px'
                            } else {
                                if(!hasClass(pNode, 'owl-nav-wrapper-v-root')) {
                                    pNode.style.height = itemHeight * (sCount + cCount) + 'px'
                                }
                                firstUl.style.height = itemHeight * cCount + 'px'
                            }
                        } else {
                            if(isOpen) {
                                for(let u of this.getElementsByTagName('ul')) {
                                    u.style.height = '0px'
                                }
                            } else {
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
                    } else {
                        //子节点
                        console.log('leaf')
                    }
                    //字体变为active
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

export default Navcation
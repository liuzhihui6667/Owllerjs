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
            if(first && dir === 'v') {
                ulNode.classList.add('owl-nav-wrapper-v-active')
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
                        this.getElementsByTagName('ul')[0].style.transition = 'all 2s ease'
                        this.getElementsByTagName('ul')[0].classList.add('owl-nav-wrapper-v-active')
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

export default Navcation
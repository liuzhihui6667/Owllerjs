import './style/index.less'
import UIComponent from '../../Lib/UIComponent/uicomponent'
import UIRender from '../../Lib/Render/render'
function Layout(option) {
    // UIComponent.call(this)
    this.init(option)
}

(function () {
    let Super = function () {}
    Super.prototype = UIComponent.prototype
    Layout.prototype = new Super()
    Layout.prototype.constructor = Layout
    Layout.prototype.init = function (option) {
        this._option = {
            selfLayout: null,
            childrenLayout: null,
            width: null,
            height: null,
            childrenAve: false,
            childrenEl: null,
            attr: null
        }
        UIComponent.prototype.init.apply(this, [option])
    }
    Layout.prototype.template = function() {
        let node = document.createElement('div')
        node.classList.add('owl-layout-container')
        if(this._option.childrenLayout === 'h') {
            node.classList.add('owl-layout-h')
        }
        node.innerHTML = this._option.childrenEl
        for (let i = 0; i < this._option.attr.length; i++) {
            if(this._option.attr[i].name === 'layout' || this._option.attr[i].name === 'childrenlayout') {
                continue
            }
            if(this._option.attr[i].name === 'width' || this._option.attr[i].name === 'height') {
                continue
            }
            if(this._option.attr[i].name === 'class') {
                let class_list = this._option.attr[i].value.split(' ')
                for (let i = 0; i < class_list.length; i++) {
                    node.classList.add(class_list[i])
                }
                continue
            }
            node.setAttribute(this._option.attr[i].name, this._option.attr[i].value)
        }
        if(this._option.selfLayout === 'h') {
            node.style.width = this._option.width
        } else {
            node.style.height = this._option.height
        }
        return node
    }
})()

export default Layout

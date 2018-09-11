import './style/index.less'
import UIComponent from '../Lib/UIComponent/uicomponent'
import UIRender from '../Lib/Render/render'
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
            if(this._option.selfLayout === 'h') {
                node.style.width = this._option.width
            } else {
                node.style.height = this._option.height
            }
        }
        return node
    }
})()

function LayoutRender() {
    // UIRender.call(this)
    this.init()
}

(function () {
    let Super = function () {}
    Super.prototype = UIRender.prototype
    LayoutRender.prototype = new Super()
    LayoutRender.prototype.constructor = LayoutRender
    LayoutRender.prototype.componentName = 'layout'
    LayoutRender.prototype.autoRender = function () {
        let rootContainer = this.container[0].parentNode
        let targetContainer = rootContainer.cloneNode(true)
        this._traversalNodes(rootContainer, targetContainer)
        rootContainer.replaceChild(targetContainer.getElementsByClassName('owl-layout-container')[0], rootContainer.getElementsByTagName('owl-layout')[0])
    }
    LayoutRender.prototype._traversalNodes = function (node, targetNode) {
        if(node && node.nodeName === "OWL-LAYOUT"){
            let cnf = this._getNodeCnf(node)
            let createdNode = this._createNode(cnf)
            targetNode.parentNode.replaceChild(createdNode, targetNode)
            targetNode = createdNode
        }
        let childLength = node.childNodes.length
        let oldChildNodes = node.childNodes, oldChildNode;
        let targetChildNodes = targetNode.childNodes, targetChildNode;
        for(let i = 0; i < childLength ; i++){
            oldChildNode = oldChildNodes[i]
            targetChildNode = targetChildNodes[i]
            if(oldChildNode.nodeName === "OWL-LAYOUT"){
                this._traversalNodes(oldChildNode, targetChildNode);
            }
        }
    }
    LayoutRender.prototype._getNodeCnf = function (node) {
        let parentNode = node.parentNode
        let selfLayout = parentNode.attributes.hasOwnProperty('childrenlayout') && parentNode.attributes.childrenlayout.value === 'h' ? 'h' : 'v'
        let childrenLayout = node.attributes.hasOwnProperty('childrenlayout') ? node.attributes["childrenlayout"].value : 'v'
        let width, height
        if (selfLayout === 'h') {
            if(node.attributes.hasOwnProperty('width')) {
                width = node.attributes.width.value
            } else if(node.attributes.hasOwnProperty('flex')) {
                for (let i = 0; i < parentNode.childNodes.length; i++) {

                }
            } else {
                width = 'calc((100%'
                let j = 0
                for (let i = 0; i < parentNode.childNodes.length; i++) {
                    if(parentNode.childNodes[i].nodeName === "OWL-LAYOUT") {
                        j++
                    }
                    if(parentNode.childNodes[i].nodeName === "OWL-LAYOUT" && parentNode.childNodes[i].attributes.hasOwnProperty('width')) {
                        width += ' - ' + parentNode.childNodes[i].attributes.width.value
                        j--
                    }
                }
                width += ')'
                if(j !== 0) {
                    width += ' / ' + j
                }
                width += ')'
            }
        } else {
            if(node.attributes.hasOwnProperty('height')) {
                height = node.attributes.height.value
            } else if(node.attributes.hasOwnProperty('flex')) {
                for (let i = 0; i < parentNode.childNodes.length; i++) {

                }
            } else {
                height = 'calc((100%'
                let j = 0
                for (let i = 0; i < parentNode.childNodes.length; i++) {
                    if(parentNode.childNodes[i].nodeName === "OWL-LAYOUT") {
                        j++
                    }
                    if(parentNode.childNodes[i].nodeName === "OWL-LAYOUT" && parentNode.childNodes[i].attributes.hasOwnProperty('height')) {
                        height += ' - ' + parentNode.childNodes[i].attributes.height.value
                        j--
                    }
                }
                height += ')'
                if(j !== 0) {
                    height += ' / ' + j
                }
                height += ')'
            }

        }
        return {
            selfLayout: selfLayout,
            childrenLayout: childrenLayout,
            width: width === 'calc(100%)' ? '100%' : width,
            height: height === 'calc(100%)' ? '100%' : height,
            childrenEl: node.innerHTML,
            attr: node.attributes
        }
    }
    LayoutRender.prototype._createNode = function (nodeConfig) {
        let layout = new Layout(nodeConfig)
        let temp = layout.template()
        return temp
    }
})()

new LayoutRender()
export default Layout
import UIRender from '../../Lib/Render/render'
import Icon from '../../Components/Icon/'
function IconRender() {
    this.init()
}

(function () {
    let Super = function () {}
    Super.prototype = UIRender.prototype
    IconRender.prototype = new Super()
    IconRender.prototype.constructor = IconRender
    IconRender.prototype.componentName = 'icon'
    IconRender.prototype.autoRender = function () {
        let cLength = this.container.length
        for (let i = 0; i < cLength; i++) {
            let node = this.container[0]
            let cnf = this._getNodeCnf(node)
            let newNode = this._createNode(cnf)
            node.parentNode.replaceChild(newNode, node)
        }
    }
    IconRender.prototype._getNodeCnf = function (node) {
        let name = node.attributes.hasOwnProperty('name') ? node.attributes.name.value : ''
        let color = node.attributes.hasOwnProperty('color') ? node.attributes.color.value : ''
        return {
            name: name,
            fillColor: color,
            attr: node.attributes
        }
    }

    IconRender.prototype._createNode = function (cnf) {
        let nav = new Icon(cnf)
        let temp = nav.template()
        return temp
    }
})()

new IconRender()

export default IconRender
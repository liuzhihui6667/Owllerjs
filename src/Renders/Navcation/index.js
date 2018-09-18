import UIRender from '../../Lib/Render/render'
import Navcation from '../../Components/Navcation/index'
import Icon from '../../Components/Icon/index'

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
        let onlyone = node.attributes.hasOwnProperty('onlyone') ? true : false
        let showall = node.attributes.hasOwnProperty('showall') ? true : false
        let item = node.attributes.hasOwnProperty('itemlist') ? window.Owller.data.Nav[node.attributes.itemlist.value] : null
        return {
            dir: dir,
            onlyone: onlyone,
            showall: showall,
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


export default NavcationRender
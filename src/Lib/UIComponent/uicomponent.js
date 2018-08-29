import ComponentInterface from '../Interface/Component/component'

function UIComponent() {
    ComponentInterface.call(this)
}

(function () {
    let Super = function () {}
    Super.prototype = ComponentInterface.prototype
    UIComponent.prototype = new Super()
    UIComponent.prototype.constructor = UIComponent
    UIComponent.prototype._option = {}
    UIComponent.prototype.init = function(option) {
        this._option = Object.assign(this._option, option)
    }
    UIComponent.prototype._hash_id_generator = function () {
        let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm']
        let _id = 'owl-popup-'
        for (let i = 0; i < 6; i++) {
            _id += arr[parseInt(Math.random()*100%36)]
        }
        return _id
    }
})()

export default UIComponent


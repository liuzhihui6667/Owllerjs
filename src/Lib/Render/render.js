import RenderInterface from '../Interface/Component/render'

function UIRender() {
    RenderInterface.call(this)
}

(function () {
    let Super = function () {}
    Super.prototype = RenderInterface.prototype
    UIRender.prototype = new Super()
    UIRender.prototype.constructor = UIRender
    UIRender.prototype.componentName = null
    UIRender.prototype.container = null
    UIRender.prototype.init = function () {
        let container = document.getElementsByTagName(this.componentPrefix + this.componentName)
        if(container.length > 0) {
            this.container = container
            let that = this
            if(document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function () {
                    that.autoRender()
                })
            } else {
                that.autoRender()
            }

        }
    }
})()

export default UIRender


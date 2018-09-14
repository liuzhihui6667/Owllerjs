import LayoutRender from './Layout/index'
import IconRender from './Icon/index'
import NavcationRender from './Navcation/index'

function Renders() {
    
}

Renders.prototype = {
    renders: [
        LayoutRender,
        IconRender,
        NavcationRender
    ],
    autoRender: function () {
        for (let r of this.renders) {
            let ro = new r()
            ro.init()
        }
    }
}

export default Renders
import Components from './Components/components.js' 
import Renders from './Renders/renders.js'

function OwllerUI() {

}

OwllerUI.prototype = {
    components: new Components(),
    renders: new Renders()
}


window.OwllerUI = OwllerUI
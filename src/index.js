import Components from './Components/components.js' 
import Renders from './Renders/renders.js'

function OwllerUI(option = {}) {
    this.data = option.hasOwnProperty('data') ? option.data : {}
    window.Owller = this
}

OwllerUI.prototype = {
    components: new Components(),
    renders: new Renders()
}


window.OwllerUI = OwllerUI
import Components from './Components/components.js'
import Renders from './Renders/renders.js'

// function OwllerUI(option = {}) {
//     this.data = option.hasOwnProperty('data') ? option.data : {}
//     window.Owller = this
// }
//
// OwllerUI.prototype = {
//     components: new Components(),
//     renders: new Renders()
// }

interface Option {
    data: OwllerUIData
}

interface OwllerUIData {
    Nav: OwllerUIDataNav
}

interface OwllerUIDataNav {
    item: OwllerUIDataListItem
}

interface OwllerUIDataListItem {
    text: string;
    to: string;
    icon: string;
    active: boolean;
    list: OwllerUIDataListItem;
}

class OwllerUI {
    data: OwllerUIData;
    constructor(option: Option) {
        this.data = option["data"]
        window["OwllerUI"] = this
    }
}


window["OwllerUI"] = OwllerUI
import {NavigationComponent} from './TSLibs/Components/Navigation/Navigation'
import {ButtonComponent} from "./TSLibs/Components/Button/Button";

let u = new NavigationComponent('v', [
    {
        text: '一级菜单',
        active: false,
        icon: 'layout',
        list: [
            {
                text: '二级菜单'
            },{
                text: '二级菜单'
            },{
                text: '二级菜单',
                active: true
            }
        ]
    },
    {
        text: '一级菜单',
        active: false,
        icon: 'store',
        list: [
            {
                text: '二级菜单',
                list: [
                    {
                        text: '三级菜单'
                    },{
                        text: '三级菜单'
                    }
                ]
            },{
                text: '二级菜单',
                list: [
                    {
                        text: '三级菜单'
                    },{
                        text: '三级菜单'
                    }
                ]
            }
        ]
    }
], false, true, false, 'dark')

// document.getElementsByClassName('container')[0].appendChild(u._getTemplate())


let bs = new ButtonComponent('按钮', 'disabled', 'small', 'store')
// b._getTemplate()
document.getElementsByClassName('container')[0].appendChild(bs.node)
document.getElementsByClassName('container')[0].appendChild(document.createElement('img'))
let bd = new ButtonComponent('按钮', 'disabled', 'default', 'store')
// b._getTemplate()
document.getElementsByClassName('container')[0].appendChild(bd.node)
document.getElementsByClassName('container')[0].appendChild(document.createElement('img'))

let bl = new ButtonComponent('按钮', 'disabled', 'large', 'store')
// b._getTemplate()
document.getElementsByClassName('container')[0].appendChild(bl.node)

document.getElementsByClassName('container')[0].appendChild(document.createElement('br'))
document.getElementsByClassName('container')[0].appendChild(document.createElement('br'))

let cs = new ButtonComponent('按钮', 'dark', 'small', 'coins')

document.getElementsByClassName('container')[0].appendChild(cs._getTemplate())
document.getElementsByClassName('container')[0].appendChild(document.createElement('img'))

let cd = new ButtonComponent('按钮', 'dark', '', 'coins')

document.getElementsByClassName('container')[0].appendChild(cd._getTemplate())
document.getElementsByClassName('container')[0].appendChild(document.createElement('img'))

let cl = new ButtonComponent('按钮', 'success', 'large', '')

document.getElementsByClassName('container')[0].appendChild(cl._getTemplate())
document.getElementsByClassName('container')[0].appendChild(document.createElement('br'))
document.getElementsByClassName('container')[0].appendChild(document.createElement('br'))

let ds = new ButtonComponent('按钮', 'error', 'small', 'coins', true)

document.getElementsByClassName('container')[0].appendChild(ds._getTemplate())
document.getElementsByClassName('container')[0].appendChild(document.createElement('img'))

let dd = new ButtonComponent('按钮', '', '', 'coins', true)

document.getElementsByClassName('container')[0].appendChild(dd._getTemplate())
document.getElementsByClassName('container')[0].appendChild(document.createElement('img'))

let dl = new ButtonComponent('按钮', 'lighter', 'large', 'coins', true)

document.getElementsByClassName('container')[0].appendChild(dl._getTemplate())
document.getElementsByClassName('container')[0].appendChild(document.createElement('br'))
document.getElementsByClassName('container')[0].appendChild(document.createElement('br'))


// import Components from './Components/components.js'
// import Renders from './Renders/renders.js'
//
// // function OwllerUI(option = {}) {
// //     this.data = option.hasOwnProperty('data') ? option.data : {}
// //     window.Owller = this
// // }
// //
// // OwllerUI.prototype = {
// //     components: new Components(),
// //     renders: new Renders()
// // }
//
// interface Option {
//     data: OwllerUIData
// }
//
// interface OwllerUIData {
//     Nav: OwllerUIDataNav
// }
//
// interface OwllerUIDataNav {
//     item: OwllerUIDataListItem
// }
//
// interface OwllerUIDataListItem {
//     text: string;
//     to: string;
//     icon: string;
//     active: boolean;
//     list: OwllerUIDataListItem;
// }
//
// class OwllerUI {
//     data: OwllerUIData;
//     constructor(option: Option) {
//         this.data = option["data"]
//         window["OwllerUI"] = this
//     }
// }
//
//
// window["OwllerUI"] = OwllerUI
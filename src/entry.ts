import {NavigationComponent} from './TSLibs/Components/Navigation/Navigation'

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
], true, true, false, 'dark')

document.getElementsByClassName('container')[0].appendChild(u._getTemplate())



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
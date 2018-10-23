import {NavigationComponent} from './TSLibs/Components/Navigation/Navigation'
import {ButtonComponent} from "./TSLibs/Components/Button/Button";
import {PopupComponent} from "./TSLibs/Components/Popup/Popup";
import {PaginationComponent} from "./TSLibs/Components/Pagination/Pagination";
import {RollerComponent} from "./TSLibs/Components/Roller/Roller";

let p = new PopupComponent('Popup', '', '你好啊你好啊啊你好好啊你好啊', 'sdasd', 'light', 'fade')

document.getElementsByTagName('body')[0].appendChild(p.node)
//
// let p2 = new PopupComponent('Popup', '', '你好啊你好啊啊你好好啊你好啊', 'sdasd', 'lighter')
//
// document.getElementsByClassName('container')[0].appendChild(p2.node)
//
// let p3 = new PopupComponent('Popup', '', '你好啊你好啊啊你好好啊你好啊', 'sdasd', 'dark', 'fade')
//
// document.getElementsByClassName('container')[0].appendChild(p3.node)

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
], false, false, false, 'lighter')

document.getElementsByClassName('container')[0].appendChild(u._getTemplate())


let bs = new ButtonComponent('按钮', '', '', 'store')
// b._getTemplate()
document.getElementsByClassName('btn-container')[0].appendChild(bs.node)
let bd = new ButtonComponent('SUCCESS', 'success', 'default', '')
// b._getTemplate()
document.getElementsByClassName('btn-container')[0].appendChild(bd.node)

let bl = new ButtonComponent('FAIL', 'error', '', '')
// b._getTemplate()
document.getElementsByClassName('btn-container')[0].appendChild(bl.node)

let bdis = new ButtonComponent('DISABLED', 'disabled', '', '')
// b._getTemplate()
document.getElementsByClassName('btn-container')[0].appendChild(bdis.node)

let a = (pageNum: number): void => {

}
let pal = new PaginationComponent(120, 10, 2, 'lighter', a)

document.getElementsByClassName('page-container')[0].appendChild(pal._getTemplate())
document.getElementsByClassName('page-container')[0].appendChild(document.createElement('br'))

let pali = new PaginationComponent(120, 10, 5, 'light', a)

document.getElementsByClassName('page-container')[0].appendChild(pali._getTemplate())
document.getElementsByClassName('page-container')[0].appendChild(document.createElement('br'))

let pad = new PaginationComponent(120, 10, 6, 'dark', a)

document.getElementsByClassName('page-container')[0].appendChild(pad._getTemplate())

let rl1 = document.createElement('div')
rl1.style.backgroundColor = 'red'
let rl2 = document.createElement('div')
rl2.style.backgroundColor = 'orange'
let rl3 = document.createElement('div')
rl3.style.backgroundColor = 'green'
let rl4 = document.createElement('div')
rl4.style.backgroundColor = 'blue'

let rl = [
    rl1,
    rl2,
    rl3,
    rl4
]

let r = new RollerComponent(1, rl)

document.getElementsByClassName('roller-container')[0].appendChild(r._getTemplate())

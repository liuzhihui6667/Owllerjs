import {NavigationComponent} from './TSLibs/Components/Navigation/Navigation'
import {ButtonComponent} from "./TSLibs/Components/Button/Button";
import {PopupComponent} from "./TSLibs/Components/Popup/Popup";
import {PaginationComponent} from "./TSLibs/Components/Pagination/Pagination";

// let p = new PopupComponent('Popup', '', '你好啊你好啊啊你好好啊你好啊', 'sdasd', 'light')
//
// document.getElementsByClassName('container')[0].appendChild(p.node)
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

let dl = new ButtonComponent('Button', 'lighter', 'large', '', true)

document.getElementsByClassName('container')[0].appendChild(dl._getTemplate())
document.getElementsByClassName('container')[0].appendChild(document.createElement('br'))
document.getElementsByClassName('container')[0].appendChild(document.createElement('br'))

let a = (pageNum: number): void => {

}
let pa = new PaginationComponent(12, 10, 1, 'light', a)

document.getElementsByClassName('container')[0].appendChild(pa._getTemplate())

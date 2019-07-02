import {RollerRender} from "./TSLibs/Renders/Roller/Roller";
import {NavigationRender} from "./TSLibs/Renders/Navigation/Navigation";
import {PaginationRender} from "./TSLibs/Renders/Pagination/Pagination";
import {ButtonRender} from "./TSLibs/Renders/Button/Button";
import {TreeRender} from "./TSLibs/Renders/Tree/Tree";

// let p = new PopupComponent('Popup', '', '你好啊你好啊啊你好好啊你好啊', 'sdasd', 'light', 'fade')
//
// document.getElementsByTagName('body')[0].appendChild(p.node)
//
// let p2 = new PopupComponent('Popup', '', '你好啊你好啊啊你好好啊你好啊', 'sdasd', 'lighter')
//
// document.getElementsByClassName('container')[0].appendChild(p2.node)
//
// let p3 = new PopupComponent('Popup', '', '你好啊你好啊啊你好好啊你好啊', 'sdasd', 'dark', 'fade')
//
// document.getElementsByClassName('container')[0].appendChild(p3.node)



// document.getElementsByClassName('container')[0].appendChild(u._getTemplate())

// let bs = new ButtonComponent('按钮', '', '', 'store')
// // b._getTemplate()
// document.getElementsByClassName('btn-container')[0].appendChild(bs.node)
// let bd = new ButtonComponent('SUCCESS', 'success', 'default', '')
// // b._getTemplate()
// document.getElementsByClassName('btn-container')[0].appendChild(bd.node)
//
// let bl = new ButtonComponent('FAIL', 'error', '', '')
// // b._getTemplate()
// document.getElementsByClassName('btn-container')[0].appendChild(bl.node)
//
// let bdis = new ButtonComponent('DISABLED', 'disabled', '', '')
// // b._getTemplate()
// document.getElementsByClassName('btn-container')[0].appendChild(bdis.node)
class OwllerUI {
    renders: Array<any> = [RollerRender, NavigationRender, PaginationRender, ButtonRender, TreeRender];
    instants: Array<any> = [];
    constructor() {
        this.init();
    }

    init(): void {
        if(this.instants.length > 0) {
            return;
        }
        for (let i = 0; i < this.renders.length; i++) {
            this.instants.push(new this.renders[i]);
        }
    }

    render(): void {
        for (let i = 0; i < this.instants.length; i++) {
            this.instants[i].render();
        }
    }
}



// (function (e, t) {
//     new t();
//     return 1;
// })(this, OwllerUI);

// new OwllerUI();

// window.OwllerUI = OwllerUI;


// new RollerRender()
// new NavigationRender()
// new PaginationRender()
// new ButtonRender()
// new TreeRender()
let o = new OwllerUI();
export {OwllerUI};

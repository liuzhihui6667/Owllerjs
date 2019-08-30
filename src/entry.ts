import {owller, renderOption} from "./TSLibs/global";

import {RollerRender} from "./TSLibs/Renders/Roller/Roller";
import {NavigationRender} from "./TSLibs/Renders/Navigation/Navigation";
import {PaginationRender} from "./TSLibs/Renders/Pagination/Pagination";
import {ButtonRender} from "./TSLibs/Renders/Button/Button";
import {TreeRender} from "./TSLibs/Renders/Tree/Tree";
import {TipsRender} from "./TSLibs/Renders/Tips/Tips";

import {PopupComponent} from "./TSLibs/Components/Popup/Popup";


// let bs = new ButtonComponent('按钮', '', '', 'store')
// // b._getTemplate()
// document.getElementsByClassName('btn-container')[0].appendChild(bs.node)
// let bd = new ButtonComponent('SUCCESS', 'success', 'default', '')
// // b._getTemplate()
// document.getElementsByClassName('btn-container')[0].appendChild(b d.node)
//
// let bl = new ButtonComponent('FAIL', 'error', '', '')
// // b._getTemplate()
// document.getElementsByClassName('btn-container')[0].appendChild(bl.node)
//
// let bdis = new ButtonComponent('DISABLED', 'disabled', '', '')
// // b._getTemplate()
// document.getElementsByClassName('btn-container')[0].appendChild(bdis.node)

class OwllerUI {
    option: object;
    methods: object;
    renders: Array<any> = [RollerRender, NavigationRender, PaginationRender, ButtonRender, TreeRender, TipsRender];
    instants: Array<any> = [];
    constructor(option?: object) {
        let op = {
            data: {},
            methods: {}
        };
        if(option !== undefined)  {
            op = {
                data: option.hasOwnProperty('data') ? option['data'] : {},
                methods: option.hasOwnProperty('methods') ? option['methods'] : {}
            }
        }
        owller.renderOption.data = op.data;
        owller.renderOption.methods = op.methods;
        if(null !== owller.renderInstance) {
            owller.renderInstance.option = op;
            owller.renderInstance.methods = owller.renderOption.methods;
            return owller.renderInstance;
        } else {
            this.option = op;
            this.methods =  owller.renderOption.methods;
        }
        owller.renderInstance = this;
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

    alert(option?: object): PopupComponent {
        let op = {
            title: '',
            type: 'alert',
            text: '你确定要这样吗？',
            theme: 'lighter',
            html: '',
            animation: 'scale'
        };
        if(option !== undefined) {
            op.title = option.hasOwnProperty('title') ? option['title'] : op.title;
            op.type = option.hasOwnProperty('type') ? option['type'] : op.type;
            op.text = option.hasOwnProperty('text') ? option['text'] : op.text;
            op.theme = option.hasOwnProperty('theme') ? option['theme'] : op.theme;
            op.html = option.hasOwnProperty('html') ? option['html'] : op.html;
            op.animation = option.hasOwnProperty('animation') ? option['animation'] : op.animation;
        }
        let pop = new PopupComponent(op.title, op.type, op.text, op.html, op.theme, op.animation);
        document.getElementsByTagName('body')[0].appendChild(pop.node);
        return pop;
    }
}
new OwllerUI();
export {OwllerUI};

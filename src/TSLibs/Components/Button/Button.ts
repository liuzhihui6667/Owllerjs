import {Components} from '../../Interfaces/Component'
import {OWLNODE} from '../../OwlNode/OWLNODE'
import '../../../Style/Button/index.less'
import {IconComponent} from "../Icon/Icon";

class ButtonComponent extends Components {
    type: string;
    size: string;
    icon: string;
    circle: boolean;
    innerHTML: string;
    attr: object;
    constructor(innerHTML?: string, type?: string, size?: string, icon?: string, circle?: boolean, attr?:object) {
        super();
        this.innerHTML = innerHTML === undefined ? 'Button' : innerHTML;
        this.type = type === undefined ? 'default' : type;
        this.size = size === undefined ? 'default' : size;
        this.icon = icon === undefined ? '' : icon;
        this.circle = circle === undefined ? false : circle;
        this.attr = attr === undefined ? {} : attr
        this.init();
    }

    init() {
        this._getTemplate();
        this._setEvent();
    }

    _getTemplate() {
        if(this.node !== undefined) {
            return this.node;
        }
        this.node = this.__getNode()
        return this.node
    }

    __getNode(): Element {
        let node = document.createElement('div');
        node.classList.add('owl-btn-container');
        for (let index in this.attr) {
            if(this.attr[index].name === 'class') {
                let class_list = this.attr[index].value.split(' ')
                for (let i = 0; i < class_list.length; i++) {
                    node.classList.add(class_list[i])
                }
                continue
            }
            node.setAttribute(this.attr[index].name, this.attr[index].value)
        }
        if(this.circle) {
            node.classList.add('owl-btn-circle');
        }
        let btnHeight = ''
        switch (this.size) {
            case 'small':
                node.classList.add('owl-btn-small')
                btnHeight = '26px';
                break
            case 'large':
                node.classList.add('owl-btn-large')
                btnHeight = '34px'
                break
            default:
                node.classList.add('owl-btn-default')
                btnHeight = '30px'
                break
        }
        switch (this.type) {
            case 'error':
                node.classList.add('owl-btn-t-error')
                break
            case 'success':
                node.classList.add('owl-btn-t-success')
                break
            case 'disabled':
                node.classList.add('owl-btn-t-disabled')
                break
            case 'lighter':
                node.classList.add('owl-btn-t-lighter')
                break
            case 'dark':
                node.classList.add('owl-btn-t-dark')
                break
            default:
                node.classList.add('owl-btn-t-default')
                break
        }
        if(this.icon !== '') {
            let iconSize = '';
            switch (this.size) {
                case 'small':
                    iconSize = '14px';
                    break;
                case 'large':
                    iconSize = '18px';
                    break;
                default:
                    iconSize = '16px';
                    break
            }
            let iconColor = this.type === 'disabled' ? '#c5c8ce' : '#ffffff'
            switch (this.type) {
                case 'disabled':
                    iconColor = '#c5c8ce'
                    break
                case 'lighter':
                    iconColor = '#515a6e'
                    break
                default:
                    iconColor = '#ffffff'
            }

            let icon = new IconComponent(this.icon, iconSize, btnHeight, iconColor)
            var iconNode = icon._getTemplate();
            iconNode.classList.add('owl-btn-icon')
            node.appendChild(iconNode)
        }
        let textSpan = document.createElement('span');
        textSpan.classList.add('owl-btn-text-wrapper');
        textSpan.innerHTML = this.innerHTML;
        node.appendChild(textSpan);
        return node
    }

    _setEvent() {

    }

}

export {ButtonComponent}
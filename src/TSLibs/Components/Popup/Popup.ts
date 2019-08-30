/**
 * 本组件为web弹窗组件
 */

import {Components} from '../../Interfaces/Component'
import {OWLNODE} from '../../OwlNode/OWLNODE'
import '../../../Style/Popup/index.less'
import {IconComponent} from "../Icon/Icon";

class PopupComponent extends Components {
    /**
     * 窗口标题
     */
    title: string;
    /**
     * 窗口类型
     * "alert": 提示框，
     * "folder": 文件夹
     * "custom": 用户自定义
     */
    type: string;
    /**
     * 提示框文字
     * 当 type 为 "alert" 时有效
     */
    innerText: string;
    /**
     * 自定义窗口
     * 当 type 为 "custom" 时有效
     */
    innerHtml: HTMLElement;
    /**
     * 出现与消失动画
     */
    animation: string;
    /**
     * z-index，越大越在前面
     */
    static stick: number;
    /**
     * 主题
     */
    theme: string;
    /**
     * 最大化为1，最小化为2，初始状态为0
     */
    status: number = 0;
    mousedown: boolean = false;
    constructor(title?: string,
                type?: string,
                innerText?: string,
                innerHtml?: string,
                theme?: string,
                animation?: string) {
        super();
        this.title = this._checkParam(title, '');
        this.type = this._checkParam(type, 'alert');
        this.innerText = this._checkParam(innerText, '');
        this.innerHtml = this._checkParam(innerHtml, null);
        this.theme = this._checkParam(theme, 'lighter');
        this.animation = this._checkParam(animation, 'scale');
        this.init()
    }
    _getTemplate(): Element {
        if(this.node !== undefined) {
            return this.node
        }
        this.node = this.__getNode();
        return this.node
    }

    __getNode(): Element {
        let node = this._createElement('div', ['owl-pop-container', 'owl-pop-theme-' + this.theme, 'owl-pop-' + this.animation])
        let titleNode = this._createElement('div', ['owl-pop-title-wrapper'])
        let titleSpanNode = this._createElement('div', ['owl-pop-title']);
        titleSpanNode.innerText = this.title;
        titleNode.appendChild(titleSpanNode);
        let closeIcon = new IconComponent('close', '14px', '14px');
        closeIcon.node.classList.add('owl-pop-close');
        titleNode.appendChild(closeIcon.node);
        node.appendChild(titleNode);

        let popBodyNode = this.__getAlertNode();
        switch (this.type) {
            case 'alert':
                node.classList.add('owl-pop-alert-container');
                popBodyNode = this.__getAlertNode();
                break;
            case 'folder':
                node.classList.add('owl-pop-folder-container');
                popBodyNode = this.__getFolderNode();
                break;
            case 'custom':
                popBodyNode = this.__getCustomNode();
                break;
            default:
                popBodyNode = this.__getAlertNode();
                break;
        }
        node.appendChild(popBodyNode);
        return node
    }

    __getAlertNode(): HTMLElement {
        let popBodyNode = this._createElement('div', ['owl-pop-alert-body-wrapper']);
        let popBodyTextNode = this._createElement('p', ['owl-pop-text'])
        popBodyTextNode.innerText = this.innerText;
        let confirmNode = this._createElement('div', ['owl-pop-button', 'confirm']);
        confirmNode.innerText = '确定';
        popBodyNode.appendChild(popBodyTextNode);
        popBodyNode.appendChild(confirmNode);
        return popBodyNode
    }

    __getFolderNode(): HTMLElement {
        return this._createElement('div', ['owl-pop-folder-body-wrapper']);
    }

    __getCustomNode(): HTMLElement {
        return null;
    }

    _setEvent(): void {
        let that = this;
        let ox, oy, cx, cy, pw, ph, ew, eh;
        this.node.addEventListener('mousedown', function (e) {
            that.__stick()
        });
        this.node.getElementsByClassName('owl-pop-title-wrapper')[0].addEventListener('mousedown', function (e) {
            ox = e.offsetX + 1;
            oy = e.offsetY + 1;
            pw = document.documentElement.clientWidth;
            ph = document.documentElement.clientHeight;
            ew = that.node.clientWidth;
            eh = that.node.clientHeight;
            that.mousedown = true;
            let move = function(e) {
                that.node.style.transition = '';
                if(!that.mousedown) {
                    return
                }
                cx = e.clientX;
                cy = e.clientY;
                if(cx-ox <= 0) {
                    that.node.style.left = '0px'
                } else if(cx - ox + ew >= pw) {
                    that.node.style.left = (pw - ew) + 'px'
                } else {
                    that.node.style.left = (cx - ox) + 'px'
                }

                if(cy-oy <= 0) {
                    that.node.style.top = '0px'
                } else if(cy - oy + eh >= ph) {
                    that.node.style.top = (ph - eh) + 'px'
                } else {
                    that.node.style.top = (cy - oy) + 'px'
                }
                e.preventDefault()
            };
            document.addEventListener('mousemove', move, false);
            document.addEventListener('mouseup', function () {
                that.mousedown = false;
                document.removeEventListener('mousemove', move)
            })
        });

        this.node.getElementsByClassName('owl-pop-close')[0].addEventListener('click', function (e) {
            that._destroy()
        });
        this.node.getElementsByClassName('owl-pop-close')[0].addEventListener('mousedown', function (e) {
            e.stopPropagation()
        });
        // this.node.getElementsByClassName('confirm')[0].addEventListener('click', function (e) {
        //
        // })
        if(this.type === 'folder') {
            this.sizeChange();
        }
    }

    sizeChange(): void {
        let that = this;
        this.node.getElementsByClassName('owl-pop-title-wrapper')[0].addEventListener('dblclick', function (e) {
            that.node.style.transition = 'width .3s, height .3s, top .3s, left .3s';
            if(that.status === 0) {
                that.node.style.width = '100%';
                that.node.style.height = '100%';
                that.node.style.top = '0';
                that.node.style.left = '0';
                that.status = 1;
            }else if(that.status === 1) {
                that.node.style.width = '';
                that.node.style.height = '';
                that.node.style.top = '';
                that.node.style.left = '';
                that.status = 0;
            }
        });
    }

    static __initStick(): void {
        PopupComponent.stick = 2000
    }

    __stick(): void {
        PopupComponent.stick += 1;
        this.node.style.zIndex = PopupComponent.stick
    }

    init(): void {
        PopupComponent.__initStick();
        this._getTemplate();
        this._setEvent()
    }

    _destroy(): void {
        this.node.remove();
    }

}

export {PopupComponent}

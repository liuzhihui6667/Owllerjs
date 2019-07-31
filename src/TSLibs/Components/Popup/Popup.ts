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
    innerHtml: string;
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
    mousedown: boolean = false;
    constructor(title?: string,
                type?: string,
                innerText?: string,
                innerHtml?: string,
                theme?: string,
                animation?: string) {
        super();
        this.title = title === undefined ? '信息' : title;
        this.type = type === undefined ? 'default' : type;
        this.innerText = innerText === undefined ? '请点击确定' : innerText;
        this.innerHtml = innerHtml === undefined ? '请点击确定' : innerHtml;
        this.theme = theme === undefined ? 'lighter' : theme;
        this.animation = animation === undefined ? 'scale' : animation;
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
        let node = document.createElement('div');
        node.classList.add('owl-pop-container');
        node.classList.add('owl-pop-theme-' + this.theme);
        node.classList.add('owl-pop-' + this.animation);
        let titleNode = document.createElement('div');
        titleNode.classList.add('owl-pop-title-wrapper');
        let titleSpanNode = document.createElement('span');
        titleSpanNode.classList.add('owl-pop-title');
        titleSpanNode.innerText = this.title;
        titleNode.appendChild(titleSpanNode);
        let closeIcon = new IconComponent('close', '14px', '14px');
        closeIcon.node.classList.add('owl-pop-close');
        titleNode.appendChild(closeIcon.node);
        node.appendChild(titleNode);

        let popBodyNode = document.createElement('div');
        popBodyNode.classList.add('owl-pop-body-wrapper');
        let popBodyTextNode = document.createElement('p');
        popBodyTextNode.classList.add('owl-pop-text');
        popBodyTextNode.innerText = this.innerText;
        let confirmNode = document.createElement('div');
        confirmNode.classList.add('owl-pop-button');
        confirmNode.classList.add('confirm');
        confirmNode.innerText = '确定';
        popBodyNode.appendChild(popBodyTextNode);
        popBodyNode.appendChild(confirmNode);
        node.appendChild(popBodyNode);
        return node
    }

    __getAlertNode(): HTMLElement {
        
        return null
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
        this.node.getElementsByClassName('confirm')[0].addEventListener('click', function (e) {

        })
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

    }

}

export {PopupComponent}

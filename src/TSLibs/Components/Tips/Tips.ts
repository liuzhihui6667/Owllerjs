/**
 * 该组件为提示框
 * 可实现功能如下
 * 1. 上下左右提示
 * 2. 各种主题
 */

import {Components} from '../../Interfaces/Component';
import '../../../Style/Tips/index.less';

class TipsComponent extends Components {

    /**
     * 弹出方向
     * top-right, top-left, center...
     */
    dir: string;
    /**
     * 主题
     * dark, light
     */
    theme: string;
    /**
     * 标题，如无标题可不填
     */
    title: string = '';

    text: Array<string> = [];
    /**
     * 触发方式
     */
    showType: string;
    /**
     * 宽度，默认160px
     */
    width: number;
    /**
     * 母节点
     */
    content: HTMLCollection;
    /**
     * 是否自定义tip内容
     */
    custom: boolean;
    /**
     * 自定义tip节点
     */
    customElement: HTMLCollection;
    /**
     * tip高度，若是自定义tip，则必须传这个值
     */
    height: number;



    constructor(content: HTMLCollection,
                dir?: string,
                theme?: string,
                title?: string,
                text?: Array<string>,
                showType?: string,
                width?: number,
                custom?: boolean,
                customElement?: HTMLCollection,
                height?: number) {
        super();
        if(content instanceof HTMLCollection) {
            this.content = content;
        }
        this.dir = this._checkParam(dir, 'right-top');
        this.theme = this._checkParam(theme, 'light');
        this.title = this._checkParam(title, '');
        this.text = this._checkParam(text, []);
        this.showType = this._checkParam(showType, 'click');
        this.width = this._checkParam(width, 160);
        this.custom = this._checkParam(custom, false);
        this.customElement = this._checkParam(customElement, null);
        this.height = this._checkParam(height, 100);
        if(!this.custom) {
            this.height = 20;
            if(this.title !== '') {
                this.height += 33;
            }
            this.height += this.text.length * 26;
        }
        this.init()
    }
    init(): void {
        this._getTemplate();
        this._setEvent();
    }
    _getTemplate(): Element {
        if(this.node !== undefined) {
            return this.node;
        }
        this.node = this.__getNode();
        return this.node
    }

    __getNode(): Element {
        let node = this._createElement('div', ['owl-tip-container']);

        let index = 0;
        while (null !== this.content.item(index)) {
            node.append(this.content.item(index));
            index++;
        }

        let tipWrapper = this._createElement('div', ['owl-tip-wrapper']);
        let tipTextWrapper = this._createElement('div', ['owl-tip-text-wrapper']);
        if(this.custom) {
            let index = 0;
            tipTextWrapper.style.padding = '0px';
            tipTextWrapper.style.backgroundColor = 'transparent';
            while (null !== this.customElement.item(index)) {
                tipTextWrapper.append(this.customElement.item(index));
                index++;
            }
        } else {
            if(this.title !== '') {
                let tipTitleWrapper = this._createElement('div', ['owl-tip-text-title']);
                tipTitleWrapper.innerText = this.title;
                tipTextWrapper.append(tipTitleWrapper);
            }
            for (let i = 0; i < this.text.length; i++) {
                let tipText = this._createElement('div', ['owl-tip-text']);
                tipText.innerText = this.text[i];
                tipTextWrapper.append(tipText);
            }
        }

        let tipTip = this._createElement('div', ['owl-tip-tip-wrapper']);
        this.__setDirectory(tipWrapper, tipTextWrapper, tipTip);
        tipTextWrapper.append(tipTip);
        tipWrapper.append(tipTextWrapper);
        node.append(tipWrapper);
        return node;
    }

    __setDirectory(wrapper: HTMLElement, content: HTMLElement, tip: HTMLElement): void {
        switch (this.dir) {
            case 'right-top':
                wrapper.style.left = '100%';
                wrapper.style.top = '0';
                wrapper.style.width = this.width + 15 + 'px';
                content.style.width = this.width + 'px';
                content.style.left = '14px';
                tip.style.borderRightColor = '#ffffff';
                tip.style.top = '12px';
                tip.style.left = '-14px';
                break;
            case 'right-bottom':
                wrapper.style.left = '100%';
                wrapper.style.bottom = '0';
                wrapper.style.width = this.width + 15 + 'px';
                content.style.width = this.width + 'px';
                content.style.left = '14px';
                tip.style.borderRightColor = '#ffffff';
                tip.style.bottom = '12px';
                tip.style.left = '-14px';
                break;
            case 'right':
                wrapper.style.left = '100%';
                wrapper.style.top = 'calc(50% - ' + this.height/2 + 'px)';
                wrapper.style.width = this.width + 15 + 'px';
                content.style.width = this.width + 'px';
                content.style.left = '14px';
                tip.style.borderRightColor = '#ffffff';
                tip.style.bottom = 'calc(50% - 7px)';
                tip.style.left = '-14px';
                break;
            case 'left-top':
                wrapper.style.right = '100%';
                wrapper.style.top = '0';
                wrapper.style.width = this.width + 15 + 'px';
                content.style.width = this.width + 'px';
                tip.style.borderLeftColor = '#ffffff';
                tip.style.top = '12px';
                tip.style.right = '-14px';
                break;
            case 'left-bottom':
                wrapper.style.right = '100%';
                wrapper.style.bottom = '0';
                wrapper.style.width = this.width + 15 + 'px';
                content.style.width = this.width + 'px';
                tip.style.borderLeftColor = '#ffffff';
                tip.style.bottom = '12px';
                tip.style.right = '-14px';
                break;
            case 'left':
                wrapper.style.right = '100%';
                wrapper.style.top = 'calc(50% - ' + this.height/2 + 'px)';
                wrapper.style.width = this.width + 15 + 'px';
                content.style.width = this.width + 'px';
                tip.style.borderLeftColor = '#ffffff';
                tip.style.bottom = 'calc(50% - 7px)';
                tip.style.right = '-14px';
                break;
            case 'top-left':
                wrapper.style.left = '0';
                wrapper.style.bottom = '100%';
                wrapper.style.height = this.height + 15 + 'px';
                content.style.width = this.width + 'px';
                tip.style.borderTopColor = '#ffffff';
                tip.style.left = '12px';
                tip.style.bottom = '-14px';
                break;
            case 'top-right':
                wrapper.style.right = '0';
                wrapper.style.bottom = '100%';
                wrapper.style.height = this.height + 15 + 'px';
                content.style.width = this.width + 'px';
                tip.style.borderTopColor = '#ffffff';
                tip.style.right = '12px';
                tip.style.bottom = '-14px';
                break;
            case 'top':
                wrapper.style.left = 'calc(50% - ' + this.width/2 + 'px)';
                wrapper.style.bottom = '100%';
                wrapper.style.height = this.height + 15 + 'px';
                content.style.width = this.width + 'px';
                tip.style.borderTopColor = '#ffffff';
                tip.style.left = 'calc(50% - 7px)';
                tip.style.bottom = '-14px';
                break;
            case 'bottom-left':
                wrapper.style.left = '0';
                wrapper.style.top = '100%';
                wrapper.style.height = this.height + 15 + 'px';
                content.style.width = this.width + 'px';
                content.style.top = '14px';
                tip.style.borderBottomColor = '#ffffff';
                tip.style.left = '12px';
                tip.style.top = '-14px';
                break;
            case 'bottom-right':
                wrapper.style.right = '0';
                wrapper.style.top = '100%';
                wrapper.style.height = this.height + 15 + 'px';
                content.style.width = this.width + 'px';
                content.style.top = '14px';
                tip.style.borderBottomColor = '#ffffff';
                tip.style.right = '12px';
                tip.style.top = '-14px';
                break;
            case 'bottom':
                wrapper.style.left = 'calc(50% - ' + this.width/2 + 'px)';
                wrapper.style.top = '100%';
                wrapper.style.height = this.height + 15 + 'px';
                content.style.width = this.width + 'px';
                content.style.top = '14px';
                tip.style.borderBottomColor = '#ffffff';
                tip.style.left = 'calc(50% - 7px)';
                tip.style.top = '-14px';
                break;
        }
    }



    _setEvent(): void {

    }



    _destroy() {

    }
}

export {TipsComponent}
/**
 * 该组件为提示框
 * 可实现功能如下
 * 1. 上下左右提示
 * 2. 各种主题
 */

import {Components} from '../../Interfaces/Component';
import '../../../Style/Tips/index.less';
import {owller} from "../../global";

class TipsComponent extends Components {
    /**
     * 初始是否显示，默认不显示
     */
    show: boolean;
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
    /**
     * backgroundColor
     */
    bgc: string = '#ffffff';
    /**
     * 组件大小
     */
    size: string = 'default';

    onChangeCallback: (isShow) => void;

    constructor(content: HTMLCollection,
                dir?: string,
                theme?: string,
                title?: string,
                text?: Array<string>,
                showType?: string,
                width?: number,
                custom?: boolean,
                customElement?: HTMLCollection,
                height?: number,
                color?: string,
                size?: string,
                show?: boolean) {
        super();
        if(content instanceof HTMLCollection) {
            this.content = content;
        }
        this.dir = this._checkParam(dir, 'right-top');
        this.theme = this._checkParam(theme, 'light');
        this.title = this._checkParam(title, '');
        this.text = this._checkParam(text, []);
        this.showType = this._checkParam(showType, 'click');
        this.width = this._checkParam(width, 0);
        this.custom = this._checkParam(custom, false);
        this.customElement = this._checkParam(customElement, null);
        this.height = this._checkParam(height, 0);
        this.bgc = this._checkParam(color, '#ffffff');
        this.size = this._checkParam(size, 'default');
        this.show = this._checkParam(show, false);
        if(!this.custom && height === 0) {
            switch (this.size) {
                case 'small':
                    this.height = 8;
                    if(this.title !== '') {
                        this.height += 20;
                    }
                    this.height += this.text.length * 18;
                    break;
                case 'large':
                    this.height = 16;
                    if(this.title !== '') {
                        this.height += 30;
                    }
                    this.height += this.text.length * 26;
                    break;
                default:
                    this.height = 10;
                    if(this.title !== '') {
                        this.height += 26;
                    }
                    this.height += this.text.length * 22;
                    break;
            }
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
        let node = null;
        if(null !== this.content.item(0)) {
            node = this.content.item(0)
        } else {
            node = this._createElement('div');
        }
        let tipNode = this._createElement('div', ['owl-tip-container']);
        tipNode.append(node.innerHTML);
        node.innerHTML = '';
        let tipWrapper = this._createElement('div', ['owl-tip-wrapper']);
        if(this.show) {
            tipWrapper.style.opacity = '1';
            tipWrapper.style.visibility = 'visible';
        }
        let tipTextWrapper = this._createElement('div', ['owl-tip-text-wrapper']);
        tipTextWrapper.style.backgroundColor = this.bgc;
        let tipTip = this._createElement('div', ['owl-tip-tip-wrapper']);
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
            this.__setThemeAndSize(tipTextWrapper, tipTip);
        }
        this.__setDirectory(tipWrapper, tipTextWrapper, tipTip);
        tipTextWrapper.append(tipTip);
        tipWrapper.append(tipTextWrapper);
        tipNode.append(tipWrapper);
        node.prepend(tipNode);
        return node;
    }

    __setDirectory(wrapper: HTMLElement, content: HTMLElement, tip: HTMLElement): void {
        if(this.width !== 0) {
            content.style.width = this.width + 'px';
        }
        if(this.height !== 0) {
            content.style.height = this.height + 'px';
        }
        switch (this.dir) {
            case 'right-top':
                wrapper.style.left = 'calc(100% + 14px)';
                wrapper.style.top = '0';
                tip.style.borderRightColor = this.bgc;
                tip.style.top = '12px';
                tip.style.left = '-14px';
                break;
            case 'right-bottom':
                wrapper.style.left = 'calc(100% + 14px)';
                wrapper.style.bottom = '0';
                tip.style.borderRightColor = this.bgc;
                tip.style.bottom = '12px';
                tip.style.left = '-14px';
                break;
            case 'right':
                wrapper.style.left = 'calc(100% + 14px)';
                wrapper.style.top = 'calc(50% - ' + this.height/2 + 'px)';
                tip.style.borderRightColor = this.bgc;
                tip.style.bottom = 'calc(50% - 7px)';
                tip.style.left = '-14px';
                break;
            case 'left-top':
                wrapper.style.right = 'calc(100% + 14px)';
                wrapper.style.top = '0';
                tip.style.borderLeftColor = this.bgc;
                tip.style.top = '12px';
                tip.style.right = '-14px';
                break;
            case 'left-bottom':
                wrapper.style.right = 'calc(100% + 14px)';
                wrapper.style.bottom = '0';
                tip.style.borderLeftColor = this.bgc;
                tip.style.bottom = '12px';
                tip.style.right = '-14px';
                break;
            case 'left':
                wrapper.style.right = 'calc(100% + 14px)';
                wrapper.style.top = 'calc(50% - ' + this.height/2 + 'px)';
                tip.style.borderLeftColor = this.bgc;
                tip.style.bottom = 'calc(50% - 7px)';
                tip.style.right = '-14px';
                break;
            case 'top-left':
                wrapper.style.left = '0';
                wrapper.style.bottom = 'calc(100% + 14px)';
                tip.style.borderTopColor = this.bgc;
                tip.style.left = '12px';
                tip.style.bottom = '-14px';
                break;
            case 'top-right':
                wrapper.style.right = '0';
                wrapper.style.bottom = 'calc(100% + 14px)';
                tip.style.borderTopColor = this.bgc;
                tip.style.right = '12px';
                tip.style.bottom = '-14px';
                break;
            case 'top':
                if(this.width !== 0) {
                    wrapper.style.left = 'calc(50% - ' + this.width/2 + 'px)';
                    tip.style.left = 'calc(50% - 7px)';
                } else {
                    wrapper.style.left = '0';
                    tip.style.left = '14px';
                }
                wrapper.style.bottom = 'calc(100% + 14px)';
                tip.style.borderTopColor = this.bgc;
                tip.style.bottom = '-14px';
                break;
            case 'bottom-left':
                wrapper.style.left = '0';
                wrapper.style.top = 'calc(100% + 14px)';
                tip.style.borderBottomColor = this.bgc;
                tip.style.left = '12px';
                tip.style.top = '-14px';
                break;
            case 'bottom-right':
                wrapper.style.right = '0';
                wrapper.style.top = 'calc(100% + 14px)';
                tip.style.borderBottomColor = this.bgc;
                tip.style.right = '12px';
                tip.style.top = '-14px';
                break;
            case 'bottom':
                if(this.width !== 0) {
                    wrapper.style.left = 'calc(50% - ' + this.width/2 + 'px)';
                    tip.style.left = 'calc(50% - 7px)';
                } else {
                    wrapper.style.left = '0';
                    tip.style.left = '14px';
                }
                wrapper.style.top = 'calc(100% + 14px)';
                tip.style.borderBottomColor = this.bgc;
                tip.style.top = '-14px';
                break;
            default:
                wrapper.style.left = 'calc(100% + 14px)';
                wrapper.style.top = '0';
                tip.style.borderRightColor = this.bgc;
                tip.style.top = '12px';
                tip.style.left = '-14px';
                break;
        }
    }

    __setThemeAndSize(textWrapper: HTMLElement, tipTip: HTMLElement): void {
        let titleWrapper = textWrapper.getElementsByClassName('owl-tip-text-title');
        let text = textWrapper.getElementsByClassName('owl-tip-text');
        switch (this.theme) {
            case 'dark':
                this.bgc = 'rgba(20, 16, 41, 0.9)';
                textWrapper.style.backgroundColor = this.bgc;
                textWrapper.style.color = 'rgb(232, 232, 232)';
                break;
            case 'error':
                this.bgc = 'rgba(231, 76, 60, 1)';
                textWrapper.style.backgroundColor = 'rgba(231, 76, 60, 0.1)';
                textWrapper.style.color = 'rgba(231, 76, 60, 1)';
                textWrapper.style.boxShadow = '0px 0px 6px 1px rgba(231, 76, 60, 0.7)';
                break;
            default:
                if('#ffffff' === this.bgc) {
                    this.bgc = 'rgba(211, 211, 211, 0.9)';
                }

                // tipTip.style.backgroundColor = 'raba(211, 211, 211, 1)';
                break;
        }
        switch (this.size) {
            case 'small':
                textWrapper.style.padding = '4px 8px';
                if(0 !== titleWrapper.length) {
                    titleWrapper[0].classList.add('owl-tip-text-title-small');
                }
                for (let i = 0; i < text.length; i++) {
                    text[i].classList.add('owl-tip-text-small');
                }
                break;
            case 'large':
                textWrapper.style.padding = '8px 15px';
                if(0 !== titleWrapper.length) {
                    titleWrapper[0].classList.add('owl-tip-text-title-large');
                }
                for (let i = 0; i < text.length; i++) {
                    text[i].classList.add('owl-tip-text-large');
                }
                break;
            default:
                textWrapper.style.padding = '5px 10px';
                if(0 !== titleWrapper.length) {
                    titleWrapper[0].classList.add('owl-tip-text-title-default');
                }
                for (let i = 0; i < text.length; i++) {
                    text[i].classList.add('owl-tip-text-default');
                }
                break;
        }

    }

    _setEvent(): void {
        let that = this;
        this.node.getElementsByClassName('owl-tip-wrapper')[0].addEventListener('mouseover', function (e) {
            that.visit(true);
            e.stopPropagation();
        });
    }

    visit(isShow: boolean): void {
        let that = this;
        that.node.getElementsByClassName('owl-tip-wrapper')[0].style.opacity = isShow ? 1 : 0;
        that.node.getElementsByClassName('owl-tip-wrapper')[0].style.visibility = isShow ? 'visible' : 'hidden';
    }

    setChangeCallback(callback): void {
        let that = this;
        let func = owller['renderOption']['methods'][callback];
        owller['renderOption']['methods'][callback] = function (isShow) {
            that.visit(isShow);
            func(isShow);
        }
    }

    _destroy() {

    }
}



export {TipsComponent}
/**
 * 该组件为树状图组件
 * 可实现功能如下
 * 1. 实现树状图功能
 * 2. 实现异步加载
 */

import {Components} from '../../Interfaces/Component';
import '../../../Style/Tree/index.less';
import {IconComponent} from "../Icon/Icon";
import {OWLNODE} from "../../OwlNode/OWLNODE";

interface TreeItemList {
    text: string;
    open: boolean,
    leaf: boolean,
    children?: Array<TreeItemList>
}

interface TreeUlItemAttr {
    el: HTMLElement,
    showLiCount: number
}

class TreeComponent extends Components {
    /**
     * item高度
     */
    itemHeight: number = 34;
    /**
     * item列表实现TreeItemList接口
     */
    itemList: Array<TreeItemList>;
    constructor(itemList: Array<TreeItemList>, itemHeight?: number) {
        super();
        this.itemList = itemList;
        this.itemHeight = this._checkParam(itemHeight, this.itemHeight);
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

    __getNode(): HTMLElement {
        let node = this._createElement('div', ['owl-tree-container']);
        let ulNode = this.__getNodeOfItemUl(this.itemList, 0, true);
        node.appendChild(ulNode.el);
        return node;
    }

    __getNodeOfItemUl(itemList: Array<TreeItemList>, depth: number, open: boolean): TreeUlItemAttr {
        let ulNode = this._createElement('ul', ['owl-tree-wrapper']);
        let showLiCount = 0;
        if(depth === 0) {
            ulNode.classList.add('owl-tree-root');
        }
        if(open) {
            showLiCount = itemList.length;
        }
        ulNode.style.marginLeft = (depth * 13) + 10 + 'px';
        for (let i = 0; i < itemList.length; i++) {
            let liNode = this._createElement('li', ['owl-tree-item-wrapper']);
            let liDivNode = this._createElement('div', ['owl-tree-item-box']);
            liDivNode.style.height = this.itemHeight + 'px';
            liDivNode.style.lineHeight = this.itemHeight + 'px';
            let spanTipNode = this._createElement('span', ['owl-tree-tip-icon']);
            if(!itemList[i].leaf) {
                if(itemList[i].open) {
                    spanTipNode.classList.add('owl-tree-tip-open')
                }
            } else {
                spanTipNode.style.visibility = 'hidden'
            }
            let spanIconNode = this._createElement('span', ['owl-tree-item-icon']);
            let spanTextNode = this._createElement('span', ['owl-tree-text']);
            let tipIcon = new IconComponent('triangle', '16px', this.itemHeight + 'px', '#666');
            let icon;
            if(itemList[i].leaf) {
                icon = new IconComponent('file', '20px', this.itemHeight + 'px', '#666');
            } else {
                icon = new IconComponent('folder', '20px', this.itemHeight + 'px', '#666');
            }

            liNode.appendChild(liDivNode);
            liDivNode.appendChild(spanTipNode);
            liDivNode.appendChild(spanIconNode);
            liDivNode.appendChild(spanTextNode);
            spanTipNode.appendChild(tipIcon.node);
            spanIconNode.appendChild(icon.node);
            spanTextNode.innerText = itemList[i].text;
            if(itemList[i].hasOwnProperty('open') && itemList[i].open) {
                let ul = this.__getNodeOfItemUl(itemList[i].children, depth + 1, itemList[i].open);
                showLiCount += ul.showLiCount;
                liNode.appendChild(ul.el);
            }
            ulNode.appendChild(liNode);
        }
        ulNode.style.height = (showLiCount * this.itemHeight) + 'px';
        return {
            el: ulNode,
            showLiCount: showLiCount
        }
    }

    _setEvent(): void {
        let that = this;
        let liEls = this.node.getElementsByTagName('li');
        for (let i = 0; i < liEls.length; i++) {
            let liEl = liEls[i];
            let tipEl = liEl.getElementsByClassName('owl-tree-tip-icon')[0];
            let textEl = liEl.getElementsByClassName('owl-tree-text')[0];
            tipEl.addEventListener('click', function (e) {
                let isOpen = OWLNODE.hasClass(this, 'owl-tree-tip-open');
                let ulEl = this.parentElement.nextElementSibling;
                let cc = ulEl.childElementCount;
                if(isOpen) {
                    this.classList.remove('owl-tree-tip-open');
                    let childUls = this.parentElement.parentElement.getElementsByTagName('ul');
                    for (let i = 0; i < childUls.length; i++) {
                        childUls[i].style.height = '0px';
                    }
                    let childTips = this.parentElement.parentElement.getElementsByClassName('owl-tree-tip-icon');
                    for (let i = 0; i < childTips.length; i++) {
                        childTips[i].classList.remove('owl-tree-tip-open');
                    }
                    that._setUlElementHeight(ulEl, that.itemHeight * cc, isOpen);
                } else {
                    this.classList.add('owl-tree-tip-open');
                    that._setUlElementHeight(ulEl, that.itemHeight * cc, isOpen);
                }
                e.stopPropagation();
            })
        }
    }

    _setUlElementHeight(element: HTMLElement, height: number, isOpen: boolean): void {
        if(OWLNODE.hasClass(element, 'owl-tree-root')) {
            return;
        }
        let parentUlEl = element.parentElement.parentElement;
        let opHeight;
        if(isOpen) {
            element.style.height = (parseInt(element.style.height) - height) + 'px';
            this._setUlElementHeight(parentUlEl, height, isOpen);
        } else {
            element.style.height = height + 'px';
            opHeight = parseInt(parentUlEl.style.height) + height;
            this._setUlElementHeight(parentUlEl, opHeight, isOpen);
        }
    }

    _destroy() {

    }
}

export {TreeComponent}
/**
 * 该组件为树状图组件
 * 可实现功能如下
 * 1. 实现树状图功能
 * 2. 实现异步加载
 */

import {Components} from '../../Interfaces/Component';
import '../../../Style/Tree/index.less';
import {IconComponent} from "../Icon/Icon";
import {OWLNODE} from "../../OwlNode/OWLNODE"

interface TreeItemList {
    text: string;
    open: boolean,
    leaf: boolean,
    children?: Array<TreeItemList>
}

class TreeComponent extends Components {
    /**
     * item高度
     */
    itemHeight: string = '34px';
    /**
     * item列表实现TreeItemList接口
     */
    itemList: Array<TreeItemList>;
    constructor(itemList: Array<TreeItemList>, itemHeight?: string) {
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
        let ulNode = this.__getNodeOfItemUl(this.itemList, 0);
        node.appendChild(ulNode);
        return node;
    }

    __getNodeOfItemUl(itemList: Array<TreeItemList>, depth: number): HTMLElement {
        let ulNode = this._createElement('ul', ['owl-tree-wrapper']);
        ulNode.style.marginLeft = (depth * 13) + 10 + 'px';
        for (let i = 0; i < itemList.length; i++) {
            let liNode = this._createElement('li', ['owl-tree-item-wrapper']);
            let liDivNode = this._createElement('div', ['owl-tree-item-box']);
            liDivNode.style.height = this.itemHeight;
            liDivNode.style.lineHeight = this.itemHeight;
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
            let tipIcon = new IconComponent('triangle', '16px', this.itemHeight, '#666');
            let icon;
            if(itemList[i].leaf) {
                icon = new IconComponent('file', '20px', this.itemHeight, '#666');
            } else {
                icon = new IconComponent('folder', '20px', this.itemHeight, '#666');
            }

            liNode.appendChild(liDivNode);
            liDivNode.appendChild(spanTipNode);
            liDivNode.appendChild(spanIconNode);
            liDivNode.appendChild(spanTextNode);
            spanTipNode.appendChild(tipIcon.node);
            spanIconNode.appendChild(icon.node);
            spanTextNode.innerText = itemList[i].text;
            if(itemList[i].hasOwnProperty('open') && itemList[i].open) {
                let ul = this.__getNodeOfItemUl(itemList[i].children, depth + 1);
                liNode.appendChild(ul);
            }
            ulNode.appendChild(liNode);
        }
        return ulNode
    }

    _setEvent(): void {
        let liEls = this.node.getElementsByTagName('li');
        for (let i = 0; i < liEls.length; i++) {
            let liEl = liEls[i];
            let ulEl = liEl.parentElement;
            let tipEl = liEl.getElementsByClassName('owl-tree-tip-icon')[0];
            let textEl = liEl.getElementsByClassName('owl-tree-text')[0];
            tipEl.addEventListener('click', function (e) {
                let isOpen = OWLNODE.hasClass(this, 'owl-tree-tip-open');
                if(isOpen) {
                    this.classList.remove('owl-tree-tip-open')
                } else {
                    this.classList.add('owl-tree-tip-open')
                }
                e.stopPropagation();
            })
        }
    }

    _destroy() {

    }
}

export {TreeComponent}
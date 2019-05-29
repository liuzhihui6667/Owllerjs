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
    children?: Array<TreeItemList>
}

class TreeComponent extends Components {

    fit: boolean;
    itemHeight: string;
    itemList: Array<TreeItemList>;
    constructor(itemList: Array<TreeItemList>, itemHeight?: string) {
        super();
        this.itemList = itemList;
        this.itemHeight = this._checkParam(itemHeight, '34px');
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
            let spanIconNode = this._createElement('span', ['owl-tree-item-icon']);
            let spanTextNode = this._createElement('span', ['owl-tree-text']);
            let tipIcon = new IconComponent('triangle', '16px', this.itemHeight, '#666');
            let folderIcon = new IconComponent('folder', '20px', this.itemHeight, '#666');
            liNode.appendChild(liDivNode);
            liDivNode.appendChild(spanTipNode);
            liDivNode.appendChild(spanIconNode);
            liDivNode.appendChild(spanTextNode);
            spanTipNode.appendChild(tipIcon.node);
            spanIconNode.appendChild(folderIcon.node);
            spanTextNode.innerText = itemList[i].text;
            if(itemList[i].hasOwnProperty('children') && itemList[i].children.length > 0) {
                let ul = this.__getNodeOfItemUl(itemList[i].children, depth + 1);
                liNode.appendChild(ul);
            }
            ulNode.appendChild(liNode);
        }
        return ulNode
    }

    _setEvent(): void {

    }

    _destroy() {

    }
}

export {TreeComponent}
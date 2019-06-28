/**
 * 该组件为导航栏组件
 * 实现如下功能
 * 1. 水平与垂直方向的导航栏功能
 * 2. 不同的主题风格
 */

import {Components} from '../../Interfaces/Component'
import '../../../Style/Navigation/index.less'
import {OWLNODE} from '../../OwlNode/OWLNODE'
import {IconComponent} from '../Icon/Icon'


interface NavigationList {
    text?: string;
    icon?: string;
    active?: boolean;
    to?: string;
    list?: Array<NavigationList>;
}

interface NavigationItemAttr {
    el: HTMLElement,
    itemLiCount: number,
    active: boolean
}

class NavigationComponent extends Components{
    /**
     * 导航栏方向
     */
    dir: string;
    /**
     * 初始是否显示全部item
     */
    showall: boolean;
    /**
     * 是否只显示一个item
     */
    onlyone: boolean;
    /**
     * 是否展示为菜单模式(不可收缩)
     */
    menu: boolean;
    /**
     * 是否自适应
     */
    fit: boolean;
    /**
     * item数组，用以渲染组件
     */
    itemlist: Array<NavigationList>;
    /**
     * 组件主题风格
     */
    theme: string;
    /**
     * 单元格高度
     */
    itemHeight: number;
    /**
     * 单元格宽度
     */
    itemWidth: number;
    constructor(dir?: string,
                itemlist?: Array<NavigationList>,
                showall?: boolean,
                onlyone?: boolean,
                menu?: boolean,
                theme?: string,
                fit?: boolean,
                itemHeight?: number,
                itemWidth?: number) {
        super()
        this.dir = this._checkParam(dir, 'v');
        this.itemlist = this._checkParam(itemlist, []);
        this.showall = this._checkParam(showall, false);
        this.onlyone = this._checkParam(onlyone,false);
        this.menu = this._checkParam(menu, false);
        this.fit = this._checkParam(fit, false);
        this.theme = this._checkParam(theme, 'lighter');
        this.itemHeight = itemHeight === 0 ? (dir === 'v' ? 45 : 60) : itemHeight;
        this.itemWidth = itemWidth === 0 ? (dir === 'h' ? 60 : 250) : itemWidth;
        this.init()
    }

    init() {
        this._getTemplate();
        this._setEvent()
    }

    _setEvent() {
        if(this.dir === 'v') {
            this.__setEventV();
        } else {

        }
    }

    __setEventV() {
        let that = this;
        let li = that.node.getElementsByTagName('li');
        for (let index = 0; index < li.length; index++) {
            li[index].addEventListener('click', function (e) {
                //展开
                if(this.getElementsByTagName('ul').length > 0) {
                    if(!that.menu) {
                        let firstUl = this.getElementsByTagName('ul')[0];
                        let cCount = firstUl.childElementCount;   //子节点数量
                        let open = parseInt(firstUl.style.height) <= 0;
                        if(that.onlyone) {
                            let opHeight = 0;
                            if(open) {
                                opHeight = that.itemHeight * cCount;
                                let ul = that.node.getElementsByTagName('ul');
                                for (let index = 0; index < ul.length; index++) {
                                    if(!OWLNODE.hasClass(ul[index], 'owl-nav-wrapper-v-root')) {
                                        ul[index].style.height = '0px'
                                    }
                                }
                                let openNodes = that.node.getElementsByClassName('owl-nav-open-icon-open'), openNodesLength = openNodes.length
                                for (let i = 0; i < openNodesLength; i++) {
                                    openNodes[0].classList.remove('owl-nav-open-icon-open')
                                }
                            } else {
                                opHeight = isNaN(parseInt(firstUl.style.height)) ? 0 : parseInt(firstUl.style.height);
                                let l = this.getElementsByClassName('owl-nav-open-icon')
                                for(let index = 0; index < l.length; index++ ) {
                                    l[index].classList.remove('owl-nav-open-icon-open')
                                }
                                let childrenUls = this.getElementsByTagName('ul');
                                for(let index = 0; index < childrenUls.length; index++ ) {
                                    childrenUls[index].style.height = '0px'
                                }
                            }
                            that.__setParentUlNodeHeight(firstUl, opHeight, open);
                        } else {
                            let opHeight = 0;
                            if(open) {
                                this.getElementsByClassName('owl-nav-open-icon')[0].classList.add('owl-nav-open-icon-open')
                                opHeight = that.itemHeight * cCount;
                            } else {
                                opHeight = isNaN(parseInt(firstUl.style.height)) ? 0 : parseInt(firstUl.style.height);
                                let l = this.getElementsByClassName('owl-nav-open-icon')
                                for(let index = 0; index < l.length; index++ ) {
                                    l[index].classList.remove('owl-nav-open-icon-open')
                                }
                                let childrenUls = this.getElementsByTagName('ul');
                                for(let index = 0; index < childrenUls.length; index++ ) {
                                    childrenUls[index].style.height = '0px'
                                }
                            }
                            that.__setParentUlNodeHeight(firstUl, opHeight, open);
                        }
                    }
                } else {
                    //字体变为active
                    let activeEls = that.node.getElementsByClassName('owl-nav-item-v-active');
                    let activeCount = activeEls.length;
                    for(let index = 0; index < activeCount; index++) {
                        activeEls[0].classList.remove('owl-nav-item-v-active')
                    }
                    let activeEl = this.getElementsByTagName('span')[0];
                    activeEl.classList.add('owl-nav-item-v-active');
                    //子节点
                    console.log('leaf')
                }
                e.stopPropagation()
            })
        }
    }

    __setParentUlNodeHeight(ulNode: HTMLElement, opHeight: number, open: boolean): void {
        if(OWLNODE.hasClass(ulNode, 'owl-nav-wrapper-v-root')) {
            return
        }
        let pNode = ulNode.parentElement.parentElement;
        if(this.onlyone) {
            let cCount = pNode.childElementCount
            let opH = 0;
            if(open) {
                let iconEl = ulNode.parentElement.getElementsByClassName('owl-nav-open-icon')[0]
                iconEl.classList.add('owl-nav-open-icon-open');
                ulNode.style.height = opHeight + 'px';
                opH = opHeight + this.itemHeight * cCount;
            } else {
                let ulNodeHeight = isNaN(parseInt(ulNode.style.height)) ? 0 : parseInt(ulNode.style.height);
                ulNode.style.height = ulNodeHeight - opHeight + 'px';
                opH = opHeight;
            }
            this.__setParentUlNodeHeight(pNode, opH, open);
        } else {
            let ulNodeHeight = isNaN(parseInt(ulNode.style.height)) ? 0 : parseInt(ulNode.style.height);
            if(open) {
                ulNode.style.height = ulNodeHeight + opHeight + 'px';
            } else {
                ulNode.style.height = ulNodeHeight - opHeight + 'px';
            }
            if(!OWLNODE.hasClass(pNode, 'owl-nav-wrapper-v-root')) {
                this.__setParentUlNodeHeight(pNode, opHeight, open);
            }
        }
    }

    _getTemplate() {
        if(this.node !== undefined) {
            return this.node
        }
        this.node = this.__getNode();
        return this.node
    }

    __getNode(): Element {
        switch (this.dir) {
            case 'v':
                return this.__getTemplateV();
            case 'h':
                return this.__getTemplateH();
            default:
                return document.createElement('div')
        }
    }

    __getTemplateV(): HTMLElement {
        let node = this._createElement('div', ['owl-nav-container', 'owl-nav-theme-' + this.theme]);
        node.style.width = this.fit ? '100%' : this.itemWidth + 'px';
        let ulNodeAttr = this.__getItemNodeV(this.itemlist, 0);
        node.appendChild(ulNodeAttr.el);
        return node
    }

    __getTemplateH(): HTMLElement {
        let template = document.createElement('div');
        return template
    }

    __getItemNodeV(itemlist: Array<NavigationList>, depth: number): NavigationItemAttr {
        let ulNode = this._createElement('ul', ['owl-nav-wrapper', 'owl-nav-wrapper-v']);
        if(depth === 0) {
            ulNode.classList.add('owl-nav-wrapper-v-root');
        }
        let allLeaf = true;//假设都为子节点
        let itemLiCount = 0;//需要展开的li节点数量
        let active: boolean = false;//该节点是否展开
        for (let index in itemlist) {
            let isActive = false;
            let isLeaf = true;
            if(itemlist[index].hasOwnProperty('list') && itemlist[index].list.length > 0) {
                allLeaf = false;
                isLeaf = false;
            }
            if(itemlist[index].list.length === 0 && (itemlist[index].active || window.location.pathname === itemlist[index].to)) {
                active = true;
                isActive = true;
            }
            //li标签
            let liNode = this._createElement('li', ['owl-nav-item-v']);
            let spanNode = this._createElement('span', ['owl-nav-item-text-wrapper']);
            if(depth === 0) {
                spanNode.style.height = this.itemHeight + 2 + 'px';
                spanNode.style.lineHeight = this.itemHeight + 2 + 'px';
            } else {
                spanNode.style.height = this.itemHeight + 'px';
                spanNode.style.lineHeight = this.itemHeight + 'px';
            }
            let cSpanNode = this._createElement('span', ['owl-nav-item-text']);
            cSpanNode.innerText = itemlist[index]['text'];
            if(itemlist[index].hasOwnProperty('icon') && itemlist[index].icon !== '') {
                let icon = new IconComponent(itemlist[index].icon, '16px', '16px');
                var iconNode = icon._getTemplate();
                iconNode.classList.add('owl-nav-icon');
                spanNode.appendChild(iconNode);
            }
            spanNode.appendChild(cSpanNode);
            liNode.appendChild(spanNode);

            //阶梯状处理
            spanNode.style.paddingLeft = (depth * 13) + 20 + 'px';
            if(isActive && isLeaf) {
                spanNode.classList.add('owl-nav-item-v-active');
            }

            //可有可无，可以由绑定事件来解决
            if(itemlist[index].hasOwnProperty('to') && itemlist[index].to !== '') {
                liNode.addEventListener('click', function () {
                    window.location.href = itemlist[index].to;
                })
            }

            if(itemlist[index].hasOwnProperty('list') && itemlist[index].list.length > 0) {
                let itemAttr = this.__getItemNodeV(itemlist[index].list, depth + 1);
                itemLiCount = itemLiCount + itemAttr.itemLiCount;
                active = active ? active : itemAttr.active;
                if(!this.menu) {
                    let openIcon = new IconComponent('bottom');
                    let openIconNode = openIcon._getTemplate();
                    openIconNode.classList.add('owl-nav-open-icon');
                    if(this.showall || itemAttr.active) {
                        openIconNode.classList.add('owl-nav-open-icon-open');
                    }
                    spanNode.appendChild(openIconNode);
                } else {
                    if(depth === 0) {
                        spanNode.style.fontSize = '15px';
                    }
                    spanNode.style.cursor = 'initial';
                    let fColor = '';
                    if(this.theme === 'light') {
                        fColor = '#fff'
                    } else {
                        fColor = '#999'
                    }
                    spanNode.style.color = fColor;
                    if(typeof iconNode === 'object') {
                        iconNode.getElementsByTagName('path')[0].style.fill = fColor;
                        iconNode.getElementsByTagName('path')[0].style.stroke = fColor
                    }
                }
                liNode.appendChild(itemAttr.el);
            }
            ulNode.appendChild(liNode)
        }
        //返回的li节点数量
        if(this.menu || this.showall) {
            itemLiCount = itemLiCount + itemlist.length;
        } else {
            if(active) {
                if(allLeaf) {
                    itemLiCount = itemlist.length;
                } else {
                    itemLiCount = itemlist.length + itemLiCount;
                }
            }
        }
        if(depth !== 0) {
            ulNode.style.height = this.itemHeight * itemLiCount + 'px';
        }

        return {
            el: ulNode,
            itemLiCount: itemLiCount,
            active: active
        }
    }
}

export {NavigationComponent, NavigationList}

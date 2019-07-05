/**
 * 该组件为分页器
 * 实现功能如下
 * 1. 分页器基本功能
 * 2. 支持不同主题更换
 */

import {Components} from '../../Interfaces/Component'
import '../../../Style/Pagination/index.less'
import {OWLNODE} from '../../OwlNode/OWLNODE'


class PaginationComponent extends Components {
    /**
     * item总数
     */
    totalItemCount: number;
    /**
     * 当前页码数
     */
    curPage: number;
    /**
     * 每页展示item数量
     */
    pageSize: number;
    /**
     * 总页数,不需要传入，自动计算得出
     */
    totalPage: number;
    /**
     * 主题
     */
    theme: string;
    onChangeCallback: (pageNum: number) => void;
    constructor(totalItemCount?: number,
                pageSize?: number,
                curPage?: number,
                theme?: string) {
        super();
        this.totalItemCount = totalItemCount === undefined ? 0 : totalItemCount;
        this.pageSize = pageSize === undefined ? 15 : pageSize;
        this.curPage = curPage === undefined ? 1 : curPage;
        this.totalPage = this.totalItemCount === 0 ? 0 : Math.ceil(this.totalItemCount/this.pageSize);
        this.theme = theme === undefined ? 'dark' : theme;
        this.init()
    }
    init(): void {
        this._getTemplate();
        this._setEvent()
    }
    _getTemplate(): Element {
        if(this.node !== undefined) {
            return this.node
        }
        this.node = this.__getNode();
        return this.node
    }

    __getNode(): HTMLElement {
        let node = this._createElement('div', ['owl-page-container', 'owl-page-theme-' + this.theme]);
        let ulNode = this._createElement('ul', ['owl-page-wrapper']);
        let preLi = this._createElement('li');
        preLi.setAttribute('title', '上一页');
        if(this.curPage === 1) {
            preLi.classList.add('owl-page-item-disabled')
        } else {
            preLi.classList.add('owl-page-item')
        }
        preLi.classList.add('owl-page-item-pre');
        preLi.innerText = '上一页';
        ulNode.appendChild(preLi);
        for (let i = 1; i <= this.totalPage; i++) {
            if((this.curPage - i < 3 && i - this.curPage < 3) || i === 1 || i === this.totalPage) {
                let liNode = this.__createCommonLiNode(i);
                ulNode.appendChild(liNode)
            } else if(this.curPage - i === 3 && this.curPage > 1) {
                if(i === 2) {
                    let liNode = this.__createCommonLiNode(i);
                    ulNode.appendChild(liNode)
                } else {
                    let liMorePre = this._createElement('li', ['owl-page-item', 'owl-page-item-more-pre']);
                    liMorePre.setAttribute('title', '向前五页');
                    liMorePre.dataset.page = (this.curPage-5).toString();
                    liMorePre.innerText = '...';
                    ulNode.appendChild(liMorePre);
                }
            } else if(i - this.curPage === 3 && this.curPage < this.totalPage) {
                if(i === this.totalPage - 1) {
                    let liNode = this.__createCommonLiNode(i);
                    ulNode.appendChild(liNode)
                } else {
                    let liMoreNext = this._createElement('li', ['owl-page-item', 'owl-page-item-more-next']);
                    liMoreNext.setAttribute('title', '向后五页');
                    liMoreNext.dataset.page = (this.curPage+5).toString();
                    liMoreNext.innerText = '...';
                    ulNode.appendChild(liMoreNext);
                }
            }
        }
        let nextLi = this._createElement('li', ['owl-page-item-next']);
        nextLi.setAttribute('title', '下一页');
        if(this.curPage === this.totalPage) {
            nextLi.classList.add('owl-page-item-disabled')
        } else {
            nextLi.classList.add('owl-page-item')
        }
        nextLi.innerText = '下一页';
        ulNode.appendChild(nextLi);
        node.appendChild(ulNode);
        return node
    }

    __createCommonLiNode(pageNum: number): Element {
        let liNode = this._createElement('li', ['owl-page-item']);
        liNode.dataset.page = pageNum.toString();
        if(this.curPage === pageNum) {
            liNode.classList.add('owl-page-item-cur')
        }
        liNode.innerText = pageNum.toString();
        return liNode
    }

    _setEvent(): void {
        let numNodes = this.node.getElementsByClassName('owl-page-item');
        let that = this;
        for (let i = 0; i < numNodes.length; i++) {
            numNodes[i].addEventListener('click', function () {
                let pageNum = parseInt(this.dataset.page);
                if(that.curPage === pageNum) {
                    return
                }
                if(OWLNODE.hasClass(this, 'owl-page-item-pre') && that.curPage > 1) {
                    that.curPage--
                } else if(OWLNODE.hasClass(this, 'owl-page-item-next') && that.curPage < that.totalPage) {
                    that.curPage++
                } else if(this.dataset.hasOwnProperty('page')){
                    that.curPage = parseInt(this.dataset.page)
                }
                if(that.onChangeCallback !== undefined) {
                    that.onChangeCallback(that.curPage)
                }
                that.node.replaceChild(that.__getNode().getElementsByClassName('owl-page-wrapper')[0], that.node.getElementsByClassName('owl-page-wrapper')[0]);
                that._setEvent()
            })
        }
    }

    setChangeCallback(callback): void {
        this.onChangeCallback = callback
    }
}

export {PaginationComponent}
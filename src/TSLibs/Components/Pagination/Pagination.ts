import {Components} from '../../Interfaces/Component'
import {OWLNODE} from '../../OwlNode/OWLNODE'
import '../../../Style/Pagination/index.less'
import {IconComponent} from "../Icon/Icon";


class PaginationComponent extends Components {

    totalItemCount: number;
    curPage: number;
    pageSize: number;
    totalPage: number;
    theme: string;
    onChangCallback: (pageNum: number) => void;
    constructor(totalItemCount?: number, pageSize?: number, curPage?: number, theme?: string, onChange?: (pageNum: number) => void) {
        super()
        this.totalItemCount = totalItemCount === undefined ? 0 : totalItemCount
        this.pageSize = pageSize === undefined ? 1 : pageSize
        this.curPage = curPage === undefined ? 1 : curPage
        this.totalPage = this.totalItemCount === 0 ? 0 : Math.ceil(this.totalItemCount/this.pageSize)
        this.theme = theme === undefined ? 'dark' : theme
        this.onChangCallback = onChange === undefined ? undefined : onChange
        this.init()
    }
    init(): void {
        this._getTemplate()
        this._setEvent()
    }
    _getTemplate(): Element {
        if(this.node !== undefined) {
            return this.node
        }
        this.node = this.__getNode()
        return this.node
    }

    __getNode(): Element {
        let node = document.createElement('div')
        node.classList.add('owl-page-container')
        node.classList.add('owl-page-theme-' + this.theme)
        let ulNode = document.createElement('ul')
        ulNode.classList.add('owl-page-wrapper')
        let preLi = document.createElement('li')
        preLi.setAttribute('title', '上一页')
        if(this.curPage === 1) {
            preLi.classList.add('owl-page-item-disabled')
        } else {
            preLi.classList.add('owl-page-item')
        }
        preLi.classList.add('owl-page-item-pre')
        preLi.innerText = '上一页'
        ulNode.appendChild(preLi)
        for (let i = 1; i <= this.totalPage; i++) {
            if((this.curPage - i < 3 && i - this.curPage < 3) || i === 1 || i === this.totalPage) {
                let liNode = this.__createCommonLiNode(i)
                ulNode.appendChild(liNode)
            } else if(this.curPage - i === 3 && this.curPage > 1) {
                if(i === 2) {
                    let liNode = this.__createCommonLiNode(i)
                    ulNode.appendChild(liNode)
                } else {
                    let liMorePre = document.createElement('li')
                    liMorePre.setAttribute('title', '向前五页')
                    liMorePre.dataset.page = (this.curPage-5).toString()
                    liMorePre.classList.add('owl-page-item')
                    liMorePre.classList.add('owl-page-item-more-pre')
                    liMorePre.innerText = '...'
                    ulNode.appendChild(liMorePre)
                }
            } else if(i - this.curPage === 3 && this.curPage < this.totalPage) {
                if(i === this.totalPage - 1) {
                    let liNode = this.__createCommonLiNode(i)
                    ulNode.appendChild(liNode)
                } else {
                    let liMoreNext = document.createElement('li')
                    liMoreNext.setAttribute('title', '向后五页')
                    liMoreNext.dataset.page = (this.curPage+5).toString()
                    liMoreNext.classList.add('owl-page-item')
                    liMoreNext.classList.add('owl-page-item-more-next')
                    liMoreNext.innerText = '...'
                    ulNode.appendChild(liMoreNext)
                }
            }
        }
        let nextLi = document.createElement('li')
        nextLi.setAttribute('title', '下一页')
        if(this.curPage === this.totalPage) {
            nextLi.classList.add('owl-page-item-disabled')
        } else {
            nextLi.classList.add('owl-page-item')
        }
        nextLi.classList.add('owl-page-item-next')
        nextLi.innerText = '下一页'
        ulNode.appendChild(nextLi)
        node.appendChild(ulNode)
        return node
    }

    __createCommonLiNode(pageNum: number): Element {
        let liNode = document.createElement('li')
        liNode.classList.add('owl-page-item')
        liNode.dataset.page = pageNum.toString()
        if(this.curPage === pageNum) {
            liNode.classList.add('owl-page-item-cur')
        }
        liNode.innerText = pageNum.toString()
        return liNode
    }

    _setEvent(): void {
        let numNodes = this.node.getElementsByClassName('owl-page-item')
        let that = this
        for (let i = 0; i < numNodes.length; i++) {
            numNodes[i].addEventListener('click', function (e) {
                let pageNum = parseInt(this.dataset.page)
                if(that.curPage === pageNum) {
                    return
                }
                if(that.onChangCallback !== undefined) {
                    that.onChangCallback(pageNum)
                }
                let activeNode = that.node.getElementsByClassName('owl-page-item-cur')
                if(OWLNODE.hasClass(this, 'owl-page-item-pre') && that.curPage > 1) {
                    that.curPage--
                } else if(OWLNODE.hasClass(this, 'owl-page-item-next') && that.curPage < that.totalPage) {
                    that.curPage++
                } else if(this.dataset.hasOwnProperty('page')){
                    that.curPage = parseInt(this.dataset.page)
                }
                that.node.replaceChild(that.__getNode().getElementsByClassName('owl-page-wrapper')[0], that.node.getElementsByClassName('owl-page-wrapper')[0])
                that._setEvent()
            })
        }
    }

}

export {PaginationComponent}
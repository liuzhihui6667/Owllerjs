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
        this.totalPage = this.totalItemCount === 0 ? 0 : this.totalItemCount/this.pageSize
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
        let node = document.createElement('div')
        node.classList.add('owl-page-container')
        node.classList.add('owl-page-theme-' + this.theme)
        let ulNode = document.createElement('ul')
        ulNode.classList.add('owl-page-wrapper')
        let preLi = document.createElement('li')
        preLi.classList.add('owl-page-item')
        preLi.classList.add('owl-page-item-pre')
        preLi.dataset.page = (this.curPage-1).toString()
        preLi.innerText = '上一页'
        ulNode.appendChild(preLi)
        for (let i = 1; i <= this.totalPage; i++) {
            if((this.curPage - i < 3 && i - this.curPage < 3) || i === 1 || i === this.totalPage) {
                let liNode = document.createElement('li')
                liNode.classList.add('owl-page-item')
                liNode.dataset.page = i.toString()
                if(this.curPage === i) {
                    liNode.classList.add('owl-page-item-cur')
                }
                liNode.innerText = i.toString()
                ulNode.appendChild(liNode)
            } else if(this.curPage - i === 3 && this.curPage > 1) {
                let liMorePre = document.createElement('li')
                liMorePre.classList.add('owl-page-item')
                liMorePre.classList.add('owl-page-item-more-pre')
                liMorePre.innerText = '...'
                ulNode.appendChild(liMorePre)
            } else if(i - this.curPage === 3 && this.curPage < this.totalPage) {
                let liMorePre = document.createElement('li')
                liMorePre.classList.add('owl-page-item')
                liMorePre.classList.add('owl-page-item-more-pre')
                liMorePre.innerText = '...'
                ulNode.appendChild(liMorePre)
            }
        }
        let nextLi = document.createElement('li')
        nextLi.classList.add('owl-page-item')
        nextLi.classList.add('owl-page-item-next')
        nextLi.dataset.page = (this.curPage+1).toString()
        nextLi.innerText = '下一页'
        ulNode.appendChild(nextLi)
        node.appendChild(ulNode)
        this.node = node
        return this.node;
    }

    _setEvent(): void {
        let numNodes = this.node.getElementsByClassName('owl-page-item')
        let that = this
        for (let i = 0; i < numNodes.length; i++) {
            numNodes[i].addEventListener('click', function (e) {
                let pageNum = parseInt(this.dataset.page)
                if(that.onChangCallback !== undefined) {
                    that.onChangCallback(pageNum)
                }
            })
        }
    }

}

export {PaginationComponent}
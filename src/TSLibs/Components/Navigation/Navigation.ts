import {Components} from '../../Interfaces/Component'
import {OWLNODE} from '../../OwlNode/OWLNODE'
import {IconComponent} from '../../Components/Icon/Icon'
import '../../../Style/Navigation/index.less'

interface NavigationList {
    text?: string;
    icon?: string;
    active?: boolean;
    to?: string;
    list?: Array<NavigationList>;
}

export class NavigationComponent extends Components{
    dir: string;
    showall: boolean;
    onlyone: boolean;
    menu: boolean;
    itemlist: Array<NavigationList>;
    theme: string;
    constructor(dir?: string, itemlist?: Array<NavigationList>, showall?: boolean, onlyone?: boolean, menu?: boolean, theme?: string) {
        super()
        this.dir = dir === undefined ? 'v' : dir
        this.itemlist = itemlist === undefined ? [] : itemlist
        this.showall = showall === undefined ? false : showall
        this.onlyone = onlyone === undefined ? false : onlyone
        this.menu = menu === undefined ? false : menu
        this.theme = theme === undefined ? 'lighter' : theme
        this.init()
    }

    init() {
        this._getTemplate();
        this._setEvent()
    }

    _setEvent() {
        let that = this
        let li = that.node.getElementsByTagName('li')
        if(this.dir === 'v') {
            let itemHeight = 45
            for (let index = 0; index < li.length; index++) {
                li[index].addEventListener('click', function (e) {
                    //展开
                    if(this.getElementsByTagName('ul').length > 0) {
                        if(!that.menu) {
                            let pNode = this.parentElement     //父节点
                            let firstUl = this.getElementsByTagName('ul')[0]
                            let sCount = pNode.childElementCount    //兄弟节点数量
                            let cCount = firstUl.childElementCount   //子节点数量
                            let isOpen = parseInt(firstUl.style.height) > 0 ? true : false
                            if(that.onlyone) {
                                let ul = that.node.getElementsByTagName('ul')
                                for (let index = 0; index < ul.length; index++) {
                                    if(!OWLNODE.hasClass(ul[index], 'owl-nav-wrapper-v-root')) {
                                        ul[index].style.height = '0px'
                                    }
                                }
                                let openNodes = that.node.getElementsByClassName('owl-nav-open-icon-open'), openNodesLength = openNodes.length
                                for (let i = 0; i < openNodesLength; i++) {
                                    openNodes[0].classList.remove('owl-nav-open-icon-open')
                                }
                                if(isOpen) {
                                    if(OWLNODE.hasClass(this.parentElement.parentElement, 'owl-nav-first')) {
                                        this.parentElement.parentElement.getElementsByClassName('owl-nav-open-icon')[0].classList.add('owl-nav-open-icon-open')
                                    }
                                    let open = this.getElementsByClassName('owl-nav-open-icon')
                                    for(let index = 0; index < open.length; index++ ) {
                                        open[index].classList.remove('owl-nav-open-icon-open')
                                    }
                                    if(!OWLNODE.hasClass(pNode, 'owl-nav-wrapper-v-root')) {
                                        pNode.style.height = itemHeight * sCount + 'px'
                                    }
                                    firstUl.style.height = '0px'
                                } else {
                                    this.getElementsByClassName('owl-nav-open-icon')[0].classList.add('owl-nav-open-icon-open')
                                    if(OWLNODE.hasClass(this.parentElement.parentElement, 'owl-nav-first')) {
                                        this.parentElement.parentElement.getElementsByClassName('owl-nav-open-icon')[0].classList.add('owl-nav-open-icon-open')
                                    }
                                    if(!OWLNODE.hasClass(pNode, 'owl-nav-wrapper-v-root')) {
                                        pNode.style.height = itemHeight * (sCount + cCount) + 'px'
                                    }
                                    firstUl.style.height = itemHeight * cCount + 'px'
                                }
                            } else {
                                if(isOpen) {
                                    let l = this.getElementsByClassName('owl-nav-open-icon')
                                    for(let index = 0; index < l.length; index++ ) {
                                        l[index].classList.remove('owl-nav-open-icon-open')
                                    }
                                    let u = this.getElementsByTagName('ul')
                                    for(let index = 0; index < u.length; index++ ) {
                                        u[index].style.height = '0px'
                                    }
                                } else {
                                    this.getElementsByClassName('owl-nav-open-icon')[0].classList.add('owl-nav-open-icon-open')
                                    firstUl.style.height = itemHeight * cCount + 'px'
                                }
                                if(!OWLNODE.hasClass(pNode, 'owl-nav-wrapper-v-root')) {
                                    let pNodeHeight = 0
                                    let u = pNode.getElementsByTagName('ul')
                                    for(let index = 0; index < u.length; index++ ) {
                                        pNodeHeight += isNaN(parseInt(u[index].style.height)) ? 0 : parseInt(u[index].style.height)
                                    }
                                    pNodeHeight += sCount * itemHeight
                                    pNode.style.height = pNodeHeight + 'px'
                                }
                            }
                        }
                    } else {
                        //字体变为active
                        let e = that.node.getElementsByClassName('owl-nav-item-v-active')
                        for(let index = 0; index < e.length; index++) {
                            e[index].classList.remove('owl-nav-item-v-active')
                        }
                        this.getElementsByTagName('span')[0].classList.add('owl-nav-item-v-active')
                        //子节点
                        console.log('leaf')
                    }
                    e.stopPropagation()
                })
            }
        } else {
            for (let index = 0; index < li.length; index++) {
                li[index].addEventListener('click', function (e) {
                    let ha = that.node.getElementsByClassName('owl-nav-item-h-active')
                    for(let index = 0; index < ha.length; index++) {
                        ha[index].classList.remove('owl-nav-item-h-active')
                    }
                    this.getElementsByTagName('span')[0].classList.add('owl-nav-item-h-active')
                    e.stopPropagation()
                })
            }
        }
    }

    _getTemplate() {
        if(this.node !== undefined) {
            return this.node
        }
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
        let node = document.createElement('div')
        node.classList.add('owl-nav-container')
        node.classList.add('owl-nav-theme-' + this.theme)
        let ulNode = this.__getItemNodeV(this.itemlist, true)
        node.appendChild(ulNode)
        let itemHeight = 45
        if(this.showall || this.menu) {
            let u = node.getElementsByTagName('ul')
            for(let index = 0; index < u.length; index++) {
                if(OWLNODE.hasClass(u[index], 'owl-nav-wrapper-v-root')) {
                    continue
                }
                let lCount = u[index].getElementsByTagName('li').length
                u[index].style.height = lCount * itemHeight + 'px'
            }
            if(node.getElementsByClassName('owl-nav-leaf-active').length > 0) {
                node.getElementsByClassName('owl-nav-leaf-active')[0].getElementsByClassName('owl-nav-item-text-wrapper')[0].classList.add('owl-nav-item-v-active')
            }
            let open = node.getElementsByClassName('owl-nav-open-icon')
            for (let index = 0; index < open.length; index++) {
                open[index].classList.add('owl-nav-open-icon-open')
            }
        } else {
            let leafActive = node.getElementsByClassName('owl-nav-leaf-active')
            for(let index = 0; index < leafActive.length; index++) {
                leafActive[index].getElementsByClassName('owl-nav-item-text-wrapper')[0].classList.add('owl-nav-item-v-active')
                let sCount = leafActive[index].parentNode.childNodes.length
                leafActive[index].parentElement.style.height = itemHeight * sCount + 'px'
                let rootUl = leafActive[index].parentNode.parentElement.parentElement
                //小三角
                leafActive[index].parentElement.parentElement.getElementsByClassName('owl-nav-open-icon')[0].classList.add('owl-nav-open-icon-open')
                if(rootUl.parentNode.parentNode !== null && OWLNODE.hasClass(rootUl.parentElement.parentElement, 'owl-nav-wrapper-v-root')) {
                    rootUl.parentElement.getElementsByClassName('owl-nav-open-icon')[0].classList.add('owl-nav-open-icon-open')
                }
                if(OWLNODE.hasClass(rootUl, 'owl-nav-wrapper-v-root')) {
                    let pNodeHeight = 0
                    let u = rootUl.getElementsByTagName('ul')
                    for(let index = 0; index < u.length; index++) {
                        pNodeHeight += isNaN(parseInt(u[index].style.height)) ? 0 : parseInt(u[index].style.height)
                    }
                    pNodeHeight += rootUl.childNodes.length * itemHeight
                    // rootUl.style.height = pNodeHeight + 'px'
                }
            }
        }
        this.node = node
        return node
    }

    __getTemplateH(): HTMLElement {
        let template = document.createElement('div');
        return template
    }

    __getItemNodeV(itemlist: Array<NavigationList>, root: boolean = false): HTMLElement {
        let ulNode = document.createElement('ul')
        ulNode.classList.add('owl-nav-wrapper')
        ulNode.classList.add('owl-nav-wrapper-v')
        if(root) {
            ulNode.classList.add('owl-nav-wrapper-v-root')
        }
        for (let index in itemlist) {
            let liNode = document.createElement('li')
            liNode.classList.add('owl-nav-item-v')
            if(root) {
                liNode.classList.add('owl-nav-first')
            }
            let spanNode = document.createElement('span')
            spanNode.classList.add('owl-nav-item-text-wrapper')
            spanNode.classList.add('owl-nav-v-item-text-wrapper')
            let cSpanNode = document.createElement('span')
            cSpanNode.classList.add('owl-nav-item-text')
            cSpanNode.innerText = itemlist[index]['text']
            if(itemlist[index].hasOwnProperty('icon') && itemlist[index].icon !== '') {
                let icon = new IconComponent(itemlist[index].icon, '16px', '16px')
                var iconNode = icon._getTemplate()
                iconNode.classList.add('owl-nav-icon')
                spanNode.appendChild(iconNode)
            }
            spanNode.appendChild(cSpanNode)
            liNode.appendChild(spanNode)
            if(itemlist[index].hasOwnProperty('to') && itemlist[index].to !== '') {
                liNode.addEventListener('click', function () {
                    window.location.href = itemlist[index].to
                })
            }
            if(itemlist[index].hasOwnProperty('list') && itemlist[index].list.length > 0) {
                // todo 优化这儿
                if(!this.menu) {
                    let openIcon = new IconComponent('bottom')
                    let openIconNode = openIcon._getTemplate()
                    openIconNode.classList.add('owl-nav-open-icon')
                    spanNode.appendChild(openIconNode)
                } else {
                    if(root) {
                        spanNode.style.fontSize = '15px'
                        spanNode.style.paddingLeft = '20px'
                    } else {
                        spanNode.style.paddingLeft = '30px'
                    }
                    spanNode.style.cursor = 'initial'
                    let fColor = ''
                    if(this.theme === 'light') {
                        fColor = '#fff'
                    } else {
                        fColor = '#999'
                    }
                    spanNode.style.color = fColor
                    if(typeof iconNode === 'object') {
                        iconNode.getElementsByTagName('path')[0].style.fill = fColor
                        iconNode.getElementsByTagName('path')[0].style.stroke = fColor
                    }
                }
                liNode.appendChild(this.__getItemNodeV(itemlist[index].list))
            }
            if(!itemlist[index].hasOwnProperty('list') && itemlist[index].active || window.location.pathname === itemlist[index].to) {
                liNode.classList.add('owl-nav-leaf-active')
            }
            ulNode.appendChild(liNode)
        }
        return ulNode
    }
}

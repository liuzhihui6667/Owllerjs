import {Components} from '../../Interfaces/Component'
import '../../../Style/Roller/index.less'
import {IconComponent} from "../Icon/Icon";

class RollerComponent extends Components {
    curValue: number;
    loop: boolean;
    auto: boolean;
    speed: number;
    tip: string;
    height: string;
    width: string;
    itemList: Array<HTMLElement>;
    intervel: number;
    constructor(type?: string,
                curVulue?: number,
                itemList?: Array<HTMLElement>,
                loop?: boolean,
                auto?: boolean,
                speed?: number,
                tip?: string,
                height?: string,
                width?: string) {
        super()
        this.curValue = curVulue === undefined ? 0 : curVulue
        this.loop = loop === undefined ? false : loop
        this.auto = auto === undefined ? false : auto
        this.speed = speed === undefined ? 3000 : speed
        this.tip = tip === undefined ? 'none' : tip
        this.itemList = itemList === undefined ? [] : itemList
        this.height = height === undefined ? '250px' : height
        this.width = width === undefined ? '500px' : width
        this.init()
    }
    init(): void {
        this._getTemplate()
        this._setEvent()
    }
    _getTemplate(): Element {
        if(this.node !== undefined) {
            return this.node;
        }
        this.node = this.__getNode()
        return this.node
    }

    __getNode(): Element {
        let node = document.createElement('div')
        node.classList.add('owl-roller-container')
        node.style.height = this.height
        node.style.width = this.width
        let itemNodeWrapper = document.createElement('div')
        itemNodeWrapper.classList.add('owl-roller-item-container')
        let itemSliderWrapper = document.createElement('div')
        itemSliderWrapper.classList.add('owl-roller-item-slider-wrapper')
        itemNodeWrapper.appendChild(itemSliderWrapper)
        let tipWrapper = document.createElement('div')
        tipWrapper.classList.add('owl-roller-tip-wrapper')
        switch (this.tip) {
            case 'dot':
                tipWrapper.classList.add('owl-roller-tip-dot')
                break
            case 'line':
                tipWrapper.classList.add('owl-roller-tip-line')
                break
            default:
                tipWrapper.classList.add('owl-roller-tip-dot')
                break
        }
        for (let i = 0; i < this.itemList.length; i++) {
            let itemNode = document.createElement('div')
            itemNode.classList.add('owl-roller-item-wrapper')
            if(i === this.curValue) {
                itemNode.style.display = 'block'
                itemNode.classList.add('owl-roller-cur')
            }
            itemNode.style.transform = 'translateX(0)'
            let itemel = this.itemList[i]
            itemel.classList.add('owl-roller-item-box')
            itemNode.appendChild(itemel)
            itemSliderWrapper.appendChild(itemNode)
            if(this.tip !== 'none') {
                let tipItem = document.createElement('div')
                tipItem.classList.add('owl-roller-tip')
                tipItem.dataset.value = i.toString()
                if(i === this.curValue) {
                    tipItem.classList.add('owl-roller-tip-active')
                }
                tipWrapper.appendChild(tipItem)
            }
        }
        node.appendChild(itemNodeWrapper)
        let toolWrapper = document.createElement('div')
        toolWrapper.classList.add('owl-roller-tool-wrapper')
        let preToolNode = document.createElement('div')
        preToolNode.classList.add('owl-roller-tool')
        preToolNode.classList.add('owl-roller-tool-pre')
        let preIcon = new IconComponent('left', '14px', '40px')
        preToolNode.appendChild(preIcon.node)
        let nextToolNode = document.createElement('div')
        nextToolNode.classList.add('owl-roller-tool')
        nextToolNode.classList.add('owl-roller-tool-next')
        let nextIcon = new IconComponent('right', '14px', '40px')
        nextToolNode.appendChild(nextIcon.node)
        toolWrapper.appendChild(preToolNode)
        toolWrapper.appendChild(nextToolNode)
        node.appendChild(toolWrapper)
        node.appendChild(tipWrapper)
        return node
    }

    _setEvent(): void {
        let that = this
        this.node.getElementsByClassName('owl-roller-tool-next')[0].addEventListener('click', function (e) {
            that.__move('left')
            e.stopPropagation()
        })
        this.node.getElementsByClassName('owl-roller-tool-pre')[0].addEventListener('click', function (e) {
            that.__move('right')
            e.stopPropagation()
        })
        let tipNodes = this.node.getElementsByClassName('owl-roller-tip')
        for (let i = 0; i < tipNodes.length; i++) {
            tipNodes[i].addEventListener('click', function (e) {
                let value = parseInt(this.dataset.value)
                if(value < that.curValue) {
                    that.__move('right', that.curValue - value)
                }
                if(value > that.curValue) {
                    that.__move('left', value - that.curValue)
                }
                e.stopPropagation()
            })
        }
        if(this.auto) {
            this.__registInterval()
            this.node.getElementsByClassName('owl-roller-tool-next')[0].addEventListener('mouseover', function (e) {
                that.__clearInterval()
                e.stopPropagation()
            })
            this.node.getElementsByClassName('owl-roller-tool-next')[0].addEventListener('mouseleave', function (e) {
                that.__registInterval()
                e.stopPropagation()
            })
            this.node.getElementsByClassName('owl-roller-tool-pre')[0].addEventListener('mouseover', function (e) {
                that.__clearInterval()
                e.stopPropagation()
            })
            this.node.getElementsByClassName('owl-roller-tool-pre')[0].addEventListener('mouseleave', function (e) {
                that.__registInterval()
                e.stopPropagation()
            })
        }
    }

    __registInterval(): void {
        let that = this
        this.intervel = setInterval(function () {
            that.__move('left')
        }, this.speed)
    }

    __clearInterval(): void {
        clearInterval(this.intervel)
    }

    __move(dir: string, moveNum: number = 1): void {
        if(!this.loop) {
            if(dir === 'left' && this.curValue === this.itemList.length - 1 || dir === 'right' && this.curValue === 0) {
                return
            }
        }
        let wrapper = this.node.getElementsByClassName('owl-roller-item-slider-wrapper')[0]
        wrapper.style.width = 100 * (moveNum + 1) + '%'
        wrapper.style.left = 'none'
        wrapper.style.right = 'none'
        wrapper.style.transform = 'translate(0%)'
        wrapper.style.transition = 'none'
        let itemElList = wrapper.children
        for (let i = 0; i < this.itemList.length; i++) {
            itemElList[i].style.width = 1/(1+moveNum)*100 + '%'
            itemElList[i].style.transform = 'translateX(0%)'
            if(i !== this.curValue) {
                itemElList[i].style.display = 'none'
            }
        }
        let newValue: number
        switch (dir) {
            case 'left':
                newValue = (this.curValue + moveNum) % this.itemList.length
                this.__tipShow(this.curValue, newValue)
                wrapper.style.left = '0px'
                for (let i = 1; i <= moveNum; i++) {
                    let j = (this.curValue + i) % this.itemList.length
                    itemElList[j].style.display = 'block'
                    itemElList[j].style.transform = 'translateX('+100*i+'%)'
                }
                this.curValue = newValue
                setTimeout(function () {
                    wrapper.style.transition = 'transform .3s'
                    wrapper.style.transform = 'translateX(-' + 100 * moveNum/(moveNum + 1) + '%)'
                }, 10)
                break
            case 'right':
                newValue = (this.curValue - moveNum + this.itemList.length) % this.itemList.length
                this.__tipShow(this.curValue, newValue)
                wrapper.style.right = '0px'
                for (let i = 1; i <= moveNum; i++) {
                    let j = (this.curValue - i + this.itemList.length) % this.itemList.length
                    itemElList[j].style.display = 'block'
                    itemElList[j].style.transform = 'translateX(-'+100*i+'%)'
                }
                this.curValue = newValue
                setTimeout(() => {
                    wrapper.style.transition = 'transform .3s'
                    wrapper.style.transform = 'translateX(' + 100 * moveNum/(moveNum + 1) + '%)'
                }, 10)
                break
        }
    }

    __tipShow(oldValue: number, curValue: number): void {
        if(this.tip === 'none') {
            return
        }
        let tipNodes = this.node.getElementsByClassName('owl-roller-tip')
        tipNodes[oldValue].classList.remove('owl-roller-tip-active')
        tipNodes[curValue].classList.add('owl-roller-tip-active')
    }

    _destroy() {

    }
}

export {RollerComponent}
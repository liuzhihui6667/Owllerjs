import {Components} from '../../Interfaces/Component'
import {OWLNODE} from '../../OwlNode/OWLNODE'
import '../../../Style/Roller/index.less'
import {IconComponent} from "../Icon/Icon";

class RollerComponent extends Components {
    curValue: number;
    loop: boolean;
    auto: boolean;
    speed: number;
    tip: string;
    itemList: Array<HTMLElement>;
    constructor(curVulue?: number, itemList?: Array<HTMLElement>, loop?: boolean, auto?: boolean, speed?: number, tip?: string) {
        super()
        this.curValue = curVulue === undefined ? 0 : curVulue
        this.loop = loop === undefined ? false : loop
        this.auto = auto === undefined ? false : auto
        this.speed = speed === undefined ? 3000 : speed
        this.tip = tip === undefined ? 'none' : tip
        this.itemList = itemList === undefined ? [] : itemList
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
        let itemNodeWrapper = document.createElement('div')
        itemNodeWrapper.classList.add('owl-roller-item-container')
        let tipWrapper = document.createElement('div')
        tipWrapper.classList.add('owl-roller-tip-wrapper')
        for (let i = 0; i < this.itemList.length; i++) {
            let itemNode = document.createElement('div')
            itemNode.classList.add('owl-roller-item-wrapper')
            if(i === this.curValue) {
                itemNode.style.display = 'block'
                itemNode.classList.add('owl-roller-cur')
            }
            itemNode.style.transform = 'translateX(0)'
            let itemel = this.itemList[i]
            itemel.style.height = '100%'
            itemel.style.width = '100%'
            itemNode.appendChild(this.itemList[i])
            itemNodeWrapper.appendChild(itemNode)

            let tipItem = document.createElement('div')
            tipItem.classList.add('owl-roller-tip')
            if(i === this.curValue) {
                tipItem.classList.add('owl-roller-tip-active')
            }
            tipWrapper.appendChild(tipItem)
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
        })
    }

    __move(dir: string, moveNum: number = 1): void {
        let that = this
        let itemElList = this.node.getElementsByClassName('owl-roller-item-container')[0].children
        console.log(itemElList)
        switch (dir) {
            case 'left':
                for (let i = 0; i < this.itemList.length; i++) {
                    if(i !== this.curValue) {
                        itemElList[i].style.display = 'none'
                        itemElList[i].style.transform = 'translateX(0)'
                    }
                }
                for (let i = 1; i <= moveNum; i++) {
                    let j = (this.curValue + i) % this.itemList.length
                    itemElList[j].style.display = 'block'
                    itemElList[j].style.transform = 'translateX('+100*i+'%)'
                }
                this.curValue = (this.curValue + moveNum) % this.itemList.length
                setTimeout(() => {
                    for (let i = 0; i <= moveNum; i++) {
                        let j = (this.curValue - i + this.itemList.length) % this.itemList.length
                        itemElList[j].style.transform = 'translateX(-'+100*i+'%)'
                    }
                })
                break
        }
        // this.curValue = this.curValue%this.itemList.length
        console.log(this.curValue)
    }

}

export {RollerComponent}
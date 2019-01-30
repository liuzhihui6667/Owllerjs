import {Components} from '../../Interfaces/Component'
import '../../../Style/Roller/index.less'
import {IconComponent} from "../Icon/Icon";

class RollerComponent extends Components {
    /**
     * 滚动方向,默认左右滚动
     */
    dir: string;
    /**
     * 初始渲染展示子元素的序号，从0开始
     */
    curValue: number;
    /**
     * 是否循环展示
     */
    loop: boolean;
    /**
     * 是否自动播放
     */
    auto: boolean;
    /**
     * 自动播放间隔毫秒数, auto为false时该值无效
     */
    speed: number;
    /**
     * 指示器类型
     * dot: 点状指示器
     * line: 线状指示器
     * none: 不展示指示器
     */
    indicator: string;
    /**
     * 该组件的样式,默认为2d
     * 3d: 3d模式
     */
    type: string;
    /**
     * 一屏展示的子元素数目
     */
    showNum: number;
    /**
     * 一次滚动子元素的数目
     */
    scrollNum: number;
    /**
     * 整体高度,默认为250px
     */
    height: number;
    /**
     * 整体宽度,默认为500px
     */
    width: number;
    /**
     * 子元素数组列表
     */
    itemList: Array<HTMLElement>;
    /**
     * 定时器
     */
    intervel: number;

    itemWidth: number;

    itemHeight: number;

    itemNodesArr: Array<HTMLElement>;

    constructor(dir?: string,
                curVulue?: number,
                itemList?: Array<HTMLElement>,
                loop?: boolean,
                auto?: boolean,
                speed?: number,
                indicator?: string,
                type?: string,
                height?: number,
                width?: number,
                showNum?: number,
                scrollNum?: number) {
        super();
        this.dir = this._checkParam(dir, 'h');
        this.curValue = this._checkParam(curVulue, 0);
        this.loop = this._checkParam(loop, false);
        this.auto = this._checkParam(auto, false);
        this.speed = this._checkParam(speed, 3000);
        this.indicator = this._checkParam(indicator, 'default');
        this.type = this._checkParam(type, 'default');
        this.height = this._checkParam(height, 250);
        this.width = this._checkParam(width, 500);
        this.itemList = this._checkParam(itemList, []);
        this.showNum = this._checkParam(showNum, 1);
        this.scrollNum = this._checkParam(scrollNum, 1);
        if(this.dir === 'h') {
            this.itemWidth = 1/this.showNum*this.width
            this.itemHeight = this.height
        } else {
            this.itemWidth = this.width
            this.itemHeight = 1/this.showNum*this.height
        }
        this.itemNodesArr = []
        this.init()
    }
    init(): void {
        this._getTemplate()
        // this.__move('next', 1)
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
        node.style.height = this.height + 'px'
        node.style.width = this.width + 'px'
        let itemNodeWrapper = document.createElement('div')
        itemNodeWrapper.classList.add('owl-roller-item-container')
        // let tipWrapper = document.createElement('div')
        // tipWrapper.classList.add('owl-roller-tip-wrapper')
        // switch (this.indicator) {
        //     case 'dot':
        //         tipWrapper.classList.add('owl-roller-tip-dot')
        //         break
        //     case 'line':
        //         tipWrapper.classList.add('owl-roller-tip-line')
        //         break
        //     default:
        //         tipWrapper.classList.add('owl-roller-tip-dot')
        //         break
        // }
        // let itemWidth: number, itemHeight: number
        for (let i = this.curValue; i < (this.curValue + this.itemList.length); i++) {
            let itemNode = document.createElement('div')
            itemNode.classList.add('owl-roller-item-wrapper')
            itemNode.style.width = this.itemWidth + 'px'
            itemNode.style.height = this.itemHeight + 'px'
            if(i === this.curValue) {
                itemNode.classList.add('owl-roller-cur')
            }
            if(i >= this.curValue && i < (this.curValue + this.showNum)) {
                itemNode.style.visibility = 'visible'
                if(this.dir === 'h') {
                    itemNode.style.left = ((i - this.curValue)*this.itemWidth).toFixed(2) + 'px'
                } else {
                    itemNode.style.top = ((i - this.curValue)*this.itemHeight).toFixed(2) + 'px'
                }
            }
            let itemel = this.itemList[i%this.itemList.length]
            itemel.classList.add('owl-roller-item-box')
            itemNode.appendChild(itemel)
            itemNodeWrapper.appendChild(itemNode)
            this.itemNodesArr[i%this.itemList.length] = itemNode
        }
        // for (let i = 0; i < this.itemList.length; i++) {
        //     let itemNode = document.createElement('div')
        //     itemNode.classList.add('owl-roller-item-wrapper')
        //     itemNode.style.width = this.itemWidth + 'px'
        //     itemNode.style.height = this.itemHeight + 'px'
        //     if(i === this.curValue) {
        //         itemNode.classList.add('owl-roller-cur')
        //     }
        //     // if(i >= this.curValue && i < this.curValue + this.showNum) {
        //     //
        //     //
        //     //     if(this.dir === 'h') {
        //     //         itemNode.style.left = ((i - this.curValue)*this.itemWidth).toFixed(2) + 'px'
        //     //     } else {
        //     //         itemNode.style.top = ((i - this.curValue)*this.itemHeight).toFixed(2) + 'px'
        //     //     }
        //     // }
        //     // itemNode.style.transform = 'translateX(0)'
        //     let itemel = this.itemList[i]
        //     itemel.classList.add('owl-roller-item-box')
        //     itemNode.appendChild(itemel)
        //     itemNodeWrapper.appendChild(itemNode)
        //     // if(this.tip !== 'none') {
        //     //     let tipItem = document.createElement('div')
        //     //     tipItem.classList.add('owl-roller-tip')
        //     //     tipItem.dataset.value = i.toString()
        //     //     if(i === this.curValue) {
        //     //         tipItem.classList.add('owl-roller-tip-active')
        //     //     }
        //     //     tipWrapper.appendChild(tipItem)
        //     // }
        // }
        // let rollerItemWrapper = itemNodeWrapper.getElementsByClassName('owl-roller-item-box')
        // // console.log(itemNodeWrapper.getElementsByClassName('owl-roller-item-box')[0])
        // for (let i = 0; i < this.showNum; i++) {
        //     let itemEl = rollerItemWrapper[(this.curValue + i)%this.showNum]
        //     console.log(itemEl instanceof HTMLElement)
        //
        //     // itemEl.style.visibility = 'visible'
        //     console.log(itemEl)
        // }
        node.appendChild(itemNodeWrapper)
        node.appendChild(this.__getToolTemp())
        // node.appendChild(tipWrapper)
        return node
    }

    __getToolTemp(): HTMLElement {
        let toolWrapper = document.createElement('div')
        toolWrapper.classList.add('owl-roller-tool-wrapper')
        let preToolNode = document.createElement('div')
        preToolNode.classList.add('owl-roller-tool')
        let nextToolNode = document.createElement('div')
        nextToolNode.classList.add('owl-roller-tool')
        let preIcon: IconComponent
        let nextIcon: IconComponent
        if(this.dir === 'v') {
            preIcon = new IconComponent('top', '14px', '40px')
            nextIcon = new IconComponent('bottom', '14px', '40px')
            preToolNode.classList.add('owl-roller-tool-pre')
            preToolNode.classList.add('owl-roller-tool-pre-v')
            nextToolNode.classList.add('owl-roller-tool-next')
            nextToolNode.classList.add('owl-roller-tool-next-v')
        } else {
            preIcon = new IconComponent('left', '14px', '40px')
            nextIcon = new IconComponent('right', '14px', '40px')
            preToolNode.classList.add('owl-roller-tool-pre')
            preToolNode.classList.add('owl-roller-tool-pre-h')
            nextToolNode.classList.add('owl-roller-tool-next')
            nextToolNode.classList.add('owl-roller-tool-next-h')
        }
        preToolNode.appendChild(preIcon.node)
        nextToolNode.appendChild(nextIcon.node)
        toolWrapper.appendChild(preToolNode)
        toolWrapper.appendChild(nextToolNode)
        return toolWrapper
    }

    _setEvent(): void {
        let that = this
        this.node.getElementsByClassName('owl-roller-tool-next')[0].addEventListener('click', function (e) {
            that.__move('next')
            e.stopPropagation()
        })
        this.node.getElementsByClassName('owl-roller-tool-pre')[0].addEventListener('click', function (e) {
            that.__move('pre')
            e.stopPropagation()
        })
        // let tipNodes = this.node.getElementsByClassName('owl-roller-tip')
        // for (let i = 0; i < tipNodes.length; i++) {
        //     tipNodes[i].addEventListener('click', function (e) {
        //         let value = parseInt(this.dataset.value)
        //         if(value < that.curValue) {
        //             that.__move('right', that.curValue - value)
        //         }
        //         if(value > that.curValue) {
        //             that.__move('left', value - that.curValue)
        //         }
        //         e.stopPropagation()
        //     })
        // }
        // if(this.auto) {
        //     this.__registInterval()
        //     this.node.getElementsByClassName('owl-roller-tool-next')[0].addEventListener('mouseover', function (e) {
        //         that.__clearInterval()
        //         e.stopPropagation()
        //     })
        //     this.node.getElementsByClassName('owl-roller-tool-next')[0].addEventListener('mouseleave', function (e) {
        //         that.__registInterval()
        //         e.stopPropagation()
        //     })
        //     this.node.getElementsByClassName('owl-roller-tool-pre')[0].addEventListener('mouseover', function (e) {
        //         that.__clearInterval()
        //         e.stopPropagation()
        //     })
        //     this.node.getElementsByClassName('owl-roller-tool-pre')[0].addEventListener('mouseleave', function (e) {
        //         that.__registInterval()
        //         e.stopPropagation()
        //     })
        // }
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

    __move(moveDir: string, moveNum: number = 1): void {
        // 如果不能循环播放则播放到头
        if(!this.loop) {
            if(moveDir === 'next' && (this.curValue + moveNum) > this.itemList.length - 1) {
                this.__move('next', this.itemList.length - this.curValue - 1)
                return
            }
            if(moveDir === 'pre' && (this.curValue - moveNum) < 0) {
                this.__move('pre', this.curValue)
                return
            }
        }
        moveNum = moveNum > (this.itemList.length - this.showNum) ? this.itemList.length - this.showNum : moveNum

        switch (moveDir) {
            case 'next':
                for (let i = 0; i < moveNum; i++) {
                    let index = (this.curValue + this.showNum + i)%this.itemList.length
                    console.log(index, this.curValue)
                    this.itemNodesArr[index].style.left = ((this.showNum + i)*this.itemWidth).toFixed(2) + 'px'
                    this.itemNodesArr[index].style.visibility = 'visible'
                }
                let that = this
                setTimeout(function () {
                    for (let i = 0; i < (that.showNum + moveNum); i++) {
                        let index = (that.curValue + i)%that.itemList.length
                        that.itemNodesArr[index].style.transform = 'translateX(-'+ moveNum*that.itemWidth +'px)'
                    }
                    that.curValue = (that.curValue + moveNum)%that.itemList.length
                    setTimeout(function () {
                        for (let i = 0; i < that.itemList.length; i++) {
                            if(i === that.curValue) {
                                continue;
                            }
                            that.itemNodesArr[i].style.transform='translateX(0px)'
                        }
                    }, 1000)
                }, 10)
                break;
            case 'pre':

                break;
            default:
                break;
        }
        // let itemElList = wrapper.children
        // for (let i = 0; i < this.itemList.length; i++) {
        //     // itemElList[i].style.width = 1/(1+moveNum)*100 + '%'
        //     itemElList[i].style.transform = 'translateX(0%)'
        //     if(i < this.curValue && i >= this.curValue + this.showNum) {
        //         itemElList[i].style.display = 'none'
        //     }
        // }
        // let newValue: number
        // switch (dir) {
        //     case 'left':
        //         newValue = (this.curValue + moveNum) % this.itemList.length
        //         this.__tipShow(this.curValue, newValue)
        //         wrapper.style.left = '0px'
        //         for (let i = 1; i <= moveNum; i++) {
        //             let j = (this.curValue + this.showNum + i - 1) % this.itemList.length
        //             itemElList[j].style.display = 'block'
        //             itemElList[j].style.transform = 'translateX('+((this.showNum + i - 1) * this.itemWidth).toFixed(2)+'px)'
        //         }
        //         // return
        //         this.curValue = newValue
        //         let that = this
        //         setTimeout(function () {
        //             wrapper.style.transition = 'transform .3s'
        //             wrapper.style.transform = 'translateX(-' + ((that.itemWidth * moveNum).toFixed(2)) + 'px)'
        //         }, 10)
        //         break
        //     case 'right':
        //         newValue = (this.curValue - moveNum + this.itemList.length) % this.itemList.length
        //         this.__tipShow(this.curValue, newValue)
        //         wrapper.style.right = '0px'
        //         for (let i = 1; i <= moveNum; i++) {
        //             let j = (this.curValue - i + this.itemList.length) % this.itemList.length
        //             itemElList[j].style.display = 'block'
        //             itemElList[j].style.transform = 'translateX(-'+100*i+'%)'
        //         }
        //         this.curValue = newValue
        //         setTimeout(() => {
        //             wrapper.style.transition = 'transform .3s'
        //             wrapper.style.transform = 'translateX(' + 100 * moveNum/(moveNum + 1) + '%)'
        //         }, 10)
        //         break
        // }
    }

    __tipShow(oldValue: number, curValue: number): void {
        // if(this.tip === 'none') {
        //     return
        // }
        // let tipNodes = this.node.getElementsByClassName('owl-roller-tip')
        // tipNodes[oldValue].classList.remove('owl-roller-tip-active')
        // tipNodes[curValue].classList.add('owl-roller-tip-active')
    }

    _destroy() {

    }
}

export {RollerComponent}
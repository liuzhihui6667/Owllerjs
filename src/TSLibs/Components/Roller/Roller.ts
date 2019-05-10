/**
 * gai该组件为跑马灯组件
 * 可实现功能如下
 * 1. 上下左右滚动
 * 2. 一屏可展示自定义数量
 * 3. 分为3d和2d两种样式
 * 4. 支持手机端/PC端，支持拖动
 */

import {Components} from '../../Interfaces/Component';
import '../../../Style/Roller/index.less';
import {IconComponent} from "../Icon/Icon";
import {OWLNODE} from "../../OwlNode/OWLNODE"

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
        let node = this._createElement('div', ['owl-roller-container']);
        node.style.height = this.height + 'px'
        node.style.width = this.width + 'px'
        let overflowContainer = this._createElement('div', ['owl-roller-overflow-container']);
        let itemSlideWrapperA = this._createElement('div', ['owl-roller-item-slider-wrapper', 'owl-roller-slider-show']);
        itemSlideWrapperA.style.width = this.itemList.length * this.itemWidth + 'px';
        itemSlideWrapperA.style.transform = 'translateX(-' + this.itemWidth * this.curValue + 'px)';
        let itemSlideWrapperB = this._createElement('div', ['owl-roller-item-slider-wrapper']);
        itemSlideWrapperB.style.width = this.itemList.length * this.itemWidth + 'px';
        itemSlideWrapperB.style.transform = 'translateX(-' + this.itemWidth * this.itemList.length + 'px)';
        overflowContainer.appendChild(itemSlideWrapperA);
        overflowContainer.appendChild(itemSlideWrapperB);
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

        for (let i = 0; i < this.itemList.length; i++) {
            let itemWrapper = this._createElement('div', ['owl-roller-item-wrapper']);
            itemWrapper.style.width = this.itemWidth + 'px';
            itemWrapper.style.height = this.itemHeight + 'px';
            let itemel = this.itemList[i];
            itemel.classList.add('owl-roller-item-box');
            itemWrapper.appendChild(itemel);
            itemSlideWrapperA.appendChild(itemWrapper);
            itemSlideWrapperB.appendChild(itemWrapper.cloneNode(true));
        }
        node.appendChild(overflowContainer);
        node.appendChild(this.__getToolTemp());
        // node.appendChild(tipWrapper)
        return node
    }

    __getToolTemp(): HTMLElement {
        let toolWrapper = this._createElement('div', ['owl-roller-tool-wrapper']);
        let preToolNode = this._createElement('div', ['owl-roller-tool', 'owl-roller-tool-pre']);
        let nextToolNode = this._createElement('div', ['owl-roller-tool', 'owl-roller-tool-next']);
        let preIcon: IconComponent
        let nextIcon: IconComponent
        if(this.dir === 'v') {
            preIcon = new IconComponent('top', '14px', '40px')
            nextIcon = new IconComponent('bottom', '14px', '40px')
            preToolNode.classList.add('owl-roller-tool-pre-v')
            nextToolNode.classList.add('owl-roller-tool-next-v')
        } else {
            preIcon = new IconComponent('left', '14px', '40px')
            nextIcon = new IconComponent('right', '14px', '40px')
            preToolNode.classList.add('owl-roller-tool-pre-h')
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

    __move(moveDir: string, moveNum: number = 2): void {
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

        if(this.curValue === this.itemList.length - 1) {
            return;
        }

        // moveNum = moveNum > (this.itemList.length - this.showNum) ? this.itemList.length - this.showNum : moveNum

        switch (moveDir) {
            case 'next':
                if(this.curValue === this.itemList.length - 1) {
                    let slider = this.node.getElementsByClassName('owl-roller-item-slider-wrapper')
                    for (let i = 0; i < slider.length; i++) {
                        if(!OWLNODE.hasClass(slider[i], 'owl-roller-slider-show')) {
                            slider[i].style.transform = 'translateX('+ this.itemWidth +'px)'
                            slider[i].style.transition = 'transform 0ms ease 0s'
                            setTimeout(function () {
                                slider[i].style.transition = 'transform 500ms ease 0s'
                                slider[i].style.transform = 'translateX(0px)'
                                slider[i].classList.add('owl-roller-slider-show')
                            }, 100)
                        } else {
                            let that = this
                            setTimeout(function () {
                                slider[i].style.transition = 'transform 500ms ease 0s'
                                slider[i].style.transform = 'translateX(-'+ that.itemWidth * (that.itemList.length) +'px)'
                                slider[i].classList.remove('owl-roller-slider-show')
                            }, 100)
                        }
                    }
                } else {
                    let show = this.node.getElementsByClassName('owl-roller-slider-show')[0]
                    show.style.transition = 'transform 500ms ease 0s'
                    show.style.transform = 'translateX(-'+ (this.curValue + moveNum) * this.itemWidth +'px)'
                }
                this.curValue = (this.curValue + moveNum)%this.itemList.length
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
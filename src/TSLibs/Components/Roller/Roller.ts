/**
 * 该组件为跑马灯组件
 * 可实现功能如下
 * 1. 上下左右滚动
 * todo 2. 一屏可展示自定义数量
 * 3. 分为3d和2d两种样式
 * 4. 支持手机端/PC端，todo 支持拖动
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
     * 是否自适应
     */
    fit: boolean;
    /**
     * 单位，默认为px，当fit为true时单位为 %
     */
    unit: string;
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
                fit?: boolean,
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
        this.fit = this._checkParam(fit, false);
        if(this.fit) {
            this.unit = '%';
            if(this.dir === 'h') {
                this.itemWidth = 1/(this.itemList.length) * 100;
                this.itemHeight = 100;
            } else {
                this.itemWidth = 100;
                this.itemHeight = 1/(this.itemList.length) * 100;
            }
        } else {
            this.unit = 'px';
            if(this.dir === 'h') {
                this.itemWidth = 1/this.showNum*this.width;
                this.itemHeight = this.height
            } else {
                this.itemWidth = this.width;
                this.itemHeight = 1/this.showNum*this.height
            }
        }
        this.itemNodesArr = [];
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

    __getNode(): Element {
        let node = this._createElement('div', ['owl-roller-container']);
        if(this.fit) {
            node.style.width = '100%';
            node.style.height = '100%';
        } else {
            node.style.height = this.height + 'px';
            node.style.width = this.width + 'px';
        }
        let overflowContainer = this._createElement('div', ['owl-roller-overflow-container']);
        let itemSlideWrapperA, itemSlideWrapperB;
        if(this.dir === 'h') {
            itemSlideWrapperA = this._createElement('div', ['owl-roller-item-slider-wrapper', 'owl-roller-slider-show']);
            itemSlideWrapperB = this._createElement('div', ['owl-roller-item-slider-wrapper']);
            if(this.fit) {
                itemSlideWrapperA.style.width = this.itemList.length/this.showNum * 100 + this.unit;
                itemSlideWrapperB.style.width = this.itemList.length/this.showNum * 100 + this.unit;
            } else {
                itemSlideWrapperA.style.width = this.itemList.length * this.itemWidth + this.unit;
                itemSlideWrapperB.style.width = this.itemList.length * this.itemWidth + this.unit;
            }
            itemSlideWrapperA.style.height = '100%';
            itemSlideWrapperA.style.transform = 'translateX(-' + this.itemWidth * this.curValue + this.unit + ')';
            itemSlideWrapperB.style.height = '100%';
            itemSlideWrapperB.style.transform = 'translateX(-' + this.itemWidth * this.itemList.length + this.unit + ')';
        } else {
            itemSlideWrapperA = this._createElement('div', ['owl-roller-item-slider-wrapper', 'owl-roller-slider-show']);
            itemSlideWrapperB = this._createElement('div', ['owl-roller-item-slider-wrapper']);
            if(this.fit) {
                itemSlideWrapperA.style.height = this.itemList.length/this.showNum * 100 + this.unit;
                itemSlideWrapperB.style.height = this.itemList.length/this.showNum * 100 + this.unit;
            }
            itemSlideWrapperA.style.width = '100%';

            itemSlideWrapperA.style.transform = 'translateY(-' + this.itemHeight * this.curValue + this.unit + ')';

            itemSlideWrapperB.style.width = '100%';

            itemSlideWrapperB.style.transform = 'translateY(-' + this.itemHeight * this.itemList.length + this.unit + ')';
        }

        overflowContainer.appendChild(itemSlideWrapperA);
        overflowContainer.appendChild(itemSlideWrapperB);
        let tipWrapper = this.__getTipTemp();

        for (let i = 0; i < this.itemList.length; i++) {
            let itemWrapper = this._createElement('div', ['owl-roller-item-wrapper']);
            itemWrapper.style.width = this.itemWidth + this.unit;
            itemWrapper.style.height = this.itemHeight + this.unit;
            let itemel = this.itemList[i];
            itemel.classList.add('owl-roller-item-box');
            itemWrapper.appendChild(itemel);
            itemSlideWrapperA.appendChild(itemWrapper);
            itemSlideWrapperB.appendChild(itemWrapper.cloneNode(true));

        }
        node.appendChild(overflowContainer);
        node.appendChild(this.__getToolTemp());
        node.appendChild(tipWrapper)
        return node
    }

    __getTipTemp(): HTMLElement {
        let tipWrapper = this._createElement('div', ['owl-roller-tip-wrapper']);
        if(this.dir === 'h') {
            tipWrapper.classList.add('owl-roller-tip-wrapper-h');
        } else {
            tipWrapper.classList.add('owl-roller-tip-wrapper-v');
        }
        switch (this.indicator) {
            case 'dot':
                tipWrapper.classList.add('owl-roller-tip-dot');
                if(this.dir === 'v') {
                    tipWrapper.style.top = 'calc(50% - ' + (this.itemList.length * 14)/2 + 'px)'
                }
                break;
            case 'line':
                tipWrapper.classList.add('owl-roller-tip-line');
                if(this.dir === 'v') {
                    tipWrapper.style.top = 'calc(50% - ' + (this.itemList.length * 24)/2 + 'px)'
                }
                break;
            default:
                tipWrapper.classList.add('owl-roller-tip-dot');
                break
        }

        for (let i = 0; i < this.itemList.length; i++) {
            if(this.indicator !== 'none') {
                let tipEl = this._createElement('div', ['owl-roller-tip']);
                if(this.dir === 'h') {
                    tipEl.classList.add('owl-roller-tip-h')
                } else {
                    tipEl.classList.add('owl-roller-tip-v')
                }
                tipEl.dataset.value = i.toString();
                if(i === this.curValue) {
                    tipEl.classList.add('owl-roller-tip-active')
                }
                tipWrapper.appendChild(tipEl);
            }
        }
        return tipWrapper
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
        let tipNodes = this.node.getElementsByClassName('owl-roller-tip')
        for (let i = 0; i < tipNodes.length; i++) {
            tipNodes[i].addEventListener('click', function (e) {
                let value = parseInt(this.dataset.value)
                if(value < that.curValue) {
                    that.__move('pre', that.curValue - value)
                }
                if(value > that.curValue) {
                    that.__move('next', value - that.curValue)
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
            that.__move('next')
        }, this.speed)
    }

    __clearInterval(): void {
        clearInterval(this.intervel)
    }

    __move(moveDir: string, moveNum: number = 1): void {
        // 如果不能循环播放则播放到头
        if(!this.loop) {
            if(moveDir === 'pre' && this.curValue === 0) {
                return;
            }
            if(moveDir === 'next' && this.curValue === this.itemList.length - 1) {
                return;
            }
            if(moveDir === 'next' && (this.curValue + moveNum) > this.itemList.length - 1) {
                this.__move('next', this.itemList.length - this.curValue - 1)
                return
            }
            if(moveDir === 'pre' && (this.curValue - moveNum) < 0) {
                this.__move('pre', this.curValue);
                return
            }
        }
        let newValue;
        switch (moveDir) {
            case 'next':
                newValue = (this.curValue + moveNum)%this.itemList.length;
                if(this.curValue + moveNum + this.showNum - 1 > this.itemList.length - 1) {
                    let slider = this.node.getElementsByClassName('owl-roller-item-slider-wrapper');
                    let that = this;
                    for (let i = 0; i < slider.length; i++) {
                        if(!OWLNODE.hasClass(slider[i], 'owl-roller-slider-show')) {
                            slider[i].style.transition = 'transform 0ms ease 0s'
                            if(this.dir === 'h') {
                                slider[i].style.transform = 'translateX('+ this.itemWidth * (this.itemList.length - this.curValue) + this.unit +')';
                            } else {
                                slider[i].style.transform = 'translateY('+ this.itemHeight * (this.itemList.length - this.curValue) + this.unit +')'
                            }
                            setTimeout(function () {
                                slider[i].style.transition = 'transform 500ms ease 0s'
                                if(that.dir === 'h') {
                                    slider[i].style.transform = 'translateX(-'+ that.itemWidth * (newValue) + that.unit +')'
                                } else {
                                    slider[i].style.transform = 'translateY(-'+ that.itemHeight * (newValue) + that.unit +')'
                                }
                                slider[i].classList.add('owl-roller-slider-show')
                            }, 100)
                        } else {
                            setTimeout(function () {
                                slider[i].style.transition = 'transform 500ms ease 0s'
                                if(that.dir === 'h') {
                                    slider[i].style.transform = 'translateX(-'+ that.itemWidth * (newValue + that.itemList.length) + that.unit +')'
                                } else {
                                    slider[i].style.transform = 'translateY(-'+ that.itemHeight * (newValue + that.itemList.length) + that.unit +')'
                                }
                                slider[i].classList.remove('owl-roller-slider-show')
                            }, 100)
                        }
                    }
                } else {
                    let show = this.node.getElementsByClassName('owl-roller-slider-show')[0]
                    show.style.transition = 'transform 500ms ease 0s'
                    if(this.dir === 'h') {
                        show.style.transform = 'translateX(-'+ newValue * this.itemWidth + this.unit +')'
                    } else {
                        show.style.transform = 'translateY(-'+ newValue * this.itemHeight + this.unit +')'
                    }
                }
                break;
            case 'pre':
                newValue = (this.curValue + this.itemList.length - moveNum)%this.itemList.length;
                if(this.curValue - moveNum < 0) {
                    let slider = this.node.getElementsByClassName('owl-roller-item-slider-wrapper')
                    let that = this
                    for (let i = 0; i < slider.length; i++) {
                        if(!OWLNODE.hasClass(slider[i], 'owl-roller-slider-show')) {
                            slider[i].style.transition = 'transform 0ms ease 0s';
                            if(this.dir === 'h') {
                                slider[i].style.transform = 'translateX(-'+ this.itemWidth * (this.curValue + this.itemList.length) + this.unit +')'
                            } else {
                                slider[i].style.transform = 'translateY(-'+ this.itemHeight * (this.curValue + this.itemList.length) + this.unit +')'
                            }
                            setTimeout(function () {
                                slider[i].style.transition = 'transform 500ms ease 0s'
                                if(that.dir === 'h') {
                                    slider[i].style.transform = 'translateX(-'+ that.itemWidth * (newValue) + that.unit +')'
                                } else {
                                    slider[i].style.transform = 'translateY(-'+ that.itemHeight * (newValue) + that.unit +')'
                                }
                                slider[i].classList.add('owl-roller-slider-show')
                            }, 100)
                        } else {
                            setTimeout(function () {
                                slider[i].style.transition = 'transform 500ms ease 0s'
                                if(that.dir === 'h') {
                                    slider[i].style.transform = 'translateX('+ that.itemWidth * (that.itemList.length - newValue) + that.unit +')'
                                } else {
                                    slider[i].style.transform = 'translateY('+ that.itemHeight * (that.itemList.length - newValue) + that.unit +'px)'
                                }
                                slider[i].classList.remove('owl-roller-slider-show')
                            }, 100)
                        }
                    }
                } else {
                    let show = this.node.getElementsByClassName('owl-roller-slider-show')[0];
                    show.style.transition = 'transform 500ms ease 0s';
                    if(this.dir === 'h') {
                        show.style.transform = 'translateX(-'+ newValue * this.itemWidth + this.unit +')'
                    } else {
                        show.style.transform = 'translateY(-'+ newValue * this.itemHeight + this.unit +')'
                    }
                }
                break;
            default:
                break;
        }
        this.__tipShow(this.curValue, newValue);
        this.curValue = newValue;
    }

    __tipShow(oldValue: number, curValue: number): void {
        if(this.indicator === 'none') {
            return
        }
        let tipNodes = this.node.getElementsByClassName('owl-roller-tip');
        tipNodes[oldValue].classList.remove('owl-roller-tip-active');
        tipNodes[curValue].classList.add('owl-roller-tip-active');
    }

    _destroy() {

    }
}

export {RollerComponent}
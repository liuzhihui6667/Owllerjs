import {RollerComponent} from "../../Components/Roller/Roller";


class RollerRender {

    curValue: number;
    loop: boolean;
    auto: boolean;
    speed: number;
    tip: string;
    height: string;
    width: string;
    itemList: Array<HTMLElement> = [];
    constructor() {
        this.render()
    }

    render(): void {
        let tags = this.getNodes()
        for (let i = 0; i < tags.length; i++) {
            this.getConfig(tags[i])
            let retEl = new RollerComponent('9', this.curValue, this.itemList, this.loop,
                this.auto, this.speed, this.tip, this.height, this.width)
            tags[i].replaceWith(retEl.node)
        }
    }

    getNodes(): HTMLCollection {
        let nodes = document.getElementsByTagName('owl-roller')
        return nodes
    }

    getConfig(tag: Element): void {
        this.curValue = tag.getAttribute('value') === null ? 0 : parseInt(tag.getAttribute('value'))
        this.loop = tag.getAttribute('loop') === null ? false : (tag.getAttribute('loop') === 'true')
        this.auto = tag.getAttribute('auto') === null ? false : (tag.getAttribute('auto') === 'true')
        this.speed = tag.getAttribute('speed') === null ? 3000 : parseInt(tag.getAttribute('speed'))
        this.tip = tag.getAttribute('tip') === null ? 'dot' : tag.getAttribute('tip')
        this.height = tag.getAttribute('height') === null ? '250px' : tag.getAttribute('height')
        this.width = tag.getAttribute('width') === null ? '500px' : tag.getAttribute('width')
        let tagLength = tag.children.length
        for (let i = 0; i < tagLength; i++) {
            let div = document.createElement('div')
            div.appendChild(tag.children[0])
            this.itemList.push(div)
        }
    }
}

export {RollerRender}
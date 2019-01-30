import {RollerComponent} from "../../Components/Roller/Roller";


class RollerRender {
    dir: string;
    curValue: number;
    loop: boolean;
    auto: boolean;
    speed: number;
    tip: string;
    height: number;
    width: number;
    type: string;
    itemList: Array<HTMLElement> = [];
    showNum: number;
    constructor() {
        this.render()
    }

    render(): void {
        let tags = this.getNodes()
        let tagsCount = tags.length
        for (let i = 0; i < tagsCount; i++) {
            let itemList = this.getConfig(tags[0])
            let retEl = new RollerComponent(this.dir, this.curValue, itemList, this.loop,
                this.auto, this.speed, this.tip, this.type, this.height, this.width, this.showNum)
            tags[0].replaceWith(retEl.node)
        }
    }

    getNodes(): HTMLCollection {
        let nodes = document.getElementsByTagName('owl-roller')
        return nodes
    }

    getConfig(tag: Element): Array<HTMLElement> {
        this.dir = tag.getAttribute('dir') === null ? 'h' : tag.getAttribute('dir')
        this.curValue = tag.getAttribute('value') === null ? 0 : parseInt(tag.getAttribute('value'))
        this.loop = tag.getAttribute('loop') === null ? false : (tag.getAttribute('loop') === 'true')
        this.auto = tag.getAttribute('auto') === null ? false : (tag.getAttribute('auto') === 'true')
        this.speed = tag.getAttribute('speed') === null ? 3000 : parseInt(tag.getAttribute('speed'))
        this.tip = tag.getAttribute('tip') === null ? 'dot' : tag.getAttribute('tip')
        this.height = tag.getAttribute('height') === null ? 250 : parseInt(tag.getAttribute('height'))
        this.width = tag.getAttribute('width') === null ? 500 : parseInt(tag.getAttribute('width'))
        this.showNum = tag.getAttribute('shownum') === null ? 1 : parseInt(tag.getAttribute('shownum'))
        let tagLength = tag.children.length
        let itemList: Array<HTMLElement> = []
        for (let i = 0; i < tagLength; i++) {
            let div = document.createElement('div')
            div.appendChild(tag.children[0])
            itemList.push(div)
        }
        return itemList
    }
}

export {RollerRender}
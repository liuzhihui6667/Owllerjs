import {TipsComponent} from "../../Components/Tips/Tips";


class TipsRender {
    /**
     * 弹出方向
     * top-right, top-left, center...
     */
    dir: string;
    /**
     * 主题
     * dark, light
     */
    theme: string;
    /**
     * 标题，如无标题可不填
     */
    title: string = '';

    text: Array<string> = [];
    /**
     * 触发方式
     */
    showType: string;
    /**
     * 宽度，默认160px
     */
    width: number;
    /**
     * 母节点
     */
    content: HTMLCollection;
    /**
     * 是否自定义tip内容
     */
    custom: boolean;
    /**
     * 自定义tip节点
     */
    customElement: HTMLCollection;
    /**
     * tip高度，若是自定义tip，则必须传这个值
     */
    height: number = 100;
    constructor() {
        this.render()
    }

    render(): void {
        let tags = this.getNodes();
        let tagsCount = tags.length;
        for (let i = 0; i < tagsCount; i++) {
            let itemList = this.getConfig(tags[0]);
            let retEl = new TipsComponent(this.content, this.dir, this.theme, this.title,
                this.text, this.showType, this.width,
                this.custom, this.customElement, this.height);
            tags[0].replaceWith(retEl.node)
        }
    }

    getNodes(): HTMLCollection {
        return document.getElementsByTagName('owl-tip');
    }

    getConfig(tag: Element): void {
        this.dir = tag.getAttribute('dir') === null ? 'right-top' : tag.getAttribute('dir');
        this.theme = tag.getAttribute('theme') === null ? 'light' : tag.getAttribute('theme');
        this.showType = tag.getAttribute('trigger') === null ? 'click' : tag.getAttribute('trigger');
        this.width = tag.getAttribute('width') === null ? 160 : parseFloat(tag.getAttribute('width'));
        let tipContent = tag.getElementsByTagName('owl-tip-content');
        if(tipContent.length > 0) {
            this.content = tipContent[0].children;
        } else {
            this.content = tag.getElementsByTagName('owl-tip')
        }

        let textNodes = tag.getElementsByTagName('owl-tip-text');
        for (let i = 0; i < textNodes.length; i++) {
            this.text.push(textNodes[i].textContent.toString().trim());
        }
        if(this.text.length === 0) {
            this.text.push('你至少需要一条信息')
        }
        let titleNode = tag.getElementsByTagName('owl-tip-title');
        if(titleNode.length > 0) {
            this.title = titleNode[0].textContent.trim();
        }
        this.custom = tag.getAttribute('custom') === null ? false : tag.getAttribute('custom') === 'true';
        if(this.custom) {
            let customElement = tag.getElementsByTagName('owl-tip-custom-content');
            if(customElement.length > 0) {
                this.customElement = customElement[0].children;
            } else {
                this.customElement = tag.getElementsByTagName('owl-tip')
            }
            this.height = tag.getAttribute('height') === null ? 100 : parseFloat(tag.getAttribute('height'));
        } else {
            this.customElement = tag.getElementsByTagName('owl-tip')
        }
    }
}

export {TipsRender}
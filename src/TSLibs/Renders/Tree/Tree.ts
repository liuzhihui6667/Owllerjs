import {TreeComponent} from "../../Components/Tree/Tree";


class TreeRender {
    fit: boolean;
    itemHeight: number;
    itemWidth: number;
    itemList: Array<any>;
    constructor() {
        this.render()
    }

    render(): void {
        let tags = this.getNodes();
        let tagsNum = tags.length;
        for (let i = 0; i < tagsNum; i++) {
            let tag = tags[0];
            this.getConfig(tag);
            let retEl = new TreeComponent();
            console.log(retEl);
            tag.replaceWith(retEl.node)
        }
    }

    getNodes(): HTMLCollection {
        return document.getElementsByTagName('owl-tree');
    }

    getConfig(tag: Element): void {
        this.fit = tag.getAttribute('fit') === null ? false : (tag.getAttribute('fit') === 'true');
        this.itemHeight = tag.getAttribute('itemheight') === null ? 0 : parseInt(tag.getAttribute('itemheight'));
        this.itemWidth = tag.getAttribute('itemwidth') === null ? 0 : parseInt(tag.getAttribute('itemwidth'));
        this.itemList = tag.getAttribute('itemlist') === null ? [] : window[tag.getAttribute('itemlist')];
    }
}

export {TreeRender}
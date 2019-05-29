import {TreeComponent} from "../../Components/Tree/Tree";


class TreeRender {
    fit: boolean;
    itemHeight: string;
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
            let retEl = new TreeComponent(this.itemList, this.itemHeight);
            console.log(retEl);
            tag.replaceWith(retEl.node)
        }
    }

    getNodes(): HTMLCollection {
        return document.getElementsByTagName('owl-tree');
    }

    getConfig(tag: Element): void {
        this.fit = tag.getAttribute('fit') === null ? false : (tag.getAttribute('fit') === 'true');
        this.itemHeight = tag.getAttribute('itemheight') === null ? "" : tag.getAttribute('itemheight');
        this.itemList = tag.getAttribute('itemlist') === null ? [] : window[tag.getAttribute('itemlist')];
        this.itemList = [
            {
                text: 'Root'
            }, {
                text: 'Root2',
                children: [
                    {
                        text: 'children'
                    }
                ]
            }
        ];
    }
}

export {TreeRender}
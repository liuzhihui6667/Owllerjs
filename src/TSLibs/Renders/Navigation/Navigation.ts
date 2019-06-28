import {NavigationComponent, NavigationList} from "../../Components/Navigation/Navigation";


class NavigationRender {

    dir: string;
    showall: boolean;
    onlyone: boolean;
    menu: boolean;
    theme: string;
    itemlist: Array<NavigationList> = [];
    fit: boolean;
    itemHeight: number;
    itemWidth: number;
    constructor() {
        this.render()
    }

    render(): void {
        let tags = this.getNodes();
        let tagsCount = tags.length;
        for (let i = 0; i < tagsCount; i++) {
            this.getConfig(tags[0]);
            let retEl = new NavigationComponent(this.dir, this.itemlist, this.showall, this.onlyone, this.menu, this.theme, this.fit, this.itemHeight, this.itemWidth);
            tags[i].replaceWith(retEl.node)
        }
    }

    getNodes(): HTMLCollection {
        let nodes = document.getElementsByTagName('owl-nav')
        return nodes
    }

    getConfig(tag: Element): void {
        this.dir = tag.getAttribute('dir') === null ? 'v' : tag.getAttribute('dir')
        this.showall = tag.getAttribute('showall') === null ? false : (tag.getAttribute('showall') === 'true')
        this.onlyone = tag.getAttribute('onlyone') === null ? false : (tag.getAttribute('onlyone') === 'true')
        this.menu = tag.getAttribute('menu') === null ? false : (tag.getAttribute('menu') === 'true')
        this.fit = tag.getAttribute('fit') === null ? false : (tag.getAttribute('fit') === 'true')
        this.theme = tag.getAttribute('theme') === null ? 'lighter' : tag.getAttribute('theme')
        this.itemHeight = tag.getAttribute('itemheight') === null ? 0 : parseInt(tag.getAttribute('itemheight'))
        this.itemWidth = tag.getAttribute('itemwidth') === null ? 0 : parseInt(tag.getAttribute('itemwidth'))
        this.itemlist = this.__getConfigOfChildren(tag)
    }

    __getConfigOfChildren(tag: Element): Array<NavigationList> {
        let chilrenTags = tag.children
        if(chilrenTags.length === 0) {
            return undefined
        }
        let cnf: Array<NavigationList> = [];
        for (let i = 0; i < chilrenTags.length; i++) {
            if(chilrenTags[i].nodeName !== 'OWL-NAV-ITEM') {
                continue
            }
            let item: NavigationList = {
                text: '',
                icon: '',
                active: false,
                to: '',
                list: []
            }
            if(chilrenTags[i].getElementsByTagName('owl-nav-text').length > 0) {
                item.text = chilrenTags[i].getElementsByTagName('owl-nav-text')[0].innerHTML
            } else {
                item.text = ''
            }
            item.icon = chilrenTags[i].getAttribute('icon') === null ? '' : chilrenTags[i].getAttribute('icon')
            item.active = chilrenTags[i].getAttribute('active') === null ? false : (chilrenTags[i].getAttribute('active') === 'true')
            item.to = chilrenTags[i].getAttribute('to') === null ? '' : chilrenTags[i].getAttribute('to')
            item.list = this.__getConfigOfChildren(chilrenTags[i])
            cnf.push(item)
        }
        return cnf
    }
}

export {NavigationRender}
import {NavigationComponent, NavigationList} from "../../Components/Navigation/Navigation";


class NavigationRender {

    dir: string;
    showall: boolean;
    onlyone: boolean;
    menu: boolean;
    theme: string;
    itemlist: Array<NavigationList> = [];
    constructor() {
        this.render()
    }

    render(): void {
        let tags = this.getNodes()
        for (let i = 0; i < tags.length; i++) {
            this.getConfig(tags[i])
            console.log(this.dir, this.itemlist, this.showall, this.onlyone, this.menu, this.theme)
            let retEl = new NavigationComponent(this.dir, this.itemlist, this.showall, this.onlyone, this.menu, this.theme)
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
        this.theme = tag.getAttribute('theme') === null ? 'lighter' : tag.getAttribute('theme')
        this.itemlist = this.__getConfigOfChildren(tag)
    }

    __getConfigOfChildren(tag: Element): Array<NavigationList> {
        let chilrenTags = tag.children
        if(chilrenTags.length === 0) {
            return undefined
        }
        let cnf: Array<NavigationList> = []
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
            if(chilrenTags[i].getElementsByTagName('owl-text').length > 0) {
                item.text = chilrenTags[i].getElementsByTagName('owl-text')[0].innerHTML
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
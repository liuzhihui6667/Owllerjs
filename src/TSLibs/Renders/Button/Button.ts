import {ButtonComponent} from "../../Components/Button/Button";
import {PaginationComponent} from "../../Components/Pagination/Pagination";


class ButtonRender {
    componentInstances: Array<ButtonComponent> = [];
    type: string;
    size: string;
    icon: string;
    circle: boolean;
    innerHTML: string;
    attr: NamedNodeMap;
    constructor() {
        this.render()
    }

    render(): void {
        let tags = this.getNodes();
        let tagsNum = tags.length;
        for (let i = 0; i < tagsNum; i++) {
            let tag = tags[0];
            this.getConfig(tag);
            let component = new ButtonComponent(this.innerHTML, this.type, this.size, this.icon, this.circle, this.attr);
            this.componentInstances[i] = component;
            tag.replaceWith(component.node)
        }
    }

    getNodes(): HTMLCollection {
        let nodes = document.getElementsByTagName('owl-button');
        return nodes
    }

    getConfig(tag: Element): void {
        this.type = tag.getAttribute('type') === null ? 'default' : tag.getAttribute('type');
        this.size = tag.getAttribute('size') === null ? 'default' : tag.getAttribute('size');
        this.icon = tag.getAttribute('icon') === null ? '' : tag.getAttribute('icon');
        this.innerHTML = tag.innerHTML;
        this.circle = tag.getAttribute('circle') === null ? false : (tag.getAttribute('circle') === 'true');
        this.attr = tag.attributes;
    }
}

export {ButtonRender}
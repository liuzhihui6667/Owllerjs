import {PaginationComponent} from "../../Components/Pagination/Pagination";


class PaginationRender {
    componentInstances: Array<PaginationComponent> = [];
    tagsParams: Array<object> = [];
    totalItemCount: number;
    curPage: number;
    pageSize: number;
    theme: string;
    constructor() {
        this.render();
        this.bindEvents();
    }

    render(): void {
        let tags = this.getNodes();
        let tagsNum = tags.length;
        for (let i = 0; i < tagsNum; i++) {
            let tag = tags[0];
            this.getConfig(tag, i);
            let component = new PaginationComponent(this.totalItemCount, this.pageSize, this.curPage, this.theme)
            this.componentInstances[i] = component;
            tag.replaceWith(component.node)
        }
    }

    getNodes(): HTMLCollection {
        let nodes = document.getElementsByTagName('owl-page')
        return nodes
    }

    getConfig(tag: Element, index: number): void {
        this.totalItemCount = tag.getAttribute('total') === null ? 0 : parseInt(tag.getAttribute('total'))
        this.curPage = tag.getAttribute('curpage') === null ? 1 : parseInt(tag.getAttribute('curpage'))
        this.pageSize = tag.getAttribute('pagesize') === null ? 15 : parseInt(tag.getAttribute('pagesize'))
        this.theme = tag.getAttribute('theme') === null ? 'lighter' : tag.getAttribute('theme')
        let onChange = tag.getAttribute('on-change') === null ? '' : tag.getAttribute('on-change')
        this.tagsParams[index] = {
            onChange: onChange
        }
    }

    bindEvents(): void {
        document.onreadystatechange = () => {
            if(document.readyState == 'complete') {
                for (let i = 0; i < this.componentInstances.length; i++) {
                    if(this.tagsParams[i]['onChange'] !== '') {
                        this.componentInstances[i].setChangeCallback(window[this.tagsParams[i]['onChange']])
                    }
                }
            }
        }

    }
}

export {PaginationRender}
import {PaginationComponent} from "../../Components/Pagination/Pagination";


class PaginationRender {
    componentInstances: Array<PaginationComponent> = [];
    tagsParams: Array<object> = [];
    /**
     * item总数
     */
    totalItemCount: number;
    /**
     * 当前页码数
     */
    curPage: number;
    /**
     * 每页展示item数量
     */
    pageSize: number;
    /**
     * 主题
     */
    theme: string;
    /**
     * 对齐方式
     */
    align: string;
    constructor() {
        this.render();
    }

    render(): void {
        let tags = this.getNodes();
        let tagsNum = tags.length;
        for (let i = 0; i < tagsNum; i++) {
            let tag = tags[0];
            this.getConfig(tag, i);
            let component = new PaginationComponent(this.totalItemCount, this.pageSize, this.curPage, this.theme, this.align);
            this.componentInstances[i] = component;
            tag.replaceWith(component.node)
        }
        this.bindEvents();
    }

    getNodes(): HTMLCollection {
        let nodes = document.getElementsByTagName('owl-page');
        return nodes
    }

    getConfig(tag: Element, index: number): void {
        this.totalItemCount = tag.getAttribute('total') === null ? 0 : parseInt(tag.getAttribute('total'))
        this.curPage = tag.getAttribute('curpage') === null ? 1 : parseInt(tag.getAttribute('curpage'))
        this.pageSize = tag.getAttribute('pagesize') === null ? 15 : parseInt(tag.getAttribute('pagesize'))
        this.theme = tag.getAttribute('theme') === null ? 'lighter' : tag.getAttribute('theme')
        this.align = tag.getAttribute('align') === null ? 'left' : tag.getAttribute('align')
        let onChange = tag.getAttribute('on-change') === null ? '' : tag.getAttribute('on-change')
        this.tagsParams[index] = {
            onChange: onChange
        }
    }

    bindEvents(): void {
        for (let i = 0; i < this.componentInstances.length; i++) {
            if(this.tagsParams[i]['onChange'] !== '') {
                this.componentInstances[i].setChangeCallback(this.tagsParams[i]['onChange'])
            }
        }
    }
}

export {PaginationRender}

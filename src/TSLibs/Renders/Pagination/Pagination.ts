import {PaginationComponent} from "../../Components/Pagination/Pagination";


class PaginationRender {

    totalItemCount: number;
    curPage: number;
    pageSize: number;
    theme: string;
    onChangCallback: (pageNum: number) => void;
    constructor() {
        this.render()
    }

    render(): void {
        let tags = this.getNodes()
        let tagsNum = tags.length
        for (let i = 0; i < tagsNum; i++) {
            let tag = tags[0]
            this.getConfig(tag)
            let retEl = new PaginationComponent(this.totalItemCount, this.pageSize, this.curPage, this.theme)
            tag.replaceWith(retEl.node)
        }
    }

    getNodes(): HTMLCollection {
        let nodes = document.getElementsByTagName('owl-page')
        return nodes
    }

    getConfig(tag: Element): void {
        this.totalItemCount = tag.getAttribute('total') === null ? 0 : parseInt(tag.getAttribute('total'))
        this.curPage = tag.getAttribute('curpage') === null ? 1 : parseInt(tag.getAttribute('curpage'))
        this.pageSize = tag.getAttribute('pagesize') === null ? 15 : parseInt(tag.getAttribute('pagesize'))
        this.theme = tag.getAttribute('theme') === null ? 'lighter' : tag.getAttribute('theme')
        // this.onChangCallback = tag.getAttribute('onchange') === null ? undefined : tag.getAttribute('onchange')
    }
}

export {PaginationRender}
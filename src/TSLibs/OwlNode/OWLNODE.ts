class OWLNODE {
    constructor() {

    }

    static hasClass(el:HTMLElement, className: string):boolean {
        let class_list = el.classList
        for (let index in class_list) {
            if(class_list[index] === className) {
                return true
            }
        }
        return false
    }
}

export {OWLNODE}
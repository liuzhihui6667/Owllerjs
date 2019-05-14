interface ComponentsInterface {
    themeInstant: Theme;
    init();
    _setEvent();
    _getTemplate();
    _destroy();
}
/**
 *
 */
abstract class Components implements ComponentsInterface{
    themeInstant: Theme;
    node: any;
    constructor() {

    };
    abstract init(): void;
    abstract _setEvent(): void;
    abstract _getTemplate(): Element;
    _checkParam(value, defaultValue): any {
        return value === undefined ? defaultValue : value;
    }
    _createElement(type: string, classList?: Array<string>): HTMLElement {
        let el = document.createElement(type);
        if(classList !== undefined) {
            for (let i = 0; i < classList.length; i++) {
                if(classList[i] !== '') {
                    el.classList.add(classList[i]);
                }
            }
        }
        return el
    }
    _destroy(): void {

    };
}

abstract class Theme {
    color: string;
    size: number;
    type: string;
}

class Class {

}

export {Components}
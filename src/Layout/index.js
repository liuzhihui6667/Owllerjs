import './style/index.less'
function Layout(option) {
    this.init(option)
}

Layout.prototype = {
    _option: {},
    init: function (option) {
        this._option = {
            selfLayout: null,
            childrenLayout: null,
            width: null,
            height: null,
            childrenAve: false,
            childrenEl: null
        }
        this._option = Object.assign(this._option, option)
    },

    template: function() {
        let node = document.createElement('div')
        node.classList.add('owl-layout-container')
        if(this._option.childrenLayout === 'h') {
            node.classList.add('owl-layout-h')
        }
        if(this._option.selfLayout === 'h') {
            node.style.width = this._option.width
            node.style.float = 'left'
        } else {
            node.style.height = this._option.height
        }
        node.innerHTML = this._option.childrenEl
        return node
    },

    _set_event: function() {

    },

    _hash_id_generator: function() {
        let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm']
        let _id = 'owl-popup-'
        for (let i = 0; i < 6; i++) {
            _id += arr[parseInt(Math.random()*100%36)]
        }
        return _id
    },

    render: function () {
        
    },


}

function autoRender() {
    let rootContainer = document.getElementsByTagName('owl-layout')[0].parentNode
    let targetContainer = rootContainer.cloneNode(true)
    traversalNodes(rootContainer, targetContainer)
    rootContainer.replaceChild(targetContainer.getElementsByClassName('owl-layout-container')[0], rootContainer.getElementsByTagName('owl-layout')[0])
}

function getNodeCnf(node) {
    let parentNode = node.parentNode
    let selfLayout = parentNode.attributes.hasOwnProperty('childrenlayout') && parentNode.attributes.childrenlayout.value === 'h' ? 'h' : 'v'
    let childrenLayout = node.attributes.hasOwnProperty('childrenlayout') ? node.attributes["childrenlayout"].value : 'v'
    let width, height
    if (selfLayout === 'h') {
        if(node.attributes.hasOwnProperty('width')) {
            width = node.attributes.width.value
        } else if(node.attributes.hasOwnProperty('flex')) {
            for (let i = 0; i < parentNode.childNodes.length; i++) {

            }
        } else {
            width = 'calc((100%'
            let j = 0
            for (let i = 0; i < parentNode.childNodes.length; i++) {
                if(parentNode.childNodes[i].nodeName === "OWL-LAYOUT") {
                    j++
                }
                if(parentNode.childNodes[i].nodeName === "OWL-LAYOUT" && parentNode.childNodes[i].attributes.hasOwnProperty('width')) {
                    width += ' - ' + parentNode.childNodes[i].attributes.width.value
                    j--
                }
            }
            width += ')'
            if(j !== 0) {
                width += ' / ' + j
            }
            width += ')'
        }
    } else {
        if(node.attributes.hasOwnProperty('height')) {
            height = node.attributes.height.value
        } else if(node.attributes.hasOwnProperty('flex')) {
            for (let i = 0; i < parentNode.childNodes.length; i++) {

            }
        } else {
            height = 'calc((100%'
            let j = 0
            for (let i = 0; i < parentNode.childNodes.length; i++) {
                if(parentNode.childNodes[i].nodeName === "OWL-LAYOUT") {
                    j++
                }
                if(parentNode.childNodes[i].nodeName === "OWL-LAYOUT" && parentNode.childNodes[i].attributes.hasOwnProperty('height')) {
                    height += ' - ' + parentNode.childNodes[i].attributes.height.value
                    j--
                }
            }
            height += ')'
            if(j !== 0) {
                height += ' / ' + j
            }
            height += ')'
        }

    }
    return {
        selfLayout: selfLayout,
        childrenLayout: childrenLayout,
        width: width === 'calc(100%)' ? '100%' : width,
        height: height === 'calc(100%)' ? '100%' : height,
        childrenEl: node.innerHTML
    }
}
function createNode(cnf) {
    let layout = new Layout(cnf)
    let temp = layout.template()
    return temp
}
function traversalNodes(node, targetNode) {
    if(node && node.nodeName === "OWL-LAYOUT"){
        let cnf = getNodeCnf(node)
        let createdNode = createNode(cnf)
        targetNode.parentNode.replaceChild(createdNode, targetNode)
        targetNode = createdNode
    }
    let childLength = node.childNodes.length
    let oldChildNodes = node.childNodes, oldChildNode;
    let targetChildNodes = targetNode.childNodes, targetChildNode;
    for(let i = 0; i < childLength ; i++){
        oldChildNode = oldChildNodes[i]
        targetChildNode = targetChildNodes[i]
        if(oldChildNode.nodeName === "OWL-LAYOUT"){
            //递归先序遍历子节点
            traversalNodes(oldChildNode, targetChildNode);
        }
    }
}

autoRender()

export default Layout
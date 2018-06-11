import './Style/index.less'
import popup from './Popup/index.js'
// import 'babel-polyfill'

let pop1 = new popup('owl', {
    title: '我是一个弹窗',
    text: '你好啊，第一次见面，请多指教',
    confirm: function () {
        pop2.render()
    }
})
pop1.render()

let pop2 = new popup('owl2', {
    animation: 'rotate',
    confirm: function () {
        pop3.render()
    }
})

let pop3 = new popup({
    animation: 'op'
})


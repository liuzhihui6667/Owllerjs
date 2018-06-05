import './Style/index.less'
import popup from './Popup/index.js'

let pop1 = new popup('owl', '1111', '2222')
pop1.render()

let pop2 = new popup('owl2', '1111', '2222')
pop2.render()

let pop3 = new popup()

pop3.render()

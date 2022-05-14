import { render } from 'preact'
import { App } from './app'
import 'virtual:windi.css'
import './index.css'

render(<App />, document.getElementById('app')!)

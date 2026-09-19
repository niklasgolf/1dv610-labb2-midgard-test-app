import './style.css'
import { App } from './App.ts'

const root = document.querySelector<HTMLDivElement>('#app')

if (!root) {
  throw new Error('Root element #app was not found.')
}

const app = new App(root)
app.start()

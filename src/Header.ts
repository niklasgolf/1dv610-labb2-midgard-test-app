export class Header {
  public render(): HTMLElement {
    const header = document.createElement('header')
    header.className = 'app-header'

    const title = document.createElement('h1')
    title.className = 'app-title'
    title.textContent = 'Midgard Hex Grid'

    header.append(title)
    return header
  }
}

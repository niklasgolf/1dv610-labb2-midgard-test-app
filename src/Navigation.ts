import type { MenuItem } from './MenuItem.ts'

export class Navigation {
  private readonly items: MenuItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'single-hex', label: 'Single Hex' },
    { id: 'coordinates', label: 'Coordinates' },
    { id: 'small-grid', label: 'Small Grid' },
    { id: 'x-dominated-grid', label: 'X-Dominated Grid' },
    { id: 'y-dominated-grid', label: 'Y-Dominated Grid' },
    { id: 'css-styling', label: 'CSS Styling' },
    { id: 'terrain-map', label: 'Terrain Map' },
    { id: 'neighbours', label: 'Neighbours' },
    { id: 'invalid-coordinates', label: 'Invalid Coordinates' },
  ]

  private readonly onSelect: (item: MenuItem) => void
  private activeId: string
  private element: HTMLElement | null = null

  constructor(onSelect: (item: MenuItem) => void) {
    this.onSelect = onSelect
    this.activeId = this.items[0].id
  }

  public getActiveItem(): MenuItem {
    const activeItem = this.items.find((item) => item.id === this.activeId)

    if (!activeItem) {
      throw new Error(`No menu item found for id "${this.activeId}".`)
    }

    return activeItem
  }

  public render(): HTMLElement {
    const nav = document.createElement('nav')
    nav.className = 'navigation'
    nav.setAttribute('aria-label', 'Demo navigation')

    const list = document.createElement('ul')
    list.className = 'navigation-list'

    for (const item of this.items) {
      list.append(this.createItem(item))
    }

    nav.append(list)
    this.element = nav
    return nav
  }

  private createItem(item: MenuItem): HTMLLIElement {
    const listItem = document.createElement('li')
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'navigation-item'
    button.dataset.id = item.id
    button.textContent = item.label

    if (item.id === this.activeId) {
      button.classList.add('is-active')
    }

    button.addEventListener('click', () => {
      this.setActive(item.id)
      this.onSelect(item)
    })

    listItem.append(button)
    return listItem
  }

  private setActive(id: string): void {
    this.activeId = id

    if (!this.element) {
      return
    }

    const buttons = this.element.querySelectorAll<HTMLButtonElement>('.navigation-item')

    for (const button of buttons) {
      button.classList.toggle('is-active', button.dataset.id === id)
    }
  }
}

import type { HeaderSection } from './Header.ts'
import type { MenuItem } from './MenuItem.ts'

export class Navigation {

  private readonly items: MenuItem[] = [

    { id: 'home', label: 'Home' },

    { id: 'single-hex', label: 'Single Hex' },

    { id: 'x-dominated-grid', label: 'X-Dominated Grid' },

    { id: 'y-dominated-grid', label: 'Y-Dominated Grid' },

    { id: 'css-styling', label: 'CSS Styling' },

    { id: 'svg-terrain', label: 'SVG Terrain' },

    { id: 'terrain-map', label: 'Terrain Map' },

    { id: 'neighbours', label: 'Neighbours' },

    { id: 'unit-movement', label: 'Unit Movement' },

    { id: 'interactive-map', label: 'Interactive Map' },

  ]

  private readonly noteItems: MenuItem[] = [

    { id: 'chapter-00-introduction', label: 'Chapter 00 — Introduction' },

    { id: 'chapter-01-coordinate', label: 'Chapter 01 — coordinate.ts' },

    { id: 'chapter-02-orientation', label: 'Chapter 02 — orientation.ts' },

    { id: 'chapter-03-neighbours', label: 'Chapter 03 — neighbours.ts' },

    { id: 'chapter-04-coordinate-range', label: 'Chapter 04 — coordinate-range.ts' },

    { id: 'chapter-05-coordinate-range-fill', label: 'Chapter 05 — coordinate-range-fill.ts' },

    { id: 'chapter-06-coordinate-positioner', label: 'Chapter 06 — coordinate-positioner.ts' },

    { id: 'chapter-07-geometry', label: 'Chapter 07 — geometry.ts' },

    { id: 'chapter-08-coordinate-layer', label: 'Chapter 08 — coordinate-layer.ts' },

    { id: 'chapter-09-hex-grid', label: 'Chapter 09 — hex-grid.ts' },

    { id: 'chapter-10-index', label: 'Chapter 10 — index.ts' },

    { id: 'chapter-11-why-test', label: 'Chapter 11 — Why Do We Test the Library?' },

    { id: 'chapter-12-coordinate-test', label: 'Chapter 12 — coordinate.test.ts' },

    { id: 'chapter-13-neighbours-test', label: 'Chapter 13 — neighbours.test.ts' },

    { id: 'chapter-14-coordinate-range-test', label: 'Chapter 14 — coordinate-range.test.ts' },

    { id: 'chapter-15-coordinate-range-fill-test', label: 'Chapter 15 — coordinate-range-fill.test.ts' },

    { id: 'chapter-16-coordinate-positioner-test', label: 'Chapter 16 — coordinate-positioner.test.ts' },

    { id: 'chapter-17-geometry-test', label: 'Chapter 17 — geometry.test.ts' },

    { id: 'chapter-18-coordinate-layer-test', label: 'Chapter 18 — coordinate-layer.test.ts' },

    { id: 'chapter-19-hex-grid-test', label: 'Chapter 19 — hex-grid.test.ts' },

    { id: 'chapter-20-one-complete-system', label: 'Chapter 20 — One Complete System' },

    { id: 'chapter-21-why-designed-this-way', label: 'Chapter 21 — Why Designed This Way' },

    { id: 'chapter-22-five-longest-methods', label: 'Chapter 22 — Five Longest Methods' },

    { id: 'chapter-23-public-api-as-a-product', label: 'Chapter 23 — Public API as a Product' },

    { id: 'chapter-24-more-than-tests-passed', label: 'Chapter 24 — More Than Tests Passed' },

    { id: 'chapter-25-domain-modeling-oop', label: 'Chapter 25 — Domain Modeling and OOP' },

    { id: 'chapter-26-invariants-domain-rules', label: 'Chapter 26 — Invariants and Domain Rules' },

    { id: 'chapter-27-dd-change-maintainability', label: 'Chapter 27 — Dependency Direction and Maintainability' },

    { id: 'chapter-28-design-patterns', label: 'Chapter 28 — Design Patterns' },

    { id: 'chapter-29-typescript-library', label: 'Chapter 29 — A TypeScript Library' },

    { id: 'chapter-30-complete-mental-model', label: 'Chapter 30 — Complete Mental Model' },

  ]

  private readonly onSelect: (item: MenuItem) => void

  private activeSection: HeaderSection = 'test'

  private activeTestId: string

  private activeNotesId: string

  private element: HTMLElement | null = null

  constructor(onSelect: (item: MenuItem) => void) {

    this.onSelect = onSelect

    this.activeTestId = this.items[0].id

    this.activeNotesId = this.noteItems[0].id

  }

  public getActiveItem(): MenuItem {

    const items = this.getCurrentItems()

    const activeId = this.getCurrentActiveId()

    const activeItem = items.find((item) => item.id === activeId)

    if (!activeItem) {

      throw new Error(`No menu item found for id "${activeId}".`)

    }

    return activeItem

  }

  public setSection(section: HeaderSection): void {

    this.activeSection = section

    this.refresh()

  }

  public render(): HTMLElement {

    const nav = document.createElement('nav')

    nav.className = 'navigation'

    nav.setAttribute(
      'aria-label',
      this.activeSection === 'test'
        ? 'Test page navigation'
        : 'Project notes navigation',
    )

    const list = document.createElement('ul')

    list.className = 'navigation-list'

    for (const item of this.getCurrentItems()) {

      list.append(this.createItem(item))

    }

    nav.append(list)

    this.element = nav

    return nav

  }

  private getCurrentItems(): MenuItem[] {

    return this.activeSection === 'test'
      ? this.items
      : this.noteItems

  }

  private getCurrentActiveId(): string {

    return this.activeSection === 'test'
      ? this.activeTestId
      : this.activeNotesId

  }

  private createItem(item: MenuItem): HTMLLIElement {

    const listItem = document.createElement('li')

    const button = document.createElement('button')

    button.type = 'button'

    button.className = 'navigation-item'

    button.dataset.id = item.id

    button.textContent = item.label

    if (item.id === this.getCurrentActiveId()) {

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

    if (this.activeSection === 'test') {

      this.activeTestId = id

    } else {

      this.activeNotesId = id

    }

    this.updateActiveButton()

  }

  private updateActiveButton(): void {

    if (!this.element) {

      return

    }

    const activeId = this.getCurrentActiveId()

    const buttons =
      this.element.querySelectorAll<HTMLButtonElement>('.navigation-item')

    for (const button of buttons) {

      button.classList.toggle(
        'is-active',
        button.dataset.id === activeId,
      )

    }

  }

  private refresh(): void {

    if (!this.element) {

      return

    }

    const oldElement = this.element

    const newElement = this.render()

    oldElement.replaceWith(newElement)

  }

}
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
    { id: 'neighbours', label: 'Neighbours' },
  ]

  private readonly libraryNoteItems: MenuItem[] = [
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

  private readonly testAppNoteItems: MenuItem[] = [
    { id: 'test-app-chapter-01', label: 'Chapter 01 — main.ts' },
    { id: 'test-app-chapter-02', label: 'Chapter 02 — App.ts' },
    { id: 'test-app-chapter-03', label: 'Chapter 03 — Header.ts' },
    { id: 'test-app-chapter-04', label: 'Chapter 04 — MenuItem.ts' },
    { id: 'test-app-chapter-05', label: 'Chapter 05 — Navigation.ts' },
    { id: 'test-app-chapter-06', label: 'Chapter 06 — DemoArea.ts' },
    { id: 'test-app-chapter-07', label: 'Chapter 07 — Demo.ts' },
    { id: 'test-app-chapter-08', label: 'Chapter 08 — DemoAreaHome.ts' },
    { id: 'test-app-chapter-09', label: 'Chapter 09 — DemoAreaSingleHex.ts' },
    { id: 'test-app-chapter-10', label: 'Chapter 10 — DemoAreaXDominatedGrid.ts' },
    { id: 'test-app-chapter-11', label: 'Chapter 11 — DemoAreaYDominatedGrid.ts' },
    { id: 'test-app-chapter-12', label: 'Chapter 12 — DemoAreaCssStyling.ts' },
    { id: 'test-app-chapter-13', label: 'Chapter 13 — DemoAreaSvgTerrain.ts' },
    { id: 'test-app-chapter-14', label: 'Chapter 14 — DemoAreaNeighbours.ts' },
    { id: 'test-app-chapter-15', label: 'Chapter 15 — style.css' },
    { id: 'test-app-chapter-16', label: 'Chapter 16 — One Complete System' },
    { id: 'test-app-chapter-17', label: 'Chapter 17 — Design Principles' },
    { id: 'test-app-chapter-18', label: 'Chapter 18 — Design Patterns' },
    { id: 'test-app-chapter-19', label: 'Chapter 19 — TypeScript, DOM and SVG' },
    { id: 'test-app-chapter-20', label: 'Chapter 20 — Vite, Modules and Environment' },
    { id: 'test-app-chapter-21', label: 'Chapter 21 — State, Events and Control' },
    { id: 'test-app-chapter-22', label: 'Chapter 22 — Testing and Integration' },
    { id: 'test-app-chapter-23', label: 'Chapter 23 — From Library to Small Hex Game' },
    { id: 'test-app-chapter-24', label: 'Chapter 24 — Maintainability and Growth' },
    { id: 'test-app-chapter-25', label: 'Chapter 25 — Complete Mental Model' },
  ]

  private readonly onSelect: (item: MenuItem) => void

  private activeSection: HeaderSection = 'test'

  private activeTestId: string
  private activeLibraryNotesId: string
  private activeTestAppNotesId: string

  private element: HTMLElement | null = null

  constructor(onSelect: (item: MenuItem) => void) {
    this.onSelect = onSelect
    this.activeTestId = this.items[0].id
    this.activeLibraryNotesId = this.libraryNoteItems[0].id
    this.activeTestAppNotesId = this.testAppNoteItems[0].id
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
    nav.setAttribute('aria-label', this.getAriaLabel())

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
    if (this.activeSection === 'test') {
      return this.items
    }

    if (this.activeSection === 'library-notes') {
      return this.libraryNoteItems
    }

    return this.testAppNoteItems
  }

  private getCurrentActiveId(): string {
    if (this.activeSection === 'test') {
      return this.activeTestId
    }

    if (this.activeSection === 'library-notes') {
      return this.activeLibraryNotesId
    }

    return this.activeTestAppNotesId
  }

  private getAriaLabel(): string {
    if (this.activeSection === 'test') {
      return 'Test page navigation'
    }

    if (this.activeSection === 'library-notes') {
      return 'Library notes navigation'
    }

    return 'Test app notes navigation'
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
    } else if (this.activeSection === 'library-notes') {
      this.activeLibraryNotesId = id
    } else {
      this.activeTestAppNotesId = id
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
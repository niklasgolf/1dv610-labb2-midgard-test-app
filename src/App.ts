import { DemoArea } from './DemoArea.ts'

import { Header } from './Header.ts'

import type { HeaderSection } from './Header.ts'

import { Navigation } from './Navigation.ts'

import type { MenuItem } from './MenuItem.ts'

export class App {

  private readonly root: HTMLElement

  private readonly header: Header

  private readonly navigation: Navigation

  private readonly demoArea: DemoArea

  constructor(root: HTMLElement) {

    this.root = root

    this.header = new Header(this.handleSectionSelect.bind(this))

    this.navigation = new Navigation(this.handleMenuSelect.bind(this))

    this.demoArea = new DemoArea()

  }

  public start(): void {

    this.render()

    this.demoArea.show(this.navigation.getActiveItem())

  }

  private render(): void {

    this.root.replaceChildren()

    this.root.classList.add('app-shell')

    const content = document.createElement('div')

    content.className = 'app-content'

    content.append(
      this.navigation.render(),
      this.demoArea.render(),
    )

    this.root.append(
      this.header.render(),
      content,
    )

  }

  private handleSectionSelect(section: HeaderSection): void {

    this.navigation.setSection(section)

    this.demoArea.show(this.navigation.getActiveItem())

  }

  private handleMenuSelect(item: MenuItem): void {

    this.demoArea.show(item)

  }

}
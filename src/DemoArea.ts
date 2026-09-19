import type { MenuItem } from './MenuItem.ts'

export class DemoArea {
  private readonly element: HTMLElement
  private readonly heading: HTMLHeadingElement
  private readonly description: HTMLParagraphElement

  constructor() {
    this.element = document.createElement('main')
    this.element.className = 'demo-area'

    this.heading = document.createElement('h2')
    this.heading.className = 'demo-heading'

    this.description = document.createElement('p')
    this.description.className = 'demo-description'

    this.element.append(this.heading, this.description)
  }

  public render(): HTMLElement {
    return this.element
  }

  public show(item: MenuItem): void {
    this.heading.textContent = item.label
    this.description.textContent = this.getDescription(item)
  }

  private getDescription(item: MenuItem): string {
    if (item.id === 'home') {
      return 'Select a demo from the menu to get started.'
    }

    return 'This demo has not been implemented yet.'
  }
}

export type HeaderSection = 'test' | 'notes'

export class Header {

  private readonly onSectionSelect: (section: HeaderSection) => void

  private activeSection: HeaderSection = 'test'

  private element: HTMLElement | null = null

  constructor(onSectionSelect: (section: HeaderSection) => void) {

    this.onSectionSelect = onSectionSelect

  }

  public render(): HTMLElement {

    const header = document.createElement('header')

    header.className = 'app-header'

    const title = document.createElement('h1')

    title.className = 'app-title'

    title.textContent = 'Midgard Hex Grid'

    const navigation = document.createElement('nav')

    navigation.className = 'header-navigation'

    navigation.setAttribute('aria-label', 'Main navigation')

    navigation.append(
      this.createNavigationButton('test', 'Test Page'),
      this.createNavigationButton('notes', 'Project Notes'),
    )

    header.append(title, navigation)

    this.element = header

    return header

  }

  public setActiveSection(section: HeaderSection): void {

    this.activeSection = section

    if (!this.element) {

      return

    }

    const buttons =
      this.element.querySelectorAll<HTMLButtonElement>('.header-navigation-item')

    for (const button of buttons) {

      button.classList.toggle(
        'is-active',
        button.dataset.section === section,
      )

    }

  }

  private createNavigationButton(
    section: HeaderSection,
    label: string,
  ): HTMLButtonElement {

    const button = document.createElement('button')

    button.type = 'button'

    button.className = 'header-navigation-item'

    button.dataset.section = section

    button.textContent = label

    if (section === this.activeSection) {

      button.classList.add('is-active')

    }

    button.addEventListener('click', () => {

      this.setActiveSection(section)

      this.onSectionSelect(section)

    })

    return button

  }

}
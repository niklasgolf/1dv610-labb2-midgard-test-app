import type { Demo } from './Demo.ts'

export class DemoAreaHome implements Demo {

  public render(): HTMLElement {

    const container = document.createElement('div')

    return container

  }

}
import type { Demo } from './Demo.ts'

import {
  HexGrid
} from 'midgard-hex-grid'

import type {
  Hexagon
} from 'midgard-hex-grid'

export class DemoAreaSingleHex implements Demo {

  public render(): HTMLElement {
    const wrapper = document.createElement('div')

    wrapper.className = 'demo-content-wrapper'

    const xHeading = document.createElement('h3')

    xHeading.textContent = 'X-Dominated Hexagon'

    const xDescription = document.createElement('p')

    xDescription.textContent =
      'The hex diameter represents the full width of an x-dominated hexagon.'

    const xCode = this.createCodeExample(
      `const grid = new HexGrid('x-dominated')

const hexagon = grid.createSingleHexagon({
  hexDiameter: 300
})`
    )

    const xDemo = this.createSingleHexagon(
      'x-dominated'
    )

    const yHeading = document.createElement('h3')

    yHeading.textContent = 'Y-Dominated Hexagon'

    const yDescription = document.createElement('p')

    yDescription.textContent =
      'The hex diameter represents the full height of a y-dominated hexagon.'

    const yCode = this.createCodeExample(
      `const grid = new HexGrid('y-dominated')

const hexagon = grid.createSingleHexagon({
  hexDiameter: 300
})`
    )

    const yDemo = this.createSingleHexagon(
      'y-dominated'
    )

    wrapper.append(
      xHeading,
      xDescription,
      xCode,
      xDemo,
      yHeading,
      yDescription,
      yCode,
      yDemo
    )

    return wrapper
  }

  private createCodeExample(
    code: string
  ): HTMLDivElement {
    const container = document.createElement('div')

    const heading = document.createElement('h4')

    heading.textContent = 'Library usage'

    const codeElement = document.createElement('pre')

    codeElement.textContent = code

    container.append(
      heading,
      codeElement
    )

    return container
  }

  private createSingleHexagon(
    orientation: 'x-dominated' | 'y-dominated'
  ): HTMLDivElement {
    const grid = new HexGrid(orientation)

    const hexagon = grid.createSingleHexagon({
      hexDiameter: 300
    })

    return this.createHexagonSvg(
      hexagon
    )
  }

  private createHexagonSvg(
    hexagon: Hexagon
  ): HTMLDivElement {
    const demoContent = document.createElement('div')

    demoContent.className = 'demo-content'

    const xValues = hexagon.points.map(
      (point) => point.x
    )

    const yValues = hexagon.points.map(
      (point) => point.y
    )

    const minX = Math.min(...xValues)
    const maxX = Math.max(...xValues)
    const minY = Math.min(...yValues)
    const maxY = Math.max(...yValues)

    const width = maxX - minX
    const height = maxY - minY

    const svg = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    )

    svg.setAttribute(
      'viewBox',
      `${minX} ${minY} ${width} ${height}`
    )

    svg.setAttribute(
      'width',
      width.toString()
    )

    svg.setAttribute(
      'height',
      height.toString()
    )

    const polygon = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'polygon'
    )

    const svgPoints = hexagon.points
      .map((point) => `${point.x},${point.y}`)
      .join(' ')

    polygon.setAttribute(
      'points',
      svgPoints
    )

    polygon.setAttribute(
      'fill',
      'none'
    )

    polygon.setAttribute(
      'stroke',
      'currentColor'
    )

    polygon.setAttribute(
      'stroke-width',
      '3'
    )

    svg.append(polygon)

    demoContent.append(svg)

    return demoContent
  }
}
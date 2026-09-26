import type { Demo } from './Demo.ts'

import {
  HexGrid
} from 'midgard-hex-grid'

import type {
  LayeredHexagon
} from 'midgard-hex-grid'

export class DemoAreaCssStyling implements Demo {

  public render(): HTMLElement {

    const wrapper = document.createElement('div')

    wrapper.className = 'demo-content-wrapper'

    const heading = document.createElement('h3')

    heading.textContent = 'Styling Individual Hexagons'

    const description = document.createElement('p')

    description.textContent =
      'The test application creates an SVG id for each hexagon from its Midgard coordinate. This makes individual hexagons easy to style with CSS.'

    const grid = new HexGrid('x-dominated')

    const hexagons = grid.createGrid({
      hexDiameter: 100,
      skeletonWidth: 3,
      skeletonHeight: 3
    })

    const gridDemo = this.createGridSvg(hexagons)

    const explanationHeading = document.createElement('h3')

    explanationHeading.textContent = 'CSS styling'

    const explanation = document.createElement('p')

    explanation.textContent =
      'All hexagons are grass green by default. Three specific hexagons are selected by their generated ids and styled lake blue.'

    const codeExample = document.createElement('pre')

    codeExample.textContent =
`.css-styling-hexagon {
  fill: #6f9f58;
}

#hex-4-2,
#hex-3-3,
#hex-5-3 {
  fill: #4f9fcf;
}`

    wrapper.append(
      heading,
      description,
      gridDemo,
      explanationHeading,
      explanation,
      codeExample
    )

    return wrapper

  }

  private createGridSvg(
    hexagons: LayeredHexagon[]
  ): HTMLDivElement {

    const demoContent = document.createElement('div')

    demoContent.className = 'demo-content'

    const points = hexagons.flatMap(
      (hexagon) => hexagon.points
    )

    const xValues = points.map(
      (point) => point.x
    )

    const yValues = points.map(
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

    for (const hexagon of hexagons) {

      const polygon = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'polygon'
      )

      const svgPoints = hexagon.points
        .map((point) => `${point.x},${point.y}`)
        .join(' ')

      const hexagonId =
        `hex-${hexagon.coordinate.x}-${hexagon.coordinate.y}`

      polygon.setAttribute(
        'id',
        hexagonId
      )

      polygon.setAttribute(
        'class',
        'css-styling-hexagon'
      )

      polygon.setAttribute(
        'points',
        svgPoints
      )

      polygon.setAttribute(
        'stroke',
        'currentColor'
      )

      polygon.setAttribute(
        'stroke-width',
        '2'
      )

      svg.append(polygon)

    }

    demoContent.append(svg)

    return demoContent

  }

}
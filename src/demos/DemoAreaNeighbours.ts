import type { Demo } from './Demo.ts'

import {
  HexGrid
} from 'midgard-hex-grid'

import type {
  Coordinate,
  LayeredHexagon
} from 'midgard-hex-grid'

export class DemoAreaNeighbours implements Demo {

  private readonly homeCoordinate: Coordinate = {
    x: 4,
    y: 6
  }

  public render(): HTMLElement {

    const wrapper = document.createElement('div')

    wrapper.className = 'demo-content-wrapper'

    const heading = document.createElement('h3')

    heading.textContent = 'Interactive Neighbours'

    const description = document.createElement('p')

    description.textContent =
      'Hover over the golden home hexagon to highlight its six neighbours.'

    const grid = new HexGrid('y-dominated')

    const hexagons = grid.createGrid({
      hexDiameter: 100,
      skeletonWidth: 4,
      skeletonHeight: 5
    })

    const neighbours = grid.getNeighbours(
      this.homeCoordinate
    )

    const gridDemo = this.createGridSvg(
      hexagons,
      neighbours
    )

    const explanationHeading =
      document.createElement('h3')

    explanationHeading.textContent =
      'Neighbours calculated by Midgard'

    const explanation =
      document.createElement('p')

    explanation.textContent =
      'The test application does not decide which hexagons are neighbours. It asks the Midgard library for the six coordinates surrounding the home hexagon at (4, 6).'

    const coordinateList =
      document.createElement('pre')

    coordinateList.textContent =
      neighbours
        .map((coordinate) => {
          return `(${coordinate.x}, ${coordinate.y})`
        })
        .join('\n')

    wrapper.append(
      heading,
      description,
      gridDemo,
      explanationHeading,
      explanation,
      coordinateList
    )

    return wrapper
  }

  private createGridSvg(
    hexagons: LayeredHexagon[],
    neighbours: Coordinate[]
  ): HTMLDivElement {

    const demoContent =
      document.createElement('div')

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

    const neighbourIds = new Set(
      neighbours.map(
        (coordinate) =>
          this.createHexagonId(coordinate)
      )
    )

    for (const hexagon of hexagons) {

      const polygon =
        document.createElementNS(
          'http://www.w3.org/2000/svg',
          'polygon'
        )

      const svgPoints =
        hexagon.points
          .map(
            (point) =>
              `${point.x},${point.y}`
          )
          .join(' ')

      const id =
        this.createHexagonId(
          hexagon.coordinate
        )

      polygon.id = id

      polygon.setAttribute(
        'points',
        svgPoints
      )

      polygon.setAttribute(
        'fill',
        this.getTerrainColor(
          hexagon.coordinate
        )
      )

      polygon.setAttribute(
        'stroke',
        '#26352c'
      )

      polygon.setAttribute(
        'stroke-width',
        '2'
      )

      if (
        this.isSameCoordinate(
          hexagon.coordinate,
          this.homeCoordinate
        )
      ) {

        polygon.style.cursor = 'pointer'

        polygon.addEventListener(
          'mouseenter',
          () => {
            this.highlightNeighbours(
              svg,
              neighbourIds,
              true
            )
          }
        )

        polygon.addEventListener(
          'mouseleave',
          () => {
            this.highlightNeighbours(
              svg,
              neighbourIds,
              false
            )
          }
        )
      }

      svg.append(polygon)
    }

    demoContent.append(svg)

    return demoContent
  }

  private getTerrainColor(
    coordinate: Coordinate
  ): string {

    if (
      this.isSameCoordinate(
        coordinate,
        this.homeCoordinate
      )
    ) {
      return '#c58b3a'
    }

    if (
      this.isWaterCoordinate(
        coordinate
      )
    ) {
      return '#4f9fcf'
    }

    return '#6f9f58'
  }

  private isWaterCoordinate(
    coordinate: Coordinate
  ): boolean {

    const waterCoordinates = new Set([
      '2-0',
      '4-0',
      '1-1',
      '3-1',
      '2-2',
      '1-3',
      '2-4',
      '3-5',
      '2-6',
      '3-7',
      '2-8',
      '1-9',
      '2-10',
      '8-0',
      '9-1',
      '10-2',
      '9-3',
      '10-4',
      '9-5'
    ])

    return waterCoordinates.has(
      `${coordinate.x}-${coordinate.y}`
    )
  }

  private highlightNeighbours(
    svg: SVGSVGElement,
    neighbourIds: Set<string>,
    highlighted: boolean
  ): void {

    for (const neighbourId of neighbourIds) {

      const polygon =
        svg.querySelector<SVGPolygonElement>(
          `#${neighbourId}`
        )

      if (!polygon) {
        continue
      }

      if (highlighted) {

        polygon.style.filter =
          'brightness(1.35) saturate(1.15)'

        polygon.style.stroke =
          '#f4d35e'

        polygon.style.strokeWidth =
          '4'

      } else {

        polygon.style.filter = ''

        polygon.style.stroke =
          '#26352c'

        polygon.style.strokeWidth =
          '2'
      }
    }
  }

  private createHexagonId(
    coordinate: Coordinate
  ): string {

    return `hex-${coordinate.x}-${coordinate.y}`
  }

  private isSameCoordinate(
    first: Coordinate,
    second: Coordinate
  ): boolean {

    return (
      first.x === second.x &&
      first.y === second.y
    )
  }

}
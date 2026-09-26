import type { Demo } from './Demo.ts'

import {
  HexGrid
} from 'midgard-hex-grid'

import type {
  LayeredHexagon,
  Point
} from 'midgard-hex-grid'

type TerrainType =
  | 'grass'
  | 'water'
  | 'tower'

export class DemoAreaSvgTerrain implements Demo {

  private readonly svgNamespace =
    'http://www.w3.org/2000/svg'

  public render(): HTMLElement {

    const wrapper = document.createElement('div')

    wrapper.className = 'demo-content-wrapper'

    const heading = document.createElement('h3')

    heading.textContent = 'SVG Terrain'

    const description = document.createElement('p')

    description.textContent =
      'A close-up look at terrain drawn entirely with SVG inside Midgard hexagons.'

    const grid = new HexGrid('y-dominated')

    const hexagons = grid.createGrid({
      hexDiameter: 200,
      skeletonWidth: 1,
      skeletonHeight: 3
    })

    const terrainDemo =
      this.createTerrainSvg(hexagons)

    wrapper.append(
      heading,
      description,
      terrainDemo
    )

    return wrapper

  }

  private createTerrainSvg(
    hexagons: LayeredHexagon[]
  ): HTMLDivElement {

    const container =
      document.createElement('div')

    container.className = 'demo-content'

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
      this.svgNamespace,
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

    const definitions =
      document.createElementNS(
        this.svgNamespace,
        'defs'
      )

    svg.append(definitions)

    for (const hexagon of hexagons) {

      this.createTerrainHexagon(
        svg,
        definitions,
        hexagon
      )

    }

    container.append(svg)

    return container

  }

  private createTerrainHexagon(
    svg: SVGSVGElement,
    definitions: SVGDefsElement,
    hexagon: LayeredHexagon
  ): void {

    const terrain =
      this.getTerrainType(hexagon)

    const clipId =
      `terrain-clip-${hexagon.coordinate.x}-${hexagon.coordinate.y}`

    const clipPath =
      document.createElementNS(
        this.svgNamespace,
        'clipPath'
      )

    clipPath.setAttribute(
      'id',
      clipId
    )

    const clipPolygon =
      this.createPolygon(hexagon.points)

    clipPath.append(clipPolygon)

    definitions.append(clipPath)

    const terrainGroup =
      document.createElementNS(
        this.svgNamespace,
        'g'
      )

    terrainGroup.setAttribute(
      'clip-path',
      `url(#${clipId})`
    )

    if (terrain === 'water') {

      this.drawWater(
        terrainGroup,
        hexagon
      )

    } else {

      this.drawGrass(
        terrainGroup,
        hexagon
      )

    }

    if (terrain === 'grass') {

      this.drawTree(
        terrainGroup,
        hexagon
      )

    }

    if (terrain === 'tower') {

      this.drawTower(
        terrainGroup,
        hexagon
      )

    }

    const border =
      this.createPolygon(hexagon.points)

    border.setAttribute(
      'fill',
      'none'
    )

    border.setAttribute(
      'stroke',
      '#33483b'
    )

    border.setAttribute(
      'stroke-width',
      '2'
    )

    svg.append(
      terrainGroup,
      border
    )

  }

  private getTerrainType(
    hexagon: LayeredHexagon
  ): TerrainType {

    const {
      x,
      y
    } = hexagon.coordinate

    if (x === 2 && y === 4) {

      return 'tower'

    }

    if (
      (x === 1 && y === 3) ||
      (x === 1 && y === 5) ||
      (x === 2 && y === 6)
    ) {

      return 'water'

    }

    return 'grass'

  }

  private drawGrass(
    group: SVGGElement,
    hexagon: LayeredHexagon
  ): void {

    const background =
      this.createPolygon(hexagon.points)

    background.setAttribute(
      'fill',
      '#78a85b'
    )

    group.append(background)

    const {
      x,
      y
    } = hexagon.center

    const grassPositions = [
      [-55, -30],
      [-25, 40],
      [35, -45],
      [58, 25],
      [5, 58],
      [-62, 18]
    ]

    for (
      const [offsetX, offsetY]
      of grassPositions
    ) {

      const grass =
        document.createElementNS(
          this.svgNamespace,
          'path'
        )

      grass.setAttribute(
        'd',
        `
          M ${x + offsetX} ${y + offsetY + 8}
          Q ${x + offsetX - 3} ${y + offsetY}
            ${x + offsetX} ${y + offsetY - 8}

          M ${x + offsetX} ${y + offsetY + 8}
          Q ${x + offsetX + 4} ${y + offsetY}
            ${x + offsetX + 8} ${y + offsetY - 5}
        `
      )

      grass.setAttribute(
        'fill',
        'none'
      )

      grass.setAttribute(
        'stroke',
        '#4f7d3a'
      )

      grass.setAttribute(
        'stroke-width',
        '2'
      )

      grass.setAttribute(
        'stroke-linecap',
        'round'
      )

      group.append(grass)

    }

  }

  private drawWater(
    group: SVGGElement,
    hexagon: LayeredHexagon
  ): void {

    const background =
      this.createPolygon(hexagon.points)

    background.setAttribute(
      'fill',
      '#4f9fcf'
    )

    group.append(background)

    const {
      x,
      y
    } = hexagon.center

    const waveOffsets = [
      -45,
      -15,
      15,
      45
    ]

    for (const offset of waveOffsets) {

      const wave =
        document.createElementNS(
          this.svgNamespace,
          'path'
        )

      wave.setAttribute(
        'd',
        `
          M ${x - 70} ${y + offset}
          Q ${x - 50} ${y + offset - 10}
            ${x - 30} ${y + offset}
          T ${x + 10} ${y + offset}
          T ${x + 50} ${y + offset}
          T ${x + 90} ${y + offset}
        `
      )

      wave.setAttribute(
        'fill',
        'none'
      )

      wave.setAttribute(
        'stroke',
        '#8ed1e8'
      )

      wave.setAttribute(
        'stroke-width',
        '5'
      )

      wave.setAttribute(
        'stroke-linecap',
        'round'
      )

      group.append(wave)

    }

  }

  private drawTree(
    group: SVGGElement,
    hexagon: LayeredHexagon
  ): void {

    const {
      x,
      y
    } = hexagon.center

    const shadow =
      document.createElementNS(
        this.svgNamespace,
        'ellipse'
      )

    shadow.setAttribute(
      'cx',
      (x + 10).toString()
    )

    shadow.setAttribute(
      'cy',
      (y + 55).toString()
    )

    shadow.setAttribute(
      'rx',
      '42'
    )

    shadow.setAttribute(
      'ry',
      '13'
    )

    shadow.setAttribute(
      'fill',
      '#3f6738'
    )

    shadow.setAttribute(
      'opacity',
      '0.45'
    )

    const trunk =
      document.createElementNS(
        this.svgNamespace,
        'path'
      )

    trunk.setAttribute(
      'd',
      `
        M ${x - 10} ${y + 48}
        L ${x - 5} ${y - 5}
        L ${x + 10} ${y - 5}
        L ${x + 16} ${y + 48}
        Z
      `
    )

    trunk.setAttribute(
      'fill',
      '#755034'
    )

    trunk.setAttribute(
      'stroke',
      '#513823'
    )

    trunk.setAttribute(
      'stroke-width',
      '3'
    )

    group.append(
      shadow,
      trunk
    )

    const canopyParts = [
      [-28, -18, 35],
      [22, -20, 38],
      [-5, -48, 43],
      [-38, 12, 31],
      [32, 10, 34],
      [0, 5, 44]
    ]

    for (
      const [
        offsetX,
        offsetY,
        radius
      ] of canopyParts
    ) {

      const canopy =
        document.createElementNS(
          this.svgNamespace,
          'circle'
        )

      canopy.setAttribute(
        'cx',
        (x + offsetX).toString()
      )

      canopy.setAttribute(
        'cy',
        (y + offsetY).toString()
      )

      canopy.setAttribute(
        'r',
        radius.toString()
      )

      canopy.setAttribute(
        'fill',
        '#376f3c'
      )

      canopy.setAttribute(
        'stroke',
        '#28532e'
      )

      canopy.setAttribute(
        'stroke-width',
        '2'
      )

      group.append(canopy)

    }

    const highlight =
      document.createElementNS(
        this.svgNamespace,
        'ellipse'
      )

    highlight.setAttribute(
      'cx',
      (x - 18).toString()
    )

    highlight.setAttribute(
      'cy',
      (y - 43).toString()
    )

    highlight.setAttribute(
      'rx',
      '22'
    )

    highlight.setAttribute(
      'ry',
      '14'
    )

    highlight.setAttribute(
      'fill',
      '#5e9650'
    )

    highlight.setAttribute(
      'opacity',
      '0.75'
    )

    group.append(highlight)

  }

  private drawTower(
    group: SVGGElement,
    hexagon: LayeredHexagon
  ): void {

    const {
      x,
      y
    } = hexagon.center

    const shadow =
      document.createElementNS(
        this.svgNamespace,
        'ellipse'
      )

    shadow.setAttribute(
      'cx',
      (x + 12).toString()
    )

    shadow.setAttribute(
      'cy',
      (y + 62).toString()
    )

    shadow.setAttribute(
      'rx',
      '47'
    )

    shadow.setAttribute(
      'ry',
      '14'
    )

    shadow.setAttribute(
      'fill',
      '#49683c'
    )

    shadow.setAttribute(
      'opacity',
      '0.5'
    )

    const base =
      document.createElementNS(
        this.svgNamespace,
        'ellipse'
      )

    base.setAttribute(
      'cx',
      x.toString()
    )

    base.setAttribute(
      'cy',
      (y + 48).toString()
    )

    base.setAttribute(
      'rx',
      '43'
    )

    base.setAttribute(
      'ry',
      '17'
    )

    base.setAttribute(
      'fill',
      '#756c5c'
    )

    base.setAttribute(
      'stroke',
      '#4e4940'
    )

    base.setAttribute(
      'stroke-width',
      '3'
    )

    const body =
      document.createElementNS(
        this.svgNamespace,
        'path'
      )

    body.setAttribute(
      'd',
      `
        M ${x - 31} ${y + 45}
        L ${x - 24} ${y - 38}
        L ${x + 24} ${y - 38}
        L ${x + 31} ${y + 45}
        Q ${x} ${y + 58}
          ${x - 31} ${y + 45}
        Z
      `
    )

    body.setAttribute(
      'fill',
      '#aaa28f'
    )

    body.setAttribute(
      'stroke',
      '#565146'
    )

    body.setAttribute(
      'stroke-width',
      '3'
    )

    const roof =
      document.createElementNS(
        this.svgNamespace,
        'path'
      )

    roof.setAttribute(
      'd',
      `
        M ${x - 34} ${y - 36}
        L ${x} ${y - 78}
        L ${x + 34} ${y - 36}
        Z
      `
    )

    roof.setAttribute(
      'fill',
      '#7b5541'
    )

    roof.setAttribute(
      'stroke',
      '#4e392e'
    )

    roof.setAttribute(
      'stroke-width',
      '3'
    )

    const door =
      document.createElementNS(
        this.svgNamespace,
        'path'
      )

    door.setAttribute(
      'd',
      `
        M ${x - 10} ${y + 49}
        L ${x - 10} ${y + 22}
        Q ${x} ${y + 7}
          ${x + 10} ${y + 22}
        L ${x + 10} ${y + 49}
        Z
      `
    )

    door.setAttribute(
      'fill',
      '#44372d'
    )

    const window =
      document.createElementNS(
        this.svgNamespace,
        'rect'
      )

    window.setAttribute(
      'x',
      (x - 5).toString()
    )

    window.setAttribute(
      'y',
      (y - 18).toString()
    )

    window.setAttribute(
      'width',
      '10'
    )

    window.setAttribute(
      'height',
      '20'
    )

    window.setAttribute(
      'rx',
      '5'
    )

    window.setAttribute(
      'fill',
      '#292e32'
    )

    group.append(
      shadow,
      base,
      body,
      roof,
      door,
      window
    )

  }

  private createPolygon(
    points: Point[]
  ): SVGPolygonElement {

    const polygon =
      document.createElementNS(
        this.svgNamespace,
        'polygon'
      )

    const svgPoints = points
      .map(
        (point) =>
          `${point.x},${point.y}`
      )
      .join(' ')

    polygon.setAttribute(
      'points',
      svgPoints
    )

    return polygon

  }

}
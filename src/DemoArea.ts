import { marked } from 'marked'

import type { MenuItem } from './MenuItem.ts'

import type { Demo } from './demos/Demo.ts'

import { DemoAreaHome } from './demos/DemoAreaHome.ts'

import { DemoAreaSingleHex } from './demos/DemoAreaSingleHex.ts'

import { DemoAreaXDominatedGrid } from './demos/DemoAreaXDominatedGrid.ts'

import { DemoAreaYDominatedGrid } from './demos/DemoAreaYDominatedGrid.ts'

import { DemoAreaCssStyling } from './demos/DemoAreaCssStyling.ts'

import introductionMarkdown from './project-notes/chapter-00-introduction.md?raw'

import coordinateMarkdown from './project-notes/chapter-01-coordinate.md?raw'

import orientationMarkdown from './project-notes/chapter-02-orientation.md?raw'

import neighboursMarkdown from './project-notes/chapter-03-neighbours.md?raw'

import coordinateRangeMarkdown from './project-notes/chapter-04-coordinate-range.md?raw'

import coordinateRangeFillMarkdown from './project-notes/chapter-05-coordinate-range-fill.md?raw'

import coordinatePositionerMarkdown from './project-notes/chapter-06-coordinate-positioner.md?raw'

import geometryMarkdown from './project-notes/chapter-07-geometry.md?raw'

import coordinateLayerMarkdown from './project-notes/chapter-08-coordinate-layer.md?raw'

import hexGridMarkdown from './project-notes/chapter-09-hex-grid.md?raw'

import indexMarkdown from './project-notes/chapter-10-index.md?raw'

import testIntroductionMarkdown from './project-notes/chapter-11-test-introduction.md?raw'

import coordinateTestMarkdown from './project-notes/chapter-12-coordinate.test.md?raw'

import neighboursTestMarkdown from './project-notes/chapter-13-neighbours.test.md?raw'

import coordinateRangeTestMarkdown from './project-notes/chapter-14-coordinate-range.test.md?raw'

import coordinateRangeFillTestMarkdown from './project-notes/chapter-15-coordinate-range-fill.test.md?raw'

import coordinatePositionerTestMarkdown from './project-notes/chapter-16-coordinate-positioner.test.md?raw'

import geometryTestMarkdown from './project-notes/chapter-17-geometry.test.md?raw'

import coordinateLayerTestMarkdown from './project-notes/chapter-18-coordinate-layer.test.md?raw'

import hexGridTestMarkdown from './project-notes/chapter-19-hex-grid.test.md?raw'

import oneCompleteSystemMarkdown from './project-notes/chapter-20-one-complete-system.md?raw'

import whyDesignedThisWayMarkdown from './project-notes/chapter-21-why-designed-this-way.md?raw'

import fiveLongestMethodsMarkdown from './project-notes/chapter-22-five-longest-methods.md?raw'

import publicApiAsProductMarkdown from './project-notes/chapter-23-public-api-as-a-product.md?raw'

import moreThanTestsPassedMarkdown from './project-notes/chapter-24-more-than-tests-passed.md?raw'

import domainModelingOopMarkdown from './project-notes/chapter-25-domain-modeling-oop.md?raw'

import invariantsDomainRulesMarkdown from './project-notes/chapter-26-invariants-domain-rules.md?raw'

import dependencyDirectionMarkdown from './project-notes/chapter-27-dd-change-maintainability.md?raw'

import designPatternsMarkdown from './project-notes/chapter-28-design-patterns.md?raw'

import typeScriptLibraryMarkdown from './project-notes/chapter-29-a-typescript-library.md?raw'

import completeMentalModelMarkdown from './project-notes/chapter-30-complete-mental-model.md?raw'

export class DemoArea {

  private readonly element: HTMLElement

  private readonly heading: HTMLHeadingElement

  private readonly description: HTMLParagraphElement

  private readonly demoContainer: HTMLDivElement

  constructor() {

    this.element = document.createElement('main')

    this.element.className = 'demo-area'

    this.heading = document.createElement('h2')

    this.heading.className = 'demo-heading'

    this.description = document.createElement('p')

    this.description.className = 'demo-description'

    this.demoContainer = document.createElement('div')

    this.demoContainer.className = 'demo-container'

    this.element.append(

      this.heading,

      this.description,

      this.demoContainer

    )

  }

  public render(): HTMLElement {

    return this.element

  }

  public show(item: MenuItem): void {

    const markdown = this.getMarkdown(item)

    if (markdown !== null) {

      this.showMarkdown(markdown)

      return

    }

    this.heading.textContent = item.label

    this.description.textContent =
      this.getDescription(item)

    const demo = this.createDemo(item)

    if (demo === null) {

      this.demoContainer.replaceChildren()

      return

    }

    this.demoContainer.replaceChildren(

      demo.render()

    )

  }

  private showMarkdown(markdown: string): void {

    this.heading.textContent = ''

    this.description.textContent = ''

    this.demoContainer.innerHTML = marked.parse(markdown) as string

  }

  private getMarkdown(item: MenuItem): string | null {

    if (item.id === 'chapter-00-introduction') {

      return introductionMarkdown

    }

    if (item.id === 'chapter-01-coordinate') {

      return coordinateMarkdown

    }

    if (item.id === 'chapter-02-orientation') {

      return orientationMarkdown

    }

    if (item.id === 'chapter-03-neighbours') {

      return neighboursMarkdown

    }

    if (item.id === 'chapter-04-coordinate-range') {

      return coordinateRangeMarkdown

    }

    if (item.id === 'chapter-05-coordinate-range-fill') {

      return coordinateRangeFillMarkdown

    }

    if (item.id === 'chapter-06-coordinate-positioner') {

      return coordinatePositionerMarkdown

    }

    if (item.id === 'chapter-07-geometry') {

      return geometryMarkdown

    }

    if (item.id === 'chapter-08-coordinate-layer') {

      return coordinateLayerMarkdown

    }

    if (item.id === 'chapter-09-hex-grid') {

      return hexGridMarkdown

    }

    if (item.id === 'chapter-10-index') {

      return indexMarkdown

    }

    if (item.id === 'chapter-11-why-test') {

      return testIntroductionMarkdown

    }

    if (item.id === 'chapter-12-coordinate-test') {

      return coordinateTestMarkdown

    }

    if (item.id === 'chapter-13-neighbours-test') {

      return neighboursTestMarkdown

    }

    if (item.id === 'chapter-14-coordinate-range-test') {

      return coordinateRangeTestMarkdown

    }

    if (item.id === 'chapter-15-coordinate-range-fill-test') {

      return coordinateRangeFillTestMarkdown

    }

    if (item.id === 'chapter-16-coordinate-positioner-test') {

      return coordinatePositionerTestMarkdown

    }

    if (item.id === 'chapter-17-geometry-test') {

      return geometryTestMarkdown

    }

    if (item.id === 'chapter-18-coordinate-layer-test') {

      return coordinateLayerTestMarkdown

    }

    if (item.id === 'chapter-19-hex-grid-test') {

      return hexGridTestMarkdown

    }

    if (item.id === 'chapter-20-one-complete-system') {

      return oneCompleteSystemMarkdown

    }

    if (item.id === 'chapter-21-why-designed-this-way') {

      return whyDesignedThisWayMarkdown

    }

    if (item.id === 'chapter-22-five-longest-methods') {

      return fiveLongestMethodsMarkdown

    }

    if (item.id === 'chapter-23-public-api-as-a-product') {

      return publicApiAsProductMarkdown

    }

    if (item.id === 'chapter-24-more-than-tests-passed') {

      return moreThanTestsPassedMarkdown

    }

    if (item.id === 'chapter-25-domain-modeling-oop') {

      return domainModelingOopMarkdown

    }

    if (item.id === 'chapter-26-invariants-domain-rules') {

      return invariantsDomainRulesMarkdown

    }

    if (item.id === 'chapter-27-dd-change-maintainability') {

      return dependencyDirectionMarkdown

    }

    if (item.id === 'chapter-28-design-patterns') {

      return designPatternsMarkdown

    }

    if (item.id === 'chapter-29-typescript-library') {

      return typeScriptLibraryMarkdown

    }

    if (item.id === 'chapter-30-complete-mental-model') {

      return completeMentalModelMarkdown

    }

    return null

  }

  private createDemo(item: MenuItem): Demo | null {

    if (item.id === 'home') {

      return new DemoAreaHome()

    }

    if (item.id === 'single-hex') {

      return new DemoAreaSingleHex()

    }

    if (item.id === 'x-dominated-grid') {

      return new DemoAreaXDominatedGrid()

    }

    if (item.id === 'y-dominated-grid') {

      return new DemoAreaYDominatedGrid()

    }

    if (item.id === 'css-styling') {

      return new DemoAreaCssStyling()

    }

    return null

  }

  private getDescription(item: MenuItem): string {

    if (item.id === 'home') {

      return 'Select a demo from the menu to get started.'

    }

    if (item.id === 'single-hex') {

      return 'Single hexagons generated by the Midgard Hex Grid library.'

    }

    if (item.id === 'x-dominated-grid') {

      return 'A Midgard x-dominated hex grid generated from a 3 by 2 skeleton.'

    }

    if (item.id === 'y-dominated-grid') {

      return 'A Midgard y-dominated hex grid generated from a 3 by 2 skeleton.'

    }

    if (item.id === 'css-styling') {

      return 'Styling individual SVG hexagons using ids generated from their Midgard coordinates.'

    }

    return 'This demo has not been implemented yet.'

  }

}
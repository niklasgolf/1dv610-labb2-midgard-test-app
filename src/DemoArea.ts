import { marked } from 'marked'

import type { MenuItem } from './MenuItem.ts'

import type { Demo } from './demos/Demo.ts'

import { DemoAreaHome } from './demos/DemoAreaHome.ts'
import { DemoAreaSingleHex } from './demos/DemoAreaSingleHex.ts'
import { DemoAreaXDominatedGrid } from './demos/DemoAreaXDominatedGrid.ts'
import { DemoAreaYDominatedGrid } from './demos/DemoAreaYDominatedGrid.ts'
import { DemoAreaCssStyling } from './demos/DemoAreaCssStyling.ts'
import { DemoAreaSvgTerrain } from './demos/DemoAreaSvgTerrain.ts'
import { DemoAreaNeighbours } from './demos/DemoAreaNeighbours.ts'

import introductionMarkdown from './notes-of-library/chapter-00-introduction.md?raw'
import coordinateMarkdown from './notes-of-library/chapter-01-coordinate.md?raw'
import orientationMarkdown from './notes-of-library/chapter-02-orientation.md?raw'
import neighboursMarkdown from './notes-of-library/chapter-03-neighbours.md?raw'
import coordinateRangeMarkdown from './notes-of-library/chapter-04-coordinate-range.md?raw'
import coordinateRangeFillMarkdown from './notes-of-library/chapter-05-coordinate-range-fill.md?raw'
import coordinatePositionerMarkdown from './notes-of-library/chapter-06-coordinate-positioner.md?raw'
import geometryMarkdown from './notes-of-library/chapter-07-geometry.md?raw'
import coordinateLayerMarkdown from './notes-of-library/chapter-08-coordinate-layer.md?raw'
import hexGridMarkdown from './notes-of-library/chapter-09-hex-grid.md?raw'
import indexMarkdown from './notes-of-library/chapter-10-index.md?raw'
import testIntroductionMarkdown from './notes-of-library/chapter-11-test-introduction.md?raw'
import coordinateTestMarkdown from './notes-of-library/chapter-12-coordinate.test.md?raw'
import neighboursTestMarkdown from './notes-of-library/chapter-13-neighbours.test.md?raw'
import coordinateRangeTestMarkdown from './notes-of-library/chapter-14-coordinate-range.test.md?raw'
import coordinateRangeFillTestMarkdown from './notes-of-library/chapter-15-coordinate-range-fill.test.md?raw'
import coordinatePositionerTestMarkdown from './notes-of-library/chapter-16-coordinate-positioner.test.md?raw'
import geometryTestMarkdown from './notes-of-library/chapter-17-geometry.test.md?raw'
import coordinateLayerTestMarkdown from './notes-of-library/chapter-18-coordinate-layer.test.md?raw'
import hexGridTestMarkdown from './notes-of-library/chapter-19-hex-grid.test.md?raw'
import oneCompleteSystemMarkdown from './notes-of-library/chapter-20-one-complete-system.md?raw'
import whyDesignedThisWayMarkdown from './notes-of-library/chapter-21-why-designed-this-way.md?raw'
import fiveLongestMethodsMarkdown from './notes-of-library/chapter-22-five-longest-methods.md?raw'
import publicApiAsProductMarkdown from './notes-of-library/chapter-23-public-api-as-a-product.md?raw'
import moreThanTestsPassedMarkdown from './notes-of-library/chapter-24-more-than-tests-passed.md?raw'
import domainModelingOopMarkdown from './notes-of-library/chapter-25-domain-modeling-oop.md?raw'
import invariantsDomainRulesMarkdown from './notes-of-library/chapter-26-invariants-domain-rules.md?raw'
import dependencyDirectionMarkdown from './notes-of-library/chapter-27-dd-change-maintainability.md?raw'
import designPatternsMarkdown from './notes-of-library/chapter-28-design-patterns.md?raw'
import typeScriptLibraryMarkdown from './notes-of-library/chapter-29-a-typescript-library.md?raw'
import completeMentalModelMarkdown from './notes-of-library/chapter-30-complete-mental-model.md?raw'

import testAppChapter01Markdown from './notes-of-test-app/chapter-01-main-application-begins.md?raw'
import testAppChapter02Markdown from './notes-of-test-app/chapter-02-app-central-organizer.md?raw'
import testAppChapter03Markdown from './notes-of-test-app/chapter-03-header-two-responsibilities.md?raw'
import testAppChapter04Markdown from './notes-of-test-app/chapter-04-menuitem-purpose.md?raw'
import testAppChapter05Markdown from './notes-of-test-app/chapter-05-navigation-side-system.md?raw'
import testAppChapter06Markdown from './notes-of-test-app/chapter-06-demoarea-content-controller.md?raw'
import testAppChapter07Markdown from './notes-of-test-app/chapter-07-demo-common-contract.md?raw'
import testAppChapter08Markdown from './notes-of-test-app/chapter-08-d-a-home.md?raw'
import testAppChapter09Markdown from './notes-of-test-app/chapter-09-d-a-single-hex.md?raw'
import testAppChapter10Markdown from './notes-of-test-app/chapter-10-d-a-x-dominated-grid.md?raw'
import testAppChapter11Markdown from './notes-of-test-app/chapter-11-d-a-y-dominated-grid.md?raw'
import testAppChapter12Markdown from './notes-of-test-app/chapter-12-d-a-css-styling.md?raw'
import testAppChapter13Markdown from './notes-of-test-app/chapter-13-d-a-svg-terrain.md?raw'
import testAppChapter14Markdown from './notes-of-test-app/chapter-14-d-a-neighbours.md?raw'
import testAppChapter15Markdown from './notes-of-test-app/chapter-15-style.md?raw'
import testAppChapter16Markdown from './notes-of-test-app/chapter-16-one-complete-system.md?raw'
import testAppChapter17Markdown from './notes-of-test-app/chapter-17-design-principles.md?raw'
import testAppChapter18Markdown from './notes-of-test-app/chapter-18-design-patterns.md?raw'
import testAppChapter19Markdown from './notes-of-test-app/chapter-19-typescript-dom-svg.md?raw'
import testAppChapter20Markdown from './notes-of-test-app/chapter-20-vite-modules-environment.md?raw'
import testAppChapter21Markdown from './notes-of-test-app/chapter-21-state-events-control.md?raw'
import testAppChapter22Markdown from './notes-of-test-app/chapter-22-testing-and-integration.md?raw'
import testAppChapter23Markdown from './notes-of-test-app/chapter-23-library-to-small-hex-game.md?raw'
import testAppChapter24Markdown from './notes-of-test-app/chapter-24-maintainability-and-growth.md?raw'
import testAppChapter25Markdown from './notes-of-test-app/chapter-25-complete-mental-model.md?raw'

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

  public clear(): void {
    this.heading.textContent = ''
    this.description.textContent = ''
    this.demoContainer.replaceChildren()
  }

  private showMarkdown(markdown: string): void {
    this.heading.textContent = ''
    this.description.textContent = ''

    this.demoContainer.innerHTML =
      marked.parse(markdown) as string
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

    if (item.id === 'test-app-chapter-01') {
      return testAppChapter01Markdown
    }

    if (item.id === 'test-app-chapter-02') {
      return testAppChapter02Markdown
    }

    if (item.id === 'test-app-chapter-03') {
      return testAppChapter03Markdown
    }

    if (item.id === 'test-app-chapter-04') {
      return testAppChapter04Markdown
    }

    if (item.id === 'test-app-chapter-05') {
      return testAppChapter05Markdown
    }

    if (item.id === 'test-app-chapter-06') {
      return testAppChapter06Markdown
    }

    if (item.id === 'test-app-chapter-07') {
      return testAppChapter07Markdown
    }

    if (item.id === 'test-app-chapter-08') {
      return testAppChapter08Markdown
    }

    if (item.id === 'test-app-chapter-09') {
      return testAppChapter09Markdown
    }

    if (item.id === 'test-app-chapter-10') {
      return testAppChapter10Markdown
    }

    if (item.id === 'test-app-chapter-11') {
      return testAppChapter11Markdown
    }

    if (item.id === 'test-app-chapter-12') {
      return testAppChapter12Markdown
    }

    if (item.id === 'test-app-chapter-13') {
      return testAppChapter13Markdown
    }

    if (item.id === 'test-app-chapter-14') {
      return testAppChapter14Markdown
    }

    if (item.id === 'test-app-chapter-15') {
      return testAppChapter15Markdown
    }

    if (item.id === 'test-app-chapter-16') {
      return testAppChapter16Markdown
    }

    if (item.id === 'test-app-chapter-17') {
      return testAppChapter17Markdown
    }

    if (item.id === 'test-app-chapter-18') {
      return testAppChapter18Markdown
    }

    if (item.id === 'test-app-chapter-19') {
      return testAppChapter19Markdown
    }

    if (item.id === 'test-app-chapter-20') {
      return testAppChapter20Markdown
    }

    if (item.id === 'test-app-chapter-21') {
      return testAppChapter21Markdown
    }

    if (item.id === 'test-app-chapter-22') {
      return testAppChapter22Markdown
    }

    if (item.id === 'test-app-chapter-23') {
      return testAppChapter23Markdown
    }

    if (item.id === 'test-app-chapter-24') {
      return testAppChapter24Markdown
    }

    if (item.id === 'test-app-chapter-25') {
      return testAppChapter25Markdown
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

    if (item.id === 'svg-terrain') {
      return new DemoAreaSvgTerrain()
    }

    if (item.id === 'neighbours') {
      return new DemoAreaNeighbours()
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

    if (item.id === 'svg-terrain') {
      return 'Drawing detailed scalable terrain and objects inside Midgard hexagons using SVG.'
    }

    if (item.id === 'neighbours') {
      return 'Using Midgard to find and interact with the six neighbouring hexagons.'
    }

    return 'This demo has not been implemented yet.'
  }
}
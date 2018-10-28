export default class Canvas {
  constructor(
    private canvasElement: HTMLCanvasElement,
    private gridSize: number,
  ) {
    this.canvasElement = canvasElement
    this.gridSize = gridSize
  }

  public getCanvas() {
    return this.canvasElement
  }

  public getContext() {
    return this.canvasElement.getContext('2d')!
  }

  public drawRect(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
  ) {
    const ctx = this.getContext()
    ctx.fillStyle = color
    ctx.fillRect(
      x * this.gridSize,
      y * this.gridSize,
      width * this.gridSize,
      height * this.gridSize,
    )
  }

  public getGriddedWidth() {
    return this.getWidth() / this.gridSize
  }

  public getGriddedHeight() {
    return this.getHeight() / this.gridSize
  }

  public getWidth() {
    return this.canvasElement.width
  }

  public getHeight() {
    return this.canvasElement.height
  }
}

import Canvas from './Canvas'

export default class Stage {
  constructor(private canvas: Canvas, private color: string = 'palegoldenrod') {
    this.canvas = canvas
  }

  public draw() {
    this.canvas.drawRect(
      0,
      0,
      this.canvas.getGriddedWidth(),
      this.canvas.getGriddedHeight(),
      this.color,
    )
  }
}

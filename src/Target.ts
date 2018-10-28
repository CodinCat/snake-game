import Canvas from './Canvas'
import Position from './Position'

export default class Target {
  private position?: Position

  constructor(private canvas: Canvas) {
    this.canvas = canvas
  }

  public generate() {
    const x = Math.floor(Math.random() * this.canvas.getGriddedWidth())
    const y = Math.floor(Math.random() * this.canvas.getGriddedHeight())
    this.position = { x, y }
  }

  public draw() {
    if (!this.position) {
      return
    }
    const { x, y } = this.position
    this.canvas.drawRect(x, y, 1, 1, 'chocolate')
  }

  public getPosition() {
    return this.position
  }
}

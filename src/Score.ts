import Canvas from './Canvas'

export default class Score {
  private score = 0

  constructor(private canvas: Canvas, private color: string = 'black') {
    this.canvas = canvas
  }

  public increment() {
    this.score++
  }

  public setScore(score: number) {
    this.score = score
  }

  public draw() {
    this.canvas.drawText(
      `Score: ${this.score}`,
      10,
      30,
      this.color,
      '20px silom',
    )
  }
}

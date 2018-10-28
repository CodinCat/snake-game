import Canvas from './Canvas'
import Stage from './Stage'
import Snake, { SnakeCommand } from './Snake'
import Target from './Target'
import Score from './Score'
import { comparePosition } from './Position'

enum DirectionKeyCode {
  Left = 37,
  Up,
  Right,
  Down,
  W = 87,
  A = 65,
  S = 83,
  D = 68,
}

export default class GameController {
  private speed = 80
  private stage = new Stage(this.canvas)
  private snake = new Snake(this.canvas)
  private target = new Target(this.canvas)
  private score = new Score(this.canvas)
  private currentDirectionKeyCode: DirectionKeyCode

  constructor(private canvas: Canvas) {
    this.canvas = canvas
  }

  public start() {
    this.snake.pushCommand(SnakeCommand.Right)
    this.target.generate()
    this.update()
    window.addEventListener('keydown', this.keydownHandler)
  }

  private update() {
    this.stage.draw()
    this.snake.move()
    if (comparePosition(this.snake.getPosition(), this.target.getPosition()!)) {
      this.snake.lengthen()
      this.score.increment()
      this.target.generate()
    }
    this.score.draw()
    this.target.draw()
    this.scheduleNextUpdate()
  }

  private scheduleNextUpdate() {
    setTimeout(() => {
      this.update()
    }, this.speed)
  }

  private keydownHandler = event => {
    if (!(event.keyCode in DirectionKeyCode)) {
      return
    }
    if (
      event.keyCode === this.currentDirectionKeyCode ||
      event.keyCode + 2 === this.currentDirectionKeyCode ||
      event.keyCode - 2 === this.currentDirectionKeyCode
    ) {
      return
    }
    this.currentDirectionKeyCode = event.keyCode
    switch (event.keyCode) {
      case DirectionKeyCode.Left:
      case DirectionKeyCode.A:
        this.snake.pushCommand(SnakeCommand.Left)
        break
      case DirectionKeyCode.Up:
      case DirectionKeyCode.W:
        this.snake.pushCommand(SnakeCommand.Up)
        break
      case DirectionKeyCode.Right:
      case DirectionKeyCode.D:
        this.snake.pushCommand(SnakeCommand.Right)
        break
      case DirectionKeyCode.Down:
      case DirectionKeyCode.S:
        this.snake.pushCommand(SnakeCommand.Down)
    }
  }
}

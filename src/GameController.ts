import Canvas from './Canvas'
import Stage from './Stage'
import Snake, { SnakeCommand } from './Snake'
import Target from './Target'
import { comparePosition } from './Position'

enum DirectionKeyCode {
  Left = 37,
  Up,
  Right,
  Down,
}

export default class GameController {
  private speed = 80
  private stage = new Stage(this.canvas)
  private snake = new Snake(this.canvas)
  private target = new Target(this.canvas)
  private currentDirectionKeyCode: DirectionKeyCode

  constructor(private canvas: Canvas) {
    this.canvas = canvas
  }

  public start() {
    this.snake.pushCommand(SnakeCommand.Right)
    this.target.generate()
    this.update()
    console.log(this)
    window.addEventListener('keydown', this.keydownHandler)
  }

  private update() {
    this.stage.draw()
    this.snake.move()

    const targetPosition = this.target.getPosition()!
    const snakePosition = this.snake.getPosition()
    if (comparePosition(snakePosition, targetPosition)) {
      this.snake.lengthen()
      this.target.generate()
    }
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
        this.snake.pushCommand(SnakeCommand.Left)
        break
      case DirectionKeyCode.Up:
        this.snake.pushCommand(SnakeCommand.Up)
        break
      case DirectionKeyCode.Right:
        this.snake.pushCommand(SnakeCommand.Right)
        break
      case DirectionKeyCode.Down:
        this.snake.pushCommand(SnakeCommand.Down)
    }
  }
}
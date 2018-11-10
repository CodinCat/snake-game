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
}

function toDirectionKeyCode(keyCode: number): DirectionKeyCode | undefined {
  if (keyCode in DirectionKeyCode) {
    return keyCode
  }
  const W = 87
  const A = 65
  const S = 83
  const D = 68
  const map = {
    [W]: DirectionKeyCode.Up,
    [A]: DirectionKeyCode.Left,
    [S]: DirectionKeyCode.Down,
    [D]: DirectionKeyCode.Right,
  }
  return map[keyCode]
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
    const directionKeyCode = toDirectionKeyCode(event.keyCode)
    if (
      directionKeyCode === undefined ||
      directionKeyCode === this.currentDirectionKeyCode ||
      directionKeyCode + 2 === this.currentDirectionKeyCode ||
      directionKeyCode - 2 === this.currentDirectionKeyCode
    ) {
      return
    }
    this.currentDirectionKeyCode = directionKeyCode
    switch (directionKeyCode) {
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

import Canvas from './Canvas'
import Position from './Position'

export enum SnakeCommand {
  Left,
  Up,
  Right,
  Down,
}

const INITIAL_LENGTH = 15
const getInitialPosition = () => ({ x: INITIAL_LENGTH - 1, y: 20 })
const getInitialSnake = () =>
  Array.from({ length: INITIAL_LENGTH }, (_, i) => ({
    x: i,
    y: 20,
  }))

export default class Snake {
  private snake: Position[] = getInitialSnake()
  private position: Position = getInitialPosition()
  private tail = INITIAL_LENGTH
  private stepX = 0
  private stepY = 0
  private commandQueue: SnakeCommand[] = []
  private collisionListener: Function[] = []

  constructor(private canvas: Canvas, private color = 'mediumseagreen') {
    this.canvas = canvas
    this.color = color
  }

  public addCollisionListener(fn) {
    this.collisionListener.push(fn)
  }

  public move() {
    this.executeNextCommand()
    this.position.x += this.stepX
    this.position.y += this.stepY
    this.handleBoundaryCases()
    this.drawSnake()
    if (this.selfCollided()) {
      this.collisionListener.forEach(fn => fn())
      // return
    }

    this.snake.push({ ...this.position })
    while (this.snake.length > this.tail) {
      this.snake.shift()
    }
  }

  public lengthen() {
    this.tail++
  }

  public selfCollided() {
    for (let i = 0; i < this.snake.length; i++) {
      if (
        this.position.x === this.snake[i].x &&
        this.position.y === this.snake[i].y
      ) {
        return true
      }
    }
    return false
  }

  public die() {
    this.tail = INITIAL_LENGTH
    this.snake = getInitialSnake()
    this.position = getInitialPosition()
    this.commandQueue = []
  }

  public getPosition() {
    return this.position
  }

  public pushCommand(command: SnakeCommand) {
    this.commandQueue.push(command)
  }

  private handleBoundaryCases() {
    const { x, y } = this.position
    const boundaryX = this.canvas.getGriddedWidth() - 1
    const boundaryY = this.canvas.getGriddedHeight() - 1
    if (x < 0) {
      this.position.x = boundaryX
    }
    if (x > boundaryX) {
      this.position.x = 0
    }
    if (y < 0) {
      this.position.y = boundaryY
    }
    if (y > boundaryY) {
      this.position.y = 0
    }
  }

  private drawSnake() {
    this.snake.forEach(snake => {
      this.canvas.drawRect(snake.x, snake.y, 1, 1, this.color)
    })
  }

  private executeNextCommand() {
    const command = this.commandQueue.shift()
    switch (command) {
      case SnakeCommand.Left:
        this.stepX = -1
        this.stepY = 0
        break
      case SnakeCommand.Up:
        this.stepX = 0
        this.stepY = -1
        break
      case SnakeCommand.Right:
        this.stepX = 1
        this.stepY = 0
        break
      case SnakeCommand.Down:
        this.stepX = 0
        this.stepY = 1
        break
    }
  }
}

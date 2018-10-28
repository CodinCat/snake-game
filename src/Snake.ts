import Canvas from './Canvas'
import Position from './Position'

export enum SnakeCommand {
  Left,
  Up,
  Right,
  Down,
}

export default class Snake {
  private snake: Position[] = []
  private position: Position = { x: 20, y: 20 }
  private stepX = 0
  private stepY = 0
  private tail = 5
  private commandQueue: SnakeCommand[] = []

  constructor(private canvas: Canvas, private color = 'mediumseagreen') {
    this.canvas = canvas
    this.color = color
    this.snake = []
  }

  public move() {
    this.executeNextCommand()
    this.position.x += this.stepX
    this.position.y += this.stepY
    this.handleBoundaryCases()
    this.drawSnake()
    this.snake.push({ ...this.position })
    while (this.snake.length > this.tail) {
      this.snake.shift()
    }
  }

  public lengthen() {
    this.tail++
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
    for (let i = 0; i < this.snake.length; i++) {
      this.canvas.drawRect(this.snake[i].x, this.snake[i].y, 1, 1, this.color)
    }
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

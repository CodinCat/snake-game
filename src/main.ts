import Canvas from './Canvas'
import GameController from './GameController'

const canvasElement = <HTMLCanvasElement>document.getElementById('canvas')
const canvas = new Canvas(canvasElement, 10)
const game = new GameController(canvas)
game.start()

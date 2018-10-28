export default interface Position {
  x: number
  y: number
}

export function comparePosition(a: Position, b: Position) {
  return a.x === b.x && a.y === b.y
}

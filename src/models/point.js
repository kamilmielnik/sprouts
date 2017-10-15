export default () => {
  class Point {
    constructor({ x, y }) {
      this.x = x;
      this.y = y;
    }

    distanceFromPoint(point) {
      const xDifference = this.x - point.x;
      const yDifference = this.y - point.y;
      return Math.sqrt(Math.pow(xDifference, 2) + Math.pow(yDifference, 2));
    }

    equals(point) {
      return this.x === point.x && this.y === point.y;
    }
  }

  return Point;
};

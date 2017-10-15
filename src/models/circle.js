export default () => {
  class Circle {
    constructor({ x, y, radius }) {
      this.x = x;
      this.y = y;
      this.radius = radius;
    }

    collidesWithCircle(circle) {
      const xDifference = this.x - circle.x;
      const yDifference = this.y - circle.y;
      const radiusSum = this.radius + circle.radius;
      return Math.pow(xDifference, 2) + Math.pow(yDifference, 2) <= Math.pow(radiusSum, 2);
    }
  }

  return Circle;
};

export default () => {
  class Segment {
    constructor(start, end) {
      this.start = start;
      this.end = end;
    }

    collidesWithSegment(segment) {
      const { start: p1, end: p2 } = this;
      const { start: q1, end: q2 } = segment;
      const s1 = { x: p2.x - p1.x, y: p2.y - p1.y };
      const s2 = { x: q2.x - q1.x, y: q2.y - q1.y };
      const denominator = -s2.x * s1.y + s1.x * s2.y;
      const s = (-s1.y * (p1.x - q1.x) + s1.x * (p1.y - q1.y)) / denominator;
      const t = (s2.x * (p1.y - q1.y) - s2.y * (p1.x - q1.x)) / denominator;
      return s >= 0 && s <= 1 && t >= 0 && t <= 1;
    }

    collidesWithOpenSegment(segment) {
      if (!this.collidesWithSegment(segment)) return false;
      return [ segment.start, segment.end ].every(
        (point1) => [ this.start, this.end ].every(
          (point2) => !point1.equals(point2)
        )
      );
    }
  }

  return Segment;
};

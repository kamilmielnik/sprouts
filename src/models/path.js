import { action, computed, observable } from 'mobx';

const MIN_POINTS_TO_COMPARE_PATHS = 4;

export default ({ Segment }) => {
  class Path {
    @observable points = [];

    constructor(points = []) {
      this.points = [ ...points ];
    }

    @computed get isLongEnoughToCompare() {
      return this.length >= MIN_POINTS_TO_COMPARE_PATHS;
    }

    @computed get length() {
      return this.points.length;
    }

    @computed get middlePoint() {
      return this.points[this.middlePointIndex];
    }

    @computed get middlePointIndex() {
      const { length, points } = this;
      let i = 1;
      let j = length - 2;
      let leftLength = 0;
      let rightLength = 0;
      while (i < j) {
        if (leftLength <= rightLength) {
          leftLength += points[i].distanceFromPoint(points[i - 1]);
          ++i;
        } else {
          rightLength += points[j].distanceFromPoint(points[j + 1]);
          --j;
        }
      }
      return Math.min(i, length);
    }

    @computed get halfs() {
      const { middlePointIndex, points } = this;
      return {
        firstHalf: new Path(points.slice(0, middlePointIndex + 1)),
        secondHalf: new Path(points.slice(middlePointIndex))
      };
    }

    @computed get segments() {
      const { length, points } = this;
      if (length < 2) return [];
      let previousPoint = points[0];
      const segments = [];
      points.slice(1).forEach((point) => {
        segments.push(new Segment(previousPoint, point));
        previousPoint = point;
      });
      return segments;
    }

    @computed get selfCollides() {
      const { length, segments } = this;
      if (length < 2) return false;
      const headSegment = segments[segments.length - 1];
      return segments.slice(1, -2).some((segment) => headSegment.collidesWithSegment(segment));
    }

    collidesWithPath(path) {
      if (!this.isLongEnoughToCompare || !path.isLongEnoughToCompare) return false;
      const path1SegmentsNormalized = this.segments.slice(1, -1);
      const path2SegmentsNormalized = path.segments.slice(1, -1);
      return path1SegmentsNormalized.some(
        (segment1) => path.segments.some(
          (segment2) => segment1.collidesWithSegment(segment2)
        )
      ) || path2SegmentsNormalized.some(
        (segment1) => this.segments.some(
          (segment2) => segment1.collidesWithSegment(segment2)
        )
      );
    }

    clone() {
      return new Path(this.points);
    }

    @action add(point) {
      this.points.push(point);
    }

    @action clear() {
      this.points.clear();
    }
  }

  return Path;
};

import { action, computed, observable } from 'mobx';

const MIN_POINTS_TO_COMPARE_PATHS = 3;

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

    @computed get headSegment() {
      const { length, points } = this;
      if (length < 2) return null;
      return new Segment(...points.slice(-2));
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
      const { headSegment, isLongEnoughToCompare, segments } = this;
      if (!isLongEnoughToCompare || headSegment === null) return false;
      const innerSegments = segments.slice(1, -2);
      const outerSegments = [
        ...segments.slice(0, 1),
        ...segments.slice(-2, -1)
      ];
      return innerSegments.some((pathSegment) => pathSegment.collidesWithSegment(headSegment))
        || outerSegments.some((pathSegment) => pathSegment.collidesWithOpenSegment(headSegment));
    }

    collidesWithSegment(segment) {
      const { isLongEnoughToCompare, segments } = this;
      if (!isLongEnoughToCompare || segment === null) return false;
      const innerSegments = segments.slice(1, -1);
      const outerSegments = [
        ...segments.slice(0, 1),
        ...segments.slice(-1)
      ];
      return innerSegments.some((pathSegment) => pathSegment.collidesWithSegment(segment))
        || outerSegments.some((pathSegment) => pathSegment.collidesWithOpenSegment(segment));
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

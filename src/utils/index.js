const EPSILON = 1 / 10000;
const MIN_POINTS_TO_COMPARE_PATHS = 4;

export const noop = () => undefined;

export const circlesCollide = (circle1, circle2) => {
  const xDifference = circle1.x - circle2.x;
  const yDifference = circle1.y - circle2.y;
  const radiusSum = circle1.radius + circle2.radius;
  return Math.pow(xDifference, 2) + Math.pow(yDifference, 2) <= Math.pow(radiusSum, 2);
};

export const pointInCircle = (point, circle) => {
  const xDifference = point.x - circle.x;
  const yDifference = point.y - circle.y;
  return xDifference * xDifference + yDifference * yDifference < circle.radius * circle.radius + EPSILON;
};

export const getPathCenterIndex = (path) => {
  const desiredCenter = {
    x: getMedian(path.map(({ x }) => x)),
    y: getMedian(path.map(({ y }) => y))
  };
  let minDifference = Number.MAX_VALUE;
  let foundIndex = -1;
  path.forEach((point, index) => {
    const difference = getPointsDistance(point, desiredCenter);
    if (difference < minDifference) {
      minDifference = difference;
      foundIndex = index;
    }
  });
  return foundIndex;
};

export const pathToLines = (path = []) => {
  if (path.length < 2) return [];
  let previousPoint = path[0];
  const lines = [];
  path.slice(1).forEach((point) => {
    lines.push({
      x1: point.x,
      y1: point.y,
      x2: previousPoint.x,
      y2: previousPoint.y
    });
    previousPoint = point;
  });
  return lines;
};

export const pathSelfCollides = (path) => {
  if (path.length < 2) return false;
  const segments = pathToSegments(path);
  const headSegment = segments[segments.length - 1];
  return segments.slice(1, -2).some((segment) => segmentsIntersect(segment, headSegment));
};

export const pathsCollide = (path1, path2) => {
  if (path1.length < MIN_POINTS_TO_COMPARE_PATHS || path2.length < MIN_POINTS_TO_COMPARE_PATHS) return false;
  const path1Domain = pathDomain(path1);
  const path2Domain = pathDomain(path2);
  if (!domainsIntersect(path1Domain, path2Domain)) return false;
  const path1Segments = pathToSegments(path1);
  const path2Segments = pathToSegments(path2);
  const path1SegmentsNormalized = path1Segments.slice(1, -1);
  const path2SegmentsNormalized = path2Segments.slice(1, -1);
  return path1SegmentsNormalized.some(
    (segment1) => path2Segments.some(
      (segment2) => segmentsIntersect(segment1, segment2)
    )
  ) || path2SegmentsNormalized.some(
    (segment1) => path1Segments.some(
      (segment2) => segmentsIntersect(segment1, segment2)
    )
  );
};

export const getAverage = (numbers) => numbers.length
  ? numbers.reduce((sum, number) => sum + number, 0) / numbers.length
  : 0;

export const getMedian = (numbers) => {
  const sortedNumbers = [ ...numbers ].sort();
  const index = Math.floor(numbers.length / 2);
  return sortedNumbers[index];
};

export const getPointsDistance = (a, b) => {
  const xDifference = a.x - b.x;
  const yDifference = a.y - b.y;
  return Math.sqrt(Math.pow(xDifference, 2) + Math.pow(yDifference, 2));
};

export const pathToSegments = (path = []) => {
  if (path.length < 2) return [];
  let previousPoint = path[0];
  const segments = [];
  path.slice(1).forEach((point) => {
    segments.push({
      a: previousPoint,
      b: point
    });
    previousPoint = point;
  });
  return segments;
};

export const pathDomain = (path) => {
  let minX = Number.MAX_VALUE;
  let minY = Number.MAX_VALUE;
  let maxX = Number.MIN_VALUE;
  let maxY = Number.MIN_VALUE;
  path.forEach(({ x, y }) => {
    minX = Math.min(x, minX);
    minY = Math.min(y, minY);
    maxX = Math.max(x, maxX);
    maxY = Math.max(y, maxY);
  });
  return { minX, minY, maxX, maxY };
};

export const domainsIntersect = (domain1, domain2) =>
  xDomainIntersects(domain1, domain2) && yDomainIntersects(domain1, domain2);

export const xDomainIntersects = (domain1, domain2) => [ domain1.minX, domain1.maxX ].some(
  numberInRange(domain2.minX, domain2.maxX)
);

export const yDomainIntersects = (domain1, domain2) => [ domain1.minY, domain1.maxY ].some(
  numberInRange(domain2.minY, domain2.maxY)
);

export const numberInRange = (min, max) => (number) => min <= number && number <= max;

export const segmentsIntersect = ({ a: p1, b: p2 }, { a: q1, b: q2 }) => {
  const s1 = { x: p2.x - p1.x, y: p2.y - p1.y };
  const s2 = { x: q2.x - q1.x, y: q2.y - q1.y };
  const denominator = -s2.x * s1.y + s1.x * s2.y;
  const s = (-s1.y * (p1.x - q1.x) + s1.x * (p1.y - q1.y)) / denominator;
  const t = (s2.x * (p1.y - q1.y) - s2.y * (p1.x - q1.x)) / denominator;
  return s >= 0 && s <= 1 && t >= 0 && t <= 1;
};

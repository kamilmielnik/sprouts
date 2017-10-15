export default () => {
  class Edge {
    constructor({ source, target, path }) {
      this.source = source;
      this.target = target;
      this.path = path;
    }
  }

  return Edge;
};

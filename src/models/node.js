import { action, computed, observable } from 'mobx';

export default ({ Circle, Point, settings }) => {
  class Node {
    @observable edges = [];
    @observable isSelected = false;

    constructor({ x, y, isInitial = false }) {
      this.x = x;
      this.y = y;
      this.isInitial = isInitial;
    }

    @computed get numberOfEdges() {
      return this.edges
        .filter(({ source, target }) => [ source, target ].includes(this))
        .length;
    }

    @computed get numberOfLiberties() {
      return settings.allowedConnections - this.numberOfEdges;
    }

    @computed get canHaveLoop() {
      return this.numberOfLiberties >= 2;
    }

    @computed get isDead() {
      return this.numberOfLiberties <= 0;
    }

    @computed get isAlive() {
      return !this.isDead;
    }

    @computed get circle() {
      return new Circle({ x: this.x, y: this.y, radius: settings.nodeRadius });
    }

    @computed get point() {
      return new Point({ x: this.x, y: this.y });
    }

    @action removeEdges() {
      this.edges.clear();
    }

    @action addEdge(edge) {
      this.edges.push(edge);
    }
  }

  return Node;
};

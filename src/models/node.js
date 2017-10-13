import { action, computed, observable } from 'mobx';

export default (settings) => {
  class Node {
    @observable x = 0;
    @observable y = 0;
    @observable edges = [];
    @observable isSelected = false;

    constructor({ x, y }) {
      this.x = x;
      this.y = y;
    }

    @computed get numberOfEdges() {
      return this.edges.filter(
        ({ source, middle, target }) => [ source, middle, target ].includes(this)
      ).length;
    }

    @computed get numberOfLiberties() {
      return 3 - this.numberOfEdges;
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

    @computed get asCircle() {
      return {
        x: this.x,
        y: this.y,
        radius: settings.nodeRadius
      };
    }

    @action addEdge(edge) {
      this.edges.push(edge);
    }
  }

  return Node;
};

import { observable } from 'mobx';

class Edge {
  @observable source = 0;
  @observable target = 0;
  @observable path = false;

  constructor({ source, target, path }) {
    this.source = source;
    this.target = target;
    this.path = path;
  }
}

export default Edge;

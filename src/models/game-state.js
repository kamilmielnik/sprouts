import { computed, action, observable } from 'mobx';

const STATE_ADDING_NODES = Symbol('adding-nodes');
const STATE_SELECTING_NODE = Symbol('selecting-node');
const STATE_DRAWING = Symbol('drawing');
const STATE_DISABLED = Symbol('disabled');

export default () => {
  class GameState {
    @observable state = STATE_ADDING_NODES;

    @computed get isAddingNodes() {
      return this.state === STATE_ADDING_NODES;
    }

    @computed get isDrawing() {
      return this.state === STATE_DRAWING;
    }

    @computed get isSelectingNode() {
      return this.state === STATE_SELECTING_NODE;
    }

    @computed get isRunning() {
      return this.isSelectingNode || this.isDrawing;
    }

    @computed get canReset() {
      return true;
    }

    @computed get canRestart() {
      return this.isRunning;
    }

    @computed get canStart() {
      return this.isAddingNodes;
    }

    @action reset() {
      this.state = STATE_ADDING_NODES;
    }

    @action restart() {
      this.state = STATE_SELECTING_NODE;
    }

    @action start() {
      this.state = STATE_SELECTING_NODE;
    }

    @action selectNode() {
      this.state = STATE_DRAWING;
    }

    @action deselectNode() {
      this.state = STATE_SELECTING_NODE;
    }
  }

  return GameState;
};

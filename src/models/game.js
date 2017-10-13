import { action, computed, observable } from 'mobx';
import Edge from 'models/edge';
import Node from 'models/node';
import { circlesCollide, pathSelfCollides, pathsCollide, getPathCenterIndex } from 'utils';

const STATE_DISABLED = {
  canAddNode: false,
  canSelectNode: false,
  canDraw: false
};
const STATE_ADDING_NODES = { ...STATE_DISABLED, canAddNode: true };
const STATE_SELECTING_NODE = { ...STATE_DISABLED, canSelectNode: true };
const STATE_DRAWING = { ...STATE_DISABLED, canDraw: true };

class Game {
  @observable edges = [];
  @observable nodes = [];
  @observable selectedNode = null;
  @observable path = [];
  @observable state = STATE_ADDING_NODES;
  @observable settings = null;

  constructor(settings) {
    this.settings = settings;
  }

  @action start() {
    this.state = STATE_SELECTING_NODE;
  }

  @action addEdge({ source, target, path }) {
    const pivotIndex = getPathCenterIndex(path);
    const pivot = path[pivotIndex];
    const node = this.addNode(pivot);
    const sourceEdge = new Edge({ source, target: node, path: path.slice(0, pivotIndex + 1) });
    const targetEdge = new Edge({ source: node, target, path: path.slice(pivotIndex) });
    source.addEdge(sourceEdge);
    target.addEdge(targetEdge);
    node.addEdge(sourceEdge);
    node.addEdge(targetEdge);
    this.edges.push(sourceEdge);
    this.edges.push(targetEdge);
  }

  @action addNode({ x, y }) {
    const node = new Node({ x, y });
    this.nodes.push(node);
    return node;
  }

  @action selectNode(node) {
    this.selectedNode = node;
    this.selectedNode.isSelected = true;
    this.state = STATE_DRAWING;
    this.path.clear();
    this.path.push({ x: node.x, y: node.y });
  }

  @action deselectNode() {
    this.selectedNode.isSelected = false;
    this.selectedNode = null;
    this.state = STATE_SELECTING_NODE;
  }

  @action closePath(node) {
    if (this.canBreakPath(node)) {
      this.breakPath();
    } else {
      this.path.push({ x: node.x, y: node.y });
      this.addEdge({
        source: this.selectedNode,
        target: node,
        path: this.path.peek()
      });
      this.deselectNode();
      this.path.clear();
    }
  }

  @action breakPath() {
    this.path.clear();
    this.deselectNode();
  }

  @action draw(position) {
    this.path.push(position);
  }

  @computed get canDraw() {
    return this.state.canDraw;
  }

  canAddNode({ x, y }) {
    const { nodes, settings: { nodeRadius }, state: { canAddNode } } = this;
    return canAddNode && nodes.every((node) => !circlesCollide(
      { x, y, radius: nodeRadius },
      { x: node.x, y: node.y, radius: nodeRadius }
    ));
  }

  canSelectNode(node) {
    const { state: { canSelectNode } } = this;
    return canSelectNode && !node.isDead;
  }

  canClosePath(node) {
    const { state: { canDraw } } = this;
    const isCreatingLoop = this.selectedNode === node;
    const canClosePathOnNode = isCreatingLoop ? node.canHaveLoop : node.isAlive;
    return canDraw && this.selectedNode !== null && canClosePathOnNode;
  }

  canBreakPath(node) {
    const { state: { canDraw } } = this;
    const path = [ ...this.path.peek() ];
    if (node) {
      path.push({ x: node.x, y: node.y });
    }
    return Boolean(canDraw && (this.selectedNode !== null && (
      pathSelfCollides(path) || this.edges.some((edge) => pathsCollide(edge.path, path))
    )));
  }
}

export default Game;

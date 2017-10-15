import { action, observable } from 'mobx';

const STATE_DISABLED = {
  canAddNode: false,
  canSelectNode: false,
  canDraw: false
};
const STATE_ADDING_NODES = { ...STATE_DISABLED, canAddNode: true };
const STATE_SELECTING_NODE = { ...STATE_DISABLED, canSelectNode: true };
const STATE_DRAWING = { ...STATE_DISABLED, canDraw: true };

export default ({ Edge, Node, Circle, Path, Point, settings }) => {
  class Game {
    @observable edges = [];
    @observable nodes = [];
    @observable selectedNode = null;
    @observable path = new Path();
    @observable nodeCandidate = null;
    @observable state = STATE_ADDING_NODES;

    anyNodeCollidesWithCircle(circle) {
      return this.nodes.some((node) => circle.collidesWithCircle(node.circle));
    }

    canAddNode({ x, y }) {
      const circle = new Circle({ x, y, radius: settings.nodeRadius });
      return this.state.canAddNode && !this.anyNodeCollidesWithCircle(circle);
    }

    canBreakPath(node) {
      const { edges, selectedNode, state: { canDraw } } = this;
      const path = this.path.clone();
      if (node) {
        path.add(node.point);
      }
      return Boolean(canDraw && (selectedNode !== null && (
        path.selfCollides || edges.some((edge) => path.collidesWithPath(edge.path))
      )));
    }

    canClosePath(node) {
      const { state: { canDraw } } = this;
      const isCreatingLoop = this.selectedNode === node;
      const canClosePathOnNode = isCreatingLoop ? node.canHaveLoop : node.isAlive;
      return canDraw && this.selectedNode !== null && canClosePathOnNode;
    }

    canDraw() {
      const { canAddNode, canDraw } = this.state;
      return canDraw || canAddNode;
    }

    canSelectNode(node) {
      const { state: { canSelectNode } } = this;
      return canSelectNode && !node.isDead;
    }

    @action start() {
      this.state = STATE_SELECTING_NODE;
      this.nodeCandidate = null;
    }

    @action addEdge({ source, target, path }) {
      const { middlePoint, halfs: { firstHalf, secondHalf } } = path;
      const node = this.addNode(middlePoint);
      const sourceEdge = new Edge({ source, target: node, path: firstHalf });
      const targetEdge = new Edge({ source: node, target, path: secondHalf });
      source.addEdge(sourceEdge);
      target.addEdge(targetEdge);
      node.addEdge(sourceEdge);
      node.addEdge(targetEdge);
      this.edges.push(sourceEdge);
      this.edges.push(targetEdge);
    }

    @action addNode(position) {
      const point = new Point(position);
      const node = new Node(point);
      this.nodes.push(node);
      this.nodeCandidate = null;
      return node;
    }

    @action selectNode(node) {
      this.selectedNode = node;
      this.selectedNode.isSelected = true;
      this.state = STATE_DRAWING;
      this.path.clear();
      this.path.add(node.point);
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
        this.path.add(node.point);
        this.addEdge({
          source: this.selectedNode,
          target: node,
          path: this.path
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
      const { canAddNode } = this.state;
      const point = new Point(position);
      if (canAddNode) {
        this.nodeCandidate = new Node(point);
      } else {
        this.path.add(point);
      }
    }
  }

  return Game;
};

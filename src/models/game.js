import { computed, action, observable } from 'mobx';

const player1 = Symbol('player-1');
const player2 = Symbol('player-2');

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
    @observable player = null;
    @observable nodeCandidate = null;
    @observable state = STATE_ADDING_NODES;

    @computed get isRunning() {
      return !this.state.canAddNode;
    }

    @computed get playerName() {
      const playerName = this.player === player1 ? settings.player1Name : settings.player2Name;
      const playerNumber = this.player === player1 ? 1 : 2;
      return playerName || `Player ${playerNumber}`;
    }

    anyNodeCollidesWithCircle(circle) {
      return this.nodes.some((node) => circle.collidesWithCircle(node.circle));
    }

    canAddNode({ x, y }) {
      const circle = new Circle({ x, y, radius: settings.nodeRadius });
      return this.state.canAddNode && !this.anyNodeCollidesWithCircle(circle);
    }

    canBreakPath() {
      const { edges, path, selectedNode, state: { canDraw } } = this;
      if (!canDraw || path.head === null || selectedNode === null) return false;
      return path.selfCollides || edges.some(
        (edge) => edge.path.collidesWithSegment(path.headSegment)
      );
    }

    canClosePath(node) {
      const { selectedNode, state: { canDraw } } = this;
      const isCreatingLoop = selectedNode === node;
      const canClosePathOnNode = isCreatingLoop ? node.canHaveLoop : node.isAlive;
      return canDraw && selectedNode !== null && canClosePathOnNode;
    }

    canSelectNode(node) {
      const { canSelectNode } = this.state;
      return canSelectNode && node.isAlive;
    }

    @action start() {
      this.state = STATE_SELECTING_NODE;
      this.nodeCandidate = null;
      this.player = player1;
    }

    @action togglePlayerTurn() {
      this.player = this.player === player1 ? player2 : player1;
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
      if (this.selectedNode !== null) {
        this.selectedNode.isSelected = false;
        this.selectedNode = null;
      }
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

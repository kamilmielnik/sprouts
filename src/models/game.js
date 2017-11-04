import { computed, action, observable } from 'mobx';

const player1 = Symbol('player-1');
const player2 = Symbol('player-2');

export default ({ Edge, GameState, Node, Circle, Path, Point, settings }) => {
  class Game {
    @observable edges = [];
    @observable nodes = [];
    @observable selectedNode = null;
    @observable path = new Path();
    @observable player = null;
    @observable nodeCandidate = null;
    @observable state = new GameState();

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
      return this.state.isAddingNodes && !this.anyNodeCollidesWithCircle(circle);
    }

    canBreakPath() {
      const { edges, path, selectedNode, state } = this;
      if (!state.isDrawing || path.head === null || selectedNode === null) return false;
      return path.selfCollides || edges.some(
        (edge) => edge.path.collidesWithSegment(path.headSegment)
      );
    }

    canClosePath(node) {
      const { selectedNode, state } = this;
      const isCreatingLoop = selectedNode === node;
      const canClosePathOnNode = isCreatingLoop ? node.canHaveLoop : node.isAlive;
      return state.isDrawing && selectedNode !== null && canClosePathOnNode;
    }

    canSelectNode(node) {
      return this.state.isSelectingNode && node.isAlive;
    }

    @action reset() {
      this.state.reset();
    }

    @action restart() {
      this.state.restart();
    }

    @action start() {
      this.state.start();
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

    @action addInitialNode(position) {
      const point = new Point(position);
      const node = new Node({ ...point, isInitial: true });
      this.nodes.push(node);
      return node;
    }

    @action addNode(position) {
      const point = new Point(position);
      const node = new Node(point);
      this.nodes.push(node);
      this.nodeCandidate = null;
      return node;
    }

    @action selectNode(node) {
      this.state.selectNode();
      this.selectedNode = node;
      this.selectedNode.isSelected = true;
      this.path.clear();
      this.path.add(node.point);
    }

    @action deselectNode() {
      this.state.deselectNode();
      if (this.selectedNode !== null) {
        this.selectedNode.isSelected = false;
        this.selectedNode = null;
      }
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
      const point = new Point(position);
      this.path.add(point);
    }

    @action setNodeCandidate(position) {
      const point = new Point(position);
      this.nodeCandidate = new Node(point);
    }
  }

  return Game;
};

export default class GameController {
  constructor(game) {
    this.game = game;
  }

  click(point) {
    if (this.game.canAddNode(point)) {
      this.game.addNode(point);
    }
  }

  mouseMove(point) {
    if (this.game.canDraw(point)) {
      this.game.draw(point);
    }
    if (this.game.canBreakPath()) {
      this.game.breakPath();
    }
  }

  nodeMouseDown(node) {
    if (this.game.canSelectNode(node)) {
      this.game.selectNode(node);
    }
  }

  nodeMouseEnter(node) {
    if (this.game.canClosePath(node)) {
      this.game.closePath(node);
      this.game.togglePlayerTurn();
    } else if (this.game.canBreakPath(node)) {
      this.game.breakPath();
    }
  }

  start() {
    this.game.start();
  }
}

export default class GameController {
  constructor(game) {
    this.game = game;
  }

  click(point) {
    if (this.game.canAddNode(point)) {
      this.game.addInitialNode(point);
    }
  }

  mouseLeave() {
    if (this.game.state.isDrawing) {
      this.game.breakPath();
    }
    if (this.game.state.isAddingNodes) {
      this.game.clearNodeCandidate();
    }
  }

  mouseMove(point) {
    if (this.game.state.isDrawing) {
      this.game.draw(point);
    } else if (this.game.state.isAddingNodes) {
      this.game.setNodeCandidateAtPoint(point);
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

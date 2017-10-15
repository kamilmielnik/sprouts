export default ({ game }) => {
  class GameController {
    click(point) {
      if (game.canAddNode(point)) {
        game.addNode(point);
      }
    }

    mouseMove(point) {
      if (game.canDraw(point)) {
        game.draw(point);
      }
      if (game.canBreakPath()) {
        game.breakPath();
      }
    }

    nodeMouseDown(node) {
      if (game.canSelectNode(node)) {
        game.selectNode(node);
      }
    }

    nodeMouseEnter(node) {
      if (game.canClosePath(node)) {
        game.closePath(node);
      } else if (game.canBreakPath(node)) {
        game.breakPath();
      }
    }

    start() {
      game.start();
    }
  }

  return GameController;
};

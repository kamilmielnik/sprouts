import createGameController from 'controllers/game';
import createCircleModel from 'models/circle';
import createColorsModel from 'models/colors';
import createEdgeModel from 'models/edge';
import createGameModel from 'models/game';
import createNodeModel from 'models/node';
import createPathModel from 'models/path';
import createPointModel from 'models/point';
import createSegmentModel from 'models/segment';
import createSettingsModel from 'models/settings';

const Colors = createColorsModel();
const Settings = createSettingsModel();

const colors = new Colors();
const settings = new Settings({
  nodeRadius: 8,
  width: 800,
  height: 600
});

const Circle = createCircleModel();
const Edge = createEdgeModel();
const Segment = createSegmentModel();
const Path = createPathModel({ Segment });
const Point = createPointModel();
const Node = createNodeModel({ Circle, Point, settings });
const Game = createGameModel({ Edge, Node, Circle, Path, Point, settings });
const game = new Game();
const GameController = createGameController({ game });
const gameController = new GameController();

const state = {
  colors,
  game,
  gameController,
  settings
};

export default state;

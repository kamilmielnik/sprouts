import CreateCircleModel from 'models/circle';
import CreateColorsModel from 'models/colors';
import CreateEdgeModel from 'models/edge';
import CreateGameModel from 'models/game';
import CreateNodeModel from 'models/node';
import CreatePathModel from 'models/path';
import CreatePointModel from 'models/point';
import CreateSegmentModel from 'models/segment';
import CreateSettingsModel from 'models/settings';

const Colors = CreateColorsModel();
const Settings = CreateSettingsModel();

const colors = new Colors();
const settings = new Settings({
  nodeRadius: 8,
  width: 800,
  height: 600
});

const Circle = CreateCircleModel();
const Edge = CreateEdgeModel();
const Segment = CreateSegmentModel();
const Path = CreatePathModel({ Segment });
const Point = CreatePointModel();
const Node = CreateNodeModel({ Circle, Point, settings });
const Game = CreateGameModel({ Edge, Node, Circle, Path, Point, settings });

const game = new Game();

const state = {
  colors,
  game,
  settings
};

export default state;

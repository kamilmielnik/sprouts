import CreateColorsModel from 'models/colors';
import CreateEdgeModel from 'models/edge';
import CreateGameModel from 'models/game';
import CreateNodeModel from 'models/node';
import CreateSettingsModel from 'models/settings';

const ColorsModel = CreateColorsModel();
const SettingsModel = CreateSettingsModel();

const colors = new ColorsModel();
const settings = new SettingsModel({
  nodeRadius: 8,
  width: 800,
  height: 600
});

const EdgeModel = CreateEdgeModel();
const NodeModel = CreateNodeModel(settings);
const GameModel = CreateGameModel(EdgeModel, NodeModel, settings);

const game = new GameModel();

const state = {
  colors,
  game,
  settings
};

export default state;

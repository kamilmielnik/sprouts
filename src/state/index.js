import ColorsModel from 'models/colors';
import GameModel from 'models/game';
import SettingsModel from 'models/settings';

const colors = new ColorsModel();
const settings = new SettingsModel({
  nodeRadius: 8,
  width: 800,
  height: 600
});
const game = new GameModel(settings);

export default {
  colors,
  game,
  settings
};

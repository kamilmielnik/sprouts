import ColorsModel from 'modules/colors/model';
import SettingsModel from 'modules/settings/model';
import GameModel from 'modules/game/model';
import Node from 'modules/node/model';

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

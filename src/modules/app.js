import React from 'react';
import { Provider } from 'mobx-react';
import ColorsModel from 'modules/colors/model';
import SettingsModel from 'modules/settings/model';
import GameModel from 'modules/game/model';
import Node from 'modules/node/model';
import Game from 'modules/game/view-model';
import Button from 'components/button';
import styles from './styles.scss';

const colors = new ColorsModel();
const settings = new SettingsModel({
  nodeRadius: 8
});
const game = new GameModel(settings);

// TODO: remove this
game.addNode(new Node({ x: 100, y: 200 }));
game.addNode(new Node({ x: 200, y: 200 }));
game.addNode(new Node({ x: 150, y: 250 }));

const App = () => (
  <Provider
    colors={colors}
    game={game}
    settings={settings}>
    <div className={styles.app}>
      <Game />
      <Button className={styles.button} onClick={() => game.start()}>
        Start game
      </Button>
    </div>
  </Provider>
);

export default App;

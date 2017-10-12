import React from 'react';
import Game from 'modules/game/view-model';
import StatusBar from 'modules/status-bar/view-model';
import Controls from 'modules/controls/view-model';
import styles from './styles.scss';

const App = () => (
  <div className={styles.app}>
    <StatusBar className={styles.statusBar} />
    <Game />
    <Controls className={styles.controls} />
  </div>
);

export default App;

import React from 'react';
import Game from 'modules/game';
import StatusBar from 'modules/status-bar';
import Controls from 'modules/controls';
import styles from './styles.scss';

const App = () => (
  <div className={styles.app}>
    <StatusBar className={styles.statusBar} />
    <Game />
    <Controls className={styles.controls} />
  </div>
);

export default App;

import React from 'react';
import Game from 'modules/game';
import StatusBar from 'modules/status-bar';
import Controls from 'modules/controls';
import Settings from 'modules/settings';
import styles from './styles.scss';

const App = () => (
  <div className={styles.app}>
    <div className={styles.content}>
      <Game className={styles.game} />

      <div className={styles.controlsAndSettings}>
        <Controls className={styles.controls} />
        <Settings className={styles.settings} />
      </div>
    </div>

    <StatusBar className={styles.statusBar} />
  </div>
);

export default App;

import React from 'react';
import Game from 'modules/game';
import Sidebar from 'sidebar';
import StatusBar from 'modules/status-bar';
import Controls from 'modules/controls';
import PlayerNames from 'modules/player-names';
import Settings from 'modules/settings';
import styles from './styles.scss';

const App = () => (
  <div className={styles.app}>
    <Sidebar contentClassName={styles.sidebarContent}>
      <div className={styles.content}>
        <div className={styles.top}>
          <PlayerNames />
        </div>

        <div className={styles.middle}>
          <Game className={styles.game} />

          <div className={styles.controlsAndSettings}>
            <Controls className={styles.controls} />
            <Settings className={styles.settings} />
          </div>
        </div>

        <div className={styles.bottom}>
          <StatusBar />
        </div>
      </div>
    </Sidebar>
  </div>
);

export default App;

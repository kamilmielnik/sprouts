import { action, observable } from 'mobx';

export default () => {
  class Settings {
    static maxNodeRadius = 20;
    static minNodeRadius = 1;

    @observable player1Name = '';
    @observable player2Name = '';
    @observable nodeRadius = 8;
    @observable width = 800;
    @observable height = 600;

    constructor({ nodeRadius, width, height }) {
      this.nodeRadius = nodeRadius;
      this.width = width;
      this.height = height;
    }

    @action setNodeRadius(value) {
      this.nodeRadius = Math.min(Math.max(value, Settings.minNodeRadius), Settings.maxNodeRadius);
    }

    @action setPlayer1Name(value) {
      this.player1Name = value;
    }

    @action setPlayer2Name(value) {
      this.player2Name = value;
    }
  }

  return Settings;
};

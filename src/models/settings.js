import { action, observable } from 'mobx';

const minAllowedConnections = 2;
const maxAllowedConnections = 99;
const maxNodeRadius = 20;
const minNodeRadius = 1;

export default () => {
  class Settings {
    @observable player1Name = '';
    @observable player2Name = '';
    @observable allowedConnections = 3;
    @observable nodeRadius = 8;
    @observable width = 800;
    @observable height = 600;

    constructor({ nodeRadius, width, height }) {
      this.nodeRadius = nodeRadius;
      this.width = width;
      this.height = height;
    }

    @action setAllowedConnections(value) {
      this.allowedConnections = Math.min(Math.max(value, minAllowedConnections), maxAllowedConnections);
    }

    @action setNodeRadius(value) {
      this.nodeRadius = Math.min(Math.max(value, minNodeRadius), maxNodeRadius);
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

import { observable } from 'mobx';

export default () => {
  class Settings {
    @observable nodeRadius = 8;
    @observable width = 800;
    @observable height = 600;

    constructor({ nodeRadius, width, height }) {
      this.nodeRadius = nodeRadius;
      this.width = width;
      this.height = height;
    }
  }

  return Settings;
};

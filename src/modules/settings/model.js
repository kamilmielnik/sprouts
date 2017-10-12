import { observable } from 'mobx';

class Settings {
  @observable nodeRadius = 8;

  constructor({ nodeRadius }) {
    this.nodeRadius = nodeRadius;
  }
}

export default Settings;

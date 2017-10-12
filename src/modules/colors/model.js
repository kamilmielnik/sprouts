import { observable } from 'mobx';

const SHADE_1 = '#E5DD00';
const SHADE_2 = '#8CB202';
const SHADE_3 = '#008C74';
const SHADE_4 = '#004C66';
const SHADE_5 = '#332B40';

class ColorsModel {
  @observable background = SHADE_5;
  @observable node = SHADE_2;
  @observable selectedNode = SHADE_1;
  @observable deadNode = '#888';
  @observable path = SHADE_1;
  @observable edge = SHADE_3;
}

export default ColorsModel;

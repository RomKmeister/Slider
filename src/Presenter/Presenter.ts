import Model from '../Model/Model';

class Presenter {
  model: object;

  constructor(options: object) {
    this.model = new Model(options);
  }
}

export default Presenter;

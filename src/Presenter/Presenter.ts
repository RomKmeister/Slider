import Model from '../Model/Model';
import ViewSlider from '../View/ViewSlider';

class Presenter {
  model: Model;

  viewSlider: ViewSlider;

  constructor(options: object) {
    this.model = new Model(options);
  }
}

export default Presenter;

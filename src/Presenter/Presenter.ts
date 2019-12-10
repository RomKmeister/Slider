import Model from '../Model/Model';
import ViewSlider from '../View/ViewSlider';

class Presenter {
  model: Model;

  viewSlider: ViewSlider;

  constructor(options: object) {
    this.model = new Model(options);
    this.viewSlider = new ViewSlider(this.model);
    this.model.setMediator(this);
    this.viewSlider.setMediator(this);
  }

  notify(property, value) {
    this.model.updateModel(property, value);
    this.viewSlider.setSliderParameters();
  }
}


const slider = new Presenter({});
slider.viewSlider.setSliderParameters();


export default Presenter;

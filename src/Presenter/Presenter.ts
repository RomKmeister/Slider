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

  notify(property: string, value: number | boolean): void {
    this.model.updateModel(property, value);
    this.model.checkScaleBorders();
    this.viewSlider.setSliderParameters();
  }
}


const slider = new Presenter({});
slider.viewSlider.setSliderParameters();


export default Presenter;

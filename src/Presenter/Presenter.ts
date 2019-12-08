import Model from '../Model/Model';
import ViewSlider from '../View/ViewSlider';

class Presenter {
  model: Model;

  viewSlider: ViewSlider;

  constructor(options: object) {
    this.model = new Model(options);
    this.viewSlider = new ViewSlider(this.model);
    document.addEventListener("click", () => this.model.firstValue = 80);
  }

}


const slider = new Presenter({});
slider.viewSlider.render();
slider.viewSlider.setHandlesPosition();


export default Presenter;

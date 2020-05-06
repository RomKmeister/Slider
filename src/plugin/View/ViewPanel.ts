import Model from '../Model/Model';
import ViewSlider from './ViewSlider';

class ViewPanel extends ViewSlider {
  element: HTMLElement;

  model: Model;

  panel: HTMLElement;

  inputs: NodeListOf<HTMLFormElement>;

  constructor(element: HTMLElement, model: Model) {
    super(element, model);
    this.initPanel();
  }

  setPanelParameters(): void {
    const [
      minValueScale,
      maxValueScale,
      firstValue,
      showSecondValue,
      secondValue,
      step,
      verticalScale,
      showBubble,
    ]: any = this.inputs;
    minValueScale.value = Math.round(this.model.minValueScale);
    maxValueScale.value = Math.round(this.model.maxValueScale);
    firstValue.value = Math.round(this.model.firstValue);
    showSecondValue.checked = this.model.showSecondValue;
    secondValue.value = Math.round(this.model.secondValue);
    step.value = Math.round(this.model.step);
    verticalScale.checked = this.model.verticalScale;
    showBubble.checked = this.model.showBubble;
  }

  private initPanel(): void {
    this.findElements();
    this.setPanelParameters();
    this.formChange();
  }

  private findElements(): void {
    this.panel = this.element.querySelector('.js-panel');
    this.inputs = this.panel.querySelectorAll('.js-input__field');
  }

  private formChange(): void {
    this.inputs.forEach((item: HTMLFormElement) => {
      item.addEventListener('change', this.handleInpitChange.bind(this));
    });
  }

  private handleInpitChange(event: KeyboardEvent): void {
    const target = event.target as HTMLFormElement;
    const elementName = target.name;
    const elementValue = target.type === 'number' ? Number(target.value) : target.checked;
    this.mediator.notify({ [elementName]: elementValue });
  }
}

export default ViewPanel;

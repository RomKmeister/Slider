import BaseComponent from '../BaseComponent/BaseComponent';
import Model from '../Model/Model';

const template = require('./panelTemplate.pug');

class ViewPanel extends BaseComponent {
  model: Model;

  panel: HTMLElement;

  inputs: NodeListOf<HTMLFormElement>;

  constructor(model: Model) {
    super();
    this.model = model;
    this.panel = this.render();
    this.inputs = this.panel.querySelectorAll('.js-slider-block__input');
    this.setPanelParameters();
    this.formChange();
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

  private render(): HTMLElement {
    this.panel = document.createElement('form');
    this.panel.classList.add('slider-block__panel');
    this.panel.classList.add('js-slider-block__panel');
    this.panel.insertAdjacentHTML('afterbegin', template);
    return this.panel;
  }

  private formChange(): void {
    this.inputs.forEach((item: HTMLFormElement) => {
      item.addEventListener('change', this.handleInpitChange.bind(this));
    });
  }

  private handleInpitChange(event: KeyboardEvent): void {
    const target = event.target as HTMLFormElement;
    const elementName = target.name;
    const elementValue = target.type === 'text' ? Number(target.value) : target.checked;
    this.mediator.notify({ [elementName]: elementValue });
  }
}

export default ViewPanel;

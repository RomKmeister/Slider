/* eslint-disable no-param-reassign */

import Model from '../Model/Model';
import ViewSlider from './ViewSlider';
import EventEmitter from '../EventEmitter/EventEmitter';

class ViewPanel extends ViewSlider {
  element: HTMLElement;

  model: Model;

  panel: HTMLElement;

  inputs: NodeListOf<HTMLInputElement>;

  eventEmitter = new EventEmitter();

  findElements(): void {
    this.inputs = this.element.querySelectorAll('.js-input__field');
  }

  setPanelParameters(): void {
    this.inputs.forEach((item) => {
      const newValue = item.name as keyof Model;
      if (item.type === 'checkbox') {
        item.checked = Boolean(this.model[newValue]);
      } else {
        item.value = String(Math.round(Number(this.model[newValue])));
      }
    });
  }

  bindEventListners(): void {
    this.inputs.forEach((item) => {
      item.addEventListener('click', this.handleInputChange.bind(this));
    });
  }

  private handleInputChange(event: InputEvent): void {
    const target = event.currentTarget as HTMLInputElement;
    const elementName = target.name;
    const elementValue = target.type === 'number' ? Number(target.value) : target.checked;
    const newOptions = { ...this.model, [elementName]: elementValue };
    this.eventEmitter.notify(newOptions, 'viewUpdated');
  }
}

export default ViewPanel;

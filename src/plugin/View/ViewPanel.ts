/* eslint-disable no-param-reassign */

import Model from '../Model/Model';
import EventEmitter from '../EventEmitter/EventEmitter';
import { ModelOptions } from '../interfaces';

class ViewPanel {
  element: HTMLElement;

  model: Model;

  inputs: NodeListOf<HTMLInputElement>;

  eventEmitter: EventEmitter;

  constructor(element: HTMLElement, model: Model) {
    this.element = element;
    this.model = model;
    this.init();
  }

  setPanelParameters(): void {
    this.inputs.forEach((item) => {
      const newValue = item.name as keyof ModelOptions;
      if (item.type === 'checkbox') {
        item.checked = Boolean(this.model.modelOptions[newValue]);
      } else {
        item.value = String(Math.round(Number(this.model.modelOptions[newValue])));
      }
    });
  }

  private init(): void {
    this.eventEmitter = new EventEmitter();
    this.findElements();
    this.setPanelParameters();
    this.bindEventListners();
  }

  private findElements(): void {
    this.inputs = this.element.querySelectorAll('.js-input__field');
  }

  private bindEventListners(): void {
    this.inputs.forEach((item) => {
      item.addEventListener('change', this.handleInputChange.bind(this));
    });
  }

  private handleInputChange(event: InputEvent): void {
    const target = event.currentTarget as HTMLInputElement;
    const elementName = target.name;
    const elementValue = target.type === 'number' ? Number(target.value) : target.checked;
    const newOptions = { ...this.model.modelOptions, [elementName]: elementValue };
    this.eventEmitter.notify(newOptions, 'viewPanelUpdated');
  }
}

export default ViewPanel;

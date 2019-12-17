import Model from '../Model/Model';
import Presenter from '../Presenter/Presenter';

class ViewPanel {
  model: Model;

  mediator: Presenter;

  panel: HTMLElement;

  constructor(model: Model) {
    this.model = model;
    this.panel = this.render();
    this.inputs = this.panel.querySelectorAll('.panel__input');
    this.formChange();
  }

  setMediator(mediator: Presenter): void {
    this.mediator = mediator;
  }

  render(): HTMLElement {
    const template = require('./panelTemplate.pug');
    this.panel = document.createElement('div');
    this.panel.classList.add('panel');
    this.panel.insertAdjacentHTML("afterbegin", template);
    return this.panel;
  }

  setPanelParameters(): void {
    this.inputs.forEach((item) => {
      const name = item.name;
      if (item.type === 'text') {
        item.value = this.model[name];
      }
      else {
        item.checked = this.model[name];
      }
    })
  }

  private formChange(): void {
    this.inputs.forEach( (item) => { item.addEventListener('change', (event) => {
      const elementName = event.target.name;
      const elementValue = event.target.type === 'text' ?  Number(event.target.value) : event.target.checked;
      this.mediator.notify(elementName, elementValue);
      console.log(this.model)
    })
  })
  }
}

export default ViewPanel;

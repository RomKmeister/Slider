import Model from '../Model/Model';

class ViewSlider {
  model: Model;

  mediator: any

  handles: any;

  slider: HTMLElement;

  scale: HTMLElement;

  bubbles: any;

  firstHandle: HTMLElement;

  secondHandle: HTMLElement;

  firstBubble: HTMLElement;

  secondBubble: HTMLElement;

  constructor(model: Model) {
    this.model = model;
    this.render();
    this.slider = document.querySelector('.slider');
    this.scale = document.querySelector('.slider__scale');
    this.handles = document.querySelectorAll('.slider__handle');
    this.bubbles = document.querySelectorAll('.slider__bubble');
    this.onChange();
  }

  setMediator(mediator): void {
    this.mediator = mediator;
  }

  render(): void {
    const slider = document.createElement('div');
    const scale = document.createElement('div');
    const firstHandle = document.createElement('div');
    const secondHandle = document.createElement('div');
    const firstBubble = document.createElement('div');
    const secondBubble = document.createElement('div');
    slider.classList.add('slider');
    scale.classList.add('slider__scale');
    firstHandle.classList.add('slider__handle');
    secondHandle.classList.add('slider__handle');
    firstBubble.classList.add('slider__bubble');
    secondBubble.classList.add('slider__bubble');
    firstHandle.append(firstBubble);
    secondHandle.append(secondBubble);
    slider.append(scale);
    slider.append(firstHandle);
    slider.append(secondHandle);
    document.body.append(slider);
  }

  setSliderParameters(): void {
    this.setHandlesPosition();
    this.showSecondHandler();
    this.setBubbleValue();
    this.showBubble();
  }

  setHandlesPosition(): void {
    [this.firstHandle, this.secondHandle] = this.handles;
    this.firstHandle.style.left = (this.model.firstValue * 100) / (this.model.maxValueScale - this.model.minValueScale) + '%';
    this.secondHandle.style.left = (this.model.secondValue * 100) / (this.model.maxValueScale - this.model.minValueScale) + '%';
  }

  setBubbleValue(): void {
    [this.firstBubble, this.secondBubble] = this.bubbles;
    this.firstBubble.textContent = this.model.firstValue;
    this.secondBubble.textContent = this.model.secondValue;
  }

  showSecondHandler(): void {
    this.secondHandle.style.display = this.model.showSecondValue ? 'block' : 'none';
  }

  showBubble(): void {
    this.bubbles.forEach((item: HTMLElement) => { item.style.display = this.model.showBubble ? 'block' : 'none' });
  }

  onChange(): void {
    this.slider.addEventListener('mousedown', this.onMouseDown.bind(this));
  }

  onMouseDown(): void {
    this.mousemove = true;
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  onMouseMove(e): void {
    if (this.mousemove) {
      this.coord = e.clientX;
    }
    this.value = this.coord / 12;
    this.mediator.notify('firstValue', this.value);
  }

  onMouseUp(): void {
    this.mousemove = false;
  }
}

export default ViewSlider;

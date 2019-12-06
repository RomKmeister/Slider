import Model from '../Model/Model';

class ViewSlider {
  model: Model;

  handles: any;

  slider: HTMLElement;

  firstHandle: HTMLElement;

  secondHandle: HTMLElement;

  constructor(model: Model) {
    this.model = model;
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

  setHandlesPosition(): void {
    this.handles = document.querySelectorAll('.slider__handle');
    [this.firstHandle, this.secondHandle] = this.handles;
    this.firstHandle.style.left = this.model.firstValue * 100 / (this.model.maxValueScale - this.model.minValueScale) + "%";
    this.secondHandle.style.left = this.model.secondValue * 100 / (this.model.maxValueScale - this.model.minValueScale) + "%";
  }
  
}

export default ViewSlider;

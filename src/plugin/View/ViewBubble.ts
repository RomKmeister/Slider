import Model from '../Model/Model';

class ViewBubble {
  element: HTMLElement;

  index: number;

  model: Model;

  constructor(element: HTMLElement, index: number, model: Model) {
    this.element = element;
    this.index = index;
    this.model = model;
  }

  setBubbleParameters(): void {
    this.setBubbleValue();
    this.setDirection();
    this.setVisibility();
  }

  private setBubbleValue(): void {
    if (this.index === 0) {
      this.element.textContent = String(Math.round(this.model.options.firstValue));
    } else {
      this.element.textContent = String(Math.round(this.model.options.secondValue));
    }
  }

  private setDirection(): void {
    const bubbleClassDirection = 'slider__bubble_vertical';

    if (this.model.options.isVertical) {
      this.element.classList.add(bubbleClassDirection);
    } else {
      this.element.classList.remove(bubbleClassDirection);
    }
  }

  private setVisibility(): void {
    const bubbleClassVisibility = 'slider__bubble_visible';

    if (this.model.options.isBubbleVisible) {
      this.element.classList.add(bubbleClassVisibility);
    } else {
      this.element.classList.remove(bubbleClassVisibility);
    }
  }
}

export default ViewBubble;

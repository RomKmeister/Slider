import Model from '../Model/Model';

class ViewBubbles {
  element: HTMLElement;

  model: Model;

  bubbles: NodeListOf<HTMLElement>;

  firstBubble: HTMLElement;

  secondBubble: HTMLElement;

  constructor(element: HTMLElement, model: Model) {
    this.element = element;
    this.model = model;
    this.findElements();
  }

  setBubbleParameters(): void {
    this.setBubbleValue();
    this.setDirection();
    this.setVisibility();
  }

  private findElements(): void {
    this.bubbles = this.element.querySelectorAll('.js-slider__bubble');
    [this.firstBubble, this.secondBubble] = Array.from(this.bubbles);
  }

  private setBubbleValue(): void {
    this.firstBubble.textContent = String(Math.round(this.model.modelOptions.firstValue));
    this.secondBubble.textContent = String(Math.round(this.model.modelOptions.secondValue));
  }

  private setDirection(): void {
    const bubbleClassDirection = 'slider__bubble_vertical';

    if (this.model.modelOptions.verticalScale) {
      this.bubbles.forEach((item) => item.classList.add(bubbleClassDirection));
    } else {
      this.bubbles.forEach((item) => item.classList.remove(bubbleClassDirection));
    }
  }

  private setVisibility(): void {
    const bubbleClassVisibility = 'slider__bubble_visible';

    if (this.model.modelOptions.showBubble) {
      this.bubbles.forEach((item) => item.classList.add(bubbleClassVisibility));
    } else {
      this.bubbles.forEach((item) => item.classList.remove(bubbleClassVisibility));
    }
  }
}

export default ViewBubbles;

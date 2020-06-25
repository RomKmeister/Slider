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
    this.firstBubble.textContent = String(Math.round(this.model.options.firstValue));
    this.secondBubble.textContent = String(Math.round(this.model.options.secondValue));
  }

  private setDirection(): void {
    const direction = 'slider__bubble_vertical';

    if (this.model.options.isVertical) {
      this.bubbles.forEach((item) => item.classList.add(direction));
    } else {
      this.bubbles.forEach((item) => item.classList.remove(direction));
    }
  }

  private setVisibility(): void {
    const visibility = 'slider__bubble_visible';

    if (this.model.options.isBubbleVisible) {
      this.bubbles.forEach((item) => item.classList.add(visibility));
    } else {
      this.bubbles.forEach((item) => item.classList.remove(visibility));
    }
  }
}

export default ViewBubbles;

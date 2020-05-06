import ViewSlider from './ViewSlider';
import Model from '../Model/Model';

class ViewBubbles extends ViewSlider {
  element: HTMLElement;

  model: Model;

  bubbles: NodeListOf<HTMLElement>;

  firstBubble: HTMLElement;

  secondBubble: HTMLElement;

  constructor(element: HTMLElement, model: Model) {
    super(element, model);
    this.initBubbles();
  }

  setBubbleParameters(): void {
    this.setBubbleValue();
    this.changeDirection();
    this.changeVisibility();
  }

  private initBubbles(): void {
    this.findElements();
    this.setBubbleParameters();
  }

  private findElements(): void {
    this.bubbles = this.element.querySelectorAll('.js-slider__bubble');
    [this.firstBubble, this.secondBubble] = Array.from(this.bubbles);
  }

  private setBubbleValue(): void {
    this.firstBubble.textContent = String(Math.round(this.model.firstValue));
    this.secondBubble.textContent = String(Math.round(this.model.secondValue));
  }

  private changeDirection(): void {
    const bubbleClassDirection = 'slider__bubble_vertical';

    if (this.model.verticalScale) {
      this.bubbles.forEach((item) => item.classList.add(bubbleClassDirection));
    } else {
      this.bubbles.forEach((item) => item.classList.remove(bubbleClassDirection));
    }
  }

  private changeVisibility(): void {
    const bubbleClassVisibility = 'slider__bubble_visible';

    if (this.model.showBubble) {
      this.bubbles.forEach((item) => item.classList.add(bubbleClassVisibility));
    } else {
      this.bubbles.forEach((item) => item.classList.remove(bubbleClassVisibility));
    }
  }
}

export default ViewBubbles;

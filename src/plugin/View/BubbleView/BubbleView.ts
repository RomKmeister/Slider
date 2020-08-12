import { Parameters } from './BubbleViewInterfaces';

class BubbleView {
  element: HTMLElement;

  bubble: HTMLElement;

  value: number;

  isVertical: boolean;

  isBubbleVisible: boolean;

  constructor(element: HTMLElement) {
    this.element = element;
    this.createBubble();
  }

  setParameters({
    value, isVertical,
  }: Parameters): void {
    this.value = value;
    this.isVertical = isVertical;
    this.setBubbleValue();
    this.setDirection();
  }

  private createBubble(): void {
    this.bubble = document.createElement('div');
    this.bubble.classList.add('slider__bubble');
    this.element.append(this.bubble);
  }

  private setBubbleValue(): void {
    this.bubble.textContent = String(Math.round(this.value));
  }

  private setDirection(): void {
    const bubbleClassDirection = 'slider__bubble_vertical';

    if (this.isVertical) {
      this.bubble.classList.add(bubbleClassDirection);
    } else {
      this.bubble.classList.remove(bubbleClassDirection);
    }
  }
}

export default BubbleView;

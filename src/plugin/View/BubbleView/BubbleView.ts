import { Parameters } from './BubbleViewInterfaces';

class BubbleView {
  element: HTMLElement;

  index: number;

  value: number;

  isVertical: boolean;

  isBubbleVisible: boolean;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  setParameters({
    index, value, isVertical, isBubbleVisible,
  }: Parameters): void {
    this.index = index;
    this.value = value;
    this.isVertical = isVertical;
    this.isBubbleVisible = isBubbleVisible;
    this.setBubbleValue();
    this.setDirection();
    this.setVisibility();
  }

  private setBubbleValue(): void {
    this.element.textContent = String(Math.round(this.value));
  }

  private setDirection(): void {
    const bubbleClassDirection = 'slider__bubble_vertical';

    if (this.isVertical) {
      this.element.classList.add(bubbleClassDirection);
    } else {
      this.element.classList.remove(bubbleClassDirection);
    }
  }

  private setVisibility(): void {
    const bubbleClassVisibility = 'slider__bubble_visible';

    if (this.isBubbleVisible) {
      this.element.classList.add(bubbleClassVisibility);
    } else {
      this.element.classList.remove(bubbleClassVisibility);
    }
  }
}

export default BubbleView;

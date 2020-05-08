import ViewSlider from './ViewSlider';

class ViewBubbles extends ViewSlider {
  bubbles: NodeListOf<HTMLElement>;

  firstBubble: HTMLElement;

  secondBubble: HTMLElement;

  findElements(): void {
    this.bubbles = this.element.querySelectorAll('.js-slider__bubble');
    [this.firstBubble, this.secondBubble] = Array.from(this.bubbles);
  }

  setBubbleParameters(): void {
    this.setBubbleValue();
    this.setDirection();
    this.setVisibility();
  }

  private setBubbleValue(): void {
    this.firstBubble.textContent = String(Math.round(this.model.firstValue));
    this.secondBubble.textContent = String(Math.round(this.model.secondValue));
  }

  private setDirection(): void {
    const bubbleClassDirection = 'slider__bubble_vertical';

    if (this.model.verticalScale) {
      this.bubbles.forEach((item) => item.classList.add(bubbleClassDirection));
    } else {
      this.bubbles.forEach((item) => item.classList.remove(bubbleClassDirection));
    }
  }

  private setVisibility(): void {
    const bubbleClassVisibility = 'slider__bubble_visible';

    if (this.model.showBubble) {
      this.bubbles.forEach((item) => item.classList.add(bubbleClassVisibility));
    } else {
      this.bubbles.forEach((item) => item.classList.remove(bubbleClassVisibility));
    }
  }
}

export default ViewBubbles;

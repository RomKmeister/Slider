class ViewSlider {
  render(): void {
    const slider = document.createElement('div');
    const scale = document.createElement('div');
    const firstHandler = document.createElement('div');
    const secondHandler = document.createElement('div');
    const firstBubble = document.createElement('div');
    const secondBubble = document.createElement('div');
    slider.classList.add('slider');
    scale.classList.add('slider__scale');
    firstHandler.classList.add('slider__handler');
    secondHandler.classList.add('slider__handler');
    firstBubble.classList.add('slider__bubble');
    secondBubble.classList.add('slider__bubble');
    firstHandler.append(firstBubble);
    secondHandler.append(secondBubble);
    slider.append(scale);
    slider.append(firstHandler);
    slider.append(secondHandler);
    document.body.append(slider);
  }
}

export default ViewSlider;

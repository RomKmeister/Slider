class SliderBlock {
  $element: JQuery;

  $slider: JQuery;

  $inputs: JQuery;

  constructor(element: JQuery) {
    this.$element = element;
    this.init();
  }

  private init(): void {
    this.findElements();
    this.bindEventListeners();
    this.$slider.sliderPlugin();
  }

  private findElements(): void {
    this.$slider = this.$element.find('.js-slider');
    this.$inputs = this.$element.find('.js-input__field');
  }

  private bindEventListeners(): void {
    this.$slider.on('eventUpdate', this.setPanelParameters.bind(this));
    this.$inputs.on('change', this.handleInputChange.bind(this));
  }

  private setPanelParameters(): void {
    const options: { [key: string]: any } = this.$slider.sliderPlugin('getOptions');
    this.$inputs.each((index, item: HTMLInputElement) => {
      const input = item;
      const newValue = options[item.name];
      if (input.type === 'checkbox') {
        input.checked = Boolean(newValue);
      } else {
        input.value = String(Math.round(newValue));
      }
    });
  }

  private handleInputChange(event: InputEvent): void {
    const { currentTarget } = event;
    if (currentTarget instanceof HTMLInputElement) {
      const elementName = currentTarget.name;
      const elementValue = currentTarget.type === 'number' ? Number(currentTarget.value) : currentTarget.checked;
      const newOptions = { [elementName]: elementValue };
      this.$slider.sliderPlugin('setOptions', newOptions);
    }
  }
}

export default SliderBlock;

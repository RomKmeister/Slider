import { Slider } from "../../plugin/interfaces";

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
    this.bindEventListners();
    const options = this.$slider.data('options');
    this.$slider.sliderPlugin(options);
  }

  private findElements(): void {
    this.$slider = this.$element.find('.js-slider');
    this.$inputs = this.$element.find('.js-input__field');
  }

  private bindEventListners(): void {
    this.$slider.on('eventUpdate', this.setPanelParameters.bind(this));
    this.$inputs.on('change', this.handleInputChange.bind(this));
  }

  private setPanelParameters(): void {
    const options: { [key: string]: any } = this.$slider.sliderPlugin();
    this.$inputs.each(function(index, item: HTMLInputElement) {
      const newValue = options[item.name];
      if (item.type === 'checkbox') {
        item.checked = Boolean(newValue);
      } else {
        item.value = String(Math.round(newValue));
      }
    });
  }

  private handleInputChange(event: InputEvent): void {
    const  { currentTarget }  = event;
    if (currentTarget instanceof HTMLInputElement) {
      const elementName = currentTarget.name;
      const elementValue = currentTarget.type === 'number' ? Number(currentTarget.value) : currentTarget.checked;
      const newOptions = { [elementName]: elementValue };
      this.$slider.sliderPlugin(newOptions);
    }
  }
}

export default SliderBlock;

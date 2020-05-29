class SliderBlock {
  constructor(element) {
    this.element = element;
    this._init();
  }

  _init() {
    this._findElements();
    this._bindEventListners();
    const options = this.slider.data('options');
    this.slider.sliderPlugin(options);
  }

  _findElements() {
    this.slider = this.element.find('.js-slider');
    this.inputs = this.element[0].querySelectorAll('.js-input__field');
  }

  _bindEventListners() {
    this.slider.on('sliderPluginUpdate', this._setPanelParameters.bind(this));
    this.inputs.forEach((item) => {
      item.addEventListener('change', this._handleInputChange.bind(this));
    });
  }

  _setPanelParameters() {
    this.inputs.forEach((item) => {
      const newValue = item.name;
      const options = this.slider.data('options');
      if (item.type === 'checkbox') {
        item.checked = Boolean(options[newValue]);
      } else {
        item.value = String(Math.round(options[newValue]));
      }
    });
  }

  _handleInputChange(event) {
    const target = event.currentTarget;
    const elementName = target.name;
    const elementValue = target.type === 'number' ? Number(target.value) : target.checked;
    const newOptions = { ...this.slider.data('options'), [elementName]: elementValue };
    this.slider.sliderPlugin(newOptions, 'setData');
  }
}

export default SliderBlock;

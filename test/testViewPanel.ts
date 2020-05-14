import { expect } from 'chai';
import ViewPanel from '../src/plugin/View/ViewPanel';
import Model from '../src/plugin/Model/Model';
import { Slider } from '../src/plugin/interfaces';
import sinon = require('sinon');

describe('ViewPanel', () => {
  let viewPanel: ViewPanel;
  let options: Slider;
  beforeEach(() => {
    const sandbox = sinon.createSandbox();
    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin', `
      <input class="input__field js-input__field" type="number" name="minValueScale">
      <input class="input__field js-input__field" type="number" name="maxValueScale">
      <input class="input__field js-input__field" type="number" name="firstValue">
      <input class="input__field js-input__field" type="checkbox" name="showSecondValue">
      <input class="input__field js-input__field" type="number" name="secondValue">
      <input class="input__field js-input__field" type="number" name="step">
      <input class="input__field js-input__field" type="checkbox" name="verticalScale">
      <input class="input__field js-input__field" type="checkbox" name="showBubble">`);

    options = {
      minValueScale: 0,
      maxValueScale: 100,
      firstValue: 55,
      showSecondValue: true,
      secondValue: 70,
      step: 1,
      verticalScale: false,
      showBubble: true,
    };

    viewPanel = new ViewPanel(element);
    viewPanel.model = options;
    viewPanel.findElements();
    viewPanel.setPanelParameters();
    viewPanel.bindEventListners();
    sandbox.spy(viewPanel, 'calculateValue');
    viewPanel.inputs[0].dispatchEvent(new MouseEvent('click'));

  });

  it('Should find inputs', () => {
    expect(viewPanel.inputs).to.exist;
  });

  it('Should set values to inputs', () => {
    expect(viewPanel.inputs[0].value).to.deep.equal('0');
    expect(viewPanel.inputs[1].value).to.deep.equal('100');
    expect(viewPanel.inputs[2].value).to.deep.equal('55');
    expect(viewPanel.inputs[3].checked).to.deep.equal(true);
    expect(viewPanel.inputs[4].value).to.deep.equal('70');
    expect(viewPanel.inputs[5].value).to.deep.equal('1');
    expect(viewPanel.inputs[6].checked).to.deep.equal(false);
    expect(viewPanel.inputs[7].checked).to.deep.equal(true);
  });

  it('Set spy', () => {
    expect(viewPanel.calculateValue.getCall(0)).to.deep.equal(true);
  });


  
});

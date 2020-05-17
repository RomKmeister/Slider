import { expect } from 'chai';
import * as sinon from 'sinon';
import ViewPanel from '../src/plugin/View/ViewPanel';
import Model from '../src/plugin/Model/Model';
import { Slider } from '../src/plugin/interfaces';

describe('ViewPanel', () => {
  let viewPanel: any;
  let options: Slider;
  let model: Model;
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

    model = new Model(options);
    viewPanel = new ViewPanel(element, model);
    sandbox.spy(viewPanel.eventEmitter, 'notify');
    viewPanel.setPanelParameters();

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
    viewPanel.inputs[0].value = '20';
    viewPanel.inputs[0].dispatchEvent(new Event('change'));
    const newOptions = { ...viewPanel.model, minValueScale: 20 };
    expect(viewPanel.eventEmitter.notify.getCall(0).args[0]).to.deep.equal(newOptions);
    expect(viewPanel.eventEmitter.notify.getCall(0).args[1]).to.deep.equal('viewPanelUpdated');
  });
});

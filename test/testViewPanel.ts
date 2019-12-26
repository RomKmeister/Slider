import { expect } from 'chai';
import ViewPanel from '../src/ViewPanel/ViewPanel';
import Model from '../src/Model/Model';

describe('ViewPanel', function() {

  let panel: ViewPanel;

  beforeEach(() => {
    panel = new ViewPanel(new Model({
      minValueScale: 0,
      maxValueScale: 100,
      firstValue: 55,
      showSecondValue: true,
      secondValue: 70,
      step: 1,
      verticalScale: true,
      showBubble: true,
    }));
  })

  it('Creates panel', () => {

    expect(panel.panel.className).to.equal('panel');
    expect(panel.panel.querySelectorAll('.panel__input').length).to.equal(8);
  })

  it('Should set values to text inputs', () => {
    const minValueScale: HTMLFormElement = panel.panel.querySelector('input[name="minValueScale"]');
    const maxValueScale: HTMLFormElement = panel.panel.querySelector('input[name="maxValueScale"]');
    const firstValue: HTMLFormElement = panel.panel.querySelector('input[name="firstValue"]');
    const secondValue: HTMLFormElement = panel.panel.querySelector('input[name="secondValue"]');
    const step: HTMLFormElement = panel.panel.querySelector('input[name="step"]');
    
    expect(minValueScale.value).to.deep.equal('0');
    expect(maxValueScale.value).to.deep.equal('100');
    expect(firstValue.value).to.deep.equal('55');
    expect(secondValue.value).to.deep.equal('70');
    expect(step.value).to.deep.equal('1');
  })

  it('Should set values to checkbox inputs', () => {
    const showSecondValue: HTMLFormElement = panel.panel.querySelector('input[name="showSecondValue"]');
    const verticalScale: HTMLFormElement = panel.panel.querySelector('input[name="verticalScale"]');
    const showBubble: HTMLFormElement = panel.panel.querySelector('input[name="showBubble"]');

    expect(showSecondValue.checked).to.deep.equal(true);
    expect(verticalScale.checked).to.deep.equal(true);
    expect(showBubble.checked).to.deep.equal(true);
  })
});
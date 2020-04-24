import { expect } from 'chai';
import ViewPanel from '../src/ViewPanel/ViewPanel';
import Model from '../src/Model/Model';

describe('ViewPanel', function() {

  let panel: ViewPanel;

  beforeEach(() => {
    const element = document.querySelector('.js-slider-block');
    panel = new ViewPanel(element, new Model({
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

  it('Find panel', () => {
    expect(panel.panel.className).to.equal('panel js-panel');
  })

  it('Should set values to text inputs', () => {
    const minValueScale: HTMLFormElement = panel.panel.querySelector('.input__field[name="minValueScale"]');
    const maxValueScale: HTMLFormElement = panel.panel.querySelector('.input__field[name="maxValueScale"]');
    const firstValue: HTMLFormElement = panel.panel.querySelector('.input__field[name="firstValue"]');
    const secondValue: HTMLFormElement = panel.panel.querySelector('.input__field[name="secondValue"]');
    const step: HTMLFormElement = panel.panel.querySelector('.input__field[name="step"]');
    
    expect(minValueScale.value).to.deep.equal('0');
    expect(maxValueScale.value).to.deep.equal('100');
    expect(firstValue.value).to.deep.equal('55');
    expect(secondValue.value).to.deep.equal('70');
    expect(step.value).to.deep.equal('1');
  })

  it('Should set values to checkbox inputs', () => {
    const showSecondValue: HTMLFormElement = panel.panel.querySelector('.input__field[name="showSecondValue"]');
    const verticalScale: HTMLFormElement = panel.panel.querySelector('.input__field[name="verticalScale"]');
    const showBubble: HTMLFormElement = panel.panel.querySelector('.input__field[name="showBubble"]');

    expect(showSecondValue.checked).to.deep.equal(true);
    expect(verticalScale.checked).to.deep.equal(true);
    expect(showBubble.checked).to.deep.equal(true);
  })
});
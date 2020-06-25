import { expect } from 'chai';
import * as sinon from 'sinon';
import ViewHandles from '../src/plugin/View/ViewHandles';
import Model from '../src/plugin/Model/Model';
import { Slider } from '../src/plugin/interfaces';

describe('ViewHandles', () => {
  let options: Slider;
  let model: Model;
  let viewHandles: any;
  beforeEach(() => {
    const sandbox = sinon.createSandbox();
    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin',
      '<div class="js-slider__handle"></div><div class="js-slider__handle"></div>');

    options = {
      minValue: 0,
      maxValue: 100,
      firstValue: 55,
      isSecondValueVisible: true,
      secondValue: 70,
      step: 1,
      isVertical: false,
      isBubbleVisible: true,
      isScaleStepsVisible: true,
    };

    model = new Model(options);
    viewHandles = new ViewHandles(element, model);
    viewHandles.setHandlersParameters();
    sandbox.spy(viewHandles.eventEmitter, 'notify');
  });

  it('Should set the horisontal position of handles', () => {
    expect(viewHandles.firstHandle.style.left).to.deep.equal('55%');
    expect(viewHandles.secondHandle.style.left).to.deep.equal('70%');
    expect(viewHandles.firstHandle.className).to.deep.equal('js-slider__handle');
    expect(viewHandles.firstHandle.className).to.deep.equal('js-slider__handle');
  });

  it('Should set the vertical position of handles', () => {
    viewHandles.model.options.isVertical = true;
    viewHandles.setHandlersParameters();
    expect(viewHandles.firstHandle.style.top).to.deep.equal('55%');
    expect(viewHandles.secondHandle.style.top).to.deep.equal('70%');
    expect(viewHandles.firstHandle.className).to.deep.equal('js-slider__handle slider__handle_vertical');
    expect(viewHandles.firstHandle.className).to.deep.equal('js-slider__handle slider__handle_vertical');
  });

  it('Should show the second handle', () => {
    expect(viewHandles.secondHandle.className).to.deep.equal('js-slider__handle');
  });

  it('Should hide the second handle', () => {
    viewHandles.model.options.isSecondValueVisible = false;
    viewHandles.setHandlersParameters();
    expect(viewHandles.secondHandle.className).to.deep.equal('js-slider__handle slider__handle_hidden');
  });

  it('Should send new options from the first handler to the observers', () => {
    viewHandles.firstHandle.dispatchEvent(new Event('mousedown'));
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 100 }));
    const newOptions = { target: 'firstValue', newCoordinate: 100 };
    expect(viewHandles.eventEmitter.notify.getCall(0).args[0]).to.deep.equal(newOptions);
    expect(viewHandles.eventEmitter.notify.getCall(0).args[1]).to.deep.equal('handlerPositionChanged');
  });

  it('Should send new options from the second handler to the observers', () => {
    viewHandles.secondHandle.dispatchEvent(new Event('mousedown'));
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 100 }));
    const newOptions = { target: 'secondValue', newCoordinate: 100 };
    expect(viewHandles.eventEmitter.notify.getCall(0).args[0]).to.deep.equal(newOptions);
    expect(viewHandles.eventEmitter.notify.getCall(0).args[1]).to.deep.equal('handlerPositionChanged');
  });
});

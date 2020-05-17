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
    viewHandles = new ViewHandles(element, model);
    viewHandles.setHandlersParameters();
    sandbox.spy(viewHandles.eventEmitter, 'notify');
  });

  it('Should set horisontal handles position', () => {
    expect(viewHandles.firstHandle.style.left).to.deep.equal('55%');
    expect(viewHandles.secondHandle.style.left).to.deep.equal('70%');
    expect(viewHandles.firstHandle.className).to.deep.equal('js-slider__handle');
    expect(viewHandles.firstHandle.className).to.deep.equal('js-slider__handle');
  });

  it('Should set vertical handles position', () => {
    viewHandles.model.modelOptions.verticalScale = true;
    viewHandles.setHandlersParameters();
    expect(viewHandles.firstHandle.style.top).to.deep.equal('55%');
    expect(viewHandles.secondHandle.style.top).to.deep.equal('70%');
    expect(viewHandles.firstHandle.className).to.deep.equal('js-slider__handle slider__handle_vertical');
    expect(viewHandles.firstHandle.className).to.deep.equal('js-slider__handle slider__handle_vertical');
  });

  it('Should set show second handle', () => {
    expect(viewHandles.secondHandle.className).to.deep.equal('js-slider__handle');
  });

  it('Should set hide second handle', () => {
    viewHandles.model.modelOptions.showSecondValue = false;
    viewHandles.setHandlersParameters();
    expect(viewHandles.secondHandle.className).to.deep.equal('js-slider__handle slider__handle_hidden');
  });

  it('Should send new options from first handler to observers', () => {
    viewHandles.firstHandle.dispatchEvent(new Event('mousedown'));
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 100 }));
    const newOptions = { target: 'firstValue', newCoordinate: 100 };
    expect(viewHandles.eventEmitter.notify.getCall(0).args[0]).to.deep.equal(newOptions);
    expect(viewHandles.eventEmitter.notify.getCall(0).args[1]).to.deep.equal('handlerPositionChanged');
  });

  it('Should send new options from second handler to observers', () => {
    viewHandles.secondHandle.dispatchEvent(new Event('mousedown'));
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 100 }));
    const newOptions = { target: 'secondValue', newCoordinate: 100 };
    expect(viewHandles.eventEmitter.notify.getCall(0).args[0]).to.deep.equal(newOptions);
    expect(viewHandles.eventEmitter.notify.getCall(0).args[1]).to.deep.equal('handlerPositionChanged');
  });
});

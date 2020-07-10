import { expect } from 'chai';
import * as sinon from 'sinon';
import HandleView from '../src/plugin/View/HandleView';
import Model from '../src/plugin/Model/Model';
import { BaseOptions } from '../src/plugin/interfaces';

describe('Handle View', () => {
  let options: BaseOptions;
  let model: Model;
  let handleView: any;
  let testElement: HTMLElement;
  beforeEach(() => {
    const sandbox = sinon.createSandbox();
    const element = document.createElement('div');
    element.classList.add('js-slider__handle');
    const index = 0;

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
    handleView = new HandleView(element, index, model);
    handleView.setHandlersParameters();
    sandbox.spy(handleView.eventEmitter, 'notify');
    testElement = handleView.element;
  });

  it('Should set the horizontal position of handle', () => {
    expect(testElement.style.left).to.deep.equal('55%');
    expect(testElement.className).to.deep.equal('js-slider__handle');
  });

  it('Should set the vertical position of handle', () => {
    handleView.model.options.isVertical = true;
    handleView.setHandlersParameters();
    expect(testElement.style.top).to.deep.equal('55%');
    expect(testElement.className).to.deep.equal('js-slider__handle slider__handle_vertical');
  });

  it('Should show the handle', () => {
    expect(testElement.className).to.deep.equal('js-slider__handle');
  });

  it('Should hide the handle', () => {
    handleView.model.options.isSecondValueVisible = false;
    handleView.index = 1;
    handleView.setHandlersParameters();
    expect(testElement.className).to.deep.equal('js-slider__handle slider__handle_hidden');
  });

  it('Should send new options from the first handler to the observers', () => {
    testElement.dispatchEvent(new Event('mousedown'));
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 100 }));
    const newOptions = { target: 'firstValueRatio', newCoordinate: 100 };
    expect(handleView.eventEmitter.notify.getCall(0).args[0]).to.deep.equal(newOptions);
    expect(handleView.eventEmitter.notify.getCall(0).args[1]).to.deep.equal('handlerChanged');
  });
});

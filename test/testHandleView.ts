import { expect } from 'chai';
import * as sinon from 'sinon';
import HandleView from '../src/plugin/View/HandleView';

describe('Handle View', () => {
  let handleView: any;
  let testElement: HTMLElement;
  beforeEach(() => {
    const sandbox = sinon.createSandbox();
    const element = document.createElement('div');
    element.classList.add('js-slider__handle');
    handleView = new HandleView(element);
    sandbox.spy(handleView.eventEmitter, 'notify');
    testElement = handleView.element;
  });

  it('Should set the horizontal position of handle', () => {
    handleView.setHandlersParameters(0, 55, false, true)
    expect(testElement.style.left).to.deep.equal('55%');
    expect(testElement.className).to.deep.equal('js-slider__handle');
  });

  it('Should set the vertical position of handle', () => {
    handleView.setHandlersParameters(0, 55, true, true)
    expect(testElement.style.top).to.deep.equal('55%');
    expect(testElement.className).to.deep.equal('js-slider__handle slider__handle_vertical');
  });

  it('Should set the second handle ratio', () => {
    handleView.setHandlersParameters(1, 70, true, true)
    expect(testElement.style.top).to.deep.equal('70%');
  });

  it('Should show the handle', () => {
    handleView.setHandlersParameters(0, 55, false, true)
    expect(testElement.className).to.deep.equal('js-slider__handle');
  });

  it('Should hide the handle', () => {
    handleView.setHandlersParameters(1, 55, false, false)
    expect(testElement.className).to.deep.equal('js-slider__handle slider__handle_hidden');
  });

  it('Should send new options from the first handler to the observers', () => {
    handleView.setHandlersParameters(0, 55, false, true)
    testElement.dispatchEvent(new Event('mousedown'));
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 100 }));
    const newOptions = { target: 0, newCoordinate: 100 };
    expect(handleView.eventEmitter.notify.getCall(0).args[0]).to.deep.equal(newOptions);
    expect(handleView.eventEmitter.notify.getCall(0).args[1]).to.deep.equal('handlerChanged');
  });
});

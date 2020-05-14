import { expect } from 'chai';
import ViewHandles from '../src/plugin/View/ViewHandles';
import Model from '../src/plugin/Model/Model';
import { Slider } from '../src/plugin/interfaces';
import Presenter from '../src/plugin/Presenter/Presenter';

describe('ViewHandles', () => {
  let viewHandles: ViewHandles;
  let options: Slider;
  let presenter: Presenter;
  beforeEach(() => {
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
      scaleLength: 100,
      firstValueRatio: 55,
      secondValueRatio: 70,
      interval: 7.5,
      firstValueArea: 62.5,
    };

    viewHandles = new ViewHandles(element);
    viewHandles.model = options;
    viewHandles.findElements();
    viewHandles.setHandlersParameters();
    viewHandles.bindEventListners();
  });

  it('Should find handles', () => {
    expect(viewHandles.handles).to.exist;
  });

  it('Should set horisontal handles position', () => {
    expect(viewHandles.firstHandle.style.left).to.deep.equal('55%');
    expect(viewHandles.secondHandle.style.left).to.deep.equal('70%');
    expect(viewHandles.firstHandle.className).to.deep.equal('js-slider__handle');
    expect(viewHandles.firstHandle.className).to.deep.equal('js-slider__handle');
  });

  it('Should set vertical handles position', () => {
    viewHandles.model.verticalScale = true;
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
    viewHandles.model.showSecondValue = false;
    viewHandles.setHandlersParameters();
    expect(viewHandles.secondHandle.className).to.deep.equal('js-slider__handle slider__handle_hidden');
  });

  it('Should call functions on event', () => {
    const sandbox = sinon.createSandbox();
    sandbox.spy(viewHandles, 'calculateValue');
    sandbox.spy(viewHandles, 'chooseHandlerForUpdate');
    sandbox.spy(viewHandles.eventEmitter, 'notify');
    viewHandles.firstHandle.dispatchEvent(new Event('mousedown'));
    viewHandles.firstHandle.dispatchEvent(new Event('mousemove'));
    expect(viewHandles.calculateValue.called).to.deep.equal(true);
    expect(viewHandles.chooseHandlerForUpdate.called).to.deep.equal(true);
    expect(viewHandles.eventEmitter.notify.called).to.deep.equal(true);
  });
});

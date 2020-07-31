import { expect } from 'chai';
import BubbleView from '../src/plugin/View/BubbleView/BubbleView';

describe('Bubble View', () => {
  let bubbleView: BubbleView;
  let testElement: HTMLElement;
  beforeEach(() => {
    const element = document.createElement('div');
    element.classList.add('js-slider__bubble');
    bubbleView = new BubbleView(element);
    testElement = bubbleView.element;
  });
  it('Should set the first bubble value', () => {
    bubbleView.setParameters({
      index: 0,
      value: 55,
      isVertical: false,
      isBubbleVisible: true,
    });
    expect(testElement.textContent).to.equal('55');
    expect(bubbleView.index).to.equal(0);
    expect(bubbleView.value).to.equal(55);
    expect(bubbleView.isVertical).to.equal(false);
    expect(bubbleView.isBubbleVisible).to.equal(true);
  });

  it('Should set the second bubble value', () => {
    bubbleView.setParameters({
      index: 1,
      value: 70,
      isVertical: false,
      isBubbleVisible: true,
    });
    expect(testElement.textContent).to.equal('70');
  });

  it('Should show the bubble', () => {
    bubbleView.setParameters({
      index: 1,
      value: 70,
      isVertical: false,
      isBubbleVisible: true,
    });
    expect(testElement.className).to.equal('js-slider__bubble slider__bubble_visible');
  });

  it('Should hide the bubble', () => {
    bubbleView.setParameters({
      index: 0,
      value: 55,
      isVertical: false,
      isBubbleVisible: false,
    });
    expect(testElement.className).to.equal('js-slider__bubble');
  });

  it('Should set the horizontal direction', () => {
    bubbleView.setParameters({
      index: 1,
      value: 70,
      isVertical: false,
      isBubbleVisible: false,
    });
    expect(testElement.className).to.equal('js-slider__bubble');
  });

  it('Should set the vertical direction', () => {
    bubbleView.setParameters({
      index: 0,
      value: 55,
      isVertical: true,
      isBubbleVisible: false,
    });
    expect(testElement.className).to.equal('js-slider__bubble slider__bubble_vertical');
  });
});

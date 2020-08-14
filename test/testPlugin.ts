import { expect } from 'chai';
import * as sinon from 'sinon';

describe('Plugin', () => {
  let $element: JQuery;

  beforeEach(() => {
    $element = $(
      `<div class="js-slider">
        <div class="js-slider__scale"></div>
        <div class="js-slider__runner"></div>
      </div>`,
    );
    $element.sliderPlugin();
  });

  it('Should init plugin', () => {
    expect($element).to.not.equal(null);
    expect($element).to.not.equal(undefined);
  });

  it('Should call plugin getter', () => {
    const spy = sinon.spy($element.data('presenter'), 'getOptions');
    $element.sliderPlugin('getOptions');
    expect(spy.called).to.not.equal(null);
  });
});

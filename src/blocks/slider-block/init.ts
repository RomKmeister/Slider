/* eslint-disable no-new */
import SliderBlock from './slider-block';

$(() => {
  const $slider = $('.js-slider-block');
  $slider.each((_, item) => {
    new SliderBlock($(item));
  });
});

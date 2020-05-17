/* eslint-disable no-new */
import Slider from './slider-block';

$(() => {
  const $slider = $('.js-slider-block');
  $slider.each((index, item) => {
    new Slider($(item));
  });
});

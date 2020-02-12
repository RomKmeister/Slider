import $ from 'jquery';

$(document).ready(function(){
  const $slider = $('.js-slider-block');
  $slider.each(function() {
    $(this).sliderPlugin({
      minValueScale: $(this).data('minvaluescale'),
      maxValueScale: $(this).data('maxvaluescale'),
      firstValue: $(this).data('firstvalue'),
      showSecondValue: $(this).data('showsecondvalue'),
      secondValue: $(this).data('secondvalue'),
      step: $(this).data('step'),
      verticalScale: $(this).data('verticalscale'),
      showBubble: $(this).data('showbubble'),
    });
  });
});
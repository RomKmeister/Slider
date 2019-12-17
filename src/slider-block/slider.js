import $ from 'jquery';

$(document).ready(function(){
  $(".slider-block").each(function() {
    $(this).sliderPlugin({
      minValueScale: 10,
      maxValueScale: 150,
      value: 55,
      showSecondValue: true,
      secondValue: 70,
      step: 1,
      verticalScale: false,
      showBubble: true,
    });
  });
});
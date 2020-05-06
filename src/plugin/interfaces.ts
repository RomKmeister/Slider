/* eslint-disable no-undef */

export interface Slider {
  minValueScale: number;
  maxValueScale: number;
  firstValue: number;
  showSecondValue: boolean;
  secondValue: number;
  step: number;
  verticalScale: boolean;
  showBubble: boolean;
}

export interface NewValue {
  minValueScale?: number;
  maxValueScale?: number;
  firstValue?: number;
  showSecondValue?: boolean;
  secondValue?: number;
  step?: number;
  verticalScale?: boolean;
  showBubble?: boolean;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Model_1 = require("../Model/Model");
var ViewSlider_1 = require("../ViewSlider/ViewSlider");
var ViewPanel_1 = require("../ViewPanel/ViewPanel");
var Presenter = /** @class */ (function () {
    function Presenter(item, options) {
        this.model = new Model_1.default(options);
        this.viewSlider = new ViewSlider_1.default(item, this.model);
        this.viewPanel = new ViewPanel_1.default(item, this.model);
        this.model.setMediator(this);
        this.viewSlider.setMediator(this);
        this.viewPanel.setMediator(this);
    }
    Presenter.prototype.notify = function (property) {
        this.model.updateModel(property);
        this.viewSlider.setSliderParameters();
        this.viewPanel.setPanelParameters();
    };
    Presenter.prototype.showPanel = function () {
        return this.viewPanel.panel;
    };
    Presenter.prototype.showSlider = function () {
        return this.viewSlider.slider;
    };
    return Presenter;
}());
exports.default = Presenter;

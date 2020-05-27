"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Model_1 = require("../Model/Model");
var ViewSlider_1 = require("../View/ViewSlider");
var ViewPanel_1 = require("../View/ViewPanel");
var ViewScale_1 = require("../View/ViewScale");
var ViewBubbles_1 = require("../View/ViewBubbles");
var ViewHandles_1 = require("../View/ViewHandles");
var Presenter = /** @class */ (function () {
    function Presenter(element, options) {
        this.model = new Model_1.default(options);
        this.viewSlider = new ViewSlider_1.default(element, this.model);
        this.viewScale = new ViewScale_1.default(element, this.model);
        this.viewHandles = new ViewHandles_1.default(element, this.model);
        this.viewBubbles = new ViewBubbles_1.default(element, this.model);
        this.viewPanel = new ViewPanel_1.default(element, this.model);
        this.model.setMediator(this);
        this.viewSlider.setMediator(this);
        this.viewScale.setMediator(this);
        this.viewHandles.setMediator(this);
        this.viewPanel.setMediator(this);
    }
    Presenter.prototype.notify = function (property) {
        this.model.updateModel(property);
        this.viewHandles.setSliderParameters();
        this.viewScale.setScaleParameters();
        this.viewBubbles.setBubbleParameters();
        this.viewPanel.setPanelParameters();
    };
    return Presenter;
}());
exports.default = Presenter;

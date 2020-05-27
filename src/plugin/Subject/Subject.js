"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subject = /** @class */ (function () {
    function Subject() {
        this.observers = [];
    }
    Subject.prototype.attach = function (observer) {
        this.observers.push(observer);
    };
    Subject.prototype.detach = function (observer) {
        var observerIndex = this.observers.indexOf(observer);
        this.observers.splice(observerIndex, 1);
    };
    Subject.prototype.notify = function (property, sender) {
        if (sender === 'model') {
            this.observers.forEach(function (item) { return item.setViewParameters(property); });
        }
        if (sender === 'view') {
            this.observers.forEach(function (item) { return item.setModelParameters(property); });
        }
    };
    return Subject;
}());
exports.default = Subject;

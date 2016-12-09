"use strict";
var observable_1 = require("data/observable");
var frameModule = require("ui/frame");
var application = require("application");
var PickersViewModel = (function (_super) {
    __extends(PickersViewModel, _super);
    function PickersViewModel() {
        return _super.call(this) || this;
    }
    Object.defineProperty(PickersViewModel.prototype, "rover", {
        get: function () {
            return this._rover;
        },
        set: function (value) {
            if (this._rover !== value) {
                this._rover = value;
                this.notifyPropertyChange("rover", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PickersViewModel.prototype, "yearOpp", {
        get: function () {
            return this._yearOpp;
        },
        set: function (value) {
            if (this._yearOpp !== value) {
                this._yearOpp = value;
                this.notifyPropertyChange("yearOpp", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PickersViewModel.prototype, "monthOpp", {
        get: function () {
            return this._monthOpp;
        },
        set: function (value) {
            if (this._monthOpp !== value) {
                this._monthOpp = value;
                this.notifyPropertyChange("monthOpp", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PickersViewModel.prototype, "dayOpp", {
        get: function () {
            return this._dayOpp;
        },
        set: function (value) {
            if (this._dayOpp !== value) {
                this._dayOpp = value;
                this.notifyPropertyChange("dayOpp", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PickersViewModel.prototype, "yearSpi", {
        get: function () {
            return this._yearSpi;
        },
        set: function (value) {
            if (this._yearSpi !== value) {
                this._yearSpi = value;
                this.notifyPropertyChange("yearSpi", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PickersViewModel.prototype, "monthSpi", {
        get: function () {
            return this._monthSpi;
        },
        set: function (value) {
            if (this._monthSpi !== value) {
                this._monthSpi = value;
                this.notifyPropertyChange("monthSpi", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PickersViewModel.prototype, "daySpi", {
        get: function () {
            return this._daySpi;
        },
        set: function (value) {
            if (this._daySpi !== value) {
                this._daySpi = value;
                this.notifyPropertyChange("daySpi", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PickersViewModel.prototype, "year", {
        get: function () {
            return this._year;
        },
        set: function (value) {
            if (this._year !== value) {
                this._year = value;
                this.notifyPropertyChange("year", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PickersViewModel.prototype, "month", {
        get: function () {
            return this._month;
        },
        set: function (value) {
            if (this._month !== value) {
                this._month = value;
                this.notifyPropertyChange("month", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PickersViewModel.prototype, "day", {
        get: function () {
            return this._day;
        },
        set: function (value) {
            if (this._day !== value) {
                this._day = value;
                this.notifyPropertyChange("day", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    PickersViewModel.prototype.goToCuriosityPage = function (args) {
        var button = args.object;
        var dt = button.parent.getViewById("dt-cur");
        frameModule.topmost().navigate({
            moduleName: "./views/rovers/rover-photo-page",
            context: { "rover": "curiosity", "year": dt.year, "month": dt.month, "day": dt.day },
            animated: true,
            transition: {
                name: application.android ? "explode" : "curl"
            }
        });
    };
    PickersViewModel.prototype.goToOpportunityPage = function (args) {
        var button = args.object;
        var dt = button.parent.getViewById("dt-opp");
        frameModule.topmost().navigate({
            moduleName: "./views/rovers/rover-photo-page",
            context: { "rover": "opportunity", "year": dt.year, "month": dt.month, "day": dt.day },
            animated: true,
            transition: {
                name: application.android ? "explode" : "curl"
            }
        });
    };
    PickersViewModel.prototype.goToSpiritPage = function (args) {
        var button = args.object;
        var dt = button.parent.getViewById("dt-spi");
        frameModule.topmost().navigate({
            moduleName: "./views/rovers/rover-photo-page",
            context: { "rover": "spirit", "year": dt.year, "month": dt.month, "day": dt.day },
            animated: true,
            transition: {
                name: application.android ? "explode" : "curl"
            }
        });
    };
    return PickersViewModel;
}(observable_1.Observable));
exports.PickersViewModel = PickersViewModel;
//# sourceMappingURL=pickers-view-model.js.map
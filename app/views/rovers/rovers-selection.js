"use strict";
var observable_1 = require("data/observable");
var pickers_view_model_1 = require("../../models/rovers/pickers-view-model");
var app = require("application");
exports.pickersViewModel = new pickers_view_model_1.PickersViewModel();
var page;
var dtCur;
var dtOpp;
var dtSpi;
function onPageLoaded(args) {
    page = args.object;
}
exports.onPageLoaded = onPageLoaded;
function onPageNavigatedTo(args) {
    page = args.object;
    dtCur = page.getViewById("dt-cur");
    dtOpp = page.getViewById("dt-opp");
    dtSpi = page.getViewById("dt-spi");
    initDatePickers();
    initSegmentedBars();
    initTabs();
    page.bindingContext = exports.pickersViewModel;
}
exports.onPageNavigatedTo = onPageNavigatedTo;
function onTabLoaded(args) {
    var tabView = args.object;
    if (app.android) {
        for (var i = 0; i < tabView.items.length; i++) {
            tabView._tabLayout.getTextViewForItemAt(i).setHorizontallyScrolling(true);
        }
    }
}
exports.onTabLoaded = onTabLoaded;
function initTabs() {
    exports.pickersViewModel.addEventListener(observable_1.Observable.propertyChangeEvent, function (args) {
        if (args.propertyName.toString() === "tabIndex") {
            initDatePickers();
        }
    });
}
function initDatePickers() {
    var today = new Date();
    dtCur.minDate = new Date(2012, 6 + 1, 6); // Landing date: 6th August 2012
    dtCur.maxDate = today; // still active
    dtOpp.minDate = new Date(2004, 0, 26); // Landing date: 25th January 2004 - first pics on 26th
    dtOpp.maxDate = today; // still active 
    dtSpi.minDate = new Date(2004, 0, 5); // Landing date: 4th January 2004 - first pics on 5th
    dtSpi.maxDate = new Date(2010, 1 + 1, 21); // last communication March
    if (!exports.pickersViewModel.get("rover")) {
        dtCur.day = today.getDate() - 2;
        dtCur.month = today.getMonth() + 1;
        dtCur.year = today.getFullYear();
        dtOpp.day = today.getDate() - 2;
        dtOpp.month = today.getMonth() + 1;
        dtOpp.year = today.getFullYear();
        dtSpi.day = today.getDate() - 2;
        dtSpi.month = today.getMonth() + 1;
        dtSpi.year = 2007;
        exports.pickersViewModel.set("day", dtCur.day);
        exports.pickersViewModel.set("month", dtCur.month);
        exports.pickersViewModel.set("year", dtCur.year);
        exports.pickersViewModel.set("dayOpp", dtOpp.day);
        exports.pickersViewModel.set("monthOpp", dtOpp.month);
        exports.pickersViewModel.set("yearOpp", dtOpp.year);
        exports.pickersViewModel.set("daySpi", dtSpi.day);
        exports.pickersViewModel.set("monthSpi", dtSpi.month);
        exports.pickersViewModel.set("yearSpi", dtSpi.year);
    }
    else {
        dtCur.day = exports.pickersViewModel.get("day");
        dtCur.month = exports.pickersViewModel.get("month");
        dtCur.year = exports.pickersViewModel.get("year");
        dtOpp.day = exports.pickersViewModel.get("dayOpp");
        dtOpp.month = exports.pickersViewModel.get("monthOpp");
        dtOpp.year = exports.pickersViewModel.get("yearOpp");
        dtSpi.day = exports.pickersViewModel.get("daySpi");
        dtSpi.month = exports.pickersViewModel.get("monthSpi");
        dtSpi.year = exports.pickersViewModel.get("yearSpi");
    }
}
function initSegmentedBars() {
    exports.pickersViewModel.set("selectedIndexCur", 1);
    exports.pickersViewModel.set("selectedIndexOpp", 1);
    exports.pickersViewModel.set("selectedIndexSpi", 1);
    exports.pickersViewModel.set("isCurInfoVisible", false);
    exports.pickersViewModel.set("isOppInfoVisible", false);
    exports.pickersViewModel.set("isSpiInfoVisible", false);
    exports.pickersViewModel.set("curiosityDescription", "Curiosity is a car-sized robotic rover exploring Gale Crater on Mars as part of NASA's Mars Science Laboratory mission (MSL)");
    exports.pickersViewModel.set("opporunityDescription", "Curiosity is a car-sized robotic rover exploring Gale Crater on Mars as part of NASA's Mars Science Laboratory mission (MSL)");
    exports.pickersViewModel.set("spiritDescription", "Curiosity is a car-sized robotic rover exploring Gale Crater on Mars as part of NASA's Mars Science Laboratory mission (MSL)");
    exports.pickersViewModel.addEventListener(observable_1.Observable.propertyChangeEvent, function (args) {
        if (args.propertyName.toString() === "selectedIndexCur") {
            switch (args.value) {
                case 0:
                    exports.pickersViewModel.set("isCurInfoVisible", true);
                    break;
                case 1:
                    exports.pickersViewModel.set("isCurInfoVisible", false);
                    break;
                default:
                    break;
            }
        }
    });
    exports.pickersViewModel.addEventListener(observable_1.Observable.propertyChangeEvent, function (args) {
        if (args.propertyName.toString() === "selectedIndexOpp") {
            switch (args.value) {
                case 0:
                    exports.pickersViewModel.set("isOppInfoVisible", true);
                    break;
                case 1:
                    exports.pickersViewModel.set("isOppInfoVisible", false);
                    break;
                default:
                    break;
            }
        }
    });
    exports.pickersViewModel.addEventListener(observable_1.Observable.propertyChangeEvent, function (args) {
        if (args.propertyName.toString() === "selectedIndexSpi") {
            switch (args.value) {
                case 0:
                    exports.pickersViewModel.set("isSpiInfoVisible", true);
                    break;
                case 1:
                    exports.pickersViewModel.set("isSpiInfoVisible", false);
                    break;
                default:
                    break;
            }
        }
    });
}
//# sourceMappingURL=rovers-selection.js.map
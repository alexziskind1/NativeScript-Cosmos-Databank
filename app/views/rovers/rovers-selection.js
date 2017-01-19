"use strict";
// tslint:disable:max-line-length
var observable_1 = require("data/observable");
var pickers_view_model_1 = require("../../view-models/rovers/pickers-view-model");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm92ZXJzLXNlbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJvdmVycy1zZWxlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGlDQUFpQztBQUNqQyw4Q0FBNEU7QUFTNUUsa0ZBQStFO0FBRS9FLGlDQUFtQztBQUV4QixRQUFBLGdCQUFnQixHQUFHLElBQUkscUNBQWdCLEVBQUUsQ0FBQztBQUNyRCxJQUFJLElBQUksQ0FBQztBQUNULElBQUksS0FBSyxDQUFDO0FBQ1YsSUFBSSxLQUFLLENBQUM7QUFDVixJQUFJLEtBQUssQ0FBQztBQUVWLHNCQUE2QixJQUFlO0lBQ3hDLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQzdCLENBQUM7QUFGRCxvQ0FFQztBQUVELDJCQUFrQyxJQUFlO0lBQzdDLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBRXpCLEtBQUssR0FBZSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLEtBQUssR0FBZSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLEtBQUssR0FBZSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRS9DLGVBQWUsRUFBRSxDQUFDO0lBQ2xCLGlCQUFpQixFQUFFLENBQUM7SUFDcEIsUUFBUSxFQUFFLENBQUM7SUFFWCxJQUFJLENBQUMsY0FBYyxHQUFHLHdCQUFnQixDQUFDO0FBQzNDLENBQUM7QUFaRCw4Q0FZQztBQUVELHFCQUE0QixJQUFJO0lBQzVCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDMUIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDZCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFB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LENBQUM7UUFFNUMsd0JBQWdCLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsd0JBQWdCLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUMsd0JBQWdCLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osS0FBSyxDQUFDLEdBQUcsR0FBRyx3QkFBZ0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEMsS0FBSyxDQUFDLEtBQUssR0FBRyx3QkFBZ0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUMsS0FBSyxDQUFDLElBQUksR0FBRyx3QkFBZ0IsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFMUMsS0FBSyxDQUFDLEdBQUcsR0FBRyx3QkFBZ0IsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsS0FBSyxDQUFDLEtBQUssR0FBRyx3QkFBZ0IsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsS0FBSyxDQUFDLElBQUksR0FBRyx3QkFBZ0IsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFN0MsS0FBSyxDQUFDLEdBQUcsR0FBRyx3QkFBZ0IsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsS0FBSyxDQUFDLEtBQUssR0FBRyx3QkFBZ0IsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsS0FBSyxDQUFDLElBQUksR0FBRyx3QkFBZ0IsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDakQsQ0FBQztBQUNMLENBQUM7QUFFRDtJQUNJLHdCQUFnQixDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1Qyx3QkFBZ0IsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUMsd0JBQWdCLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRTVDLHdCQUFnQixDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRCx3QkFBZ0IsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEQsd0JBQWdCLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRWhELHdCQUFnQixDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSw4SEFBOEgsQ0FBQyxDQUFDO0lBQzdLLHdCQUFnQixDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSw4SEFBOEgsQ0FBQyxDQUFDO0lBQzlLLHdCQUFnQixDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSw4SEFBOEgsQ0FBQyxDQUFDO0lBRTFLLHdCQUFnQixDQUFDLGdCQUFnQixDQUFDLHVCQUFVLENBQUMsbUJBQW1CLEVBQUUsVUFBVSxJQUF3QjtRQUNoRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxLQUFLLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUN0RCxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDakIsS0FBSyxDQUFDO29CQUNGLHdCQUFnQixDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDL0MsS0FBSyxDQUFDO2dCQUNWLEtBQUssQ0FBQztvQkFDRix3QkFBZ0IsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ2hELEtBQUssQ0FBQztnQkFDVjtvQkFDSSxLQUFLLENBQUM7WUFDZCxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsd0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsdUJBQVUsQ0FBQyxtQkFBbUIsRUFBRSxVQUFVLElBQXdCO1FBQ2hHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEtBQUssa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQ3RELE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixLQUFLLENBQUM7b0JBQ0Ysd0JBQWdCLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO29CQUMvQyxLQUFLLENBQUM7Z0JBQ1YsS0FBSyxDQUFDO29CQUNGLHdCQUFnQixDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDaEQsS0FBSyxDQUFDO2dCQUNWO29CQUNJLEtBQUssQ0FBQztZQUNkLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCx3QkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyx1QkFBVSxDQUFDLG1CQUFtQixFQUFFLFVBQVUsSUFBd0I7UUFDaEcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsS0FBSyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFDdEQsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUssQ0FBQztvQkFDRix3QkFBZ0IsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQy9DLEtBQUssQ0FBQztnQkFDVixLQUFLLENBQUM7b0JBQ0Ysd0JBQWdCLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUNoRCxLQUFLLENBQUM7Z0JBQ1Y7b0JBQ0ksS0FBSyxDQUFDO1lBQ2QsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTptYXgtbGluZS1sZW5ndGhcclxuaW1wb3J0IHsgRXZlbnREYXRhLCBPYnNlcnZhYmxlLCBQcm9wZXJ0eUNoYW5nZURhdGEgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IHRvcG1vc3QgfSBmcm9tIFwidWkvZnJhbWVcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IERhdGVQaWNrZXIgfSBmcm9tIFwidWkvZGF0ZS1waWNrZXJcIjtcclxuaW1wb3J0IHsgU2VnbWVudGVkQmFyIH0gZnJvbSBcInVpL3NlZ21lbnRlZC1iYXJcIjtcclxuaW1wb3J0IHsgVGFiVmlldywgU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEgfSBmcm9tIFwidWkvdGFiLXZpZXdcIjtcclxuXHJcbmltcG9ydCBkcmF3ZXJNb2R1bGUgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvc2lkZWRyYXdlclwiKTtcclxuXHJcbmltcG9ydCB7IFBpY2tlcnNWaWV3TW9kZWwgfSBmcm9tIFwiLi4vLi4vdmlldy1tb2RlbHMvcm92ZXJzL3BpY2tlcnMtdmlldy1tb2RlbFwiO1xyXG5cclxuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJhcHBsaWNhdGlvblwiO1xyXG5cclxuZXhwb3J0IGxldCBwaWNrZXJzVmlld01vZGVsID0gbmV3IFBpY2tlcnNWaWV3TW9kZWwoKTtcclxubGV0IHBhZ2U7XHJcbmxldCBkdEN1cjtcclxubGV0IGR0T3BwO1xyXG5sZXQgZHRTcGk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25QYWdlTG9hZGVkKGFyZ3M6IEV2ZW50RGF0YSkge1xyXG4gICAgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25QYWdlTmF2aWdhdGVkVG8oYXJnczogRXZlbnREYXRhKSB7XHJcbiAgICBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XHJcblxyXG4gICAgZHRDdXIgPSA8RGF0ZVBpY2tlcj5wYWdlLmdldFZpZXdCeUlkKFwiZHQtY3VyXCIpO1xyXG4gICAgZHRPcHAgPSA8RGF0ZVBpY2tlcj5wYWdlLmdldFZpZXdCeUlkKFwiZHQtb3BwXCIpO1xyXG4gICAgZHRTcGkgPSA8RGF0ZVBpY2tlcj5wYWdlLmdldFZpZXdCeUlkKFwiZHQtc3BpXCIpO1xyXG5cclxuICAgIGluaXREYXRlUGlja2VycygpO1xyXG4gICAgaW5pdFNlZ21lbnRlZEJhcnMoKTtcclxuICAgIGluaXRUYWJzKCk7XHJcblxyXG4gICAgcGFnZS5iaW5kaW5nQ29udGV4dCA9IHBpY2tlcnNWaWV3TW9kZWw7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvblRhYkxvYWRlZChhcmdzKSB7XHJcbiAgICB2YXIgdGFiVmlldyA9IGFyZ3Mub2JqZWN0O1xyXG4gICAgaWYgKGFwcC5hbmRyb2lkKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YWJWaWV3Lml0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRhYlZpZXcuX3RhYkxheW91dC5nZXRUZXh0Vmlld0Zvckl0ZW1BdChpKS5zZXRIb3Jpem9udGFsbHlTY3JvbGxpbmcodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0VGFicygpIHtcclxuICAgIHBpY2tlcnNWaWV3TW9kZWwuYWRkRXZlbnRMaXN0ZW5lcihPYnNlcnZhYmxlLnByb3BlcnR5Q2hhbmdlRXZlbnQsIGZ1bmN0aW9uIChhcmdzOiBQcm9wZXJ0eUNoYW5nZURhdGEpIHtcclxuICAgICAgICBpZiAoYXJncy5wcm9wZXJ0eU5hbWUudG9TdHJpbmcoKSA9PT0gXCJ0YWJJbmRleFwiKSB7XHJcbiAgICAgICAgICAgIGluaXREYXRlUGlja2VycygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0RGF0ZVBpY2tlcnMoKSB7XHJcbiAgICB2YXIgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgIGR0Q3VyLm1pbkRhdGUgPSBuZXcgRGF0ZSgyMDEyLCA2ICsgMSwgNik7IC8vIExhbmRpbmcgZGF0ZTogNnRoIEF1Z3VzdCAyMDEyXHJcbiAgICBkdEN1ci5tYXhEYXRlID0gdG9kYXk7IC8vIHN0aWxsIGFjdGl2ZVxyXG5cclxuICAgIGR0T3BwLm1pbkRhdGUgPSBuZXcgRGF0ZSgyMDA0LCAwLCAyNik7IC8vIExhbmRpbmcgZGF0ZTogMjV0aCBKYW51YXJ5IDIwMDQgLSBmaXJzdCBwaWNzIG9uIDI2dGhcclxuICAgIGR0T3BwLm1heERhdGUgPSB0b2RheTsgLy8gc3RpbGwgYWN0aXZlIFxyXG5cclxuICAgIGR0U3BpLm1pbkRhdGUgPSBuZXcgRGF0ZSgyMDA0LCAwLCA1KTsgLy8gTGFuZGluZyBkYXRlOiA0dGggSmFudWFyeSAyMDA0IC0gZmlyc3QgcGljcyBvbiA1dGhcclxuICAgIGR0U3BpLm1heERhdGUgPSBuZXcgRGF0ZSgyMDEwLCAxICsgMSwgMjEpOyAvLyBsYXN0IGNvbW11bmljYXRpb24gTWFyY2hcclxuXHJcbiAgICBpZiAoIXBpY2tlcnNWaWV3TW9kZWwuZ2V0KFwicm92ZXJcIikpIHtcclxuICAgICAgICBkdEN1ci5kYXkgPSB0b2RheS5nZXREYXRlKCkgLSAyO1xyXG4gICAgICAgIGR0Q3VyLm1vbnRoID0gdG9kYXkuZ2V0TW9udGgoKSArIDE7XHJcbiAgICAgICAgZHRDdXIueWVhciA9IHRvZGF5LmdldEZ1bGxZZWFyKCk7XHJcblxyXG4gICAgICAgIGR0T3BwLmRheSA9IHRvZGF5LmdldERhdGUoKSAtIDI7XHJcbiAgICAgICAgZHRPcHAubW9udGggPSB0b2RheS5nZXRNb250aCgpICsgMTtcclxuICAgICAgICBkdE9wcC55ZWFyID0gdG9kYXkuZ2V0RnVsbFllYXIoKTtcclxuXHJcbiAgICAgICAgZHRTcGkuZGF5ID0gdG9kYXkuZ2V0RGF0ZSgpIC0gMjtcclxuICAgICAgICBkdFNwaS5tb250aCA9IHRvZGF5LmdldE1vbnRoKCkgKyAxO1xyXG4gICAgICAgIGR0U3BpLnllYXIgPSAyMDA3O1xyXG5cclxuICAgICAgICBwaWNrZXJzVmlld01vZGVsLnNldChcImRheVwiLCBkdEN1ci5kYXkpO1xyXG4gICAgICAgIHBpY2tlcnNWaWV3TW9kZWwuc2V0KFwibW9udGhcIiwgZHRDdXIubW9udGgpO1xyXG4gICAgICAgIHBpY2tlcnNWaWV3TW9kZWwuc2V0KFwieWVhclwiLCBkdEN1ci55ZWFyKTtcclxuXHJcbiAgICAgICAgcGlja2Vyc1ZpZXdNb2RlbC5zZXQoXCJkYXlPcHBcIiwgZHRPcHAuZGF5KTtcclxuICAgICAgICBwaWNrZXJzVmlld01vZGVsLnNldChcIm1vbnRoT3BwXCIsIGR0T3BwLm1vbnRoKTtcclxuICAgICAgICBwaWNrZXJzVmlld01vZGVsLnNldChcInllYXJPcHBcIiwgZHRPcHAueWVhcik7XHJcblxyXG4gICAgICAgIHBpY2tlcnNWaWV3TW9kZWwuc2V0KFwiZGF5U3BpXCIsIGR0U3BpLmRheSk7XHJcbiAgICAgICAgcGlja2Vyc1ZpZXdNb2RlbC5zZXQoXCJtb250aFNwaVwiLCBkdFNwaS5tb250aCk7XHJcbiAgICAgICAgcGlja2Vyc1ZpZXdNb2RlbC5zZXQoXCJ5ZWFyU3BpXCIsIGR0U3BpLnllYXIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBkdEN1ci5kYXkgPSBwaWNrZXJzVmlld01vZGVsLmdldChcImRheVwiKTtcclxuICAgICAgICBkdEN1ci5tb250aCA9IHBpY2tlcnNWaWV3TW9kZWwuZ2V0KFwibW9udGhcIik7XHJcbiAgICAgICAgZHRDdXIueWVhciA9IHBpY2tlcnNWaWV3TW9kZWwuZ2V0KFwieWVhclwiKTtcclxuXHJcbiAgICAgICAgZHRPcHAuZGF5ID0gcGlja2Vyc1ZpZXdNb2RlbC5nZXQoXCJkYXlPcHBcIik7XHJcbiAgICAgICAgZHRPcHAubW9udGggPSBwaWNrZXJzVmlld01vZGVsLmdldChcIm1vbnRoT3BwXCIpO1xyXG4gICAgICAgIGR0T3BwLnllYXIgPSBwaWNrZXJzVmlld01vZGVsLmdldChcInllYXJPcHBcIik7XHJcblxyXG4gICAgICAgIGR0U3BpLmRheSA9IHBpY2tlcnNWaWV3TW9kZWwuZ2V0KFwiZGF5U3BpXCIpO1xyXG4gICAgICAgIGR0U3BpLm1vbnRoID0gcGlja2Vyc1ZpZXdNb2RlbC5nZXQoXCJtb250aFNwaVwiKTtcclxuICAgICAgICBkdFNwaS55ZWFyID0gcGlja2Vyc1ZpZXdNb2RlbC5nZXQoXCJ5ZWFyU3BpXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0U2VnbWVudGVkQmFycygpIHtcclxuICAgIHBpY2tlcnNWaWV3TW9kZWwuc2V0KFwic2VsZWN0ZWRJbmRleEN1clwiLCAxKTtcclxuICAgIHBpY2tlcnNWaWV3TW9kZWwuc2V0KFwic2VsZWN0ZWRJbmRleE9wcFwiLCAxKTtcclxuICAgIHBpY2tlcnNWaWV3TW9kZWwuc2V0KFwic2VsZWN0ZWRJbmRleFNwaVwiLCAxKTtcclxuXHJcbiAgICBwaWNrZXJzVmlld01vZGVsLnNldChcImlzQ3VySW5mb1Zpc2libGVcIiwgZmFsc2UpO1xyXG4gICAgcGlja2Vyc1ZpZXdNb2RlbC5zZXQoXCJpc09wcEluZm9WaXNpYmxlXCIsIGZhbHNlKTtcclxuICAgIHBpY2tlcnNWaWV3TW9kZWwuc2V0KFwiaXNTcGlJbmZvVmlzaWJsZVwiLCBmYWxzZSk7XHJcblxyXG4gICAgcGlja2Vyc1ZpZXdNb2RlbC5zZXQoXCJjdXJpb3NpdHlEZXNjcmlwdGlvblwiLCBcIkN1cmlvc2l0eSBpcyBhIGNhci1zaXplZCByb2JvdGljIHJvdmVyIGV4cGxvcmluZyBHYWxlIENyYXRlciBvbiBNYXJzIGFzIHBhcnQgb2YgTkFTQSdzIE1hcnMgU2NpZW5jZSBMYWJvcmF0b3J5IG1pc3Npb24gKE1TTClcIik7XHJcbiAgICBwaWNrZXJzVmlld01vZGVsLnNldChcIm9wcG9ydW5pdHlEZXNjcmlwdGlvblwiLCBcIkN1cmlvc2l0eSBpcyBhIGNhci1zaXplZCByb2JvdGljIHJvdmVyIGV4cGxvcmluZyBHYWxlIENyYXRlciBvbiBNYXJzIGFzIHBhcnQgb2YgTkFTQSdzIE1hcnMgU2NpZW5jZSBMYWJvcmF0b3J5IG1pc3Npb24gKE1TTClcIik7XHJcbiAgICBwaWNrZXJzVmlld01vZGVsLnNldChcInNwaXJpdERlc2NyaXB0aW9uXCIsIFwiQ3VyaW9zaXR5IGlzIGEgY2FyLXNpemVkIHJvYm90aWMgcm92ZXIgZXhwbG9yaW5nIEdhbGUgQ3JhdGVyIG9uIE1hcnMgYXMgcGFydCBvZiBOQVNBJ3MgTWFycyBTY2llbmNlIExhYm9yYXRvcnkgbWlzc2lvbiAoTVNMKVwiKTtcclxuXHJcbiAgICBwaWNrZXJzVmlld01vZGVsLmFkZEV2ZW50TGlzdGVuZXIoT2JzZXJ2YWJsZS5wcm9wZXJ0eUNoYW5nZUV2ZW50LCBmdW5jdGlvbiAoYXJnczogUHJvcGVydHlDaGFuZ2VEYXRhKSB7XHJcbiAgICAgICAgaWYgKGFyZ3MucHJvcGVydHlOYW1lLnRvU3RyaW5nKCkgPT09IFwic2VsZWN0ZWRJbmRleEN1clwiKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoYXJncy52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgIHBpY2tlcnNWaWV3TW9kZWwuc2V0KFwiaXNDdXJJbmZvVmlzaWJsZVwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBwaWNrZXJzVmlld01vZGVsLnNldChcImlzQ3VySW5mb1Zpc2libGVcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHBpY2tlcnNWaWV3TW9kZWwuYWRkRXZlbnRMaXN0ZW5lcihPYnNlcnZhYmxlLnByb3BlcnR5Q2hhbmdlRXZlbnQsIGZ1bmN0aW9uIChhcmdzOiBQcm9wZXJ0eUNoYW5nZURhdGEpIHtcclxuICAgICAgICBpZiAoYXJncy5wcm9wZXJ0eU5hbWUudG9TdHJpbmcoKSA9PT0gXCJzZWxlY3RlZEluZGV4T3BwXCIpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChhcmdzLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgcGlja2Vyc1ZpZXdNb2RlbC5zZXQoXCJpc09wcEluZm9WaXNpYmxlXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIHBpY2tlcnNWaWV3TW9kZWwuc2V0KFwiaXNPcHBJbmZvVmlzaWJsZVwiLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcGlja2Vyc1ZpZXdNb2RlbC5hZGRFdmVudExpc3RlbmVyKE9ic2VydmFibGUucHJvcGVydHlDaGFuZ2VFdmVudCwgZnVuY3Rpb24gKGFyZ3M6IFByb3BlcnR5Q2hhbmdlRGF0YSkge1xyXG4gICAgICAgIGlmIChhcmdzLnByb3BlcnR5TmFtZS50b1N0cmluZygpID09PSBcInNlbGVjdGVkSW5kZXhTcGlcIikge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGFyZ3MudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICBwaWNrZXJzVmlld01vZGVsLnNldChcImlzU3BpSW5mb1Zpc2libGVcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgcGlja2Vyc1ZpZXdNb2RlbC5zZXQoXCJpc1NwaUluZm9WaXNpYmxlXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG4iXX0=
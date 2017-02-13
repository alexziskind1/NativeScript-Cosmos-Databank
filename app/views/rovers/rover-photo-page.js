"use strict";
var application = require("application");
var frame = require("ui/frame");
var rovers_view_model_1 = require("../../view-models/rovers/rovers-view-model");
var rovers_selection_1 = require("./rovers-selection");
var page;
var list;
var pageContainer;
var selectedRover;
var year;
var month;
var day;
var roversViewModel;
function onPageLoaded(args) {
    page = args.object;
}
exports.onPageLoaded = onPageLoaded;
function onPageNavigatedTo(args) {
    page = args.object;
    pageContainer = page.getViewById("pageContainer");
    var navgationContext = page.navigationContext;
    if (!roversViewModel || !(selectedRover === navgationContext["rover"]
        && year === navgationContext["year"]
        && month === navgationContext["month"]
        && day === navgationContext["day"])) {
        selectedRover = navgationContext["rover"];
        year = navgationContext["year"];
        month = navgationContext["month"];
        day = navgationContext["day"];
        selectedRover = navgationContext["rover"];
        switch (selectedRover) {
            case "curiosity":
                roversViewModel = new rovers_view_model_1.RoversViewModel(selectedRover, year, month, day);
                rovers_selection_1.pickersViewModel.set("day", day);
                rovers_selection_1.pickersViewModel.set("month", month);
                rovers_selection_1.pickersViewModel.set("year", year);
                rovers_selection_1.pickersViewModel.set("rover", selectedRover);
                break;
            case "opportunity":
                roversViewModel = new rovers_view_model_1.RoversViewModel(selectedRover, year, month, day);
                rovers_selection_1.pickersViewModel.set("dayOpp", day);
                rovers_selection_1.pickersViewModel.set("monthOpp", month);
                rovers_selection_1.pickersViewModel.set("yearOpp", year);
                rovers_selection_1.pickersViewModel.set("rover", selectedRover);
                break;
            case "spirit":
                roversViewModel = new rovers_view_model_1.RoversViewModel(selectedRover, year, month, day);
                rovers_selection_1.pickersViewModel.set("daySpi", day);
                rovers_selection_1.pickersViewModel.set("monthSpi", month);
                rovers_selection_1.pickersViewModel.set("yearSpi", year);
                rovers_selection_1.pickersViewModel.set("rover", selectedRover);
                break;
            default:
                break;
        }
        roversViewModel.initDataItems();
    }
    pageContainer.bindingContext = roversViewModel;
}
exports.onPageNavigatedTo = onPageNavigatedTo;
function onListLoaded(args) {
    list = args.object;
    if (list.items) {
        list.scrollToIndex(roversViewModel.get("cachedIndex"));
    }
    list.refresh();
}
exports.onListLoaded = onListLoaded;
function onItemTap(args) {
    var tappedItemIndex = args.itemIndex;
    roversViewModel.set("cachedIndex", tappedItemIndex);
    var tappedItem = roversViewModel.get("dataItems").getItem(tappedItemIndex);
    var navEntry = {
        moduleName: "views/rovers/photo-details-page",
        context: { "tappedItem": tappedItem },
        animated: true,
        transition: {
            name: application.android ? "explode" : "curl"
        }
    };
    frame.topmost().navigate(navEntry);
}
exports.onItemTap = onItemTap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm92ZXItcGhvdG8tcGFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJvdmVyLXBob3RvLXBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUlBLHlDQUEyQztBQUUzQyxnQ0FBa0M7QUFFbEMsZ0ZBQXVGO0FBQ3ZGLHVEQUFzRDtBQUt0RCxJQUFJLElBQUksQ0FBQztBQUNULElBQUksSUFBSSxDQUFDO0FBQ1QsSUFBSSxhQUFhLENBQUM7QUFFbEIsSUFBSSxhQUFhLENBQUM7QUFDbEIsSUFBSSxJQUFJLENBQUM7QUFDVCxJQUFJLEtBQUssQ0FBQztBQUNWLElBQUksR0FBRyxDQUFDO0FBRVIsSUFBSSxlQUFlLENBQUM7QUFFcEIsc0JBQTZCLElBQWU7SUFDeEMsSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDN0IsQ0FBQztBQUZELG9DQUVDO0FBRUQsMkJBQWtDLElBQWU7SUFDN0MsSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7SUFFekIsYUFBYSxHQUFlLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7SUFFOUQsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFFOUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxlQUFlLElBQUksQ0FBQyxDQUFDLGFBQWEsS0FBSyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7V0FDOUQsSUFBSSxLQUFLLGdCQUFnQixDQUFDLE1BQU0sQ0FBQztXQUNqQyxLQUFLLEtBQUssZ0JBQWdCLENBQUMsT0FBTyxDQUFDO1dBQ25DLEdBQUcsS0FBSyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV0QyxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUMsSUFBSSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNs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T0FBTyxHQUFHLFNBQVMsR0FBRyxNQUFNO1NBQ2pEO0tBQ0osQ0FBQztJQUVGLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdkMsQ0FBQztBQWhCRCw4QkFnQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudERhdGEsIE9ic2VydmFibGUgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJkYXRhL29ic2VydmFibGUtYXJyYXlcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IEdyaWRMYXlvdXQgfSBmcm9tIFwidWkvbGF5b3V0cy9ncmlkLWxheW91dFwiO1xyXG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tIFwiYXBwbGljYXRpb25cIjtcclxuaW1wb3J0ICogYXMgaHR0cCBmcm9tIFwiaHR0cFwiO1xyXG5pbXBvcnQgKiBhcyBmcmFtZSBmcm9tIFwidWkvZnJhbWVcIjtcclxuXHJcbmltcG9ydCB7IFJvdmVyc1ZpZXdNb2RlbCwgRGF0YUl0ZW0gfSBmcm9tIFwiLi4vLi4vdmlldy1tb2RlbHMvcm92ZXJzL3JvdmVycy12aWV3LW1vZGVsXCI7XHJcbmltcG9ydCB7IHBpY2tlcnNWaWV3TW9kZWwgfSBmcm9tIFwiLi9yb3ZlcnMtc2VsZWN0aW9uXCI7XHJcblxyXG5pbXBvcnQgKiBhcyBSYWRMaXN0d01vZHVsZSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvbGlzdHZpZXdcIjtcclxuaW1wb3J0IHsgRnJlc2NvRHJhd2VlLCBGaW5hbEV2ZW50RGF0YSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZnJlc2NvXCI7XHJcblxyXG5sZXQgcGFnZTtcclxubGV0IGxpc3Q7XHJcbmxldCBwYWdlQ29udGFpbmVyO1xyXG5cclxudmFyIHNlbGVjdGVkUm92ZXI7XHJcbnZhciB5ZWFyO1xyXG52YXIgbW9udGg7XHJcbnZhciBkYXk7XHJcblxyXG5sZXQgcm92ZXJzVmlld01vZGVsO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uUGFnZUxvYWRlZChhcmdzOiBFdmVudERhdGEpIHtcclxuICAgIHBhZ2UgPSA8UGFnZT5hcmdzLm9iamVjdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uUGFnZU5hdmlnYXRlZFRvKGFyZ3M6IEV2ZW50RGF0YSkge1xyXG4gICAgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xyXG5cclxuICAgIHBhZ2VDb250YWluZXIgPSA8R3JpZExheW91dD5wYWdlLmdldFZpZXdCeUlkKFwicGFnZUNvbnRhaW5lclwiKTtcclxuXHJcbiAgICB2YXIgbmF2Z2F0aW9uQ29udGV4dCA9IHBhZ2UubmF2aWdhdGlvbkNvbnRleHQ7XHJcblxyXG4gICAgaWYgKCFyb3ZlcnNWaWV3TW9kZWwgfHwgIShzZWxlY3RlZFJvdmVyID09PSBuYXZnYXRpb25Db250ZXh0W1wicm92ZXJcIl1cclxuICAgICAgICAmJiB5ZWFyID09PSBuYXZnYXRpb25Db250ZXh0W1wieWVhclwiXVxyXG4gICAgICAgICYmIG1vbnRoID09PSBuYXZnYXRpb25Db250ZXh0W1wibW9udGhcIl1cclxuICAgICAgICAmJiBkYXkgPT09IG5hdmdhdGlvbkNvbnRleHRbXCJkYXlcIl0pKSB7XHJcblxyXG4gICAgICAgIHNlbGVjdGVkUm92ZXIgPSBuYXZnYXRpb25Db250ZXh0W1wicm92ZXJcIl07XHJcbiAgICAgICAgeWVhciA9IG5hdmdhdGlvbkNvbnRleHRbXCJ5ZWFyXCJdO1xyXG4gICAgICAgIG1vbnRoID0gbmF2Z2F0aW9uQ29udGV4dFtcIm1vbnRoXCJdO1xyXG4gICAgICAgIGRheSA9IG5hdmdhdGlvbkNvbnRleHRbXCJkYXlcIl07XHJcbiAgICAgICAgc2VsZWN0ZWRSb3ZlciA9IG5hdmdhdGlvbkNvbnRleHRbXCJyb3ZlclwiXTtcclxuXHJcbiAgICAgICAgc3dpdGNoIChzZWxlY3RlZFJvdmVyKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjdXJpb3NpdHlcIjpcclxuICAgICAgICAgICAgICAgIHJvdmVyc1ZpZXdNb2RlbCA9IG5ldyBSb3ZlcnNWaWV3TW9kZWwoc2VsZWN0ZWRSb3ZlciwgeWVhciwgbW9udGgsIGRheSk7XHJcbiAgICAgICAgICAgICAgICBwaWNrZXJzVmlld01vZGVsLnNldChcImRheVwiLCBkYXkpO1xyXG4gICAgICAgICAgICAgICAgcGlja2Vyc1ZpZXdNb2RlbC5zZXQoXCJtb250aFwiLCBtb250aCk7XHJcbiAgICAgICAgICAgICAgICBwaWNrZXJzVmlld01vZGVsLnNldChcInllYXJcIiwgeWVhcik7XHJcbiAgICAgICAgICAgICAgICBwaWNrZXJzVmlld01vZGVsLnNldChcInJvdmVyXCIsIHNlbGVjdGVkUm92ZXIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJvcHBvcnR1bml0eVwiOlxyXG4gICAgICAgICAgICAgICAgcm92ZXJzVmlld01vZGVsID0gbmV3IFJvdmVyc1ZpZXdNb2RlbChzZWxlY3RlZFJvdmVyLCB5ZWFyLCBtb250aCwgZGF5KTtcclxuICAgICAgICAgICAgICAgIHBpY2tlcnNWaWV3TW9kZWwuc2V0KFwiZGF5T3BwXCIsIGRheSk7XHJcbiAgICAgICAgICAgICAgICBwaWNrZXJzVmlld01vZGVsLnNldChcIm1vbnRoT3BwXCIsIG1vbnRoKTtcclxuICAgICAgICAgICAgICAgIHBpY2tlcnNWaWV3TW9kZWwuc2V0KFwieWVhck9wcFwiLCB5ZWFyKTtcclxuICAgICAgICAgICAgICAgIHBpY2tlcnNWaWV3TW9kZWwuc2V0KFwicm92ZXJcIiwgc2VsZWN0ZWRSb3Zlcik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInNwaXJpdFwiOlxyXG4gICAgICAgICAgICAgICAgcm92ZXJzVmlld01vZGVsID0gbmV3IFJvdmVyc1ZpZXdNb2RlbChzZWxlY3RlZFJvdmVyLCB5ZWFyLCBtb250aCwgZGF5KTtcclxuICAgICAgICAgICAgICAgIHBpY2tlcnNWaWV3TW9kZWwuc2V0KFwiZGF5U3BpXCIsIGRheSk7XHJcbiAgICAgICAgICAgICAgICBwaWNrZXJzVmlld01vZGVsLnNldChcIm1vbnRoU3BpXCIsIG1vbnRoKTtcclxuICAgICAgICAgICAgICAgIHBpY2tlcnNWaWV3TW9kZWwuc2V0KFwieWVhclNwaVwiLCB5ZWFyKTtcclxuICAgICAgICAgICAgICAgIHBpY2tlcnNWaWV3TW9kZWwuc2V0KFwicm92ZXJcIiwgc2VsZWN0ZWRSb3Zlcik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcm92ZXJzVmlld01vZGVsLmluaXREYXRhSXRlbXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwYWdlQ29udGFpbmVyLmJpbmRpbmdDb250ZXh0ID0gcm92ZXJzVmlld01vZGVsO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25MaXN0TG9hZGVkKGFyZ3M6IFJhZExpc3R3TW9kdWxlLkxpc3RWaWV3RXZlbnREYXRhKSB7XHJcbiAgICBsaXN0ID0gPFJhZExpc3R3TW9kdWxlLlJhZExpc3RWaWV3PmFyZ3Mub2JqZWN0O1xyXG5cclxuICAgIGlmIChsaXN0Lml0ZW1zKSB7XHJcbiAgICAgICAgbGlzdC5zY3JvbGxUb0luZGV4KHJvdmVyc1ZpZXdNb2RlbC5nZXQoXCJjYWNoZWRJbmRleFwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGlzdC5yZWZyZXNoKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBvbkl0ZW1UYXAoYXJnczogUmFkTGlzdHdNb2R1bGUuTGlzdFZpZXdFdmVudERhdGEpIHtcclxuICAgIHZhciB0YXBwZWRJdGVtSW5kZXggPSBhcmdzLml0ZW1JbmRleDtcclxuICAgIHJvdmVyc1ZpZXdNb2RlbC5zZXQoXCJjYWNoZWRJbmRleFwiLCB0YXBwZWRJdGVtSW5kZXgpO1xyXG5cclxuICAgIHZhciB0YXBwZWRJdGVtID0gcm92ZXJzVmlld01vZGVsLmdldChcImRhdGFJdGVtc1wiKS5nZXRJdGVtKHRhcHBlZEl0ZW1JbmRleCk7XHJcblxyXG4gICAgdmFyIG5hdkVudHJ5ID0ge1xyXG4gICAgICAgIG1vZHVsZU5hbWU6IFwidmlld3Mvcm92ZXJzL3Bob3RvLWRldGFpbHMtcGFnZVwiLFxyXG4gICAgICAgIGNvbnRleHQ6IHsgXCJ0YXBwZWRJdGVtXCI6IHRhcHBlZEl0ZW0gfSxcclxuICAgICAgICBhbmltYXRlZDogdHJ1ZSxcclxuICAgICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IGFwcGxpY2F0aW9uLmFuZHJvaWQgPyBcImV4cGxvZGVcIiA6IFwiY3VybFwiXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBmcmFtZS50b3Btb3N0KCkubmF2aWdhdGUobmF2RW50cnkpO1xyXG59XHJcbiJdfQ==
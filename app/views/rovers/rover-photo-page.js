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

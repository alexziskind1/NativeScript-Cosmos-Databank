"use strict";
var drawer_over_navigation_model_1 = require("../../models/drawer-over-navigation-model");
var frame_1 = require("ui/frame");
function onPageLoaded(args) {
    var page = args.object;
    var navigationContext = page.navigationContext;
    var viewModel = new drawer_over_navigation_model_1.DrawerOverNavigationModel();
    viewModel.set("contextItem", navigationContext["tappedItem"]);
    page.bindingContext = viewModel;
}
exports.onPageLoaded = onPageLoaded;
function goBack(args) {
    frame_1.topmost().goBack();
}
exports.goBack = goBack;
//# sourceMappingURL=asteroid-details-page.js.map
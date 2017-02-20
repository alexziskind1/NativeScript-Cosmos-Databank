"use strict";
var drawer_over_navigation_model_1 = require("../../view-models/drawer-over-navigation-model");
var frame_1 = require("ui/frame");
var utils_1 = require("utils/utils");
var viewModel;
function onPageLoaded(args) {
    var page = args.object;
    var navigationContext = page.navigationContext;
    viewModel = new drawer_over_navigation_model_1.DrawerOverNavigationModel();
    viewModel.set("contextItem", navigationContext["tappedItem"]);
    page.bindingContext = viewModel;
}
exports.onPageLoaded = onPageLoaded;
function goBack(args) {
    frame_1.topmost().goBack();
}
exports.goBack = goBack;
function onLinkTap() {
    utils_1.openUrl(viewModel.get("contextItem").nasa_jpl_url);
}
exports.onLinkTap = onLinkTap;

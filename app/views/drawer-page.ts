import viewModel = require("../models/drawer-over-navigation-model");

export function onPageLoaded(args) {
    var page = args.object;
    page.bindingContext = new viewModel.DrawerOverNavigationModel();
}
import viewModel = require("../../models/drawer-over-navigation-model");
import { topmost } from "ui/frame";

export function onPageLoaded(args) {
    var page = args.object;
    page.bindingContext = new viewModel.DrawerOverNavigationModel();
}
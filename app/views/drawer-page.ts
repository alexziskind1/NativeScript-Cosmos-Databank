import { DrawerOverNavigationModel } from "../models/drawer-over-navigation-model";

export function onPageLoaded(args) {
    var page = args.object;
    page.bindingContext = new DrawerOverNavigationModel();
}
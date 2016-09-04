import { DrawerOverNavigationModel } from "../../models/drawer-over-navigation-model";
import { topmost } from "ui/frame";

let drawerViewModel = new DrawerOverNavigationModel();

export function onPageLoaded(args) {
    var page = args.object;

    page.bindingContext = drawerViewModel;
}

export function toggleCur() {
	drawerViewModel.set("showCur", !drawerViewModel.get("showCur"));
}

export function toggleOpp() {
	drawerViewModel.set("showOpp", !drawerViewModel.get("showOpp"));
}

export function toggleSpi() {
	drawerViewModel.set("showSpi", !drawerViewModel.get("showSpi"));
}
import { DrawerOverNavigationModel } from "../../models/drawer-over-navigation-model";
import { topmost } from "ui/frame";
import { DatePicker } from "ui/date-picker";

let drawerViewModel = new DrawerOverNavigationModel();

export function onPageLoaded(args) {
    var page = args.object;

    page.bindingContext = drawerViewModel;
	// Rovers: opportunity (2004- 2009), spirit (2004 - 2010), curiosity (2012 - present)
	var dtCur = <DatePicker>page.getViewById("dt-cur");
	var dtOpp = <DatePicker>page.getViewById("dt-opp");
	var dtSpi = <DatePicker>page.getViewById("dt-spi");
	dtCur.minDate = new Date(2012, 7 + 1, 16);
	dtCur.maxDate = new Date();

	dtOpp.minDate = new Date(2004, 7 + 1, 16);
	dtOpp.maxDate = new Date(2009, 7 + 1, 16);

	dtSpi.minDate = new Date(2004, 7 + 1, 16);
	dtSpi.maxDate = new Date(2010, 7 + 1, 16);
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
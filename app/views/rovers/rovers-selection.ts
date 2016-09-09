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
	dtCur.minDate = new Date(2012, 6 + 1, 6); // 6th August 
	dtCur.maxDate = new Date(); // still active

	dtOpp.minDate = new Date(2004, 0 , 26); // 25th January - first pics on 26th
	dtOpp.maxDate = new Date(); // still active ?

	dtSpi.minDate = new Date(2004, 0 , 5); // 4th January - first pics on 5th
	dtSpi.maxDate = new Date(2010, 2 + 1, 22); // last communication
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
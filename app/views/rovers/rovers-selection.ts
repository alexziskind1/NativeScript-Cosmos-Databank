import { DrawerOverNavigationModel } from "../../models/drawer-over-navigation-model";
import { UiViewModel } from "../../models/rovers/rovers-ui-view-model";
import { EventData } from "data/observable";

import { topmost } from "ui/frame";
import { Page } from "ui/page";
import { DatePicker } from "ui/date-picker";
import { StackLayout } from "ui/layouts/stack-layout";

import drawerModule = require("nativescript-telerik-ui/sidedrawer");

let drawerViewModel = new DrawerOverNavigationModel();
let uiViewModel = new UiViewModel();

export function onPageLoaded(args: EventData) {
    var page = <Page>args.object;

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

	var sideDrawer = <drawerModule.RadSideDrawer>page.getViewById("sideDrawer");
	sideDrawer.closeDrawer();
}

export function onStackLoaded(args: EventData) {
	var stack = <StackLayout>args.object;
	stack.bindingContext = uiViewModel;
}

export function toggleCur() {
	console.log("toggleCur");
	uiViewModel.set("showCur", !uiViewModel.get("showCur"));
}

export function toggleOpp() {
	console.log("toggleOpp");
	uiViewModel.set("showOpp", !uiViewModel.get("showOpp"));
}

export function toggleSpi() {
	console.log("toggleSpi");
	uiViewModel.set("showSpi", !uiViewModel.get("showSpi"));
}
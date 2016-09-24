import { DrawerOverNavigationModel } from "../../models/drawer-over-navigation-model";
import { UiViewModel } from "../../models/rovers/rovers-ui-view-model";
import { EventData } from "data/observable";

import { topmost } from "ui/frame";
import { Page } from "ui/page";
import { DatePicker } from "ui/date-picker";
import { StackLayout } from "ui/layouts/stack-layout";

import drawerModule = require("nativescript-telerik-ui/sidedrawer");
import { RoversViewModel, DataItem } from "../../models/rovers/rovers-view-model";
import { PickersViewModel } from "../../models/rovers/pickers-view-model";

export let pickersViewModel = new PickersViewModel();
let uiViewModel = new UiViewModel();

// day="15" month="6" year="2014"
export function onPageLoaded(args: EventData) {
    var page = <Page>args.object;

	// Rovers: opportunity (2004- 2009), spirit (2004 - 2010), curiosity (2012 - present)
	var dtCur = <DatePicker>page.getViewById("dt-cur");
	var dtOpp = <DatePicker>page.getViewById("dt-opp");
	var dtSpi = <DatePicker>page.getViewById("dt-spi");

	var today = new Date();

	dtCur.minDate = new Date(2012, 6 + 1, 6); // 6th August 
	dtCur.maxDate = today; // still active

	dtOpp.minDate = new Date(2004, 0 , 26); // 25th January - first pics on 26th
	dtOpp.maxDate = today; // still active ?

	dtSpi.minDate = new Date(2004, 0 , 5); // 4th January - first pics on 5th
	dtSpi.maxDate = new Date(2010, 2 + 1, 22); // last communication

	if (!pickersViewModel.get("day")) {
		dtCur.day = today.getDate() - 2;
		dtCur.month = today.getMonth() -1;
		dtCur.year = today.getFullYear();

		dtOpp.day = today.getDate() - 2;
		dtOpp.month = today.getMonth() -1;
		dtOpp.year = today.getFullYear();
	
		dtSpi.day = today.getDate() - 2;
		dtSpi.month = today.getMonth() -1;
		dtSpi.year = 2007;			
	} else {
		if (pickersViewModel.get("rover") === "curiosity") {
			dtCur.day = pickersViewModel.get("day");
			dtCur.month = pickersViewModel.get("month");
			dtCur.year = pickersViewModel.get("year");
		} else if (pickersViewModel.get("rover") === "opportunity") {
			dtOpp.day = pickersViewModel.get("day");
			dtOpp.month = pickersViewModel.get("month");
			dtOpp.year = pickersViewModel.get("year");	
		} else {
			dtSpi.day = pickersViewModel.get("day");
			dtSpi.month = pickersViewModel.get("month");
			dtSpi.year = pickersViewModel.get("year");	
		}
	}

	page.bindingContext = pickersViewModel;
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
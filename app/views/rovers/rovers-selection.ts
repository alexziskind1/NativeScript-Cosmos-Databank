import { EventData } from "data/observable";
import { topmost } from "ui/frame";
import { Page } from "ui/page";
import { DatePicker } from "ui/date-picker";
import { StackLayout } from "ui/layouts/stack-layout";

import drawerModule = require("nativescript-telerik-ui/sidedrawer");

import { PickersViewModel } from "../../models/rovers/pickers-view-model";
import { UiViewModel } from "../../models/rovers/rovers-ui-view-model";

export let pickersViewModel = new PickersViewModel();
let uiViewModel = new UiViewModel();

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

	if (!pickersViewModel.get("rover")) {
		dtCur.day = today.getDate() - 2;
		dtCur.month = today.getMonth() + 1;
		dtCur.year = today.getFullYear();

		dtOpp.day = today.getDate() - 2;
		dtOpp.month = today.getMonth() +1;
		dtOpp.year = today.getFullYear();
	
		dtSpi.day = today.getDate() - 2;
		dtSpi.month = today.getMonth() + 1;
		dtSpi.year = 2007;		

		pickersViewModel.set("day", dtCur.day);
		pickersViewModel.set("month", dtCur.month);
		pickersViewModel.set("year", dtCur.year);
		pickersViewModel.set("dayOpp", dtOpp.day);
		pickersViewModel.set("monthOpp", dtOpp.month);
		pickersViewModel.set("yearOpp", dtOpp.year);
		pickersViewModel.set("daySpi", dtSpi.day);
		pickersViewModel.set("monthSpi", dtSpi.month);
		pickersViewModel.set("yearSpi", dtSpi.year);	
	} else {

		dtCur.day = pickersViewModel.get("day");
		dtCur.month = pickersViewModel.get("month");
		dtCur.year = pickersViewModel.get("year");

		dtOpp.day = pickersViewModel.get("dayOpp");
		dtOpp.month = pickersViewModel.get("monthOpp");
		dtOpp.year = pickersViewModel.get("yearOpp");	

		dtSpi.day = pickersViewModel.get("daySpi");
		dtSpi.month = pickersViewModel.get("monthSpi");
		dtSpi.year = pickersViewModel.get("yearSpi");	
	}

	page.bindingContext = pickersViewModel;
}

export function onStackLoaded(args: EventData) {
	var stack = <StackLayout>args.object;
	stack.bindingContext = uiViewModel;
}
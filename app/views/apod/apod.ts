
import { topmost } from "ui/frame";
import { ListView } from "ui/list-view";
import { Page } from "ui/page";
import { GridLayout } from "ui/layouts/grid-layout";
import dialogs = require("ui/dialogs");

import { EventData } from "data/observable";

import { DrawerOverNavigationModel } from "../../models/drawer-over-navigation-model";
import { ApodViewModel, ApodItem } from "../../models/apod/apod-model";

import drawerModule = require("nativescript-telerik-ui/sidedrawer");

let apodViewModel = new ApodViewModel();
let drawerViewModel = new DrawerOverNavigationModel();
let page;

export function onPageLoaded(args: EventData) {
    page = <Page>args.object;
    page.bindingContext = drawerViewModel;   

	var sideDrawer = <drawerModule.RadSideDrawer>page.getViewById("sideDrawer");
    sideDrawer.closeDrawer();
}

export function onPageNavigatedTo(args: EventData) {
    page = <Page>args.object;
    var pageContainer = <GridLayout>page.getViewById("pageContainer");

    apodViewModel.initDataItems();

    pageContainer.bindingContext = apodViewModel;
}

export function previousDate(args: EventData) {
    // add check if the date is not too far in the past (check first APOD date)
    var currentDate = apodViewModel.get("selectedDate");
    currentDate.setDate(currentDate.getDate()-1);
    apodViewModel.set("selectedDate", currentDate);
    apodViewModel.initDataItems(formatDate(currentDate)); 
}

export function nextDate(args: EventData) {

    // add check if the date is not in the future - CHECK THIS BELOW - works one tap later
    var currentDate = apodViewModel.get("selectedDate");
    if (currentDate > new Date()) {
        var options = {
            title: "Error!",
            message: "Showing the future is avaiable in the paid version!",
            okButtonText: "OK"
        };
        dialogs.alert(options).then(() => {
            console.log("Future alert dismissed!");
        });
    } else {
        currentDate.setDate(currentDate.getDate()+1);
        apodViewModel.set("selectedDate", currentDate);
        apodViewModel.initDataItems(formatDate(currentDate)); 
    }

}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
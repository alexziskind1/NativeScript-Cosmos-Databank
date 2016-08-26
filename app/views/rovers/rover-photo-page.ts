import { EventData, Observable, PropertyChangeData } from "data/observable";
import { ObservableArray } from "data/observable-array";
import { Page } from "ui/page";
import { topmost } from "ui/frame";

import { GridLayout } from "ui/layouts/grid-layout";
import { StackLayout } from "ui/layouts/stack-layout";
import { Label } from "ui/label";
import { ListView, ItemEventData } from "ui/list-view";
import { Button } from "ui/button";
import { DatePicker } from "ui/date-picker";
import { ListPicker } from "ui/list-picker";
import { Color } from "color";
import { ActionBar } from "ui/action-bar";

import { RoversViewModel, DataItem } from "../../models/rovers-view-model";
import { DrawerOverNavigationModel } from  "../../models/drawer-over-navigation-model";

import http = require("http");

import * as fresco from "nativescript-fresco";

let page;
let list;
let pageContainer;
let datePicker;
let listPicker;
let actionBar;

var selectedRover;
var year;
var month;
var day;

let roversViewModel;
let drawerViewModel = new DrawerOverNavigationModel();

// ROvers: opportunity (2004- 2009), spirit (2004 - 2010), curiosity (2012 - present)
export function onPageLoaded(args: EventData) {
    page = <Page>args.object;
    page.bindingContext = drawerViewModel;
}

export function onNavigatedTo(args: EventData) {
    page = <Page>args.object;

    datePicker = <DatePicker>page.getViewById("rovers-datepicker");
    listPicker = <ListPicker>page.getViewById("rovers-listpicker");
    pageContainer = <GridLayout>page.getViewById("pageContainer");

    var navgationContext = page.navigationContext;

    if (navgationContext) {
        selectedRover = navgationContext["rover"];
        year = navgationContext["year"];
        month = navgationContext["month"];
        day = navgationContext["day"];

        switch (selectedRover) {
            case "curiosity":
                roversViewModel = new RoversViewModel(selectedRover, year, month, day);          
                // ROvers: opportunity (2004- 2009), spirit (2004 - 2010), curiosity (2012 - present)
                datePicker.minDate = new Date(2012, (8 - 1), 6); // month on JS Date is minus one (January is 0)
                datePicker.maxDate = new Date(2016, (8 - 1), 6); // today minus two days
                roversViewModel.set("selectedIndex", 0);
                break;
            case "opportunity":
                roversViewModel = new RoversViewModel(selectedRover, year, month, day);
                datePicker.minDate = new Date(2004, (8 - 1), 6); // landing date
                datePicker.maxDate = new Date(2009, (8 - 1), 6); // last transmision day     
                roversViewModel.set("selectedIndex", 1);
                break;  
            case "spirit":
                roversViewModel = new RoversViewModel(selectedRover, year, month, day);
                datePicker.minDate = new Date(2004, (4 - 1), 22); // landing day January 04th
                datePicker.maxDate = new Date(2010, (8 - 1), 6); // last transmision day   
                roversViewModel.set("selectedIndex", 2);
                break;            
            default:
                break;
        }
        
        roversViewModel.initDataItems();
    }

    listPicker.on(Observable.propertyChangeEvent, function(args: PropertyChangeData) {
        
        // console.log(args.eventName.toString() + " " + args.propertyName.toString() + " " + args.value.toString());
        if (args.value == 0) {
            console.log("args.value = 0");
            roversViewModel.set("rover", "curiosity");

            datePicker.minDate = new Date(2012, (8 - 1), 6); // month on JS Date is minus one (January is 0)
            datePicker.maxDate = new Date(2016, (8 - 1), 6); // last day
        } else if (args.value == 1) {
            console.log("args.value = 1");
            roversViewModel.set("rover", "opportunity");

            datePicker.minDate = new Date(2004, (8 - 1), 6); // check date
            datePicker.maxDate = new Date(2009, (8 - 1), 6); // last day            
        } else if (args.value == 2) {
            console.log("args.value = 2");
            roversViewModel.set("rover", "spirit");

            datePicker.minDate = new Date(2004, (4 - 1), 22); // January 04th
            datePicker.maxDate = new Date(2010, (8 - 1), 6); //last day            
        }
    });

    //page.bindingContext = viewModel;
    pageContainer.bindingContext = roversViewModel;
}

export function onListLoaded(args: EventData) {
    list = <ListView>args.object;
}

export function onItemTap(args:ItemEventData) {
    var tappedItemIndex = args.index;
    var tappedItemView = args.view;

    console.log("tappedItemIndex: " + tappedItemIndex);

    var tappedItem = roversViewModel.get("dataItems").getItem(tappedItemIndex);
    console.log("tappedItem['imageUri']: " + tappedItem["imageUri"]);
    console.log("tappedItem['cameraName']: " + tappedItem["cameraName"]);

    topmost().navigate({
        moduleName: "views/rovers/photo-details-page",
        context: tappedItem,
        animated: true
    });
}

export function getPhotosForDate(args:EventData) {
    let button = <Button>args.object;
    
    roversViewModel.initDataItems();

    list.items = roversViewModel.dataItems;

    list.refresh();
}
import {FrescoDrawee, FinalEventData } from "nativescript-fresco";

export function onFinalImageSet(args: FinalEventData) {
    var drawee = args.object as FrescoDrawee;

    // use this to crete zoom-i and zoom-out on pinch
    // drawee.animate({
    //     scale: { x: 1.5, y: 1.5},    
    //     duration: 1000
    // });
}

import { EventData, Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import { Page } from "ui/page";
import { GridLayout } from "ui/layouts/grid-layout";
import * as application from "application";
import * as http from "http";
import * as frame from "ui/frame";

import { RoversViewModel, DataItem } from "../../models/rovers/rovers-view-model";
import { pickersViewModel } from "./rovers-selection";

import * as RadListwModule from "nativescript-telerik-ui/listview";
import {FrescoDrawee, FinalEventData } from "nativescript-fresco";

let page;
let list;
let pageContainer;

var selectedRover;
var year;
var month;
var day;

let roversViewModel;

export function onPageLoaded(args: EventData) {
    page = <Page>args.object;
}

export function onPageNavigatedTo(args: EventData) {
    page = <Page>args.object;

    pageContainer = <GridLayout>page.getViewById("pageContainer");

    var navgationContext = page.navigationContext;

    if (!roversViewModel || !(selectedRover === navgationContext["rover"] 
                                && year === navgationContext["year"] 
                                && month === navgationContext["month"] 
                                && day === navgationContext["day"])) {

        selectedRover = navgationContext["rover"];
        year = navgationContext["year"];
        month = navgationContext["month"];
        day = navgationContext["day"];
        selectedRover = navgationContext["rover"];

        switch (selectedRover) {
            case "curiosity":
                    roversViewModel = new RoversViewModel(selectedRover, year, month, day); 
                    pickersViewModel.set("day", day);
                    pickersViewModel.set("month", month);
                    pickersViewModel.set("year", year);
                    pickersViewModel.set("rover", selectedRover);         
                break;
            case "opportunity":
                    roversViewModel = new RoversViewModel(selectedRover, year, month, day);
                    pickersViewModel.set("dayOpp", day);
                    pickersViewModel.set("monthOpp", month);
                    pickersViewModel.set("yearOpp", year);
                    pickersViewModel.set("rover", selectedRover); 
                break;  
            case "spirit":
                    roversViewModel = new RoversViewModel(selectedRover, year, month, day);
                    pickersViewModel.set("daySpi", day);
                    pickersViewModel.set("monthSpi", month);
                    pickersViewModel.set("yearSpi", year);
                    pickersViewModel.set("rover", selectedRover); 
                break;            
            default:
                break;
        } 
        
        roversViewModel.initDataItems();
    }

    pageContainer.bindingContext = roversViewModel;
}

export function onListLoaded(args: RadListwModule.ListViewEventData) {
    list = <RadListwModule.RadListView>args.object;

    if (list.items) {
        list.scrollToIndex(roversViewModel.get("cachedIndex"));
    }
}

export function onItemTap(args:RadListwModule.ListViewEventData) {
    var tappedItemIndex = args.itemIndex;
    roversViewModel.set("cachedIndex", tappedItemIndex);

    var tappedItem = roversViewModel.get("dataItems").getItem(tappedItemIndex);

    var androidNavEntry = {
        moduleName: "views/rovers/photo-details-page",
        context: {"tappedItem": tappedItem },
        animated: true,
        transition: {
            name: "explode"
        }
    };

    var iosNavEntry = {
        moduleName: "views/rovers/photo-details-page",
        context: {"tappedItem": tappedItem },
        animated: true,
        transition: {
            name: "curl"
        }
    }

    if (application.android) {
        frame.topmost().navigate(androidNavEntry);
    } else if (application.ios) {
        frame.topmost().navigate(iosNavEntry);       
    }
}
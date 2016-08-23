import { EventData, Observable, PropertyChangeData } from "data/observable";
import { ObservableArray } from "data/observable-array";
import { Page } from "ui/page";
import { topmost } from "ui/frame";

import { StackLayout } from "ui/layouts/stack-layout";
import { Label } from "ui/label";
import { ListView } from "ui/list-view";
import { Button } from "ui/button";
import { DatePicker } from "ui/date-picker";
import { ListPicker } from "ui/list-picker";
import { Color } from "color";

import { ListViewModel, DataItem } from "../models/list-view-model";

import http = require("http");

import * as fresco from "nativescript-fresco";

let page;
let list;
let datePicker;
let listpicker;
// ROvers: opportunity (2004- 2009), spirit (2004 - 2010), curiosity (2012 - present)
let vm = new ListViewModel("curiosity", 2013, 9, 6);
// let vm = new ListViewModel("opportunity", 2005, 9, 6);
// let vmSpirit = new ListViewModel("spirit", 2005, 9, 6);

vm.initDataItems();

export function onLoaded(args: EventData) {
    page = <Page>args.object;

    datePicker = <DatePicker>page.getViewById("rovers-datepicker");
    listpicker = <ListPicker>page.getViewById("rovers-listpicker");

    // Curiocity rover has landed on Mars on 06 August 2012 (+ first photos taken on that date)
    // ROvers: opportunity (2004- 2009), spirit (2004 - 2010), curiosity (2012 - present)
    datePicker.minDate = new Date(2012, (8 - 1), 6); // month on JS Date is minus one (January is 0)
    datePicker.maxDate = new Date(2016, (8 - 1), 6); // today  

    listpicker.on(Observable.propertyChangeEvent, function(args: PropertyChangeData) {
        
        console.log("HERE");
        console.log(args.eventName.toString() + " " + args.propertyName.toString() + " " + args.value.toString());
        if (args.value == 0) {
            console.log("args.value = 0");
            vm.set("rover", "curiosity");

            datePicker.minDate = new Date(2012, (8 - 1), 6); // month on JS Date is minus one (January is 0)
            datePicker.maxDate = new Date(2016, (8 - 1), 6); // last day
        } else if (args.value == 1) {
            console.log("args.value = 1");
            vm.set("rover", "opportunity");

            datePicker.minDate = new Date(2004, (8 - 1), 6); // check date
            datePicker.maxDate = new Date(2009, (8 - 1), 6); // last day            
        } else if (args.value == 2) {
            console.log("args.value = 2");
            vm.set("rover", "spirit");

            datePicker.minDate = new Date(2004, (4 - 1), 22); // January 04th
            datePicker.maxDate = new Date(2010, (8 - 1), 6); //last day            
        }
    });


    page.bindingContext = vm;
}

export function onListLoaded(args: EventData) {
    list = <ListView>args.object;
}

export function getPhotosForDate(args:EventData) {
    let button = <Button>args.object;
    
    vm.initDataItems();

    list.items = vm.dataItems;
    console.log("cm.dataitems: " + vm.get("dataItems").length);
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

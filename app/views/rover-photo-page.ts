import { EventData } from "data/observable";
import { ObservableArray } from "data/observable-array";
import { Page } from "ui/page";
import { topmost } from "ui/frame";

import { StackLayout } from "ui/layouts/stack-layout";
import { Label } from "ui/label";
import { ListView } from "ui/list-view";
import { Button } from "ui/button";
import { DatePicker } from "ui/date-picker";
import { Color } from "color";

import { ListViewModel, DataItem } from "../models/list-view-model";

import http = require("http");

import * as fresco from "nativescript-fresco";

let page;
let list;
let datePicker;

let vm = new ListViewModel("curiosity", 2013, 9, 6);
vm.initDataItems();

export function onLoaded(args: EventData) {
    page = <Page>args.object;

    datePicker = <DatePicker>page.getViewById("date-picker");

    // Curiocity rover has landed on Mars on 06 August 2012 (+ first photos taken on that date)
    datePicker.minDate = new Date(2012, (8 - 1), 6); // month on JS Date is minus one (January is 0)
    datePicker.maxDate = new Date(); // today  

    page.bindingContext = vm;
}

export function onListLoaded(args: EventData) {
    list = <ListView>args.object;
}

export function getPhotosForDate(args:EventData) {
    let button = <Button>args.object;
    
    vm.initDataItems();

    list.items = vm.dataItems;

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

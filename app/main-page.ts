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

import { ListViewModel } from "./models/list-view-model";

import http = require("http");

import * as fresco from "nativescript-fresco";

let page;
let list;
let datePicker;

let vm = new ListViewModel();
// vm.set("year", 2014);
// vm.set("month", 5);
// vm.set("day", 20);

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
    console.log(list);
    // list.bindingContext = vm;
}

export function getDate(args:EventData) {
    let button = <Button>args.object;
   
    console.log("DATE PICKER");
    console.log(datePicker.year);
    console.log(datePicker.month);
    console.log(datePicker.day);

    console.log("VIEW MODEL");
    console.log(vm.get("year"));
    console.log(vm.get("month"));
    console.log(vm.get("day"));

    vm.initDataItems();

    // list.refresh();
}
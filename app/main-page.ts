import { EventData } from "data/observable";
import { ObservableArray } from "data/observable-array";
import { Page } from "ui/page";
import { topmost } from "ui/frame";

import { StackLayout } from "ui/layouts/stack-layout";
import { Label } from "ui/label";
import { ListView } from "ui/list-view";
import { Button } from "ui/button";
import { Color } from "color";

import { ListViewModel } from "./models/list-view-model";

import http = require("http");

import * as fresco from "nativescript-fresco";

let page;
let list;

let vm = new ListViewModel();

export function onLoaded(args: EventData) {
    page = <Page>args.object;
}

export function onListLoaded(args: EventData) {
    list = <ListView>args.object;
    console.log(list);
    list.bindingContext = vm;
}
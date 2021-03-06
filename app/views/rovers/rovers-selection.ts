// tslint:disable:max-line-length
import { EventData, Observable, PropertyChangeData } from "data/observable";
import { topmost } from "ui/frame";
import { Page } from "ui/page";
import { DatePicker } from "ui/date-picker";
import { SegmentedBar } from "ui/segmented-bar";
import { TabView, SelectedIndexChangedEventData } from "ui/tab-view";

import drawerModule = require("nativescript-telerik-ui/sidedrawer");

import { PickersViewModel } from "../../view-models/rovers/pickers-view-model";

import * as app from "application";

export let pickersViewModel = new PickersViewModel();
let page;
let dtCur;
let dtOpp;
let dtSpi;

export function onPageLoaded(args: EventData) {
    page = <Page>args.object;
}

export function onPageNavigatedTo(args: EventData) {
    page = <Page>args.object;

    dtCur = <DatePicker>page.getViewById("dt-cur");
    dtOpp = <DatePicker>page.getViewById("dt-opp");
    dtSpi = <DatePicker>page.getViewById("dt-spi");

    initDatePickers();
    initSegmentedBars();
    initTabs();

    page.bindingContext = pickersViewModel;
}

export function onTabLoaded(args) {
    var tabView = args.object;
    if (app.android) {
        for (var i = 0; i < tabView.items.length; i++) {
            tabView._tabLayout.getTextViewForItemAt(i).setHorizontallyScrolling(true);
        }
    }
}

function initTabs() {
    pickersViewModel.addEventListener(Observable.propertyChangeEvent, function (args: PropertyChangeData) {
        if (args.propertyName.toString() === "tabIndex") {
            initDatePickers();
        }
    });
}

function initDatePickers() {
    var today = new Date();

    dtCur.minDate = new Date(2012, 6 + 1, 6); // Landing date: 6th August 2012
    dtCur.maxDate = today; // still active

    dtOpp.minDate = new Date(2004, 0, 26); // Landing date: 25th January 2004 - first pics on 26th
    dtOpp.maxDate = today; // still active 

    dtSpi.minDate = new Date(2004, 0, 5); // Landing date: 4th January 2004 - first pics on 5th
    dtSpi.maxDate = new Date(2010, 1 + 1, 21); // last communication March

    if (!pickersViewModel.get("rover")) {
        dtCur.day = today.getDate() - 2;
        dtCur.month = today.getMonth() + 1;
        dtCur.year = today.getFullYear();

        dtOpp.day = today.getDate() - 2;
        dtOpp.month = today.getMonth() + 1;
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
}

function initSegmentedBars() {
    pickersViewModel.set("selectedIndexCur", 1);
    pickersViewModel.set("selectedIndexOpp", 1);
    pickersViewModel.set("selectedIndexSpi", 1);

    pickersViewModel.set("isCurInfoVisible", false);
    pickersViewModel.set("isOppInfoVisible", false);
    pickersViewModel.set("isSpiInfoVisible", false);

    pickersViewModel.set("curiosityDescription", "Curiosity is a car-sized robotic rover exploring Gale Crater on Mars as part of NASA's Mars Science Laboratory mission (MSL)");
    pickersViewModel.set("opporunityDescription", "Curiosity is a car-sized robotic rover exploring Gale Crater on Mars as part of NASA's Mars Science Laboratory mission (MSL)");
    pickersViewModel.set("spiritDescription", "Curiosity is a car-sized robotic rover exploring Gale Crater on Mars as part of NASA's Mars Science Laboratory mission (MSL)");

    pickersViewModel.addEventListener(Observable.propertyChangeEvent, function (args: PropertyChangeData) {
        if (args.propertyName.toString() === "selectedIndexCur") {
            switch (args.value) {
                case 0:
                    pickersViewModel.set("isCurInfoVisible", true);
                    break;
                case 1:
                    pickersViewModel.set("isCurInfoVisible", false);
                    break;
                default:
                    break;
            }
        }
    });

    pickersViewModel.addEventListener(Observable.propertyChangeEvent, function (args: PropertyChangeData) {
        if (args.propertyName.toString() === "selectedIndexOpp") {
            switch (args.value) {
                case 0:
                    pickersViewModel.set("isOppInfoVisible", true);
                    break;
                case 1:
                    pickersViewModel.set("isOppInfoVisible", false);
                    break;
                default:
                    break;
            }
        }
    });

    pickersViewModel.addEventListener(Observable.propertyChangeEvent, function (args: PropertyChangeData) {
        if (args.propertyName.toString() === "selectedIndexSpi") {
            switch (args.value) {
                case 0:
                    pickersViewModel.set("isSpiInfoVisible", true);
                    break;
                case 1:
                    pickersViewModel.set("isSpiInfoVisible", false);
                    break;
                default:
                    break;
            }
        }
    });
}

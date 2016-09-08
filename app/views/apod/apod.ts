import { DrawerOverNavigationModel } from "../../models/drawer-over-navigation-model";
import { topmost } from "ui/frame";
import { ListView } from "ui/list-view";
import { Page } from "ui/page";
import { GridLayout } from "ui/layouts/grid-layout";

import { EventData } from "data/observable";

import { ApodViewModel, ApodItem } from "../../models/apod/apod-model";

let drawerViewModel = new DrawerOverNavigationModel();

export function onPageLoaded(args: EventData) {
    var page = <Page>args.object;

    page.bindingContext = drawerViewModel;
}

export function onPageNavigatedTo(args: EventData) {
    let page = <Page>args.object;
    var pageContainer = <GridLayout>page.getViewById("pageContainer");

    let apodViewModel = new ApodViewModel();
    apodViewModel.initDataItems();

    pageContainer.bindingContext = apodViewModel;
}

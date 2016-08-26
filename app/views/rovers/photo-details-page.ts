import { DrawerOverNavigationModel } from "../../models/drawer-over-navigation-model";
import { EventData } from "data/observable";
import { Page } from "ui/page";
import { topmost } from "ui/frame";

export function onPageLoaded(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;

    console.log(page.navigationContext);
    var contextItem = page.navigationContext;
    let viewModel = new DrawerOverNavigationModel();
    viewModel.set("contextItem", contextItem);
    page.bindingContext = viewModel;
}

export function goBack(args: EventData) {
    topmost().goBack();
}
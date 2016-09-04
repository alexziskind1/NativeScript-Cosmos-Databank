import { DrawerOverNavigationModel } from "../../models/drawer-over-navigation-model";
import { EventData } from "data/observable";
import { Page } from "ui/page";
import { topmost } from "ui/frame";

export function onPageLoaded(args: EventData) {
    var page = <Page>args.object;

    var navContext = page.navigationContext;
    let viewModel = new DrawerOverNavigationModel();
    viewModel.set("contextItem", navContext["tappedItem"]);

    page.bindingContext = viewModel;
}

export function goBack(args: EventData) {
    topmost().goBack();
}
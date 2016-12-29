import { DrawerOverNavigationModel } from "../../view-models/drawer-over-navigation-model";
import { EventData } from "data/observable";
import { Page } from "ui/page";
import { topmost } from "ui/frame";
import { openUrl } from "utils/utils";
let viewModel;

export function onPageLoaded(args: EventData) {
    var page = <Page>args.object;

    var navigationContext = page.navigationContext;
    viewModel = new DrawerOverNavigationModel();
    viewModel.set("contextItem", navigationContext["tappedItem"]);

    page.bindingContext = viewModel;
}

export function goBack(args: EventData) {
    topmost().goBack();
}

export function onLinkTap() {
    openUrl(viewModel.get("contextItem").nasa_jpl_url);
}

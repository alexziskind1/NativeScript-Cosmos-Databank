import { DrawerOverNavigationModel } from "../../models/drawer-over-navigation-model";
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

    // var dataItems = [];
    // for (var key in navigationContext["tappedItem"]) {
    //     if (navigationContext["tappedItem"].hasOwnProperty(key)) {
    //         var element = navigationContext["tappedItem"][key];
    //         dataItems.push({ key: key, value: element});
    //     }
    // }

    // viewModel.set("dataItems", dataItems);

    page.bindingContext = viewModel;
}

export function goBack(args: EventData) {
    topmost().goBack();
}

export function onLinkTap() {
    console.log("onLinkTap");
    openUrl(viewModel.get("contextItem").nasa_jpl_url);
}
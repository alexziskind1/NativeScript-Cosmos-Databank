import { topmost } from "ui/frame";
import * as application from "application";
import { AsteroidViewModel } from "../../models/asteroid/asteroid-view-model";

import { ListViewEventData } from "nativescript-telerik-ui/listview";

var vm = new AsteroidViewModel();
vm.initDataItems();

export function onPageLoaded(args) {
    var page = args.object;
    page.bindingContext = vm;
}

export function onItemTap(args: ListViewEventData) {

    var tappedItemIndex = args.itemIndex;
    var tappedItemView = args.object;
    var tappedAsteroid = vm.get("dataItems").getItem(tappedItemIndex);

    topmost().navigate({
        moduleName: "views/asteroid/asteroid-details-page",
        context: { "tappedItem": tappedAsteroid },
        animated: true,
        transition: {
            name: application.android ? "explode" : "curl"
        }
    });
}
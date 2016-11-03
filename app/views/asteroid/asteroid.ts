import { topmost } from "ui/frame";
import * as application from "application";
import { AsteroidViewModel } from "../../models/asteroid/asteroid-view-model";

import { ItemEventData } from "nativescript-telerik-ui/listvuew";

var vm = new AsteroidViewModel();
vm.initDataItems();

export function onPageLoaded(args) {
    var page = args.object;
    page.bindingContext = vm;
}

export function onItemTap(args: ItemEventData) {

    console.log("HERE");
    var tappedItemIndex = args.index;
    var tappedItemView = args.view;
    console.log("tappedItemIndex: " + tappedItemIndex);
    var tappedAsteroid = vm.get("dataItems").getItem(tappedItemIndex);
    console.log("tappedAsteroid: " + tappedAsteroid);

    topmost().navigate({
        moduleName: "views/asteroid/asteroid-details-page",
        context: {"tappedItem": tappedAsteroid },
        animated: true,
        transition: {
            name: application.android ? "explode" : "curl"
        }
    });
}
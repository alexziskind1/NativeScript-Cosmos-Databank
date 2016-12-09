"use strict";
var frame_1 = require("ui/frame");
var application = require("application");
var asteroid_view_model_1 = require("../../models/asteroid/asteroid-view-model");
var vm = new asteroid_view_model_1.AsteroidViewModel();
vm.initDataItems();
function onPageLoaded(args) {
    var page = args.object;
    page.bindingContext = vm;
}
exports.onPageLoaded = onPageLoaded;
function onItemTap(args) {
    var tappedItemIndex = args.itemIndex;
    var tappedItemView = args.object;
    var tappedAsteroid = vm.get("dataItems").getItem(tappedItemIndex);
    frame_1.topmost().navigate({
        moduleName: "views/asteroid/asteroid-details-page",
        context: { "tappedItem": tappedAsteroid },
        animated: true,
        transition: {
            name: application.android ? "explode" : "curl"
        }
    });
}
exports.onItemTap = onItemTap;
//# sourceMappingURL=asteroid.js.map
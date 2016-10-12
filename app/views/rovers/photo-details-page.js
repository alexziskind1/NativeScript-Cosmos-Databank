"use strict";
var drawer_over_navigation_model_1 = require("../../models/drawer-over-navigation-model");
var frame_1 = require("ui/frame");
var imageSource = require("image-source");
var application = require("application");
var SocialShare = require("nativescript-social-share");
var viewModel;
var shareButtonAndroid;
function onPageLoaded(args) {
    var page = args.object;
    if (application.android) {
        shareButtonAndroid = page.getViewById("btn-share");
    }
    var navContext = page.navigationContext;
    viewModel = new drawer_over_navigation_model_1.DrawerOverNavigationModel();
    viewModel.set("contextItem", navContext["tappedItem"]);
    viewModel.set("isItemVisible", false);
    page.bindingContext = viewModel;
}
exports.onPageLoaded = onPageLoaded;
function goBack(args) {
    frame_1.topmost().goBack();
}
exports.goBack = goBack;
function onFinalImageSet(args) {
    var drawee = args.object;
    imageSource.fromUrl(drawee.imageUri)
        .then(function (res) {
        viewModel.set("isItemVisible", true);
        shareButtonAndroid.on("tap", function (args) {
            console.log("Android share tapped!");
            SocialShare.shareImage(res, "Mars Rovers - Cosmos DataBank mobile App");
        });
    }).catch(function (err) {
        // console.log(err.stack); 
    });
}
exports.onFinalImageSet = onFinalImageSet;
//# sourceMappingURL=photo-details-page.js.map
"use strict";
var drawer_over_navigation_model_1 = require("../../view-models/drawer-over-navigation-model");
var frame_1 = require("ui/frame");
var utils_1 = require("utils/utils");
var viewModel;
function onPageLoaded(args) {
    var page = args.object;
    var navigationContext = page.navigationContext;
    viewModel = new drawer_over_navigation_model_1.DrawerOverNavigationModel();
    viewModel.set("contextItem", navigationContext["tappedItem"]);
    page.bindingContext = viewModel;
}
exports.onPageLoaded = onPageLoaded;
function goBack(args) {
    frame_1.topmost().goBack();
}
exports.goBack = goBack;
function onLinkTap() {
    utils_1.openUrl(viewModel.get("contextItem").nasa_jpl_url);
}
exports.onLinkTap = onLinkTap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN0ZXJvaWQtZGV0YWlscy1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXN0ZXJvaWQtZGV0YWlscy1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrRkFBMkY7QUFHM0Ysa0NBQW1DO0FBQ25DLHFDQUFzQztBQUN0QyxJQUFJLFNBQVMsQ0FBQztBQUVkLHNCQUE2QixJQUFlO0lBQ3hDLElBQUksSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7SUFFN0IsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDL0MsU0FBUyxHQUFHLElBQUksd0RBQXlCLEVBQUUsQ0FBQztJQUM1QyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBRTlELElBQUksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO0FBQ3BDLENBQUM7QUFSRCxvQ0FRQztBQUVELGdCQUF1QixJQUFlO0lBQ2xDLGVBQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3ZCLENBQUM7QUFGRCx3QkFFQztBQUVEO0lBQ0ksZUFBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDdkQsQ0FBQztBQUZELDhCQUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRHJhd2VyT3Zlck5hdmlnYXRpb25Nb2RlbCB9IGZyb20gXCIuLi8uLi92aWV3LW1vZGVscy9kcmF3ZXItb3Zlci1uYXZpZ2F0aW9uLW1vZGVsXCI7XHJcbmltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gXCJkYXRhL29ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IHRvcG1vc3QgfSBmcm9tIFwidWkvZnJhbWVcIjtcclxuaW1wb3J0IHsgb3BlblVybCB9IGZyb20gXCJ1dGlscy91dGlsc1wiO1xyXG5sZXQgdmlld01vZGVsO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uUGFnZUxvYWRlZChhcmdzOiBFdmVudERhdGEpIHtcclxuICAgIHZhciBwYWdlID0gPFBhZ2U+YXJncy5vYmplY3Q7XHJcblxyXG4gICAgdmFyIG5hdmlnYXRpb25Db250ZXh0ID0gcGFnZS5uYXZpZ2F0aW9uQ29udGV4dDtcclxuICAgIHZpZXdNb2RlbCA9IG5ldyBEcmF3ZXJPdmVyTmF2aWdhdGlvbk1vZGVsKCk7XHJcbiAgICB2aWV3TW9kZWwuc2V0KFwiY29udGV4dEl0ZW1cIiwgbmF2aWdhdGlvbkNvbnRleHRbXCJ0YXBwZWRJdGVtXCJdKTtcclxuXHJcbiAgICBwYWdlLmJpbmRpbmdDb250ZXh0ID0gdmlld01vZGVsO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ29CYWNrKGFyZ3M6IEV2ZW50RGF0YSkge1xyXG4gICAgdG9wbW9zdCgpLmdvQmFjaygpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gb25MaW5rVGFwKCkge1xyXG4gICAgb3BlblVybCh2aWV3TW9kZWwuZ2V0KFwiY29udGV4dEl0ZW1cIikubmFzYV9qcGxfdXJsKTtcclxufVxyXG4iXX0=
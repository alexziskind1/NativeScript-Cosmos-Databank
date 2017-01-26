if ((<any>global).TNS_WEBPACK) {
    //registers tns-core-modules UI framework modules
    require("bundle-entry-points");

    //register application modules
    global.registerModule("nativescript-cardview", () => require("nativescript-cardview"));
    global.registerModule("views/login/login", () => require("./views/login/login"));
}
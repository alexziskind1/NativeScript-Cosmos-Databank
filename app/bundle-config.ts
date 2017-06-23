if ((<any>global).TNS_WEBPACK) {
    //registers tns-core-modules UI framework modules
    require("bundle-entry-points");
    global.registerModule("ui/layouts/flexbox-layout", function () { return require("ui/layouts/flexbox-layout"); });
    console.log("REGISTERED FLEXBOXLAYOUT");

    //register application modules
    global.registerModule("nativescript-cardview", () => require("nativescript-cardview"));
    global.registerModule("nativescript-fresco", () => require("nativescript-fresco"));
    global.registerModule("nativescript-toast", () => require("nativescript-toast"));
    
    global.registerModule("nativescript-telerik-ui/listview", () => require("../node_modules/nativescript-telerik-ui/listview"));

    global.registerModule("views/rovers/widgets/spirit", () => require("./views/rovers/widgets/spirit"));
    global.registerModule("views/rovers/widgets/curiosity", () => require("./views/rovers/widgets/curiosity"));
    global.registerModule("views/rovers/widgets/opportunity", () => require("./views/rovers/widgets/opportunity"));

    global.registerModule("views/login/login", () => require("./views/login/login"));
    global.registerModule("files/credentials", () => require("./files/credentials"));
    global.registerModule("models/login/user", () => require("./models/login/user"));
    global.registerModule("view-models/apod/apod-model", () => require("./view-models/apod/apod-model"));
    global.registerModule("view-models/asteroid/asteroid-view-model", () => require("./view-models/asteroid/asteroid-view-model"));
    global.registerModule("view-models/drawer-over-navigation-model", () => require("./view-models/drawer-over-navigation-model"));
    global.registerModule("view-models/epic/epic-model", () => require("./view-models/epic/epic-model"));
    global.registerModule("view-models/login/login-view-model", () => require("./view-models/login/login-view-model"));
    global.registerModule("view-models/rovers/pickers-view-model", () => require("./view-models/rovers/pickers-view-model"));
    global.registerModule("view-models/rovers/rovers-view-model", () => require("./view-models/rovers/rovers-view-model"));
    global.registerModule("views/about/about", () => require("./views/about/about"));
    global.registerModule("views/apod/apod", () => require("./views/apod/apod"));
    global.registerModule("views/asteroid/asteroid-details-page", () => require("./views/asteroid/asteroid-details-page"));
    global.registerModule("views/asteroid/asteroid", () => require("./views/asteroid/asteroid"));
    global.registerModule("views/drawer-page", () => require("./views/drawer-page"));
    global.registerModule("views/epic/epic", () => require("./views/epic/epic"));
    global.registerModule("views/helpers/files/file-helpers", () => require("./views/helpers/files/file-helpers"));
    global.registerModule("views/helpers/firebase/firebase", () => require("./views/helpers/firebase/firebase"));
    global.registerModule("views/helpers/formaters", () => require("./views/helpers/formaters"));
    global.registerModule("views/helpers/youtube/youtube-helpers", () => require("./views/helpers/youtube/youtube-helpers"));
    global.registerModule("views/login/login", () => require("./views/login/login"));
    global.registerModule("views/rovers/photo-details-page", () => require("./views/rovers/photo-details-page"));
    global.registerModule("views/rovers/rover-photo-page", () => require("./views/rovers/rover-photo-page"));
    global.registerModule("views/rovers/rovers-selection", () => require("./views/rovers/rovers-selection"));
}

import { CardView } from "nativescript-cardview";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import { EventData } from "data/observable";
import * as app from "application";
import * as appSettings from "application-settings";
import * as dialogs from "ui/dialogs";
import * as enums from "ui/enums";
import * as frame from "ui/frame";
import * as firebase from "nativescript-plugin-firebase";

import { User } from "../../models/login/user";
import { AuthViewModel } from "../../view-models/login/login-view-model";

let authViewModel = new AuthViewModel();

let currentUser: User;
let page: Page;
let card: CardView;
let tfEmail: TextField;
let tfPass: TextField;

export function onLoaded(args: EventData) {
    page = <Page>args.object;
    page.bindingContext = authViewModel;

    if (appSettings.getBoolean("isLogged")) {
        frame.topmost().navigate({
            moduleName: "./views/drawer-page",
            context: { currentUser: authViewModel.get("currentUser") }
        });
    } else {
        /* intial HIDING of the keyboard for android */
        if (app.android) {
            tfEmail = <TextField>page.getViewById("tf-email");
            tfPass = <TextField>page.getViewById("tf-pass");
            // tfEmail.android.setFocusable(false);
            // tfPass.android.setFocusable(false);

            // setTimeout(function () {
            //     tfEmail.android.setFocusableInTouchMode(true);
            //     tfPass.android.setFocusableInTouchMode(true);
            // }, 300);
        }
    }
}

export function onCardLoaded(args) {
    card = <CardView>args.object;
    card.translateY = -300;
    card.animate({
        translate: { x: 0, y: 100 },
        duration: 1200,
        curve: enums.AnimationCurve.spring
    });
}

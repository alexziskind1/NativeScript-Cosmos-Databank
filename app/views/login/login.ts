import { CardView } from "nativescript-cardview";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import { EventData } from "data/observable";
import * as frame from "ui/frame";
import * as firebase from "nativescript-plugin-firebase";
import * as app from "application";
import * as appSettings from "application-settings";
import * as dialogs from "ui/dialogs";
import * as enums from "ui/enums";

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
            tfEmail.android.setFocusable(false);
            tfPass.android.setFocusable(false);

            setTimeout(function () {
                tfEmail.android.setFocusableInTouchMode(true);
                tfPass.android.setFocusableInTouchMode(true);
            }, 300);
        }

        card = <CardView>page.getViewById("form-card");
        card.translateY = -300;
        card.animate({
            translate: { x: 0, y: 0 },
            duration: 2000,
            curve: enums.AnimationCurve.spring
        });
    }

    page.bindingContext = authViewModel;
}

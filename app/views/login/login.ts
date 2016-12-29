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

let currentUser: User;
let page: Page;
let card: CardView;
let tfEmail: TextField;
let tfPass: TextField;

export function onLoaded(args: EventData) {
    page = <Page>args.object;

    // TODO: uncomment later 
    // if (appSettings.getBoolean("isLogged")) {
    //     frame.topmost().navigate("./views/drawer-page");
    // }

    /* intial HIDING of the keyboard for android */
    if (app.android) {
        tfEmail = <TextField>page.getViewById("tf-email");
        tfEmail.android.setFocusable(false);
        tfPass = <TextField>page.getViewById("tf-pass");
        tfPass.android.setFocusable(false);

        setTimeout(function () {
            tfEmail.android.setFocusableInTouchMode(true);
            tfPass.android.setFocusableInTouchMode(true);
        }, 300);
    }

    card = <CardView>page.getViewById("form-card");
    card.translateY = -300;
    card.animate({
        translate: { x: 0, y: 0},    
        duration: 2000,
        curve: enums.AnimationCurve.spring
    });
}

export function onLogin() {
    firebase.login({
        type: firebase.LoginType.PASSWORD,
        email: this.email,
        password: this.pass
    }).then(user => {
        console.log(JSON.stringify(user));
        currentUser = new User(user.anonymous, user.email, user.emailVerified, user.name, user.profileImageURL, user.refreshToken, user.uid);
        frame.topmost().navigate({ 
          moduleName: "views/drawer-page", 
          context: { currentUser: currentUser },
          // clearHistory: true // TODO: uncomment later 
        });
    }).catch(err => {
        dialogs.alert(err);
    })
}

export function onFacebookLogin() {
    firebase.login({
        type: firebase.LoginType.FACEBOOK,
        scope: ['public_profile', 'email'] // optional: defaults to ['public_profile', 'email']
    }).then(user => {
        console.log(JSON.stringify(user));
        currentUser = new User(user.anonymous, user.email, user.emailVerified, user.name, user.profileImageURL, user.refreshToken, user.uid);
        frame.topmost().navigate({ 
          moduleName: "views/drawer-page", 
          context: { currentUser: currentUser },
          // clearHistory: true // TODO: uncomment later
        });
    }).catch(err => {
        dialogs.alert(err);
    })
}

export function onLogout() {
    firebase.logout();
}

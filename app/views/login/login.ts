import { Page } from "ui/page";
import { EventData } from "data/observable";
import * as frame from "ui/frame";
import * as firebase from "nativescript-plugin-firebase";
import * as appSettings from "application-settings";
import * as dialogs from "ui/dialogs";

let currentUser: User;

export function onLoaded(args: EventData) {
    let page = <Page>args.object;

    // TODO: uncomment later 
    // if (appSettings.getBoolean("isLogged")) {
    //     frame.topmost().navigate("./views/drawer-page");
    // }
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

export class User {
    public anonymous: boolean;
    public email: string;
    public emailVerified: boolean;
    public name: string;
    public profileImageURL: string;
    public refreshToken: string;
    public uid: string;

    constructor(anonymous: boolean,
        email: string,
        emailVerified: boolean,
        name: string,
        profileImageURL: string,
        refreshToken: string,
        uid: string) {
        this.anonymous = anonymous;
        this.email = email;
        this.emailVerified = emailVerified;
        this.name = name;
        this.profileImageURL = profileImageURL;
        this.refreshToken = refreshToken;
        this.uid = uid;
    }
}
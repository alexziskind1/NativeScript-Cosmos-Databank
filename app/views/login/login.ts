import { Page } from "ui/page";
import { EventData } from "data/observable";
import * as frame from "ui/frame";
import * as firebase from "nativescript-plugin-firebase";

export function onLoaded(args: EventData) {
    let page = <Page>args.object;
}

export function onLogin() {
  firebase.login({
    type: firebase.LoginType.FACEBOOK,
    scope: ['public_profile', 'email'] // optional: defaults to ['public_profile', 'email']
  }).then(
      function (result) {
        console.log(JSON.stringify(result));

        frame.topmost().navigate("./views/drawer-page");
      },
      function (errorMessage) {
        console.log(errorMessage);
      }
  );
}

export function onLogout() {
    firebase.logout();
}
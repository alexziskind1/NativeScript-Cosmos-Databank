import * as firebase from "nativescript-plugin-firebase";

export function firebasePush(itemToPush: any, action: string) {
    var currentUid = "temp";
    firebase.getCurrentUser().then(user => {
        currentUid = user.uid;
    }).then(() => {
        firebase.push(
            currentUid,
            {
                "dataItem": itemToPush,
                "updateTs": firebase["ServerValue"].TIMESTAMP,
                "action": action
            }
        ).then(result => {
            console.log("created key: " + result.key);
        }).catch(err => {
            console.log(err);
        })
    })
}
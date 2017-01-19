import * as firebase from "nativescript-plugin-firebase";

export function firebasePush(itemToPush) {
    var currentUid = "temp";
    firebase.getCurrentUser().then(user => {
        currentUid = user.uid;
    }).then(() => {
        firebase.push(
            currentUid,
            {
                "dataItem": itemToPush,
                "updateTs": firebase["ServerValue"].TIMESTAMP
            }
        ).then(result => {
            console.log("created key: " + result.key);
        }).catch(err => {
            console.log(err);
        })
    })
}
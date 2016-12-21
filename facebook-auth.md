
# Facebook Authentication via Firebase

Steps to implement facebook auth via firebase in NativeScrip app.

## Facebook console part
1. log in https://developers.facebook.com/apps/
2. go to Settings >> Basic and add Android platform
3. check **AppId** and **AppSecret** (will be needed in firebase console later)
4. for **Google Play Package Name** add applicationId from your package.json (e.g. `org.nativescript.myApp`)
5. for **Class Name** add `com.tns.NativeScriptActivity`
6. the final step is to add your **Key Hashes** (if you do not know them now, do not worry - we will add them at our final step!)

## Firebase console part
1. log in https://console.firebase.google.com
2. go to Authentication
3. enable Facebook Authentication
4. add AppID and AppSecret from the Facebook console
5. save all

## Project Steps
1. if you have previously included Firebase plugin delete the platforms folder (do not save your google-services.json as you will need newly generated one)
2. if you do not have the plugin install it with `tns plugin add nativescript-plugin-firebase`
3. open your `firebase.nativescript.json` and make sure that `"facebook_auth": true`
4. `tns platform add android`
5. generate your google-services.json from https://console.firebase.google.com  (make new one with the facebook enabled!!!)
6. paste google-services.json in `platforms/Android/`
7. go to `app/App_Resources/Android/AndroidManifest.xml` and add `<meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>` 
Add it as a child of application on the activity level.

8. go to `app/App_Resources/Android/values` folder and create file called `facebooklogin.xml` with content
```
    <?xml version='1.0' encoding='utf-8'?>
    <resources>
        <string name="facebook_app_id">1112223334445556</string>
    </resources>
```

9. initialize firebase if not already done: 
```
    firebase.init({
        onAuthStateChanged: function (data) { // optional but useful to immediately re-logon the user when he re-visits your app
            console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
            if (data.loggedIn) {
                console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
            }
        },

    }).then(instance => {
        console.log("firebase.init done");
    }).catch(err => {
        console.log("Firebase init error: " + err);
    });
```

10. finally implement the login for Facebook
```
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
```

11. Remember those **Key Hashes** we need to set in Facebook console!? Well after your first attempt to login in,
open `adb logcat` and look for something like Key hash <......> does not match any stored key hashes.
Copy the hash key and paste it to the faceboook developer console. Voila!
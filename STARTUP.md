- `npm install`
- `cd node_modules/nativescript-plugin-firebase`
- `npm run setup`
(the above will manually configure the latest version of nativescript-plugin-firebase due to some CLI issues with post-install hooks)

- `tns platform add android`

- in the root project go to `files` folder and copy `google-services.json` and paste it in `platforms/android`

- use `my-release-key.jks` to build in release 
- with webpack building in release ( for `key-store-path` change the path with your local path where `my-release-key.jks` is located)

npm run build-android-bundle -- --release --for-device --key-store-path D:\my-release-key.jks --key-store-password 123456 --key-store-alias NickIliev --key-store-alias-password 123456

Buildtime errors
================

D:\git-NickIliev\NativeScript-Cosmos-Databank>tns build android
Executing before-prepare hook from D:\git-NickIliev\NativeScript-Cosmos-Databank\hooks\before-prepare\nativescript-dev-typescript.js
Found peer TypeScript 2.1.6
app/views/apod/apod.ts(181,32): error TS2304: Cannot find name 'android'.

app/views/epic/epic.ts(105,32): error TS2304: Cannot find name 'android'.

app/views/epic/epic.ts(199,36): error TS2304: Cannot find name 'android'.
app/views/epic/epic.ts(199,93): error TS2304: Cannot find name 'android'.
app/views/epic/epic.ts(213,42): error TS2345: Argument of type 'string' is not assignable to parameter of type '"png" | "jpeg" | "jpg"'.
app/views/helpers/files/file-helpers.ts(39,36): error TS2304: Cannot find name 'android'.
app/views/helpers/files/file-helpers.ts(40,13): error TS2304: Cannot find name 'android'.
app/views/helpers/files/file-helpers.ts(53,42): error TS2345: Argument of type 'string' is not assignable to parameter of type '"png" | "jpeg" | "jpg"'.

app/views/rovers/photo-details-page.ts(107,32): error TS2304: Cannot find name 'android'.
node_modules/nativescript-telerik-ui/listview/index.d.ts(292,57): error TS2339: Property 'Bindable' does not exist on type 'typeof "ui/core/bindable"'.

TypeScript compiler failed with exit code 1
Sending exception report (press Ctrl+C to stop).....

- install tns-platform-declarations manuallymto resolve TS2304: Cannot find name 'android'.
- change to string instead of using enums to resolve TS2345: Argument of type 'string' is not assignable to parameter of type '"png" | "jpeg" | "jpg"'.
- temp modify index.d.ts(292,57) to resolve TS2339: Property 'Bindable' does not exist on type 'typeof "ui/core/bindable"'.


*Bulding app succsessfully*


Runtime errors
==============

app.ts
------
- problems in app.ts
resolved with commenting both plugins
```
// import * as fresco from "nativescript-fresco";
// import * as firebase from "nativescript-plugin-firebase";
```

login page
----------

- theme-core styles ; when setting class="h3 action-bar-title" Error: Invalid color: inherit 
- unable to load plugin namespace for CardView: 'nativescript-cardview not found for element nativescript-cardview:CardView'


drawer page
-----------

- theme-core styles ;  when setting class="h3 action-bar-title" Error: Invalid color: inherit 
- unable to load plugin namespace for SideDrawer: 'nativescript-telerik-ui/sidedrawer not found for element nativescript-telerik-ui/sidedrawer:RadSideDrawer'

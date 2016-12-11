[Google Play Store (alpha rests)](https://play.google.com/store/apps/details?id=org.nativescript.curiosity&ah=JzMiTK6i7_W0DjmFnEL4ORKdB3w&hl=eng#details-reviews)


# NativeScript-Cosmos-DataBank

A proof of concept application using NativeScript cross-platform framework.
This app is using NS to create mobile application for iOS and Android using the NASA
APIs.

The application is loading multiple images from online sources and is using
nativescript-fresco plugin to manage memory recourses when working with lists of large images.
Firebase implementation for FCM and Realtime Firebase DB.

## API KEYS setup
To test the application you will need created [NASA API key](https://api.nasa.gov/) and [Youtube API key](https://developers.google.com/youtube/v3/getting-started).
Once obtained cretea the following file `app/files/credentials.ts` and place your keys as follows:

```
export var NASA_API_KEY = "api_key=" + NASA_API_KEY;
export let YOUTUBE_API_KEY = YOUTUBE_API_KEY;
```

## Firebase google-services.json setup
This application demonstrates how to use Firebase services.
In order to build the application you will need to 
 - generate your own google-services.json (with different package id). More [here](https://firebase.google.com/docs/android/setup)
 - run `tns platform add android`
 - place `google-services.json` in **platforms/android** folder
>Node: After each removal of platforms folder you should place the file again. 

## List of used plugins

 * nativescript-permissions
 * nativescript-cardview (material design cards)
 * nativescript-fresco (images managment for Android)
 * nativescript-plugin-firebase (push notifications and realtime database)
 * nativescript-social-share
 * nativescript-telerik-ui (sidedrawer and listview)
 * nativescript-toast
 * nativescript-theme-core (css)
 * nativescript-youtube-videoplayer (beta)

## List of used API

 * NASA Mars Rover Photos (500 000+ photos from Mars)
 * NASA APOD (Astronomical photo of the day)
 * NASA Asteroids - NeoWs (Asteroids proximity checker)
 * NASA EPIC (Earth HD polygraphic images - coming soon)
 
Google Play Store (alpha rests) : [https://play.google.com/store/apps/details?id=org.nativescript.curiosity&ah=JzMiTK6i7_W0DjmFnEL4ORKdB3w&hl=eng#details-reviews](https://play.google.com/store/apps/details?id=org.nativescript.curiosity&ah=JzMiTK6i7_W0DjmFnEL4ORKdB3w&hl=eng#details-reviews)

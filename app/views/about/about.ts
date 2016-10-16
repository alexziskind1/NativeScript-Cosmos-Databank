import { Page } from "ui/page";
import { StackLayout } from "ui/layouts/stack-layout";
import { Label } from "ui/label";
import { EventData } from "data/observable";
import youtube = require("nativescript-youtube-player");

export function onLoaded(args: EventData) {
    let page = <Page>args.object;
    
    var stack = <StackLayout>page.getViewById("pageContainer");

    var playerOne = new youtube.YouTubePlayerView();
    playerOne.apiKey = "AIzaSyApfrMXAC3SckEBQ_LOrNDA5qUcDAZAevQ";
    playerOne.videoKey = "dwdws90cxAA";
    var labelOne = new Label();
    labelOne.text = "NASA";

    var playerTwo = new youtube.YouTubePlayerView();
    playerTwo.apiKey = "AIzaSyApfrMXAC3SckEBQ_LOrNDA5qUcDAZAevQ";
    playerTwo.videoKey = "UGPuEDyAsU8";
    var labelTwo = new Label();
    labelTwo.text = "NativeSxcript";

    var playerThree = new youtube.YouTubePlayerView();
    playerThree.apiKey = "AIzaSyApfrMXAC3SckEBQ_LOrNDA5qUcDAZAevQ";
    playerThree.videoKey = "bU1QPtOZQZU";

    stack.addChild(playerOne);
    stack.addChild(labelOne);
    stack.addChild(playerTwo);
    stack.addChild(labelTwo);
    stack.addChild(playerThree);
}
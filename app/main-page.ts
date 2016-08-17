import { EventData } from "data/observable";
import { ObservableArray } from "data/observable-array";
import { Page } from "ui/page";
import { topmost } from "ui/frame";

import { StackLayout } from "ui/layouts/stack-layout";
import { Label } from "ui/label";
import { ListView } from "ui/list-view";
import { Button } from "ui/button";
import { Color } from "color";

import { ListViewModel } from "./models/list-view-model";

import http = require("http");

import * as fresco from "nativescript-fresco";
import * as slides from 'nativescript-slides/nativescript-slides';

let page;
let list;
let vm = new ListViewModel();

export function onLoaded(args: EventData) {
    page = <Page>args.object;
}

export function onListLoaded(args: EventData) {
    list = <ListView>args.object;
    console.log(list);
    list.bindingContext = vm;

    console.log(vm.get("dataItems"))

}


// export function onSlideContainerLoaded(args) {
//     let slideContainer = <slides.SlideContainer>args.object;

//     //Construct the slides
//     for(var i=1; i < slideCount; i++){
//         slideContainer.addChild(getSlide("Page " + i, "slide-" + i));
//     }

//     var lastSlide = getSlide("Page " + i, "slide-" + i);

//     var homeButton = new Button();
//     homeButton.text = "Home";
//     homeButton.color = new Color("#FFF");

//     homeButton.on("tap", ()=>{
//         var navigationEntry = {
//             moduleName: "loader",
//             animated: false,
//             clearHistory: true
//         };

//         topmost().navigate(navigationEntry);
//     });

//     lastSlide.addChild(homeButton);
//     slideContainer.addChild(lastSlide);
// }

// function getSlide(labelText: string, className: string)  {
//     let slide = new slides.Slide();
//     slide.className = className;

//     let label = new Label();
//     label.text = labelText;
//     slide.addChild(label);

//     let label1 = new Label();
//     label1.text = "Look ma, no XML!";
//     label1.className = "subtext";
//     slide.addChild(label1);

//     return slide;
// }

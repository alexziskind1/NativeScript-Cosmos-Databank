// tslint:disable:no-unused-expression
import * as definition from "nativescript-youtube-player";

// import * as DO from "ui/core/dependency-observable";

import * as newDO from "ui/core/properties";

import * as proxy from "ui/core/properties";

// tslint:disable-next-line:no-use-before-declare
import { StackLayout as StackLayout } from "ui/layouts/stack-layout";

import * as DO from "ui/core/dependency-observable";

const videoKeyPropertyOld = new DO.Property(
    "videoKey",
    "YouTubePlayerView",
    new DO.PropertyMetadata("",  DO.PropertyMetadataSettings.None)
);

const apiKeyPropertyOld = new DO.Property(
    "apiKey",
    "YouTubePlayerView",
    new DO.PropertyMetadata("",  DO.PropertyMetadataSettings.None)
);

import * as props from "ui/core/properties";

export const apiKeyProperty = new props.Property<YouTubePlayerView, string>({
    name: "apiKey", defaultValue: ""
});

export const videoKeyProperty = new props.Property<YouTubePlayerView, string>({
    name: "videoKey", defaultValue: ""
});


export class YouTubePlayerView extends StackLayout implements definition.YouTubePlayerView {
    // expose the properties as static members on the Player class
    public static videoKeyProperty = videoKeyProperty;
    public static apiKeyProperty = apiKeyProperty;

    public get videoKey(): string {
        return this._getValue(videoKeyProperty);
    }
    public set videoKey(value: string) {
        this._setValue(videoKeyProperty, value);
    }

    public get apiKey(): string {
        return this._getValue(apiKeyProperty);
    }
    public set apiKey(value: string) {
        this._setValue(apiKeyProperty, value);
    }

    public _onPropertyChanged(property: props.Property<YouTubePlayerView, string>, oldValue: any, newValue: any) {

        if (property === videoKeyProperty) {
            this._onVideoKeyChanged;
        } else if (property === apiKeyProperty) {
            this._onAPIKeyChanged(newValue);
        }
    }

    public _onVideoKeyChanged(newValue: any) {
    }

    public _onAPIKeyChanged(newValue: any) {
    }
}

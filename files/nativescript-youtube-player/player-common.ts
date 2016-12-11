// tslint:disable:no-unused-expression
import * as definition from "nativescript-youtube-player";
import * as DO from "ui/core/dependency-observable";
import * as proxy from "ui/core/proxy";
// tslint:disable-next-line:no-use-before-declare
import { StackLayout as StackLayout } from "ui/layouts/stack-layout";

const videoKeyProperty = new DO.Property(
    "videoKey",
    "YouTubePlayerView",
    new proxy.PropertyMetadata("", DO.PropertyMetadataSettings.None)
);

const apiKeyProperty = new DO.Property(
    "apiKey",
    "YouTubePlayerView",
    new proxy.PropertyMetadata("", DO.PropertyMetadataSettings.None)
);

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

    public _onPropertyChanged(property: DO.Property, oldValue: any, newValue: any) {
        super._onPropertyChanged(property, oldValue, newValue);

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

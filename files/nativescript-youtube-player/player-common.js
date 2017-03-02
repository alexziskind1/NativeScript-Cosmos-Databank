"use strict";
var DO = require("ui/core/dependency-observable");

var stack_layout_1 = require("ui/layouts/stack-layout");
var videoKeyProperty = new DO.Property("videoKey", "YouTubePlayerView", new proxy.PropertyMetadata("", DO.PropertyMetadataSettings.None));
var apiKeyProperty = new DO.Property("apiKey", "YouTubePlayerView", new proxy.PropertyMetadata("", DO.PropertyMetadataSettings.None));
var YouTubePlayerView = (function (_super) {
    __extends(YouTubePlayerView, _super);
    function YouTubePlayerView() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(YouTubePlayerView.prototype, "videoKey", {
        get: function () {
            return this._getValue(videoKeyProperty);
        },
        set: function (value) {
            this._setValue(videoKeyProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YouTubePlayerView.prototype, "apiKey", {
        get: function () {
            return this._getValue(apiKeyProperty);
        },
        set: function (value) {
            this._setValue(apiKeyProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    YouTubePlayerView.prototype._onPropertyChanged = function (property, oldValue, newValue) {
        _super.prototype._onPropertyChanged.call(this, property, oldValue, newValue);
        if (property === videoKeyProperty) {
            this._onVideoKeyChanged;
        }
        else if (property === apiKeyProperty) {
            this._onAPIKeyChanged(newValue);
        }
    };
    YouTubePlayerView.prototype._onVideoKeyChanged = function (newValue) {
    };
    YouTubePlayerView.prototype._onAPIKeyChanged = function (newValue) {
    };
    YouTubePlayerView.videoKeyProperty = videoKeyProperty;
    YouTubePlayerView.apiKeyProperty = apiKeyProperty;
    return YouTubePlayerView;
}(stack_layout_1.StackLayout));
exports.YouTubePlayerView = YouTubePlayerView;

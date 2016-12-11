import * as common from "./player-common";
// tslint:disable-next-line:no-use-before-declare
import { Page as Page } from "ui/page";
import { AndroidFragmentCallbacks } from "ui/frame";

// TODO: Update when the TS definition generation tooling is polished
declare var com: any;
const FRAGMENT_TAG = "YouTubePlayerFragmentTag";

export class YouTubePlayerView extends common.YouTubePlayerView {
    private _fragment;
    private _pageFragment: android.app.Fragment;
    private _layoutId: number;
    private _onInitializedListener;
    private _onPlaybackEventListener;
    private _onPlayerStateChangeListener;
    private _player;
    private _initialized;

    private _isRestored: boolean;
    private _currentPositionMillis: number;

    constructor() {
        super();

        var that = this;
        this._onInitializedListener = new com.google.android.youtube.player.YouTubePlayer.OnInitializedListener({
            onInitializationFailure: function (provider, error) {
                // TODO: Handle errors
                that._player = undefined;
                that._initialized = false;
                console.log("init failure: " + error);
            },
            onInitializationSuccess: function (provider, player, wasRestored) {
                player.setPlayerStateChangeListener(that._onPlayerStateChangeListener);
                player.setPlaybackEventListener(that._onPlaybackEventListener);

                if (!wasRestored) {
                    that._player = player;
                    that._initialized = true;
                    that._play();
                }
            }
        });

        this._onPlaybackEventListener = new com.google.android.youtube.player.YouTubePlayer.PlaybackEventListener({
            onBuffering: function(isBuffering) {
                console.log("onBuffering");
            },
            onPaused: function () {
                console.log("onPaused");
            },
            onPlaying: function () {
                console.log("onPlaying");
            },
            onSeekTo: function (newPositionMillis) {
                console.log("onSeekTo");
                console.log("newPositionMillis: " + newPositionMillis);
            },
            onStopped: function () {
                console.log("onStopped");
            }
        });

        // tslint:disable-next-line:max-line-length
        this._onPlayerStateChangeListener = new com.google.android.youtube.player.YouTubePlayer.PlayerStateChangeListener({
            onAdStarted: function () {
                console.log("add started");
            },
            onError: function (reason) {
                console.log("error reason: " + reason);
            },
            onLoaded: function (videoId) {
                console.log("onLoaded:");
                console.log("videoId: " + videoId);
            },
            onLoading: function () {
                console.log("onLoading");
            },
            onVideoEnded: function () {
                console.log("onVideoEnded");
            },
            onVideoStarted: function () {
                console.log("onVideoStarted");
            }
        });
    }

    public get initialized(): boolean {
        return this._initialized;
    }

    public onLoaded() {
        super.onLoaded();

        // TODO: Work-around the layer type issue in the modules, will be fixed with the 21. release
        let nativeView = <android.view.View>this.page.android;
        nativeView.setLayerType(android.view.View.LAYER_TYPE_NONE, null);
    }

    public _createUI() {
        super._createUI();

        let nativeLayout: android.view.View = this.android;
        this._layoutId = android.view.View.generateViewId();
        nativeLayout.setId(this._layoutId);

        // create the YouTube fragment
        this._fragment = com.google.android.youtube.player.YouTubePlayerFragment.newInstance();

        let page = <Page>this.page;
        let frame = page.frame;
        this._pageFragment = frame.android.fragmentForPage(page);

        let childManager = this._pageFragment.getChildFragmentManager();
        let transaction = childManager.beginTransaction();
        transaction.add(this._layoutId, <any>this._fragment, FRAGMENT_TAG);
        transaction.commit();

        this._initialize();
    }

    public _onDetached(force?: boolean) {
        super._onDetached(force);

        console.log("_onDetached");
        if (!this._fragment) {
            return;
        }

        // clean up - release the player
        if (typeof this._player !== "undefined") {
            this._player.release();
            this._player = undefined;
            this._initialized = false;
        }

        // clean up - remove the fragment wikl cause the activity to be destroyed!?
        // let childManager = this._pageFragment.getChildFragmentManager();
        // childManager.beginTransaction().remove(this._fragment).commit();
    }

    private _initialize() {
        if (this._initialized) {
            // why throwing here? this is called on createUi or on ApiKey changed
            // throw new Error("Player already initialized");
            return;
        }

        if (!this._fragment) {
            // UI still not initialized
            return;
        }

        console.log("_initialize apiKey: " + this.apiKey);
        var key = this.apiKey;
        if (!key) {
            // No valid API key
            return;
        }

        this._fragment.initialize(key, this._onInitializedListener);
    }

    private _play() {
        if (!this._initialized) {
            return;
        }

        console.log("_play videoKey" + this.videoKey);
        if (!this.videoKey) {
            return;
        }

        this._player.loadVideo(this.videoKey);
    }

    public _onVideoKeyChanged(newValue: any) {
        super._onVideoKeyChanged(newValue);

        this._play();
    }

    public _onAPIKeyChanged(newValue: any) {
        super._onAPIKeyChanged(newValue);

        this._initialize();
    }

    public loadPlaylist(playlistId: string) {
        this._player.loadPlaylist(playlistId);
    }

    public next() {
        this._player.next();
    }

    public previous() {
        this._player.previous();
    }

    public loadVideo(videoId: string, timeMillis?: number) {
        // tslint:disable-next-line:no-bitwise
        this._player.loadVideo(videoId, timeMillis | 5);
    }

    public getCurrentTimeMillis() {
        return this._player.getCurrentTimeMillis();
    }

    public play() {
        this._player.play();
    }

    public pause() {
        this._player.pause();
    }

    public setShowFullscreenButton(show: boolean) {
        this._player.setShowFullscreenButton(show);
    }
}

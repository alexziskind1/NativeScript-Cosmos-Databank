"use strict";
var NativeYouTubePlayer = (function () {
    
    function NativeYouTubePlayer(placeholderArgs) {
        // this._apiKey = "AIzaSyApfrMXAC3SckEBQ_LOrNDA5qUcDAZAevQ";
        // this._videoId = videoId;
        this._placeholderArgs = placeholderArgs;
        this._apiKey = "AIzaSyApfrMXAC3SckEBQ_LOrNDA5qUcDAZAevQ";
    }

    NativeYouTubePlayer.prototype.play = function (videoId) {   
        try {
            var youTubePlayerFragment = com.google.android.youtube.player.YouTubePlayerFragment.newInstance();

            youTubePlayerFragment.initialize(this._apiKey , new com.google.android.youtube.player.YouTubePlayer.OnInitializedListener({
                onInitializationFailure : function (provider, error) {
                    console.log("onInitializationFailure");
                    console.log(error);
                },
                onInitializationSuccess : function (provider, player, wasRestored) {

                    player.setPlayerStateChangeListener(new com.google.android.youtube.player.YouTubePlayer.PlayerStateChangeListener({
                        onLoaded: function (params) {
                            console.log("Loaded!");
                        },
                             
                        onAdStarted: function () { },
                        
                            
                        onError: function (params) { },
                        
                        
                        onLoading: function () { },
                        
                            
                        onVideoEnded: function () { },
                        
                            
                        onVideoStarted: function () { }
                    }));

                    player.setFullscreen(false);
                    player.loadVideo(videoId); // videoID
                    player.play();
                }
            }));

            var fragmentManager = this._placeholderArgs.context.getFragmentManager();
            var fragmentTransaction = fragmentManager.beginTransaction();

            var framelayout = new android.widget.FrameLayout(this._placeholderArgs.context);
            framelayout.setLayoutParams(new android.widget.FrameLayout.LayoutParams(android.widget.FrameLayout.LayoutParams.MATCH_PARENT, 
                                                                                    android.widget.FrameLayout.LayoutParams.MATCH_PARENT));
            framelayout.setId(android.view.View.generateViewId());
            fragmentTransaction.add(framelayout.getId(), youTubePlayerFragment).commit();
            // fragmentTransaction.commit();
            this._placeholderArgs.view = framelayout;
        } catch (ex) {
            console.log(ex);
        }

    };
    return NativeYouTubePlayer;
}());
exports.NativeYouTubePlayer = NativeYouTubePlayer;
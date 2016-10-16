declare module "nativescript-youtube-player" {
    import stackLayout = require("ui/layouts/stack-layout");
    import dependencyObservable = require("ui/core/dependency-observable");
    
    export class YouTubePlayerView extends stackLayout.StackLayout {
        /**
         * Represents the observable property backing the "videoKey" property of each YouTubePlayerView instance.
         */
        public static videoKeyProperty: dependencyObservable.Property;
        
        /**
         * Represents the observable property backing the "apiKey" property of each YouTubePlayerView instance.
         */
        public static apiKeyProperty: dependencyObservable.Property;
        
        /**
         * Gets or sets the Google YouTube API key of the player. Once applied, the key may not change at runtime.
         */
        apiKey: string;
        
        /**
         * Gets or sets the key of the video for the player to load.
         */        
        videoKey: string;
        
        // TODO: Expose public API like play, pause, stop, etc.

        /**
         * Loads and plays the specified playlist.
         */   
        public loadPlaylist(playlistId: string): void

        /**
         * Plays the next video in the specfied playlist.
         */   
        public next(): void

        /**
         * Plays the previous video in the specfied playlist.
         */   
        public previous(): void 

        /**
         * Loads and plays the specified video.
         */   
        public loadVideo(videoId: string, timeMIllis?: number): void

        /**
         * Gets the current elapsed time of the playing video relative to its start.
         */    
        public getCurrentTimeMillis(): number;

        /**
         * Pauses the currently playing video.
         */  
        public pause(): void;

        /**
         * Starts video playback of the currently cued / loaded video.
         */  
        public play(): void;

        public setShowFullscreenButton(show: boolean): void;
    }

}
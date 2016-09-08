import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import http = require("http");

let API_URL = "https://api.nasa.gov/planetary/apod";
let API_KEY = "?api_key=jXRI5DynwdFVqt950uq6XMwZtlf6w8mSgpTJTcbX";
let HD_PIC = "&hd=true";
var sample_date = "&date=1980-04-20";
// Parameter	Type	    Default	    Description
// date	        YYYY-MM-DD	today	    The date of the APOD image to retrieve
// hd	        bool	    False	    Retrieve the URL for the high resolution image
// api_key	    string	    DEMO_KEY	api.nasa.gov key for expanded usage

export class ApodViewModel extends Observable {

    private _dataItems: ObservableArray<ApodItem> = new ObservableArray<ApodItem>();
    private _url: string;

    constructor() {
        super();
    }    

    public get dataItems() {   
        if (!this._dataItems) {
            this.initDataItems();
        }
        return this._dataItems;
    }
    
    public getUpdatedUrl() {
        return this._url = API_URL + API_KEY + HD_PIC;
    }

    public initDataItems() {
        this._dataItems = new ObservableArray<ApodItem>(); 

        this._dataItems = this.requestApod(this._dataItems, this.getUpdatedUrl());
    }
    
    public requestApod(arr: ObservableArray<ApodItem>, apiUrl: string) {

        http.request({ url: apiUrl, method: "GET" }).then(function (response) {
            // Argument (response) is HttpResponse!
            if (response.statusCode === 400) {
                console.log("NO PHOTOS - err 400");
                return;
            }

            var result = response.content.toJSON();

            arr.push(new ApodItem(result["copyright"], 
                                  result["date"], 
                                  result["explanation"], 
                                  result["hdurl"], 
                                  result["media_type"], 
                                  result["service_version"], 
                                  result["title"], 
                                  result["url"] ));


        }, function (e) {
            //// Argument (e) is Error!
        });

        return arr;
    }
}

export class ApodItem {

    public copyright: string;
    public date: string;
    public explanation: string;
    public hdurl: string;
    public media_type: string;
    public service_version: string;
    public title: string;
    public url: string;

    constructor(copyright: string, date: string, explanation: string, hdurl: string, media_type: string, service_version: string, title: string, url: string) {
        this.copyright = copyright;
        this.date = date;
        this.explanation = explanation;
        this.hdurl = hdurl;
        this.media_type = media_type;
        this.service_version = service_version;
        this.title = title;
        this.url = url;
    }
}
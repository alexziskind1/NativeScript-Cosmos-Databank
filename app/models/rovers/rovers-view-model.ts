import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import http = require("http");

let API_URL_START = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
let API_URL_END = "/photos?earth_date=";
var sampleDate = "2015-4-3";
let API_KEY = "&api_key=jXRI5DynwdFVqt950uq6XMwZtlf6w8mSgpTJTcbX";
let DEMO_KEY = "&api_key=DEMO_KEY";
var requestUrl = API_URL_START + sampleDate + API_KEY;

export class RoversViewModel extends Observable {

    private _dataItems: ObservableArray<DataItem> = new ObservableArray<DataItem>();
    private _rovers: Array<string> = ["curiosity", "opportunity", "spirit"];;

    private _year: number;
    private _month: number;
    private _day: number;
    private _rover: string;

    private _totalCount: number;
    private _url: string;

    constructor(rover: string, year: number, month: number, day: number) {
        super();

        this._rover = rover;
        this._year = year;
        this._month = month;
        this._day = day;

        this._totalCount = -1;
    }    

    public get rovers() {
        return this._rovers;
    }
    
    public get totalCount() {
        return this._totalCount;
    }

    public set totalCount(value: number) {
        if (this._totalCount !== value) {
            this._totalCount = value;
            this.notifyPropertyChange("totalCount", value);
        }
    }    

    public get rover() {
        return this._rover;
    }

    public set rover(value: string) {
        if (this._rover !== value) {
            this._rover = value;
            this.notifyPropertyChange("rover", value);
        }
    }


    public get year() {
        return this._year;
    }

    public set year(value: number) {
        if (this._year !== value) {
            this._year = value;
            this.notifyPropertyChange("year", value);
        }
    }

    public get month() {
        return this._month;
    }

    public set month(value: number) {
        if (this._month !== value) {
            this._month = value;
            this.notifyPropertyChange("month", value); 
        }
    }

    public get day() {
        return this._day;
    }

    public set day(value: number) {
        if (this._day !== value) {
            this._day = value;
            this.notifyPropertyChange("day", value);
        }
    }

    public get dataItems() {   
        if (!this._dataItems) {
            this.initDataItems();
        }
        return this._dataItems;
    }

    public getUpdatedUrl() {

        return this._url = API_URL_START 
                           + this._rover 
                           + API_URL_END 
                           + this._year + '-' + this._month + '-' + this._day 
                           + API_KEY;
    }

    public initDataItems() {
        this._dataItems = new ObservableArray<DataItem>(); 
        var pageIndex = 1;
        this._dataItems = this.requestPhotosByPage(this._dataItems ,this.getUpdatedUrl(), pageIndex);
    }

    public requestPhotosByPage(arr: ObservableArray<DataItem>, url: string, pageIndex: number) {
        this.totalCount = -1;

        var that = this;

        http.request({ url: this.getUpdatedUrl() + "&page=" + pageIndex, method: "GET" }).then(function (response) {
            // Argument (response) is HttpResponse!
            if (response.statusCode === 400) {
                console.log("NO PHOTOS - err 400");
                that.totalCount = 0;
                return;
            }

            for (var header in response.headers) {
               // console.log(header + ":" + response.headers[header]);
            }

            var result = response.content.toJSON();
            
            for (var index = 0; index < result["photos"].length; index++) {
                var element = result["photos"][index];

                arr.push(new DataItem(element["id"],
                                      element["sol"],
                                      element["camera"]["id"], 
                                      element["camera"]["name"], 
                                      element["camera"]["rover_id"], 
                                      element["camera"]["full_name"], 
                                      element["img_src"], 
                                      element["earth_date"]));
            }

        }, function (e) {
            //// Argument (e) is Error!
        }).then(function() {
            // recusrsive call to go to all the pages for the selected day query of photos
            // reason: the API is passing 25 photos per page
            // console.log("arr length: " + arr.length);
            if (arr.length % 25 === 0 && arr.length / pageIndex === 25 && arr.length !== 0) {
                pageIndex++;
                that.requestPhotosByPage(arr, url, pageIndex);
            } else {
                that.totalCount = arr.length;
                return arr;
            }
        });
        return arr;
    }

}

export class DataItem {

    public id: number;
    public sol: number;

    public cameraId: number;
    public cameraName: string;
    public cameraRoverId: number;
    public cameraFullName: string;

    public imageUri: string;
    public earthDate: string;
    
    constructor(id: number, 
                sol: number, 
                cameraId: number, 
                cameraName: string, 
                cameraRoverId: number, 
                cameraFullName: string, 
                imageUri: string, 
                earthDate: string) {
        this.id = id;
        this.sol = sol;
        this.cameraId = cameraId;
        this.cameraName = cameraName;
        this.cameraRoverId = cameraRoverId;
        this.cameraFullName = cameraFullName;      
        this.imageUri = imageUri;
        this.earthDate = earthDate;
    }
}
import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import http = require("http");

let API_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=";
var sampleDate = "2015-4-3";
let API_KEY = "&api_key=jXRI5DynwdFVqt950uq6XMwZtlf6w8mSgpTJTcbX";
let DEMO_KEY = "&api_key=DEMO_KEY";
var requestUrl = API_URL + sampleDate + API_KEY;

export class ListViewModel extends Observable {

    private _dataItems: ObservableArray<DataItem>;

    private _year: number;
    private _month: number;
    private _day: number;

    private _url: string;

    constructor(year: number, month: number, day: number) {
        super();

        this._year = year;
        this._month = month;
        this._day = day;
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
        return this._url = API_URL + this._year + '-' + this._month + '-' + this._day + DEMO_KEY;
    }

    public initDataItems() {
        this._dataItems = new ObservableArray<DataItem>(); 

        var pageIndex = 1;

        this._dataItems = this.requestPhotosByPage(this._dataItems ,this.getUpdatedUrl(), pageIndex);
    }

    public requestPhotosByPage(arr: ObservableArray<DataItem>, url: string, pageIndex: number) {
        var that = this;

        http.getJSON(this.getUpdatedUrl() + "&page=" + pageIndex).then(function (result) {

            for (var index = 0; index < result["photos"].length; index++) {
                var element = result["photos"][index];
                        
                // console.log(element["camera"]["full_name"]);
                // console.log(element["img_src"]);
                // console.log(element["earth_date"]);

                arr.push(new DataItem(element["camera"]["full_name"], 
                                                 element["img_src"], 
                                                 element["earth_date"]));
                console.log(element["id"]);
            }

        }, function (e) {
            console.log(e);
        }).then(function() {
            // recusrsive call to go to all the pages for the selected day query of photos
            // reason: the API is passing 25 photos per page
            console.log("arr length: " + arr.length);
            if (arr.length % 25 == 0 && arr.length / pageIndex == 25) {
                pageIndex++;
                console.log("page:" + pageIndex);
                that.requestPhotosByPage(arr, url, pageIndex);
            } else {
                return arr;
            }
        })
        return arr;
    }

}

export class DataItem {

    public imageUri;
    public cameraName;
    public earthDate;

    constructor(cameraName: string, imageUri: string, earthDate: string) {
        this.cameraName = cameraName;
        this.imageUri = imageUri;
        this.earthDate = earthDate;
    }
}
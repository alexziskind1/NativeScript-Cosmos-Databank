import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import http = require("http");

import { NASA_API_KEY } from "../../files/credentials";

let API_URL_START = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
let API_URL_END = "/photos?earth_date=";
let API_KEY = "&" + NASA_API_KEY;

// use instead API_KEY for testing purposes
let DEMO_API_KEY = "&api_key=DEMO_KEY";

export class RoversViewModel extends Observable {

    private _dataItems: ObservableArray<DataItem> = new ObservableArray<DataItem>();
    private _year: number;
    private _month: number;
    private _day: number;
    private _rover: string;

    private _totalCount: number;
    private _url: string;

    private _showCur: boolean = true;
    private _showOpp: boolean = true;
    private _showSpi: boolean = true;

    private _cachedIndex: number = 0;

    constructor(rover: string, year: number, month: number, day: number) {
        super();

        this._rover = rover;
        this._year = year;
        this._month = month;
        this._day = day;

        this._totalCount = -1;
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

    public get cachedIndex() {
        return this._cachedIndex;
    }

    public set cachedIndex(value: number) {
        if (this._cachedIndex !== value) {
            this._cachedIndex = value;
            this.notifyPropertyChange("cachedIndex", value);
        }
    }

    public getUpdatedUrl() {

        return this._url = API_URL_START
            + this._rover
            + API_URL_END
            + this._year + "-" + this._month + "-" + this._day
            + API_KEY;
    }

    public initDataItems() {
        this._dataItems = new ObservableArray<DataItem>();
        var pageIndex = 1;
        this._dataItems = this.requestPhotosByPage(this._dataItems, this.getUpdatedUrl(), pageIndex);
    }

    public requestPhotosByPage(arr: ObservableArray<DataItem>, url: string, pageIndex: number) {
        this.totalCount = -1;

        http.request({ url: this.getUpdatedUrl() + "&page=" + pageIndex, method: "GET" })
            .then(response => {
                // Argument (response) is HttpResponse!
                if (response.statusCode === 400) {
                    console.log("NO PHOTOS - err 400");
                    this.totalCount = 0;
                    return;
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
            }).catch(err => { console.log(err.stack); })
            .then(res => {
                // recusrsive call to go to all the pages for the selected day query of photos
                // reason: the API is passing 25 photos per page
                // console.log("arr length: " + arr.length);
                if (arr.length % 25 === 0 && arr.length / pageIndex === 25 && arr.length !== 0) {
                    pageIndex++;
                    this.requestPhotosByPage(arr, url, pageIndex);
                } else {
                    this.totalCount = arr.length;
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
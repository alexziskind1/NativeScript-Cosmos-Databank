import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import http = require("http");

let API_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=";
var sampleDate = "2015-4-3";
let API_KEY = "&api_key=jXRI5DynwdFVqt950uq6XMwZtlf6w8mSgpTJTcbX";
var requestUrl = API_URL + sampleDate + API_KEY;

export class ListViewModel extends Observable {
    private _dataItems: ObservableArray<DataItem>;
    
    private _year: number = 2013;
    private _month: number = 8;
    private _day: number = 6;

    private _url: string;

    constructor() {
        super();

        this.initDataItems();
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
        return this._dataItems;
    }

    public getUpdatedUrl() {
        return this._url = API_URL + this._year + '-' + this._month + '-' + this._day + API_KEY;
    }

    public initDataItems() {
        if (!this._dataItems) {
            this._dataItems = new ObservableArray<DataItem>();
            var that = this;
            http.getJSON(this.getUpdatedUrl()).then(function (result) {

                for (var index = 0; index < result["photos"].length; index++) {
                    var element = result["photos"][index];
                            
                    console.log(element["camera"]["full_name"]);
                    console.log(element["img_src"]);
                    console.log(element["earth_date"]);

                    that._dataItems.push(new DataItem(element["camera"]["full_name"], element["img_src"], element["earth_date"]));
                }

            }, function (e) {
                console.log(e);
            })
        }
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
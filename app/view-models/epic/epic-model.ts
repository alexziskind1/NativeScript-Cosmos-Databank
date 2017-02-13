import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import * as http from "http";
import { NASA_API_KEY } from "../../files/credentials";

// http://epic.gsfc.nasa.gov/api/images.php

let testEpicUrl = "http://epic.gsfc.nasa.gov/epic-archive/natural/jpg/";

var exampleItem = [
    {
        "image": "epic_1b_20161006004555_01",
        "caption": "",
        // tslint:disable-next-line:max-line-length
        "coords": "{ \"centroid_coordinates\" : {\"lat\": 1.775493, \"lon\": 157.546882},\n\"dscovr_j2000_position\" : { \"x\" : -1491822.000000, \"y\" : -105086.492188, \"z\" : 46597.183594 },\n\"lunar_j2000_position\" : { \"x\" : -157902.703125, \"y\" : -359952.343750, \"z\" : -114914.140625 },\n\"sun_j2000_position\" : { \"x\" : -145740048.000000, \"y\" : -30796530.000000, \"z\" : -13349264.000000 },\n\"attitude_quaternions\" : { \"q0\" : -0.413055, \"q1\" : -0.000370, \"q2\" : 0.038535, \"q3\" : 0.909890 } }",
        "date": "2016-10-06 00:41:06"
    }
];

var exampleImage = "http://epic.gsfc.nasa.gov/epic-archive/natural/jpg/epic_1b_20161006004555_01.jpg";

var allLatest = "http://epic.gsfc.nasa.gov/api/images.php";

// all latest with API_KEY from api.nasa.gov
let API_URL = "https://api.nasa.gov/EPIC/api/v1.0/images.php";
let API_KEY = "?" + NASA_API_KEY;
// Parameter	    Type	        Default	                Description
// date	            YYYY-MM-DD  	Most Recent Available	Retrieve matadata for all imagery available for a given date.
// available_dates	string	        All Available Dates	    Retrieve a listing of all dates with available imagery.
// api_key	        string          DEMO_KEY	            api.nasa.gov key for expanded usage

export class EpicViewModel extends Observable {

    private _dataItem: EpicItem;
    private _urlApod: string;
    private _selectedDate: Date;

    constructor() {
        super();

        this._selectedDate = new Date();
    }

    public get dataItem() {
        return this._dataItem;
    }

    public set dataItem(value: EpicItem) {
        if (this._dataItem !== value) {
            this._dataItem = value;
            this.notifyPropertyChange("dataItem", value);
        }
    }

    public get selectedDate() {
        return this._selectedDate;
    }

    public set selectedDate(value: Date) {
        if (this._selectedDate !== value) {
            this._selectedDate = value;
            this.notifyPropertyChange("selectedDate", value);
        }
    }

    public getUpdatedUrl() {
        return this._urlApod = API_URL + API_KEY;
    }

    public initDataItems() {
        this.requestApod(this.dataItem, this.getUpdatedUrl());
    }

    public requestApod(epicDataItem: EpicItem, apiUrl: string) {

        http.request({ url: apiUrl, method: "GET" })
            .then(response => {
                // Argument (response) is HttpResponse!
                if (response.statusCode === 400) {
                    console.log("NO APOD for that date - err 400");
                    return;
                }

                var result = response.content.toJSON();

                console.log(result);
                console.log(result[0]["image"]);
                epicDataItem = new EpicItem(testEpicUrl + result[0]["image"] + ".jpg");
            }).then(res => {
                this.dataItem = epicDataItem;
                console.log(this.dataItem["url"]);
            }).catch(err => {
                // console.log(err.stack);
            });
    }
}

export class EpicItem {

    public url: string;

    constructor(url: string) {
        this.url = url;
    }
}

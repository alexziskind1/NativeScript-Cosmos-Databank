import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import http = require("http");

let API_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=";
var sampleDate = "2015-4-3";
let API_KEY = "&api_key=jXRI5DynwdFVqt950uq6XMwZtlf6w8mSgpTJTcbX";
var requestUrl = API_URL + sampleDate + API_KEY;

export class ListViewModel extends Observable {
    private _dataItems: ObservableArray<DataItem>;

    constructor() {
        super();

        this.initDataItems();
    }

    public get dataItems() {
        return this._dataItems;
    }

    private initDataItems() {
        if (!this._dataItems) {
            this._dataItems = new ObservableArray<DataItem>();
            var that = this;
            http.getJSON(requestUrl).then(function (result) {

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
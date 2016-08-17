import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import http = require("http");

let API_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=";
var sampleDate = "2015-6-3";
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
                    console.log(element["img_src"]);
                    that._dataItems.push(new DataItem(element["img_src"]));
                }

            }, function (e) {
                console.log(e);
            })
        }
    }
}

export class DataItem {

    public imageUri;

    constructor(uri: string) {
        this.imageUri = uri;
    }
}
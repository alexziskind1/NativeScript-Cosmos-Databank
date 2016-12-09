"use strict";
var observable_1 = require("data/observable");
var http = require("http");
// http://epic.gsfc.nasa.gov/api/images.php
var testEpicUrl = "http://epic.gsfc.nasa.gov/epic-archive/natural/jpg/";
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
var API_URL = "https://api.nasa.gov/EPIC/api/v1.0/images.php";
var API_KEY = "?api_key=jXRI5DynwdFVqt950uq6XMwZtlf6w8mSgpTJTcbX";
// Parameter	    Type	        Default	                Description
// date	            YYYY-MM-DD  	Most Recent Available	Retrieve matadata for all imagery available for a given date.
// available_dates	string	        All Available Dates	    Retrieve a listing of all dates with available imagery.
// api_key	        string          DEMO_KEY	            api.nasa.gov key for expanded usage
var EpicViewModel = (function (_super) {
    __extends(EpicViewModel, _super);
    function EpicViewModel() {
        var _this = _super.call(this) || this;
        _this._selectedDate = new Date();
        return _this;
    }
    Object.defineProperty(EpicViewModel.prototype, "dataItem", {
        get: function () {
            return this._dataItem;
        },
        set: function (value) {
            if (this._dataItem !== value) {
                this._dataItem = value;
                this.notifyPropertyChange("dataItem", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EpicViewModel.prototype, "selectedDate", {
        get: function () {
            return this._selectedDate;
        },
        set: function (value) {
            if (this._selectedDate !== value) {
                this._selectedDate = value;
                this.notifyPropertyChange("selectedDate", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    EpicViewModel.prototype.getUpdatedUrl = function () {
        return this._urlApod = API_URL + API_KEY;
    };
    EpicViewModel.prototype.initDataItems = function () {
        this.requestApod(this.dataItem, this.getUpdatedUrl());
    };
    EpicViewModel.prototype.requestApod = function (epicDataItem, apiUrl) {
        var _this = this;
        http.request({ url: apiUrl, method: "GET" })
            .then(function (response) {
            // Argument (response) is HttpResponse!
            if (response.statusCode === 400) {
                console.log("NO APOD for that date - err 400");
                return;
            }
            var result = response.content.toJSON();
            console.log(result);
            console.log(result[0]["image"]);
            epicDataItem = new EpicItem(testEpicUrl + result[0]["image"] + ".jpg");
        }).then(function (res) {
            _this.dataItem = epicDataItem;
            console.log(_this.dataItem["url"]);
        }).catch(function (err) {
            // console.log(err.stack);
        });
    };
    return EpicViewModel;
}(observable_1.Observable));
exports.EpicViewModel = EpicViewModel;
var EpicItem = (function () {
    function EpicItem(url) {
        this.url = url;
    }
    return EpicItem;
}());
exports.EpicItem = EpicItem;
//# sourceMappingURL=epic-model.js.map
"use strict";
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");
var http = require("http");
var API_URL_START = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
var API_URL_END = "/photos?earth_date=";
var sampleDate = "2015-4-3";
var API_KEY = "&api_key=jXRI5DynwdFVqt950uq6XMwZtlf6w8mSgpTJTcbX";
var DEMO_KEY = "&api_key=DEMO_KEY";
var requestUrl = API_URL_START + sampleDate + API_KEY;
var RoversViewModel = (function (_super) {
    __extends(RoversViewModel, _super);
    function RoversViewModel(rover, year, month, day) {
        var _this = _super.call(this) || this;
        _this._dataItems = new observable_array_1.ObservableArray();
        _this._showCur = true;
        _this._showOpp = true;
        _this._showSpi = true;
        _this._cachedIndex = 0;
        _this._rover = rover;
        _this._year = year;
        _this._month = month;
        _this._day = day;
        _this._totalCount = -1;
        return _this;
    }
    Object.defineProperty(RoversViewModel.prototype, "totalCount", {
        get: function () {
            return this._totalCount;
        },
        set: function (value) {
            if (this._totalCount !== value) {
                this._totalCount = value;
                this.notifyPropertyChange("totalCount", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoversViewModel.prototype, "rover", {
        get: function () {
            return this._rover;
        },
        set: function (value) {
            if (this._rover !== value) {
                this._rover = value;
                this.notifyPropertyChange("rover", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoversViewModel.prototype, "year", {
        get: function () {
            return this._year;
        },
        set: function (value) {
            if (this._year !== value) {
                this._year = value;
                this.notifyPropertyChange("year", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoversViewModel.prototype, "month", {
        get: function () {
            return this._month;
        },
        set: function (value) {
            if (this._month !== value) {
                this._month = value;
                this.notifyPropertyChange("month", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoversViewModel.prototype, "day", {
        get: function () {
            return this._day;
        },
        set: function (value) {
            if (this._day !== value) {
                this._day = value;
                this.notifyPropertyChange("day", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoversViewModel.prototype, "dataItems", {
        get: function () {
            if (!this._dataItems) {
                this.initDataItems();
            }
            return this._dataItems;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoversViewModel.prototype, "cachedIndex", {
        get: function () {
            return this._cachedIndex;
        },
        set: function (value) {
            if (this._cachedIndex !== value) {
                this._cachedIndex = value;
                this.notifyPropertyChange("cachedIndex", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    RoversViewModel.prototype.getUpdatedUrl = function () {
        return this._url = API_URL_START
            + this._rover
            + API_URL_END
            + this._year + "-" + this._month + "-" + this._day
            + API_KEY;
    };
    RoversViewModel.prototype.initDataItems = function () {
        this._dataItems = new observable_array_1.ObservableArray();
        var pageIndex = 1;
        this._dataItems = this.requestPhotosByPage(this._dataItems, this.getUpdatedUrl(), pageIndex);
    };
    RoversViewModel.prototype.requestPhotosByPage = function (arr, url, pageIndex) {
        var _this = this;
        this.totalCount = -1;
        http.request({ url: this.getUpdatedUrl() + "&page=" + pageIndex, method: "GET" })
            .then(function (response) {
            // Argument (response) is HttpResponse!
            if (response.statusCode === 400) {
                console.log("NO PHOTOS - err 400");
                _this.totalCount = 0;
                return;
            }
            var result = response.content.toJSON();
            for (var index = 0; index < result["photos"].length; index++) {
                var element = result["photos"][index];
                arr.push(new DataItem(element["id"], element["sol"], element["camera"]["id"], element["camera"]["name"], element["camera"]["rover_id"], element["camera"]["full_name"], element["img_src"], element["earth_date"]));
            }
        }).catch(function (err) { console.log(err.stack); })
            .then(function (res) {
            // recusrsive call to go to all the pages for the selected day query of photos
            // reason: the API is passing 25 photos per page
            // console.log("arr length: " + arr.length);
            if (arr.length % 25 === 0 && arr.length / pageIndex === 25 && arr.length !== 0) {
                pageIndex++;
                _this.requestPhotosByPage(arr, url, pageIndex);
            }
            else {
                _this.totalCount = arr.length;
                return arr;
            }
        });
        return arr;
    };
    return RoversViewModel;
}(observable_1.Observable));
exports.RoversViewModel = RoversViewModel;
var DataItem = (function () {
    function DataItem(id, sol, cameraId, cameraName, cameraRoverId, cameraFullName, imageUri, earthDate) {
        this.id = id;
        this.sol = sol;
        this.cameraId = cameraId;
        this.cameraName = cameraName;
        this.cameraRoverId = cameraRoverId;
        this.cameraFullName = cameraFullName;
        this.imageUri = imageUri;
        this.earthDate = earthDate;
    }
    return DataItem;
}());
exports.DataItem = DataItem;
//# sourceMappingURL=rovers-view-model.js.map
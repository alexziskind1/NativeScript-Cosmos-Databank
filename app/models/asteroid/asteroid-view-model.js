"use strict";
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");
var http = require("http");
var API_URL = "https://api.nasa.gov/neo/rest/v1/feed";
var API_KEY = "&api_key=jXRI5DynwdFVqt950uq6XMwZtlf6w8mSgpTJTcbX";
var AsteroidViewModel = (function (_super) {
    __extends(AsteroidViewModel, _super);
    function AsteroidViewModel() {
        _super.call(this);
        this._dataItems = new observable_array_1.ObservableArray();
        this._asteroidCount = 0;
    }
    Object.defineProperty(AsteroidViewModel.prototype, "dataItems", {
        get: function () {
            return this._dataItems;
        },
        set: function (value) {
            if (this._dataItems !== value) {
                this._dataItems = value;
                this.notifyPropertyChange("dataItems", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AsteroidViewModel.prototype, "asteroidCount", {
        get: function () {
            return this._asteroidCount;
        },
        set: function (value) {
            if (this._asteroidCount !== value) {
                this._asteroidCount = value;
                this.notifyPropertyChange("asteroidCount", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    AsteroidViewModel.prototype.getUpdatedUrl = function () {
        var today = new Date();
        var requiredDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
        var dateRange = "?start_date=" + this.formatDate(today) + "&end_date=" + this.formatDate(requiredDate);
        return this._url = API_URL + dateRange + API_KEY;
    };
    AsteroidViewModel.prototype.initDataItems = function () {
        this.dataItems = this.requestAsteroids(this.dataItems, this.getUpdatedUrl());
    };
    AsteroidViewModel.prototype.requestAsteroids = function (asteroidDataItems, apiUrl) {
        var _this = this;
        http.request({ url: apiUrl, method: "GET" })
            .then(function (response) {
            if (response.statusCode >= 400) {
                console.log("Error status:" + response.statusCode);
                return;
            }
            else {
                console.log("Response status:" + response.statusCode);
            }
            var result = response.content.toJSON();
            for (var key in result) {
                if (result.hasOwnProperty(key)) {
                    var element = result[key];
                    if (key === "element_count") {
                        console.log("element_count: " + element);
                        _this.asteroidCount = element;
                        _this.notifyPropertyChange("asteroidCount", element);
                    }
                    if (key === "near_earth_objects") {
                        for (var subkey in element) {
                            if (element.hasOwnProperty(subkey)) {
                                var date = element[subkey];
                                //dates.push(date);
                                date.forEach(function (asteroid) {
                                    asteroid.estimated_diameter.meters.estimated_diameter_max = _this.formatNumber(asteroid.estimated_diameter.meters.estimated_diameter_max);
                                    asteroidDataItems.push(new AsteroidDataItem(asteroid));
                                });
                            }
                        }
                    }
                }
            }
        }).then(function (res) {
            return asteroidDataItems;
        }).catch(function (err) {
            console.log("AsteroidDataItems fetch error: " + err.stack);
        });
        return asteroidDataItems;
    };
    AsteroidViewModel.prototype.formatNumber = function (num) {
        return Math.round(num * 100) / 100;
    };
    AsteroidViewModel.prototype.formatDate = function (date) {
        var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    };
    return AsteroidViewModel;
}(observable_1.Observable));
exports.AsteroidViewModel = AsteroidViewModel;
var AsteroidDataItem = (function (_super) {
    __extends(AsteroidDataItem, _super);
    function AsteroidDataItem(source) {
        _super.call(this);
        this._source = source;
        if (this._source) {
            var property;
            for (property in this._source) {
                this.set(property, this._source[property]);
                if (property === "close_approach_data") {
                    // console.log(' PROP: '  + property + '\nVALUE: ' + this._source[property]);
                    // here you should take care of this ARRAY received for close_approach_data ...
                    // working for arr[0] !!!
                    this.set(property, this._source[property][0]);
                }
            }
        }
    }
    Object.defineProperty(AsteroidDataItem.prototype, "source", {
        get: function () {
            return this._source;
        },
        enumerable: true,
        configurable: true
    });
    return AsteroidDataItem;
}(observable_1.Observable));
exports.AsteroidDataItem = AsteroidDataItem;
//# sourceMappingURL=asteroid-view-model.js.map
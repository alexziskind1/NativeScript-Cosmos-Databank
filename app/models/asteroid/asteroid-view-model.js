"use strict";
// tslint:disable:max-line-length
var observable_1 = require("data/observable");
var observable_array_1 = require("data/observable-array");
var http = require("http");
var API_URL = "https://api.nasa.gov/neo/rest/v1/feed";
var API_KEY = "&api_key=jXRI5DynwdFVqt950uq6XMwZtlf6w8mSgpTJTcbX";
var AsteroidViewModel = (function (_super) {
    __extends(AsteroidViewModel, _super);
    function AsteroidViewModel() {
        var _this = _super.call(this) || this;
        _this._dataItems = new observable_array_1.ObservableArray();
        _this._asteroidCount = 0;
        return _this;
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
                                // dates.push(date);
                                date.forEach(function (asteroid) {
                                    asteroid.estimated_diameter.meters.estimated_diameter_max = _this.formatNumber(asteroid.estimated_diameter.meters.estimated_diameter_max);
                                    asteroid.estimated_diameter.meters.estimated_diameter_min = _this.formatNumber(asteroid.estimated_diameter.meters.estimated_diameter_min);
                                    asteroid.estimated_diameter.kilometers.estimated_diameter_max = _this.formatNumber(asteroid.estimated_diameter.kilometers.estimated_diameter_max);
                                    asteroid.estimated_diameter.kilometers.estimated_diameter_min = _this.formatNumber(asteroid.estimated_diameter.kilometers.estimated_diameter_min);
                                    asteroid.close_approach_data.sort(function (a, b) {
                                        var distA = a.miss_distance.kilometers;
                                        var distB = b.miss_distance.kilometers;
                                        return distA - distB;
                                    });
                                    asteroid.close_approach_data[0].miss_distance.kilometers = _this.formatNumber(asteroid.close_approach_data[0].miss_distance.kilometers);
                                    asteroid.close_approach_data[0].miss_distance.astronomical = _this.formatNumber(asteroid.close_approach_data[0].miss_distance.astronomical);
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
        var d = new Date(date), month = "" + (d.getMonth() + 1), day = "" + d.getDate(), year = d.getFullYear();
        if (month.length < 2) {
            month = "0" + month;
        }
        if (day.length < 2) {
            day = "0" + day;
        }
        return [year, month, day].join("-");
    };
    return AsteroidViewModel;
}(observable_1.Observable));
exports.AsteroidViewModel = AsteroidViewModel;
var AsteroidDataItem = (function (_super) {
    __extends(AsteroidDataItem, _super);
    function AsteroidDataItem(source) {
        var _this = _super.call(this) || this;
        _this._source = source;
        if (_this._source) {
            var property;
            for (property in _this._source) {
                _this.set(property, _this._source[property]);
            }
        }
        return _this;
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
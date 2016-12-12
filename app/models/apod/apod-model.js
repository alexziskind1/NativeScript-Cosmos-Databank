"use strict";
// tslint:disable:variable-name
var observable_1 = require("data/observable");
var http = require("http");
var credentials_1 = require("../../files/credentials");
var API_URL = "https://api.nasa.gov/planetary/apod";
var API_KEY = "?" + credentials_1.NASA_API_KEY;
var HD_PIC = "&hd=true";
// Parameter	Type	    Default	    Description
// date	        YYYY-MM-DD	today	    The date of the APOD image to retrieve
// hd	        bool	    False	    Retrieve the URL for the high resolution image
// api_key	    string	    DEMO_KEY	api.nasa.gov key for expanded usage
var ApodViewModel = (function (_super) {
    __extends(ApodViewModel, _super);
    function ApodViewModel() {
        var _this = _super.call(this) || this;
        _this._isPlayerVisible = false;
        _this._selectedDate = new Date();
        return _this;
    }
    Object.defineProperty(ApodViewModel.prototype, "isPlayerVisible", {
        get: function () {
            return this._isPlayerVisible;
        },
        set: function (value) {
            if (this._isPlayerVisible !== value) {
                this._isPlayerVisible = value;
                this.notifyPropertyChange("isPlayerVisible", value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApodViewModel.prototype, "dataItem", {
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
    Object.defineProperty(ApodViewModel.prototype, "selectedDate", {
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
    ApodViewModel.prototype.getUpdatedUrl = function () {
        return this._urlApod = API_URL + API_KEY + HD_PIC;
    };
    ApodViewModel.prototype.initDataItems = function (date) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.requestApod(_this.getUpdatedUrl(), date)
                .then(function (resultApodDataItem) {
                _this.dataItem = resultApodDataItem;
                resolve(_this.dataItem);
            });
        });
    };
    ApodViewModel.prototype.requestApod = function (apiUrl, date) {
        // default: no date === today
        if (date) {
            date = "&date=" + date;
            apiUrl = apiUrl + date;
        }
        return new Promise(function (resolve, reject) {
            http.request({ url: apiUrl, method: "GET" })
                .then(function (response) {
                // Argument (response) is HttpResponse!
                if (response.statusCode === 400) {
                    console.log("NO APOD for that date - err 400");
                    return;
                }
                var result = response.content.toJSON();
                return new ApodItem(result["copyright"], result["date"], result["explanation"], result["hdurl"], result["media_type"], result["service_version"], result["title"], result["url"]);
            }).then(function (resultApodDataItem) {
                try {
                    resolve(resultApodDataItem);
                }
                catch (e) {
                    reject(e);
                }
            }).catch(function (err) {
                console.log(err.stack);
            });
        });
    };
    return ApodViewModel;
}(observable_1.Observable));
exports.ApodViewModel = ApodViewModel;
var ApodItem = (function () {
    function ApodItem(copyright, date, explanation, hdurl, mediaType, serviceVersion, title, url) {
        this.copyright = copyright;
        this.date = date;
        this.explanation = explanation;
        this.hdurl = hdurl;
        this.media_type = mediaType;
        this.service_version = serviceVersion;
        this.title = title;
        this.url = url;
    }
    return ApodItem;
}());
exports.ApodItem = ApodItem;
//# sourceMappingURL=apod-model.js.map
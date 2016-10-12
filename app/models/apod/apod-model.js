"use strict";
var observable_1 = require("data/observable");
var http = require("http");
var API_URL = "https://api.nasa.gov/planetary/apod";
var API_KEY = "?api_key=jXRI5DynwdFVqt950uq6XMwZtlf6w8mSgpTJTcbX";
var HD_PIC = "&hd=true";
// Parameter	Type	    Default	    Description
// date	        YYYY-MM-DD	today	    The date of the APOD image to retrieve
// hd	        bool	    False	    Retrieve the URL for the high resolution image
// api_key	    string	    DEMO_KEY	api.nasa.gov key for expanded usage
var ApodViewModel = (function (_super) {
    __extends(ApodViewModel, _super);
    function ApodViewModel() {
        _super.call(this);
        this._selectedDate = new Date();
    }
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
        if (date) {
            return this.dataItem = this.requestApod(this.dataItem, this.getUpdatedUrl(), date);
        }
        else {
            return this.dataItem = this.requestApod(this.dataItem, this.getUpdatedUrl());
        }
    };
    ApodViewModel.prototype.requestApod = function (apodDataItem, apiUrl, date) {
        var _this = this;
        // default: no date === today
        if (date) {
            date = "&date=" + date;
            apiUrl = apiUrl + date;
        }
        http.request({ url: apiUrl, method: "GET" })
            .then(function (response) {
            // Argument (response) is HttpResponse!
            if (response.statusCode === 400) {
                console.log("NO APOD for that date - err 400");
                return;
            }
            var result = response.content.toJSON();
            apodDataItem = new ApodItem(result["copyright"], result["date"], result["explanation"], result["hdurl"], result["media_type"], result["service_version"], result["title"], result["url"]);
        }).then(function (res) {
            return _this.dataItem = apodDataItem;
        }).catch(function (err) {
            // console.log(err.stack);
        });
        return this.dataItem;
    };
    return ApodViewModel;
}(observable_1.Observable));
exports.ApodViewModel = ApodViewModel;
var ApodItem = (function () {
    function ApodItem(copyright, date, explanation, hdurl, media_type, service_version, title, url) {
        this.copyright = copyright;
        this.date = date;
        this.explanation = explanation;
        this.hdurl = hdurl;
        this.media_type = media_type;
        this.service_version = service_version;
        this.title = title;
        this.url = url;
    }
    return ApodItem;
}());
exports.ApodItem = ApodItem;
//# sourceMappingURL=apod-model.js.map
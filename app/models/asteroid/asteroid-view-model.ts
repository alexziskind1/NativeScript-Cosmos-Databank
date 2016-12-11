// tslint:disable:max-line-length
import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import http = require("http");

import { NASA_API_KEY } from "../../files/credentials";

let API_URL = "https://api.nasa.gov/neo/rest/v1/feed";
let API_KEY = "&" + NASA_API_KEY;

export class AsteroidViewModel extends Observable {

    private _dataItems: ObservableArray<AsteroidDataItem> = new ObservableArray<AsteroidDataItem>();
    private _asteroidCount: number = 0;
    private _url: string;

    constructor() {
        super();
    }

    public get dataItems() {
        return this._dataItems;
    }

    public set dataItems(value: ObservableArray<AsteroidDataItem>) {
        if (this._dataItems !== value) {
            this._dataItems = value;
            this.notifyPropertyChange("dataItems", value);
        }
    }

    public get asteroidCount() {
        return this._asteroidCount;
    }

    public set asteroidCount(value: number) {
        if (this._asteroidCount !== value) {
            this._asteroidCount = value;
            this.notifyPropertyChange("asteroidCount", value);
        }
    }

    public getUpdatedUrl() {
        var today = new Date();
        var requiredDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
        var dateRange = "?start_date=" + this.formatDate(today) + "&end_date=" + this.formatDate(requiredDate);
        return this._url = API_URL + dateRange + API_KEY;
    }

    public initDataItems() {
        this.dataItems = this.requestAsteroids(this.dataItems, this.getUpdatedUrl());
    }

    public requestAsteroids(asteroidDataItems: ObservableArray<AsteroidDataItem>, apiUrl: string) {

        http.request({ url: apiUrl, method: "GET" })
            .then(response => {
                if (response.statusCode >= 400) {
                    console.log("Error status:" + response.statusCode);
                    return;
                } else {
                    console.log("Response status:" + response.statusCode);
                }

                var result = response.content.toJSON();

                for (var key in result) {
                    if (result.hasOwnProperty(key)) {
                        var element = result[key];

                        if (key === "element_count") {
                            console.log("element_count: " + element);
                            this.asteroidCount = element;
                            this.notifyPropertyChange("asteroidCount", element);
                        }

                        if (key === "near_earth_objects") {
                            for (var subkey in element) {
                                if (element.hasOwnProperty(subkey)) {
                                    var date = element[subkey];
                                    // dates.push(date);
                                    date.forEach(asteroid => {
                                        asteroid.estimated_diameter.meters.estimated_diameter_max = this.formatNumber(asteroid.estimated_diameter.meters.estimated_diameter_max);
                                        asteroid.estimated_diameter.meters.estimated_diameter_min = this.formatNumber(asteroid.estimated_diameter.meters.estimated_diameter_min);
                                        asteroid.estimated_diameter.kilometers.estimated_diameter_max = this.formatNumber(asteroid.estimated_diameter.kilometers.estimated_diameter_max);
                                        asteroid.estimated_diameter.kilometers.estimated_diameter_min = this.formatNumber(asteroid.estimated_diameter.kilometers.estimated_diameter_min);

                                        asteroid.close_approach_data.sort(function (a, b) {
                                            let distA = a.miss_distance.kilometers;
                                            let distB = b.miss_distance.kilometers;
                                            return distA - distB;
                                        });

                                        asteroid.close_approach_data[0].miss_distance.kilometers = this.formatNumber(asteroid.close_approach_data[0].miss_distance.kilometers);
                                        asteroid.close_approach_data[0].miss_distance.astronomical = this.formatNumber(asteroid.close_approach_data[0].miss_distance.astronomical);

                                        asteroidDataItems.push(new AsteroidDataItem(asteroid));
                                    });
                                }
                            }
                        }
                    }
                }
            }).then(res => {
                return asteroidDataItems;
            }).catch(err => {
                console.log("AsteroidDataItems fetch error: " + err.stack);
            });

        return asteroidDataItems;
    }

    private formatNumber(num: number) {
        return Math.round(num * 100) / 100;
    }

    private formatDate(date) {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) {
            month = "0" + month;
        }
        if (day.length < 2) {
            day = "0" + day;
        }

        return [year, month, day].join("-");
    }
}

export class AsteroidDataItem extends Observable {

    private _source: AsteroidItem;
    constructor(source: AsteroidItem) {
        super();

        this._source = source;

        if (this._source) {
            var property: string;
            for (property in this._source) {
                this.set(property, this._source[property]);
            }
        }
    }

    get source(): AsteroidItem {
        return this._source;
    }
}

export interface ApiDataItem {
    links: Link;
    element_count: number;
    near_earth_objects: AsteroidsOnDate;
}

export interface AsteroidsOnDate {
    date: Array<AsteroidItem>;
}

export interface AsteroidItem {
    links: Link;
    neo_reference_id: string;
    name: string;
    nasa_jpl_url: string;
    absolute_magnitude_h: number;
    estimated_diameter: EstimatedDiameter;
    is_potentially_hazardous_asteroid: boolean;
    close_approach_data: Array<ApproachDate>;
    orbital_data: OrbitalData;
}

export interface Link {
    self: string;
}

export interface EstimatedDiameter {
    kilometers: Kilometers;
    meters: Meters;
}

export interface Kilometers {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
}

export interface Meters {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
}

export interface ApproachDate {
    close_approach_date: string;
    miss_distance: MissDistance;
    orbiting_body: string;
}

export interface MissDistance {
    astronomical: string;
    kilometers: string;
}

export interface OrbitalData {
    OrbitalData: string;
    orbit_determination_date: string;
    orbit_uncertainty: string;
    minimum_orbit_intersection: string;
    jupiter_tisserand_invariant: string;
    epoch_osculation: string;
    eccentricity: string;
    semi_major_axis: string;
    inclination: string;
    ascending_node_longitude: string;
    orbital_period: string;
    perihelion_distance: string;
    perihelion_argument: string;
    aphelion_distance: string;
    perihelion_time: string;
    mean_anomaly: string;
    mean_motion: string;
    equinox: string;
}
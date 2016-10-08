import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import http = require("http");

let API_URL = "https://api.nasa.gov/neo/rest/v1/feed";
var sample_date = "?start_date=2016-09-15&end_date=2016-09-20";
let API_KEY = "&api_key=jXRI5DynwdFVqt950uq6XMwZtlf6w8mSgpTJTcbX";


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

        return this._url = API_URL + sample_date + API_KEY; // change sample_date
    }

    public initDataItems(date?: string) {
        if (date) {
            this.dataItems = this.requestAsteroids(this.dataItems, this.getUpdatedUrl());           
        } else {
            this.dataItems = this.requestAsteroids(this.dataItems, this.getUpdatedUrl());
        }
    }
    
    public requestAsteroids(asteroidDataItems: ObservableArray<AsteroidDataItem>, apiUrl: string) {

        http.request({ url: apiUrl, method: "GET" })
            .then(response => {

                if (response.statusCode === 400) {
                    console.log("Error 400");
                    return;
                }

                var result = response.content.toJSON();

                var dates = new Array();
                // OK !!!
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
                                    dates.push(date);
                                }
                            }       
                        }
                    }
                }

                console.log("dates.length: " + dates.length);
                console.log("dates[0]: "  + dates[0])

                //var allAsteroids = new Array();
                dates.forEach(date => {
                    date.forEach(asteroid => {
                        var tmpAste = new AsteroidDataItem(asteroid);
                        asteroidDataItems.push(tmpAste);
                    });
                });

                // console.log("asteroidDataItems.len: " + allAsteroids.length);
                // console.log(allAsteroids[0].links.self);
                // OK!!!!!

            }).then(res => {
                return asteroidDataItems;
            }).catch(err => {

            })

        return asteroidDataItems;
    }

    private formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
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

                if (property === "close_approach_data") {
                    // console.log(' PROP: '  + property + '\nVALUE: ' + this._source[property]);
                    // here you should take care of this ARRAY received for close_approach_data ...
                    // working for arr[0] !!!
                    this.set(property, this._source[property][0]);
                }
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
    close_approach_data: ApproachDate; // working for arr[0]
    orbital_data: OrbitalData;
}

export interface Link {
    self: string;
}

export interface EstimatedDiameter {
    kilometers: Kilometers;
    meters: Meters
}

export interface Kilometers {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
}

export interface Meters {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
}

// export interface CloseApproachData {
//     data: Array<ApproachDate>
// }

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
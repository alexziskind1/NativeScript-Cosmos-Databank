import { Observable } from "data/observable";
import { ObservableArray } from "data/observable-array";
import http = require("http");

let API_URL = "https://api.nasa.gov/neo/rest/v1/feed";
var sample_date = "?start_date=2016-09-15&end_date=2016-09-20";
let API_KEY = "&api_key=jXRI5DynwdFVqt950uq6XMwZtlf6w8mSgpTJTcbX";


export class AsteroidViewModel extends Observable {

    private _dataItem: AsteroidDataItem;
    private _url: string;

    constructor() {
        super();

    }    

    public get dataItem() {   
        return this._dataItem;
    }

    public set dataItem(value: AsteroidDataItem) {
        if (this._dataItem !== value) {
            this._dataItem = value;
        }
    }


    public getUpdatedUrl() {
        return this._url = API_URL + sample_date + API_KEY; // change sample_date
    }

    public initDataItems(date?: string) {
        if (date) {
            this.requestApod(this.dataItem, this.getUpdatedUrl());           
        } else {
            this.requestApod(this.dataItem, this.getUpdatedUrl());
        }
    }
    
    public requestApod(asteroidDataItem: AsteroidDataItem, apiUrl: string) {
        var that = this;

        http.request({ url: apiUrl, method: "GET" }).then(function (response) {
            // Argument (response) is HttpResponse!
            if (response.statusCode === 400) {
                console.log("Error 400");
                return;
            }

            var result = response.content.toJSON();

            // OK !!!
            // for (var key in result) {
            //     if (result.hasOwnProperty(key)) {
            //         var element = result[key];
            //         console.log("key: " + key + " element:" + element);
            //         console.log("---------------");
                    
            //         for (var subkey in element) {
            //             if (element.hasOwnProperty(subkey)) {
            //                 var subElement = element[subkey];
            //                 console.log("subkey: " + subkey + " subElement:" + subElement);
            //                 console.log("=====================");

            //                 if(subkey === "near_earth_objects") {

            //                 }
            //             }
            //         }
            //     }
            // }

            // ???
            var newItem = result.map(i => {
                return new AsteroidDataItem(i.data);
            });



        }, function (e) {
            //// Argument (e) is Error!
        }).then(function() {
            that.notifyPropertyChange("dataItem", asteroidDataItem);
        })

    }

}

export class AsteroidDataItem extends Observable {

    private _source: ApiDataItem;
    constructor(source: ApiDataItem) {
        super();

        this._source = source;

        if (this._source) {
            var property: string;
            for (property in this._source) {
                this.set(property, this._source[property]);
                
                console.log(' PROP: '  + property + '\nVALUE: ' + this._source[property])
            }
        }
    }

    get source(): ApiDataItem {
        return this._source;
    }
}

interface ApiDataItem {
    links: Link;
    element_count: number;
    near_earth_objects: Array<AsteroidDate>;
}

interface AsteroidDate {
    data: Array<AsteroidItem>;
}

interface AsteroidItem {
    links: Link;
    neo_reference_id: string;
    name: string;
    nasa_jpl_url: string;
    absolute_magnitude_h: number;
    estimated_diameter: EstimatedDiameter;
    is_potentially_hazardous_asteroid: boolean;
    close_approach_data: CloseApproachData;
    orbital_data: OrbitalData;
}

interface Link {
    self: string;
}

interface EstimatedDiameter {
    kilometers: Kilometers;
    meters: Meters
}

interface Kilometers {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
}

interface Meters {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
}

interface CloseApproachData {
    data: Array<ApproachDate>
}

interface ApproachDate {
    close_approach_date: string;
    miss_distance: MissDistance;
    orbiting_body: string;
}

interface MissDistance {
    astronomical: string;
    kilometers: string;
}

interface OrbitalData {
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
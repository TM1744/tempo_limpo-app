export class Location {
    name: string;
    references: string;
    lat: number;
    lon: number;
    id: number;

    constructor (name: string, references: string, lat: number, lon: number, id: number) {
        this.name = name;
        this.references = references;
        this.lat = lat;
        this.lon = lon;
        this.id = id;
    }
}
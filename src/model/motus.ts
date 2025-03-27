export class Motus {
    id: string;
    value: number;
    note: string;
    creationDate: number;
    location?: Location;

    constructor(id: string, value: number, note: string, creationDate: number, location?: Location) {
        this.id = id;
        this.value = value;
        this.note = note;
        this.creationDate = creationDate;
        this.location = location;
    }
}

export interface Location {
    lat: number;
    long: number;
}
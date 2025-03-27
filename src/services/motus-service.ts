import { Motus } from "../model/motus";

export default class MotusService {
    moti: Motus[];
    constructor() {
        this.moti = [];
    }

    async loadMoti() {
        const localMotiString = localStorage.getItem('moti');
        if(localMotiString){
            this.moti = JSON.parse(localMotiString);
        }
        else{
            this.moti = await this.getMotiFromJson();
            this.saveMoti();
        }
        return this.moti;
    }

    getMotiFromJson(){
        return fetch('/assets/emotions.json')
              .then(resp => resp.json())
    }

    saveMoti(){
        localStorage.setItem('moti', JSON.stringify(this.moti));
        return this.moti;
    }

    addMotus(motus: Motus){
        this.moti.push(motus);
        this.saveMoti();
        return this.moti;
    }

    createMotusFromRawData(data: [Motus]) {
        console.log(data);
        const moti = [];
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            const newMotus = new Motus(element.id, element.value, element.note, element.creationDate, element.location);
            moti.push(newMotus);
        }
        return moti;
    }

    orderByCreationDate(moti: Array<Motus>) {
        return moti.sort((a, b) => b.creationDate - a.creationDate);
    }

    orderByCreationDateReverse(moti: Array<Motus>) {
        return moti.sort((a, b) =>  a.creationDate - b.creationDate);
    }

    orderByMotusValueReverse(moti: Array<Motus>) {
        return moti.sort((a, b) => b.value - a.value);
    }

    orderByMotusValue(moti: Array<Motus>) {
        return moti.sort((a, b) => a.value - b.value);
    }

    // editMotus(motus, index){
    //     this.moti[index] = motus;
    //     this.saveMoti()
    //     return this.moti;
    // }
}
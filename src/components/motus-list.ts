import MotusService from "../services/motus-service";
import { Motus } from "../model/motus";
import MotusCard from "./motus-card";
import MotusDialog from "./motus-dialog";

export default class MotusList extends HTMLElement {
    service: MotusService;
    moti: Motus[];

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.service = new MotusService();
        this.moti = [];
    }

    async connectedCallback(){
        const dialog = document.getElementById('motus-dialog') as MotusDialog;
        dialog.addEventListener('motus-added', async (e) => {
            const customEvent = e as CustomEvent;
            const motus = customEvent.detail;
            this.service.addMotus(motus);
            this.render();
        });

        this.moti = await this.service.loadMoti();
        this.styling();
        this.render();
    }


    styling(){
        const style = document.createElement('style');
        style.innerText = `
            .grid{
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 16px;
            }
            .add-btn{
                position: fixed;
                bottom: 10px;
                right: 10px;
                height: 64px;
                width: 64px;
                border-radius: 50%;
                font-size: 24px;
                background-color: gold;
                border: none;
                cursor: pointer;
                z-index: 1000;
            }
        `
        this.shadowRoot!.appendChild(style);
    }

    render(){
        let container = this.shadowRoot!.getElementById('container');
        if(container){
            container.innerHTML = '';         
        } else {
            container = document.createElement('div');
            container.id = 'container';
            this.shadowRoot!.appendChild(container);
        }

        const main = document.createElement('div');
        main.classList.add('grid') 
        for (let i = 0; i  < this.moti.length; i++) {
            this.service.orderByMotusValue(this.moti);
            const motus = this.moti[i];
            const card: MotusCard = document.createElement('motus-card') as MotusCard;
            card.setAttribute('selected-motus', JSON.stringify(motus));
            main.appendChild(card);
        }
        container.appendChild(main);  
        const addBtn = document.createElement('button');
        addBtn.classList.add('add-btn');
        addBtn.innerText = '➕';
        addBtn.addEventListener('click', () => { this.openDialog() });
        container.appendChild(addBtn);
    }

    openDialog() {
        const dialog = document.getElementById('motus-dialog') as MotusDialog;
        dialog.openDialog();
        // // randomizzatore di motus
        // const randomMotus: Motus = {
        //     id: `user1-${Date.now()}`,
        //     value: Math.floor(Math.random() * 5),
        //     note: "randomizzato",
        //     creationDate: Date.now(),
        //     location: {
        //         lat: 44.464664 + (Math.random() - 0.5) * 0.1,
        //         long: 8.888540 + (Math.random() - 0.5) * 0.1
        //     }
        // };
        // this.moti.push(randomMotus);
        // this.render();
    }
}
customElements.define('motus-list', MotusList);
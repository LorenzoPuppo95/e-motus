import { Motus } from "../model/motus";
import MotusService from "../services/motus-service";

export default class MotusDialog extends HTMLElement{
    service: MotusService;
    constructor(){
        super();
        this.service = new MotusService();
        this.attachShadow({mode: 'open'})
    }

    connectedCallback(){
        this.styling();
        this.render()
    }

    styling(){
        const style = document.createElement('style');
        style.innerText = `
        `
        this.shadowRoot!.appendChild(style);
    }

    render(){
        let dialog = document.createElement('dialog');
        dialog.id = 'motus-dialog';
        dialog.innerHTML = `
        <form id="motus-form">
            <label for="super-angry">🤬</label>
            <input type="radio" name="emotion" id="super-angry" value="0" />
            <label for="pretty-angry">😡</label>
            <input type="radio" name="emotion" id="pretty-angry" value="1" />
            <label for="angry">😠</label>
            <input type="radio" name="emotion" id="angry" value="2" />
            <label for="confused">🤨</label>
            <input type="radio" name="emotion" id="confused" value="3" />
            <label for="clown">🤡</label>
            <input type="radio" name="emotion" id="clown" value="4" />
            <label for="note">Note:</label>
            <textarea id="note" name="note" rows="4" cols="30"></textarea>
        </form>
        `
        const cancelBtn = document.createElement('button');
        cancelBtn.appendChild(document.createTextNode('cancella'));
        cancelBtn.addEventListener('click', () => {
            this.clearForm();
            dialog.close();
        });
        dialog.appendChild(cancelBtn);

        const okBtn = document.createElement('button');
        okBtn.appendChild(document.createTextNode('ok'));
        okBtn.addEventListener('click', () => {
            this.dispatchMotus();
            this.clearForm();
            dialog.close();
        });
        dialog.appendChild(okBtn);

        this.shadowRoot!.appendChild(dialog);
    }

    openDialog(){
        const dialog = this.shadowRoot!.getElementById('motus-dialog') as HTMLDialogElement;
        if (!dialog) {
            console.error('Dialog element not found');
            return;
        }
        dialog.showModal();
    }

    clearForm(){
        const form = this.shadowRoot!.getElementById('motus-form') as HTMLFormElement;
        if (!form) {
            console.error('Form element not found');
            return;
        }
        form.reset();
    }

    dispatchMotus(){
        const form = this.shadowRoot!.getElementById('motus-form') as HTMLFormElement;
        if (!form) {
            console.error('Form element not found');
            return;
        }
        const data = new FormData(form);
        const timestamp =  Date.now();
        const motusArray: Motus[] = this.service.createMotusFromRawData([{
            id: "user1-" + timestamp,
            value: parseInt(data.get('emotion') as string),
            note: data.get('note') as string,
            creationDate: timestamp,
            location: {
                lat: 44.464664 + (Math.random() - 0.5) * 0.1,
                long: 8.888540 + (Math.random() - 0.5) * 0.1
            }
        }]);
        const motus: Motus = motusArray[0];
        console.log(motusArray);
        const event = new CustomEvent('motus-added', {detail: motus});  
        this.dispatchEvent(event);
    }
}

customElements.define('motus-dialog', MotusDialog)
import { Motus } from '../model/motus';

export default class MotusCard extends HTMLElement{

    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    get motus(): Motus{
        return JSON.parse(this.getAttribute('selected-motus')!);
        // const motusStr = this.getAttribute('selected-motus');
        // if (motusStr) {
        //     return JSON.parse(motusStr);
        // }
        // return null;
    }

    // get index(){
    //     return this.getAttribute('selected-index');
    // }

    connectedCallback(){
        this.styling();
        this.render()
    }

    styling(){
        const style = document.createElement('style');
        style.innerText = `
            .card{
                border-radius: 8px;
                box-shadow: 0 0 15px -3px rgba(0,0,0,0.2);
                padding: 8px;
                display: flex;
                flex-direction: row;
                align-items: stretch;
            }
                
            .card .card-info{
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                text-align: center;
            }

            .card .card-info .controls-container{
                display: flex;
                justify-content: flex-end;
            }

            .card .emoticon{
                width: 100px;
                height: 100px;
                border-radius: 50%;
                align-content: center;
                font-size: xxx-large;
                text-align: center;
            }

            .card .date{
                font-size: 15px;
                color: #313131;
            }

            .card .note{
                font-size: 15px;
                color: #313131;
                resize: none;
                border: none;
            }
            .cancel-btn{
                border-radius: 50%;
                font-size: 15px;
                background-color: gold;
                border: none;
                cursor: pointer;
                width: 25px;
                height: 25px;
            }
        `
        this.shadowRoot!.appendChild(style);
    }

    render(){
        const mainDiv = document.createElement('div');
        mainDiv.classList.add('card');
        mainDiv.innerHTML = `
            <span class="emoticon">${this.fromValueToEmoji(this.motus.value)}</span>
            <div class="card-info">
                <span class="date">${this.fromTimestampToDate(this.motus.creationDate)}</span>
                <textarea rows="3" disabled class="note">${this.motus.note}</textarea>
                <div class="controls-container">
                    <button class="cancel-btn">✖</button>
                </div>
            </div> 
        `;
        this.shadowRoot!.appendChild(mainDiv);
    }

    fromValueToEmoji(value: number){
        switch(value){
            case 0:
                return '🤬';
            case 1:
                return '😡';
            case 2:
                return '😠';
            case 3:
                return '🤨';
            default:
                return '🤡';
        }
    }

    fromTimestampToDate(timestamp: number){
        const date = new Date(timestamp);
        return date.toLocaleDateString() + " - " + date.toLocaleTimeString();
    }
}
customElements.define('motus-card', MotusCard);
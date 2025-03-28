import MotusService from '../../services/motus-service';

export default class MotusBar extends HTMLElement{
    currentSortIndex: number;

    constructor(){
        super();
        this.attachShadow({mode: 'open'});
        this.currentSortIndex = 0;
    }

    connectedCallback(){
        this.styling();
        this.render();
    }

    styling(){
        const style = document.createElement('style');
        style.innerText = `
            .bar{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px;
                background-color: #f1f1f1;
                border-bottom: 1px solid #e0e0e0;
            }
            .bar .title{
                font-size: 24px;
            }
            .bar .add-btn{
                font-size: 24px;
                cursor: pointer;
            }
        `
        this.shadowRoot!.appendChild(style);
    }

    render(){
        let mainDiv = this.shadowRoot!.getElementById('motus-bar');
        if (mainDiv) {
            mainDiv.innerHTML = '';         
        } else {
            mainDiv = document.createElement('div');
            mainDiv.id = 'motus-bar';
            this.shadowRoot!.appendChild(mainDiv);
        }
        mainDiv.innerHTML = `
            <div class="bar">
                <span class="title">E-Motus</span>
                
            </div>
        `;

        const enterBtn = document.createElement('button');
        enterBtn.appendChild(document.createTextNode('Change order'));
        enterBtn.addEventListener('click', () => {
            this.cycleSort();
        });
        mainDiv.appendChild(enterBtn);
    }

    cycleSort() {
        const motusList = document.querySelector('motus-list') as any;
        if (!motusList) {
            alert('Motus list component not found!');
            return;
        }
        const service: MotusService = motusList.service;

        const sortFunctions = [
            service.orderByCreationDate.bind(service),
            service.orderByCreationDateReverse.bind(service),
            service.orderByMotusValue.bind(service),
            service.orderByMotusValueReverse.bind(service),
        ];

        this.currentSortIndex = (this.currentSortIndex + 1) % sortFunctions.length;
        sortFunctions[this.currentSortIndex](motusList.moti);

        motusList.render();
    }
}

customElements.define('motus-bar', MotusBar);
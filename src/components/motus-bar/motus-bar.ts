export default class MotusBar extends HTMLElement{

    constructor(){
        super();
        this.attachShadow({mode: 'open'});
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
        // <select id="ordering-type">
        //             <option value="">Select ordering type</option>
        //             <option value="orderByCreationDate">Order by creation date</option>
        //             <option value="orderByCreationDateReverse">Order by creation date reverse</option>
        //             <option value="orderByMotusValue">Order by motus value</option>
        //             <option value="orderByMotusValueReverse">Order by motus value reverse</option>
        //         </select>
        const enterBtn = document.createElement('button');
        enterBtn.appendChild(document.createTextNode('Enter'));
        enterBtn.addEventListener('click', () => {
        const selectedFunction = (document.getElementById('ordering-type') as HTMLSelectElement).value;
        if (selectedFunction || selectedFunction !== "") {
        } else {
            alert("Please select an ordering type.");
        }
        });
        mainDiv.appendChild(enterBtn);
    }
}

customElements.define('motus-bar', MotusBar);
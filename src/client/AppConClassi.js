import { Component } from "react";
import axios from 'axios';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { data: null };
    }
    render() {
        // funzione da eseguire quando l'utente clicca submit
        const handleSubmit = (e) => {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const formJson = Object.fromEntries(formData.entries());
            // chiama il nostro server con i parametri che vogliamo usare e poi (then) ->
            axios.get(`https://localhost:3001/${formJson.selectedFruit}`).then(
                (d) =>
                    // imposta lo stato del componente con i dati che abbiamo ricevuto
                    // ricordati che questo stato deve essere immutabile! devi passare un nuovo oggetto ogni volta
                    this.setState({ ...this.state, data: d.data })
            );
        }
        return <div className="App">
            <header className="App-header">
                <Select handleSubmit={handleSubmit} />
                {/* ogni dato che riceviamo, trasformiamolo in un elemento html */}
                {/* il ?. significa "se hai dati, vai avanti, altrimenti ritorna undefined" */}
                <ul>{this.state.data?.map((d) => <li key={d}>{d}</li>)}</ul>
            </header>
        </div>
    }
}

class Select extends Component {

    render({ handleSubmit }) {
        return (
            // quando clicchi Submit, esegui handleSubmit
            <form method="post" onSubmit={handleSubmit}>
                <label>
                    Scegli:
                    <select name="selectedFruit" defaultValue="orange">
                        <option value="frutta">Frutta</option>
                        <option value="verdura">Verdura</option>
                    </select>
                </label>
                <hr />
                <button type="submit">Submit</button>
            </form>
        )
    }
}

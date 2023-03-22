import './App.css';
import { useState } from 'react';
import axios from 'axios';

//l'ho fatto con funzioni qui ma ho fatto anche un file con classi
function App() {

  const [data, setData] = useState();

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
        setData(d.data)
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <Select handleSubmit={handleSubmit} />
        {/* ogni dato che riceviamo, trasformiamolo in un elemento html */}
        {/* il ?. significa "se hai dati, vai avanti, altrimenti ritorna undefined" */}
        <ul>{data?.map((d) => <li key={d}>{d}</li>)}</ul>
      </header>
    </div>
  );
}

function Select({ handleSubmit }) {
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

export default App;

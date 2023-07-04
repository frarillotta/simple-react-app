import './App.css';
import { useState } from 'react';
import axios from 'axios';

//l'ho fatto con funzioni qui ma ho fatto anche un file con classi
function App() {

  const [data, setData] = useState();

  // funzione da eseguire quando l'utente clicca submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // chiama il nostro server con i parametri che vogliamo usare e poi (then) ->
    axios.get(`https://localhost:3001/stations`).then(
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
        <ul>{data?.map((d) => <li key={d.id}>{d.name}</li>)}</ul>
      </header>
    </div>
  );
}

function Select({ handleSubmit }) {
  return (
    // quando clicchi Submit, esegui handleSubmit
      <button type="submit" onClick={handleSubmit}>Mostrami le stazioni</button>
  )
}

export default App;

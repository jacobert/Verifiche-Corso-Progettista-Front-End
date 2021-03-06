import React from 'react'
import {useState} from 'react'
import './App.css';
import logo from './logo.svg';

 

// Punti 1-3-4 : componenti

import Input from './components/Input.jsx';
import Logo from './components/Logo.jsx';
import Joke from './components/Joke.jsx';


const ALLJOKESBYKEYWORD = 'https://api.chucknorris.io/jokes/search?query=' 

function App() {

  const[input, setInput] = useState('');
  const[loading, setLoading] = useState(false);
  const[fetchedJoke, setFetchedJoke] = useState({})

  
  // Punto 2 e 4 - Chiamata all'API,  recupero delle citazioni e salvataggio nello state della eventuale prima citazione

  const getJokeByKeyword = async () =>{
    let barzellette = {}
    let errorX = false

    try {
      setLoading(true)
      let response = await fetch(`${ALLJOKESBYKEYWORD}${input}`)
      let data = await response.json()
      if (data && (data.status || data.result.length === 0)) throw new Error('Modificare parametri di ricerca!')

      barzellette = {...data.result[0]}
      
    } catch (error) {
        console.log(error.message)
        errorX=(true)

    } finally{
        setLoading(false)
        setFetchedJoke(!errorX ? {...barzellette} : {value: 'Nessuna citazione da mostrare per il parametro di ricerca inserito', categories: []})
    }
  }

  // Punto 1 - handler per l'input di testo

  const onInputTextChange  = (event) => {
    setInput(event.target.value); 
    }

  return (
    <div className="App">
      <div className="App-header">

        {/*Punto 3*/}
        <Logo 
          propsLoading={loading}
          propsLogo={logo}
        />
       
        {/*Punto 1*/}
        <Input 
          propsInput={input} 
          functionInput={onInputTextChange}
        />

        {/*Punto 2*/}
        <button
          className="Search-Button"
          onClick={getJokeByKeyword}
        >
          {/*disabled={input === ''? true: false }*/}
          <code>INIZIA LA RICERCA!</code>
        </button>
        
      </div>

      <div className="Content">
        <img
          src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png" 
          className="Chuck-Logo"
          alt="chuck-logo"
        />

        {/*Punto 4*/}
        <Joke 
          propsValue={fetchedJoke.value}
          propsCategories={fetchedJoke.categories}
        />


      </div>
      <div className="footer">
      <code>Esame di React per cfp-futura. Grazie ad <a href="https://api.chucknorris.io">api.chucknorris.io</a> per l'immagine e le api. Docente: Vito Vitale. Studente: </code>
      </div>
    </div>
  );
};

export default App;

import React, { useEffect, useState, } from 'react'
import './App.css';

//components

import Joke from './components/Joke'
import Logo from './components/Logo'
import CategoriesList from './components/CategoriesList'


const ALLCATEGORIESURL = 'https://api.chucknorris.io/jokes/categories'
const RANDOMJOKEBYCATURL = 'https://api.chucknorris.io/jokes/random?category=' 
const ALLLJOKESBYKEYWORD = 'https://api.chucknorris.io/jokes/search?query=' 
const launchErrorAlert = () => setTimeout(() => window.alert('errore!'), 500) 










// class App extends React.Component {
function App() {
  // inizializzazione
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [fetchedJoke, setFetchedJoke] = useState({})
  const [inputText, setInputText] = useState('')

  // getAllCategories
  // funzione che deve recuperare l'array di tutte le categorie esistenti e salvarlo
  const getAllCategories = async () => {
    let dataError = false
    let dataCategories = []
    try {
      setLoading(true)
      const response = await fetch(ALLCATEGORIESURL)
      const result = await response.json()
      if (!Array.isArray(result)) throw new Error('CATEGORY ERROR')
      dataCategories = [ '', ...result]
    } catch (err) {
      dataError = true
    } finally {
      setLoading(false)
      setError(dataError)
      setCategories(dataCategories)
    }
  }

  // onCategoryClick
  // funzione richiamata al click del componente CategoryButton
  const onCategoryClick = (cat) => (event) => {
    setSelectedCategory(cat)
    setFetchedJoke({})
  }

  // getRandomJokeByCat
  // funzione che recupera una singola barzelletta e la salva
  const getRandomJokeByCat = async () => {
    let dataError = false
    let dataRes = {}
    try {
      setLoading(true)
      const response = await fetch(`${RANDOMJOKEBYCATURL}${selectedCategory}`)
      const result = await response.json()
      if (result && result.status) throw new Error('NO SELECTED CATEGORY')
      dataRes = {...result}
    } catch (err) {
      dataError = true
      console.error('error?', err.message)
    } finally {
      setLoading(false)
      setError(dataError)
      setFetchedJoke(dataRes)
      setInputText('')
    }
  }

  // getJokeByKeyword
  // funzione che recupera le barzellette contenenti la parola chiave
  // digitata nel campo di testo
  const getJokeByKeyword = async () => {
    let dataError = false
    let dataRes = {}
    try {
      setLoading(true)
      setSelectedCategory('')
      const response = await fetch(`${ALLLJOKESBYKEYWORD}${inputText}`)
      const result = await response.json()
      console.log('result??', result)
      if (result && result.status) throw new Error('INVALID KEYWORD')
      if (result && result.result.length === 0) throw new Error('NO RESULTS')
      dataRes = {...result.result[0]}
    } catch (err) {
      dataError = true
      console.error('error?', err.message)
    } finally {
      setLoading(false)
      setError(dataError)
      setFetchedJoke(dataRes)
    }
  }

  // onInputTextChange
  // handler per l'input di testo
  const onInputTextChange = (event) => setInputText(event.target.value)

  // qui i lifecycle methods
  useEffect(() => {
    getAllCategories()
  }, [])

  useEffect(() => {
    if (error) launchErrorAlert()
  }, [error])

  // render () {
    return (
      <div className="App">
        <div className="App-header">
          <Logo
            loading={loading}
          />
          <input
            type="search"
            id="search" name="search"
            placeholder="Enter keyword here"
            value={inputText}
            onChange={onInputTextChange}
          />
          <button
            className="Search-Button"
            onClick={getJokeByKeyword}
            disabled={loading}
          >
            <code>CLICK TO SEARCH!</code>
          </button>
          <code>or: </code>
          <CategoriesList
            categories={categories}
            onCategoryClick={onCategoryClick}
          />
        </div>
        <div className="Content">
          <img
            src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png" 
            className="Chuck-Logo"
            alt="chuck-logo"
          />
          {selectedCategory !== '' && (
            <code>
              <h2>SELECTED CATEGORY:
                <span className="Selected-Cat">
                  {selectedCategory}
                </span>
              </h2>
            </code>
          )}
          <button
            className="Random-Button"
            onClick={getRandomJokeByCat}
            disabled={loading}
          >
            <h2>GET RANDOM JOKE FOR SELECTED CATEGORY</h2>
          </button>
          {Object.keys(fetchedJoke).length > 0 && <Joke {...fetchedJoke} />}
        </div>
        <div className="footer">
        <code>Esame di React per cfp-futura. Grazie ad <a href="https://api.chucknorris.io">api.chucknorris.io</a> per l'immagine e le api. Docente: Vito Vitale. Studente: jacobert </code>
        </div>
      </div>
    );
  // }
};

export default App;

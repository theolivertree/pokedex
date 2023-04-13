import axios from 'axios'
import React, { useState, useEffect } from 'react'
import './App.css'

export default function App() {

  const [list, setList] = useState([])

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon')
      .then((response) => { setList(response.data.results) })
      
  }
  )

  
  return (
    <div>
      {list.map((pokemon) => {
        pokemon.key = pokemon.url.split('/')[6]
        return (
          <PokeCard name={pokemon.name} url={pokemon.url} key={pokemon.key} />
        )
      })
  }
    </div>
  )
}

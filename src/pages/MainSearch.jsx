import './MainSearch.css'
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import SearchBar from '../components/SearchBar/SearchBar'
import PokeID from '../components/PokeID/PokeID'
import PokeInfos from '../components/PokeInfos/PokeInfos'

export default function MainSearch() {

    const [pokeSearch, setPokeSearch] = useState('')

    const [pokeList, setPokeList] = useState([])

    const mainURL = 'https://pokeapi.co/api/v2/pokemon?limit=20'

    useEffect(() => {
        axios.get(mainURL)
            .then((response) => {
                let pokemons = response.data.results
                pokemons.map((pokemon) => {
                    setPokeList(current => [...current, pokemon.name])
                })
            })
    }, [])

    return (
        <div className='MainSearch'>
            <SearchBar pokeSearch={pokeSearch} setPokeSearch={setPokeSearch} />
            <div className='MainContent'>
                <PokeID />
                <PokeInfos />
            </div>
        </div>
    )
}
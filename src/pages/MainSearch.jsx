import './MainSearch.css'
import React, {useState} from 'react'
import SearchBar from '../components/SearchBar/SearchBar'
import PokeID from '../components/PokeID/PokeID'
import PokeInfos from '../components/PokeInfos/PokeInfos'

export default function MainSearch() {

    const [pokeSearch, setPokeSearch] = useState('')

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
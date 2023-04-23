import './MainSearch.css'
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import SearchBar from '../components/SearchBar/SearchBar'
import PokeID from '../components/PokeID/PokeID'
import PokeInfos from '../components/PokeInfos/PokeInfos'
import { useQuery } from '@tanstack/react-query'

export default function MainSearch() {

    const [pokeSearch, setPokeSearch] = useState('')

    const { isLoading, error, data} = useQuery({
        queryKey: ["initialPokeFetch"],
        queryFn: () =>
            axios
                .get('https://pokeapi.co/api/v2/pokemon/?limit=20')
                .then((res) => res.data.results)
    })

    if (isLoading) return <p>Loading...</p>

    if (error) return <p>An error has ocurred: {error.message}</p>

    return (
        <div className='MainSearch'>
            <SearchBar pokeSearch={pokeSearch} setPokeSearch={setPokeSearch} initialData={data} />
            <div className='MainContent'>
                <PokeID />
                <PokeInfos />
            </div>
        </div>
    )
}
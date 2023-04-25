import './MainSearch.css'
import axios from 'axios'
import React, {useState, useEffect} from 'react'
import SearchBar from '../components/SearchBar/SearchBar'
import PokeID from '../components/PokeID/PokeID'
import PokeInfos from '../components/PokeInfos/PokeInfos'
import { useQuery } from '@tanstack/react-query'

export default function MainSearch() {

    //Estado que recebe o nome do Pokemon a ser pesquisado
    const [pokeSearch, setPokeSearch] = useState('')

    //Estado que recebe o URL contendo as informações do Pokemon
    const [searchedPokemonURL, setSearchedPokemonURL] = useState('https://pokeapi.co/api/v2/pokemon/1')

    // Query "initialPokeFetch"
    const { isLoading, error, data} = useQuery({
        queryKey: ["initialPokeFetch"],
        queryFn: () =>
            axios
                .get('https://pokeapi.co/api/v2/pokemon/?limit=20')
                .then((res) => res.data.results),
    })

    // Query que busca as informações do Pokemon
    const { isLoading: PokeInfoFetchIsLoading, data: PokeInfoFetchData, refetch: PokeInfoRefetch } = useQuery({
        queryKey: ["PokeInfoFetch"],
        queryFn: () => axios.get(searchedPokemonURL),
        refetchOnWindowFocus: false,
    })

    // Query executada logo depois da query acima
    const { isLoading: PokeInfo2FetchIsLoading, data: PokeInfo2FetchData, refetch: PokeInfo2Refetch } = useQuery({
        queryKey: ["PokeInfo2Fetch"],
        queryFn: () => axios.get('https://pokeapi.co/api/v2/pokemon-species/' + PokeInfoFetchData.data.id),
        refetchOnWindowFocus: false,
        enabled: !!PokeInfoFetchData,
    })

    if (isLoading) return <p>Loading...</p>

    if (error) return <p>An error has ocurred: {error.message}</p>

    return (

        <div className='MainSearch'>

            <SearchBar
                pokeSearch={pokeSearch}  
                setPokeSearch={setPokeSearch}
                initialData={data}
                PokeInfoRefetch={PokeInfoRefetch}
                PokeInfo2Refetch={PokeInfo2Refetch}
                searchedPokemonURL={searchedPokemonURL}
                setSearchedPokemonURL={setSearchedPokemonURL} />
            
            <div className='MainContent'>

                <PokeID
                    PokeInfoFetchIsLoading={PokeInfoFetchIsLoading}
                    PokeInfoFetchData={PokeInfoFetchData} />
                
                <PokeInfos
                    PokeInfoFetchIsLoading={PokeInfoFetchIsLoading}
                    PokeInfoFetchData={PokeInfoFetchData}
                    PokeInfo2FetchIsLoading={PokeInfo2FetchIsLoading}
                    PokeInfo2FetchData={PokeInfo2FetchData}
                    />
                
            </div>

        </div>
    )
}
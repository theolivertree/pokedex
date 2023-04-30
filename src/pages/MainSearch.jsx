import './MainSearch.css'
import axios from 'axios'
import React, {useState} from 'react'
import SearchBar from '../components/SearchBar/SearchBar'
import PokeID from '../components/PokeID/PokeID'
import PokeInfos from '../components/PokeInfos/PokeInfos'
import { useQuery } from '@tanstack/react-query'

export default function MainSearch() {

    //Estado que recebe o nome do Pokemon a ser pesquisado
    const [pokeSearch, setPokeSearch] = useState('')

    //Estado que recebe o URL contendo as informações do Pokemon
    const [searchedPokemonURL, setSearchedPokemonURL] = useState("https://pokeapi.co/api/v2/pokemon/1")

    const [pokemonID, setPokemonID] = useState(1)

    const [evolutionURL, setEvolutionURL] = useState('https://pokeapi.co/api/v2/evolution-chain/1')

    // Query "initialPokeFetch"
    const { error, data } = useQuery({
        queryKey: ["initialPokeFetch"],
        queryFn: () => 
            axios
                .get('https://pokeapi.co/api/v2/pokemon/?limit=20'),
    })

    // Query que busca as informações do Pokemon
    const { isLoading: PokeInfoFetchIsLoading, data: PokeInfoFetchData, is: PokeInfoFetchIs } = useQuery({
        queryKey: ["PokeInfoFetch", searchedPokemonURL],
        queryFn: async () => await
            axios
                .get(searchedPokemonURL),
    })

    // Query executada logo depois da query acima
    const { isLoading: PokeInfo2FetchIsLoading, data: PokeInfo2FetchData, isSuccess: PokeInfo2FetchIsSuccess } = useQuery({
        queryKey: ["PokeInfo2Fetch", pokemonID],
        queryFn: async () => await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`),
        refetchOnWindowFocus: false,
        enabled: !PokeInfoFetchIsLoading,
    })

    //Query que busca os dados de evolução depois da query acima
    const { data: evolutionChainData, refetch: evolutionChainRefetch, isLoading: evolutionChainFetchIsLoading, isSuccess: evolutionChainFetchIsSuccess } = useQuery({
        queryKey: ['evolutionChain', PokeInfo2FetchData],
        queryFn: async () => await axios.get(PokeInfo2FetchData.data.evolution_chain.url),
        enabled: !PokeInfo2FetchIsLoading,
    })

    // Somente quando a última query finaliza é que a aplicação renderiza
    if (!PokeInfo2FetchIsSuccess) return <p>Loading...</p>

    if (error) return <p>An error has ocurred: {error.message}</p>

    return (

        <div className='MainSearch'>

            <SearchBar
                pokeSearch={pokeSearch}
                setPokeSearch={setPokeSearch}
                initialData={data}
                setSearchedPokemonURL={setSearchedPokemonURL}
                evolutionChainRefetch={evolutionChainRefetch}
                setPokemonID={setPokemonID}
                PokeInfo2FetchData={PokeInfo2FetchData}
                setEvolutionURL={setEvolutionURL} />
            
            <div className='MainContent'>

                <PokeID
                    PokeInfoFetchIsLoading={PokeInfoFetchIsLoading}
                    PokeInfoFetchData={PokeInfoFetchData} />
                
                <PokeInfos
                    PokeInfoFetchIsLoading={PokeInfoFetchIsLoading}
                    PokeInfoFetchData={PokeInfoFetchData}
                    PokeInfo2FetchIsLoading={PokeInfo2FetchIsLoading}
                    PokeInfo2FetchData={PokeInfo2FetchData}
                    PokeInfoFetchIs={PokeInfoFetchIs}
                    evolutionChainData={evolutionChainData}
                    evolutionChainFetchIsLoading={evolutionChainFetchIsLoading}
                    />
            </div>

        </div>
    )
}
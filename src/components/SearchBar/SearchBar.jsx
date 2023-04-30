import './SearchBar.css'
import React, { useState } from 'react'
import { QueryClient } from '@tanstack/react-query'

export default function SearchBar(props) {

    let pokeSearch = props.pokeSearch
    let setPokeSearch = props.setPokeSearch
    let pokeSuggestionList = []
    let data = props.initialData
    let setSearchedPokemonURL = props.setSearchedPokemonURL
    let PokeInfo2FetchData = props.PokeInfo2FetchData

    let setEvolutionURL = props.setEvolutionURL

    let setPokemonID = props.setPokemonID

    // Função que gera uma lista com o nome de todos os Pokemons da base de dados
    data.data.results.map((pokemon) => {
        if (pokeSearch != '' && (String(pokemon.name).toLowerCase()).includes(String(pokeSearch).toLowerCase())) {
            pokeSuggestionList.push(pokemon.name)
        }
    })

    // Função que gera o dropdown de sugestões de pesquisa
    function dropDown(pokeSuggestionList) {

        let pokeSuggestionID = 0

        if (pokeSuggestionList.length != 0) {

            return (
                <div className='dropDown'>
                    {
                    
                        pokeSuggestionList.map((pokeName) => {
                            pokeSuggestionID++
                            return <div
                                onClick={() => setPokeSearch(pokeName)}
                                key={'pokeSuggestionID' + pokeSuggestionID} className='PokeSuggestion'>{pokeName}
                            </div>
                        })
                    }
                </div>
            )
        }
    }
    
    // Função que atualiza a URL do Pokemon e invalida as queries
    function buttonClick() {

        if (pokeSearch === '') {
            pokeSearch = 'bulbasaur'
        }

        let pokeArray = data.data.results
        let pokeID = (pokeArray.findIndex(pokemon => pokemon.name === pokeSearch)) + 1
        setPokemonID(pokeID)
        setEvolutionURL(PokeInfo2FetchData.data.evolution_chain.url)

        let selectedPokemon = data.data.results.filter((pokemon) => {
            
            return pokemon.name === pokeSearch
        })
        setSearchedPokemonURL(selectedPokemon[0].url)        
    }


    return (
        <div className='SearchBar'>
            <span className='logoSpan'>
                <a href="https://www.pokemon.com/br/" target='_blank'>
                    <img src="https://4.bp.blogspot.com/-NClwQIrF9dw/UKZtlzh3BUI/AAAAAAAADIU/UJJlJhrQRHo/s1600/Pokedex_DP.png" alt="" className='pokedexLogo'/>
                    <img src="https://1.bp.blogspot.com/-0V4itR_v87M/UtsCF-ehNYI/AAAAAAAABjU/UEQ5Jiy_85o/s1600/pokedex-3d-logo.png" alt="" className='pokedexText'/>
                </a>
            </span>
            <span className='SearchBarSpan'>
                <label htmlFor="">
                    <input type="text" value={pokeSearch} onChange={(e) => { setPokeSearch(e.target.value) }} placeholder='Search your Pokémon here...' />
                    {dropDown(pokeSuggestionList)}
                </label>
                <button onClick={() => {
                    buttonClick()
                    }}>Search</button>
            </span>
                <nav className='navS'>
                    <ul className='navList'>
                        <li>
                        <a href="https://github.com/theolivertree" target='_blank'>GitHub</a>
                        </li>
                        <li>
                        <a href="https://www.linkedin.com/in/guilherme-de-oliveira3d/" target='_blank'>Contact</a>
                        </li>
                    </ul>
                </nav>
        </div>
    )
}
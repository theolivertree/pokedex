import './SearchBar.css'
import React, {useState} from 'react'

export default function SearchBar(props) {

    let pokeSearch = props.pokeSearch
    let setPokeSearch = props.setPokeSearch

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
                    <input type="text" value={pokeSearch} onChange={(e) => {setPokeSearch(e.target.value)}} placeholder='Search your Pokémon here...'/>
                </label>
                <button>Search</button>
            </span>
                <nav className='navS'>
                    <ul className='navList'>
                        <li>
                        <a href="https://github.com/theolivertree" target=''>GitHub</a>
                        </li>
                        <li>
                            <a href="">Contact</a>
                        </li>
                    </ul>
                </nav>
        </div>
    )
}
import './PokeCard.css'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import PokeInfo from '../PokeInfo/PokeInfo'

export default function PokeCard(props) {
    
    const [dadosPokemon, setDadosPokemon] = useState(null)

    useEffect(() => {
        axios
            .get(props.url)
            .then((response) => { setDadosPokemon(response.data) })
        }
    )

    if (dadosPokemon === null) {
        return <></>
    } else {
        return (
            <div className='PokeCard'>
                <div className='PokeID'>
                    <p>N: {dadosPokemon.id}</p>
                    <p>{dadosPokemon.name}</p>
                    <img src={dadosPokemon.sprites.front_default} alt="" />
                </div>
                <div className='PokeI'>
                    <PokeInfo code={dadosPokemon.id} types={dadosPokemon.types} stats={dadosPokemon.stats} />
                </div>
            </div>
        )
    }

}
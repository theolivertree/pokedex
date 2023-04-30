import React from "react";
import './PokeMoveType.css'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function PokeMoveType(props) {

    let PokeMoveURL = props.typeURL
    let PokeMoveName = props.moveName
    let levelLearnedAt = props.levelLearnedAt
    let moveLearnMethod = props.moveLearnMethod

    const { data: pokeMoveFetchData, isLoading: pokeMoveFetchIsLoading } = useQuery({
        queryKey: ['pokeMoveFetch', PokeMoveURL],
        queryFn: () => axios.get(PokeMoveURL),
        refetchOnWindowFocus: false,
    })

    if (pokeMoveFetchIsLoading) {
        return <span>Fetching type...</span>
    }

    let pokeMoveDescription = pokeMoveFetchData.data.effect_entries[0].effect
    let pokeMovePower = pokeMoveFetchData.data.power
    let pokeMovePP = pokeMoveFetchData.data.pp

    return (

        <div className="PokeMoveType">
            <span className="pokeMoveName">
                {PokeMoveName}
            </span>
            <div className="hiddenInfo">
                <p>Description: {pokeMoveDescription}</p>
                <br />
                <p>Learn at level: {levelLearnedAt}</p>
                <br />
                <p>Learn Method: {moveLearnMethod}</p>
                <br />
                <p>Power: {pokeMovePower == '' ? 'None' : pokeMovePower}</p>
                <br />
                <p>PP: {pokeMovePP}</p>
            </div>
            <span className={`typeSpan ${pokeMoveFetchData.data.type.name}`}>
                {pokeMoveFetchData.data.type.name}
            </span>
        </div>

    )
}
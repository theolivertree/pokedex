import { useQuery } from '@tanstack/react-query'
import './PokeInfos.css'
import PokeMoveType from '../PokeMoveType/PokeMoveType'

export default function PokeInfos(props) {
    let evolutionChainFetchIsLoading = props.evolutionChainFetchIsLoading
    let PokeInfoFetchIsLoading = props.PokeInfoFetchIsLoading

    if (evolutionChainFetchIsLoading || PokeInfoFetchIsLoading) {
        return (
            <span className="loader"></span>
        )
    } else {

        let PokeInfoFetchData = props.PokeInfoFetchData
        let PokeInfo2FetchData = props.PokeInfo2FetchData
        let PokeDescription = PokeInfo2FetchData.data.flavor_text_entries[0].flavor_text
        let evolutionChainData = props.evolutionChainData
        let evolutionStage1 = evolutionChainData.data.chain.species.name
        let evolutionStage2 = evolutionChainData.data.chain.evolves_to[0].species.name
        let evolutionStage3 = evolutionChainData.data.chain.evolves_to[0].evolves_to[0].species.name

        // Este bloco de código monta um array de objetos que demonstra cada integrante da cadeia de evolução, assim como o seu level mínimo.
        let firstEvol = evolutionChainData.data.chain.species.name
        let secondEvol = evolutionChainData.data.chain.evolves_to[0].species.name
        let secondEvolMinLv = evolutionChainData.data.chain.evolves_to[0].evolution_details[0].min_level
        let thirdEvol = evolutionChainData.data.chain.evolves_to[0].evolves_to[0].species.name
        let thirdEvolMinLv = evolutionChainData.data.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level

        let evolutionChainArray = [
            {
                evolName: firstEvol,
                maxLevel: secondEvolMinLv
            },
            {
                evolName: secondEvol,
                maxLevel: thirdEvolMinLv
            },
            {
                evolName: thirdEvol,
                maxLevel: 100
            }
        ]

        let pokemonMaxLv = 100

        evolutionChainArray.forEach((pokemon) => {
            if (pokemon.evolName == PokeInfoFetchData.data.name) {
                pokemonMaxLv = pokemon.maxLevel
            }
        })

        let evolutionChain = `${evolutionStage1} => ${evolutionStage2} => ${evolutionStage3}`

        function evolvesFrom(string) {
            if (string === null) {
               return "None"
            }
        }

        let movesList = PokeInfoFetchData.data.moves

        let movesWithNoMachine = movesList.filter(move => 
            move.version_group_details[0].move_learn_method.name !== 'machine'
        ).filter(move => move.version_group_details[0].level_learned_at <= pokemonMaxLv).slice(0, 31)

        return (
            <div className='PokeInfos'>
                <div className='PokeDescription'>
                    <div>
                        <p>Description:</p>
                        <p>{PokeDescription}</p>
                    </div>
                </div>
                <div className='PokeMovesDiv'>
                    <span>Evolves from: {evolvesFrom(PokeInfo2FetchData.data.evolves_from_species)}</span><span>Evolves at lv: {pokemonMaxLv}</span>
                        <p>{PokeInfo2FetchData.data.generation.name}</p>
                        <p>Evolution Chain</p>
                        <p>{evolutionChain}</p>
                        <p>Moves</p>
                        {movesWithNoMachine.map(move => 
                            <div key={move.move.name + 'moveKey'} className='moveDiv'>

                                <PokeMoveType
                                    levelLearnedAt={move.version_group_details[0].level_learned_at}
                                    moveLearnMethod={move.version_group_details[0].move_learn_method.name}
                                    moveName={move.move.name}
                                    typeURL={move.move.url}>
                                </PokeMoveType>
                            </div>
                        )}

                </div>
            </div>
        )
    }
}

//PokeInfoFetchIsLoading.data.flavor_text_entries[0].flavor_text
import './PokeID.css'

export default function PokeID() {


    return (
        <div className='PokeID'>
            <div className='PokeIdImageName'>
                <p>ID: 001</p>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="" className='PokePhoto' />
                <p>Bulbasaur</p>
            </div>
            <div className='TypeandStatsDiv'>
                <div className='TypeDiv'>
                    <p>Teste1</p>
                    <p>Teste2</p>
                </div>
                <div className='StatsDiv'>
                    <p>teste1</p>
                    <p>teste2</p>
                    <p>teste3</p>
                    <p>teste4</p>
                    <p>teste5</p>
                    <p>teste6</p>
                </div>
            </div>
        </div>
    )
}
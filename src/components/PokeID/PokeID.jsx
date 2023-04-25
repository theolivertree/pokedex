import './PokeID.css'

export default function PokeID(props) {

    let PokeInfoFetchIsLoading = props.PokeInfoFetchIsLoading

    if (PokeInfoFetchIsLoading) {
        return (
            <span className="loader"></span>
        )
    } else {

        let PokeInfoFetchData = props.PokeInfoFetchData
        let PokeType = PokeInfoFetchData.data.types
        let PokeStats = PokeInfoFetchData.data.stats

        return (
            <div className='PokeID'>
                <div className='PokeIdImageName'>
                    <p>ID: {PokeInfoFetchData.data.id}</p>
                    <img src={PokeInfoFetchData.data.sprites.front_default} alt="" className='PokePhoto' />
                    <p>{PokeInfoFetchData.data.name}</p>
                </div>
                <div className='TypeandStatsDiv'>
                    <div className='TypeDiv'>
                        {PokeType.map((type) => {
                            return (
                                <div
                                    key={type.type.name + 'typekey'}
                                    className={'Type ' + type.type.name}>
                                    {type.type.name}
                                </div>
                            )
                        })}
                    </div>
                    <div className='StatsDiv'>
                        {PokeStats.map((stat) => {
                            return (
                                <p key={stat.stat.name + 'statkey'}>
                                    {stat.stat.name + ' : ' + stat.base_stat}
                                </p>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

    
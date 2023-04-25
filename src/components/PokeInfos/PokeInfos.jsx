import axios from 'axios'
import './PokeInfos.css'
import { useQuery } from '@tanstack/react-query'

export default function PokeInfos(props) {

    let PokeInfoFetchIsLoading = props.PokeInfoFetchIsLoading
    let PokeInfo2FetchIsLoading = props.PokeInfo2FetchIsLoading

    if (PokeInfoFetchIsLoading || PokeInfo2FetchIsLoading) {
        return (
            <span className="loader"></span>
        )
    } else {

        let PokeInfoFetchData = props.PokeInfoFetchData
        let PokeInfo2FetchData = props.PokeInfo2FetchData
        let PokeDescription = PokeInfo2FetchData.data.flavor_text_entries[0].flavor_text

        return (
            <div className='PokeInfos'>
                <div className='PokeDescription'>
                    <div>
                        <p>Description:</p>
                        <p>{PokeDescription}</p>
                    </div>
                </div>
                <div className='PokeMovesDiv'>

                </div>
            </div>
        )
    }
}

//PokeInfoFetchIsLoading.data.flavor_text_entries[0].flavor_text
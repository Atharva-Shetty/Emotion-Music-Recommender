import React, {useCallback, useState} from 'react'

function Table(props) {
    var { song_name, artists } = props.data
    var Arr_S = Object.values(song_name)
    var Arr_A = Object.values(artists)

    const [first, setfirst] = useState(false)

    if (props.state != first) {
        setfirst(props.state)
    }

    return (
         first && <>
            <div id='TableContent'>
                <span>Song Name</span>
                <span>Artist Name</span>

            </div>
            <div id='TableContent2'>
                <div id='left'>
                    {
                        Arr_S.map((el,i) => {
                            return (
                                <div key={i} className='tbleInneri'>
                                    <span>{el}</span>
                                </div>
                            )
                        })
                    }
                </div>
                <div id='right'>
                {
                        Arr_A.map((el,it) => {
                            var str = toString(el)
                            str = el.slice(el.indexOf('[') + 1, el.lastIndexOf(']'))
                           return (
                              <div key={it} className='tbleInneri'>
                                   <span>{str}</span>
                                </div>
                            )
                        })
                    }
                </div>

            </div>

        </>
    )
}

export default Table
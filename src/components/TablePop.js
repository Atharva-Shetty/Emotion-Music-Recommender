import React from 'react'

function TablePop(props) {
    var { song_name, artists } = props.data
    var Arr_S = Object.values(song_name)
    var Arr_A = Object.values(artists)
    return (
        <>
            <div id='TableContent2'>
                <div id='left'>
                    {
                        Arr_S.map((el) => {
                            return (
                                <div key={el} className='tbleInneri'>
                                    <span>{el}</span>
                                </div>
                            )
                        })
                    }
                </div>
                <div id='right'>
                    {
                        Arr_A.map((el) => {
                            var str = toString(el)
                            str = el.slice(el.indexOf('[') + 1, el.lastIndexOf(']'))
                            return (
                                <div key={el} className='tbleInneri'>
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

export default TablePop
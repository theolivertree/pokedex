import React, { useState, useEffect } from "react";
import './PokeInfo.css'

export default function PokeInfo(props) {
    let typeList = props.types
    let statsList = props.stats
    let keyCode = props.code

    

    return (
        <div className="PokeInfo">

            <div className="typeDiv">
                {   
                    typeList.map((type) => {
                    keyCode++
                    return (
                                <p key={keyCode + '_typeCode'} className={'PokeType ' + type.type.name}>{type.type.name}</p>
                    )
                })}
            </div>
            
            {statsList.map((stats) => {
                keyCode++
                return (
                    <p key={keyCode + '_statsCode'} className="PokeStats">{stats.stat.name}: {stats.base_stat}</p>
                )
            })}
            
        </div>
    )
}
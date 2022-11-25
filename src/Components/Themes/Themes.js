import React from 'react'
import Header from "../Header/Header";
import {useStore} from "../../store/store";

export default function Themes(){

    const language = useStore(state => state.language)

    return (
        <div>
            <Header/>
            {
                'current_language: ' + language
            }
        </div>
    )
}

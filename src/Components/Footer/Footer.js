import React from 'react'
import {useStore} from "../../store/store";
import './Footer.scss'

export default function Footer() {

    const language = useStore(state => state.language)

    const supportRedir = () => {
        window.location.replace(window.location.origin + '/help')
    }

    return(
        <div className='footer'>
            <div className='container'>
                <div className='footer_wrapper'>
                    <div className='footer_support' onClick={supportRedir}>
                        {
                            language === 'Ru' ?
                                'Написать в техподдержку'
                                :
                                'Техникалық қолдау қызметіне жазыңыз'
                        }
                    </div>
                    <div className='footer_copyright'>
                        ©2022 Lorem Ipsum
                    </div>
                </div>
            </div>
        </div>
    )
}

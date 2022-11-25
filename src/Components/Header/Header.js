import React from 'react'
import './Header.scss'

export default function Header(){
    return(
        <div className='header'>
            <div className='container'>
                <div className='header_logo_wrapper'>
                    <img className='header_logo' alt='logo'/>
                </div>
            </div>
        </div>
    )
}

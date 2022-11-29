import React, { useState } from 'react'
import './Header.scss'
import logo from '../../img/blank.svg'
import avatar from '../../img/avatar.svg'
import { SettingOutlined, ExportOutlined } from '@ant-design/icons';
import {useStore} from "../../store/store";
import {Link} from "react-router-dom";
import {ru_kz_dict} from "../../dictionaries/ru_kz_dict";

export default function Header(){

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const language = useStore((state) => state.language)
    const changeLanguage = useStore((state) => state.changeLanguage)
    const page = useStore((state) => state.active_page)
    const changeActivePage = useStore((state) => state.changePage)

    const menuClick = (page) => {
        changeActivePage(page)
        // if(!window.location.href.includes(page)){
        //     window.location.replace(window.location.origin + `/${page}`)
        // }
    }

    const profileMenuClick = (path) => {
        window.location.replace(window.location.origin + `/${path}`)
    }

    return(
        <div className='header' onClick={isMenuOpen ? () => setIsMenuOpen(false) : () => {}}>
            <div className='container'>
                <div className='header_wrapper'>
                    <div className='header_logo_wrapper'>
                        <img src={logo} className='header_logo' alt='logo'/>
                        <div className='header_logo_title'>
                            Lorem ipsum
                        </div>
                    </div>
                    <ul className='header_menu'>
                        <Link to='/themes' style={{textDecoration:'none'}}>
                            <li className={['header_menu_item', page === 'themes' ? 'active_menu_item' : ''].join(' ')} onClick={() => menuClick('themes')}>
                                {ru_kz_dict.temi[language]}
                            </li>
                        </Link>
                        <li className={['header_menu_item', page === 'settings' ? 'active_menu_item' : ''].join(' ')} onClick={() => menuClick('settings')}>
                            {ru_kz_dict.settings[language]}
                        </li>
                        <li className={['header_menu_item', page === 'help' ? 'active_menu_item' : ''].join(' ')} onClick={() => menuClick('help')}>
                            {ru_kz_dict.help[language]}
                        </li>
                    </ul>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
                        <div className='header_user_wrapper'>
                            <div className='header_user_img_wrapper'>
                                <img src={avatar} className='header_user_img' alt='avatar'/>
                            </div>
                            <div className='header_user_login'>Test@gmail.com</div>
                            <div className='header_user_menu_button' onClick={() => {setIsMenuOpen(!isMenuOpen)}}></div>
                            <ul className={['header_user_menu', isMenuOpen ? 'active' : ''].join(' ')}>
                                <div className='header_user_name'>
                                    Test User
                                </div>
                                <div className='divider'></div>
                                <li className='header_user_menu_item' onClick={() => {profileMenuClick('profile')}}>
                                    <SettingOutlined style={{color: '#007eff'}}/> Профиль
                                </li>
                                <li className='header_user_menu_item' onClick={() => {profileMenuClick('login')}}>
                                    <ExportOutlined style={{color: '#007eff'}}/> {ru_kz_dict.exit[language]}
                                </li>
                            </ul>
                        </div>
                        <div className='header_language'>
                            <div className={['header_language_item', language === 'ru' ? 'language_active' : ''].join(' ')} onClick={() => changeLanguage('ru')}>
                                Ру
                            </div>
                            /
                            <div className={['header_language_item', language === 'kz' ? 'language_active' : ''].join(' ')} onClick={() => changeLanguage('kz')}>
                                Кз
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={['header_overlay', isMenuOpen ? 'overlay_active' : ''].join(' ')} onClick={() => setIsMenuOpen(false)}></div>
        </div>
    )
}

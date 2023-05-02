import React, {useState} from 'react';
import {ru_kz_dict} from "../../dictionaries/ru_kz_dict";
import { PlusSquareOutlined } from "@ant-design/icons";
import {useStore} from "../../store/store";
import {Select} from "antd";
import {themes_dict} from "../../dictionaries/themes_dict";
import '../ThemeItem/ThemeItem.scss'
import {left_bar_dictionary} from "../../dictionaries/left_bar_dictionary";
import {icons_dict} from "../../dictionaries/icons_dict";

function LeftBar(props) {

  const leftBarTab = useStore(state => state.leftBarTab)
  const changeLeftBarTab = useStore(state => state.changeLeftBarTab)
  const dataSource = useStore(state => state.dataSource)
  const changeActiveTheme = useStore(state => state.changeActiveTheme)
  const active_theme = useStore(state => state.active_theme)
  const language = useStore(state => state.language)

  const left_bar_menu = Object.entries(left_bar_dictionary[language]).map(([key, value]) => {
    return {
      id: key,
      name: value,
      icon: icons_dict[key],
    }
  })

  const select_options = dataSource.map(item => {
    return {
      value: themes_dict[item.name],
      label: item.name
    }
  })

  const menuClick = (id) => {
    changeLeftBarTab(id)
    console.log('menu item clicked id', id)
  }

  const onSelectChange = (value) => {
    changeActiveTheme(value)
  }

  return (
    <div className='themeItem_left_bar'>
      <div style={{display: 'flex', alignItems: 'center', marginLeft: '20px'}}>
        <h1 className='themeItem_left_bar_title'>{ru_kz_dict.temi[language]}</h1>
        <div className='themeItem_left_bar_button'>
          <PlusSquareOutlined />
        </div>
      </div>
      <Select
        className='themeItem_left_bar_select'
        defaultValue={active_theme || 0}
        showSearch
        onChange={onSelectChange}
        options={select_options}
      />
      <ul className='themeItem_left_bar_menu'>
        {
          left_bar_menu.map(item => {
            return <li
              key={item.id}
              className={[
                'themeItem_left_bar_menu_item',
                leftBarTab === item.id ? 'menu_active_item' : ''
              ].join(' ')}
              onClick={() => menuClick(item.id, item.name)}
            >
              {item.icon}
              {item.name}
            </li>
          })
        }
      </ul>
    </div>
  );
}

export default LeftBar;
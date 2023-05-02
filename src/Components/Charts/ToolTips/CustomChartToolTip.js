import React from 'react';
import {useStore} from "../../../store/store";
import {ru_kz_dict} from "../../../dictionaries/ru_kz_dict";

function CustomChartToolTip({active, payload, label}){

  const language = useStore(state => state.language)

  if(active && payload && payload.length > 0){
    const tooltip_dict = {
      negative: 'Негатив',
      positive: 'Позитив',
      mentions: ru_kz_dict.count_upominaniy[language],
    }
    return (
      <div className='chart_tooltip'>
        <div className='chart_tooltip_text'>{(language === 'Ru' ? 'Дата: ' : 'Күні: ') + label}</div>
        {
          payload[1] ?
            <div className='chart_tooltip_text'>{tooltip_dict[payload[1].name] + ': ' + payload[1].value}</div>
            :
            ''
        }
        {
          payload[0] ?
            <div className='chart_tooltip_text'>{tooltip_dict[payload[0].name] + ': ' + payload[0].value}</div>
            :
            ''
        }
        {
          payload[2] ?
            <div className='chart_tooltip_text'>{tooltip_dict[payload[2].name] + ': ' + payload[2].value}</div>
            :
            ''
        }
      </div>
    )
  }
}

export default CustomChartToolTip;
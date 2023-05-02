import React from 'react';
import {useStore} from "../../../store/store";

function RadarChartToolTip({active, payload}){

  const language = useStore(state => state.language)

  if(active && payload && payload.length > 0){
    return (
      <div className='chart_tooltip'>
        <div className='chart_tooltip_text'>{payload[0].payload.name + ': ' + payload[0].value}</div>
      </div>
    )
  }
}

export default RadarChartToolTip;
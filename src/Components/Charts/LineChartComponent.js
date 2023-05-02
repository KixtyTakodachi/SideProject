import React from 'react';
import '../ThemeItem/ThemeItem.scss'
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import CustomChartToolTip from "./ToolTips/CustomChartToolTip";

function LineChartComponent(props) {
  const { legendsFilter, chartData } = props
  return (
      <LineChart width={642} height={200} data={chartData}>
        {
          !legendsFilter.includes('positive') ?
            <Line type={'monotone'} dataKey={'positive'} stroke={'#8fc144'}/>
            :
            ''
        }
        {
          !legendsFilter.includes('mentions') ?
            <Line type={'monotone'} dataKey={'mentions'} stroke={'#4779d0'}/>
            :
            ''
        }
        {
          !legendsFilter.includes('negative') ?
            <Line type={'monotone'} dataKey={'negative'} stroke={'#cf6662'}/>
            :
            ''
        }
        <CartesianGrid stroke={'#b6b6b6'}/>
        <XAxis dataKey={'date'}/>
        <YAxis />
        <Tooltip content={<CustomChartToolTip />}/>
      </LineChart>
  );
}

export default LineChartComponent;
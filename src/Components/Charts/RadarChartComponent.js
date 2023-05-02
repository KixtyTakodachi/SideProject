import React from 'react';
import {PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, Tooltip} from "recharts";
import RadarChartToolTip from "./ToolTips/RadarChartToolTip";

function RadarChartComponent(props) {
  const { radarChartData } = props
  return (
    <RadarChart width={642} height={230} data={radarChartData}>
      <PolarGrid/>
      <PolarAngleAxis dataKey={'name'}/>
      <PolarRadiusAxis angle={30} domain={[0, 310]}/>
      <Radar dataKey={'value'} stroke={'#4779d0'} fill={'#4779d0'} opacity={0.6}/>
      <Tooltip content={<RadarChartToolTip />}/>
    </RadarChart>
  );
}

export default RadarChartComponent;
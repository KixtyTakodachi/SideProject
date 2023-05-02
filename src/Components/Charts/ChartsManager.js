import React from 'react';
import '../ThemeItem/ThemeItem.scss'
import LineChartComponent from "./LineChartComponent";
import PieChartComponent from "./PieChartComponent";

function ChartsManager(props) {
  const { activeTab, chartData, pieChartData, legendsFilter } = props
  switch (activeTab){
    case '0': {
      return (
        <>
          <div className='chart_wrapper'>
            <h1 className='chart_title'>Количество упоминаний</h1>
            <LineChartComponent
              legendsFilter={legendsFilter}
              chartData={chartData}
            />
          </div>
          <div className='chart_wrapper'>
            <h1 className='chart_title'>Вовлеченность</h1>
            <LineChartComponent
              legendsFilter={legendsFilter}
              chartData={chartData}
            />
          </div>
          <div className='chart_wrapper'>
            <h1 className='chart_title'>Аудитория</h1>
            <LineChartComponent
              legendsFilter={legendsFilter}
              chartData={chartData}
            />
          </div>
        </>
      )
    }
    case '2': {
      return(
        <>
          <div className='chart_wrapper'>
            <h1 className='chart_title'>Динамика упоминаний</h1>
            <LineChartComponent
              legendsFilter={legendsFilter}
              chartData={chartData}
            />
          </div>
          <div className='chart_wrapper'>
            <h1 className='chart_title'>Распределение тональности</h1>
            <PieChartComponent
              pieChartData={pieChartData}
            />
          </div>
        </>
      )
    }
    default: {
      return (
        <>
          <div className='chart_wrapper'>
            <h1 className='chart_title'>Количество упоминаний</h1>
            <LineChartComponent
              legendsFilter={legendsFilter}
              chartData={chartData}
            />
          </div>
          <div className='chart_wrapper'>
            <h1 className='chart_title'>Вовлеченность</h1>
            <LineChartComponent
              legendsFilter={legendsFilter}
              chartData={chartData}
            />
          </div>
          <div className='chart_wrapper'>
            <h1 className='chart_title'>Аудитория</h1>
            <LineChartComponent
              legendsFilter={legendsFilter}
              chartData={chartData}
            />
          </div>
          <div className='chart_wrapper'>
            <h1 className='chart_title'>Распределение тональности</h1>
            <PieChartComponent
              pieChartData={pieChartData}
            />
          </div>
        </>
      )
    }
  }
}

export default ChartsManager;
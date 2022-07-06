import React, { Component } from 'react'
import Plot from 'react-plotly.js'
import styles from './BarChar.module.css'

 const BarChar = (props) => {
    const onClickHandler = ()=> {
        props.onFetch(props.requestBody)
    }
    //chart properties

    let content;
    if (props.chartData.data) {
    if (Object.keys(props.chartData.data).length > 0) {
        let y = Object.values(props.chartData.data);
        let dataLabels = y.map(el => {
            if (el > 0)
                return el;
            else 
                return '';
        })
        let sum = y.reduce((sum, el) => {return sum+=el},0)
        let chartTitle
        let x;
        
        if (props.chartData.mode === 'day') {
            x = Object.keys(props.chartData.data).map(el => el.slice(11,13)+'h');
            chartTitle = `Всего слушателей за сутки: ${sum}`
        }
        if (props.chartData.mode === 'month') {
            x = Object.keys(props.chartData.data).map(el =>  el.slice(8));//.split('-').reverse().join('-'));
            chartTitle = `Всего слушателей за месяц: ${sum}`
        }
        if (props.chartData.mode === 'year') {
            x = Object.keys(props.chartData.data).map(el => el.split('-').reverse().join('-'));
            chartTitle = `Всего слушателей за год: ${sum}`
        }
        
        const data = {
            x,
            y,
            type: 'bar',
            text: dataLabels,
            textposition: 'outside',

            marker: {
                color: 'rgb(1, 114, 236)',
                line: {
                  color: 'rgb(1,113,236)',
                  width: 1
                }
              }
        }
        const layout = {         
            title: {
                text: chartTitle,
                font: {
                  family: 'Cambria, Cochin, Georgia, Times, serif',
                  size: 20
                }
            },
            width: 700, height: 450,
            xaxis: {
                autotick: false,
                showticklabels: true,
                tickangle: -30,
                tickfont: {
                    size: 10,
                    color: 'black'
                },
                showline: false,
                    //domain: [0, 1],
                showgrid: true,
                rangemode: "tozero"
            },
            yaxis: {
                zeroline: false, 
                rangemode: "tozero"
            },
            margin: {
                l: 50,
                r: 50,
                b: 50,
                t: 70
            },
            
        }
        content = <Plot data = {[data]} layout={layout }/>
    } 
}
    if (props.error) {
        content = <div className={styles.err}>
            <p>Ошибка</p>
            {/* <p>{props.error}</p> */}
            <button onClick={onClickHandler}>Перезагрузить</button>
        </div>
    }
    if (props.isLoading) {
        content = <div className={styles.loading}></div>
    }
    return (
        <div className={styles.chartContainer}>
            {content}
        </div>
    )
}
export default BarChar
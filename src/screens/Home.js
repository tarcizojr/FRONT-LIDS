import './Home.css';
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import ApiService from "../services/ApiService";



export default class Home extends React.Component {

    state = {
        chartData:[{}],
        chartOptions:[{}],
        
    }
 

    componentDidMount(){           
        this.useEffect();
        this.service = new ApiService();
        this.service.autenticado();
    }

   
    
    useEffect = () => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['Cadastrados', 'Ativos', 'Concluidos', 'Cancelados'],
            datasets: [
                {
                    data: [11, 7, 3, 1],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'), 
                        documentStyle.getPropertyValue('--yellow-500'), 
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--red-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'), 
                        documentStyle.getPropertyValue('--yellow-400'), 
                        documentStyle.getPropertyValue('--green-400'),
                        documentStyle.getPropertyValue('--red-400')
                    ]
                }
            ]
        }
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };
        this.setState({chartData:data});
        this.setState({chartOptions:options});
        
    }

    

    render(){
       
            return (
                <div className='container'>
                    <div className='mostragem1'>
                        <h2>Projetos</h2>
                        <Chart id='grafico1' type="pie" data={this.state.chartData} options={this.state.chartOptions} className="w-full md:w-30rem" />
                    </div>
                </div>
            )
        
       
    }
}
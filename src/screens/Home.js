import './Home.css';
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';

export default function Home() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
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

        

        setChartData(data);
        setChartOptions(options);
    }, []);

    

    return (
        <div className='container'>
            <div className='mostragem1'>
                <h2>Projetos</h2>
                <Chart id='grafico1' type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
            </div>
        </div>
    )
}
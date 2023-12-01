import React from "react";
import { Card } from 'primereact/card';

import { Button } from 'primereact/button';

import { AiFillDelete, AiFillEdit, AiFillClockCircle } from "react-icons/ai";

// eslint-disable-next-line import/no-anonymous-default-export
export default props =>{
    let hrs ='1'
    let r = (
        <div className="card">
            <Card>
                <div className="escalas">
                    <p className="tipo">{'Dia'}</p>
                    <p className="hE">{'Data Entrada'}</p>
                    <p className="hS">{'Data Saida'}</p>
                    <p> {'Horas Trabalhadas'}</p>
                </div>

                <div className="card-butons">
                    
                </div>
            </Card>
        </div>
    )
    
    let card = '';
    const rows = props.pontos.map(ponto =>{
       
        if (ponto.id === "") {
          card = (
            <div className="card">
              <div id="status" className="center sem-info">
                <p>Sem Ponto Cadatrado</p>
              </div>
            </div>
          );
        } else {
            const dataEntrada = ponto.entrada;
            const dataE = new Date(dataEntrada);
            const optionsE = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
            const formatoBrasileiroE = new Intl.DateTimeFormat('pt-BR', optionsE);
            const dataEntradaFormatada = formatoBrasileiroE.format(dataE);

            let dataSaidaFormatada;
            if(ponto.saida){
                const dataSaida = ponto.saida;
                const dataS = new Date(dataSaida);
                const optionsS = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
                const formatoBrasileiroS = new Intl.DateTimeFormat('pt-BR', optionsS);
                dataSaidaFormatada = formatoBrasileiroS.format(dataS);
            }
            
            //================
            let diferencaEmHoras = 0
            if(ponto.saida){
                const entrada = new Date(ponto.entrada);
                const saida = new Date(ponto.saida);            
                const diferencaEmMilissegundos = saida - entrada;

                // Calcular horas e minutos
                const horas = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60));
                const minutos = Math.floor((diferencaEmMilissegundos % (1000 * 60 * 60)) / (1000 * 60));

                diferencaEmHoras = `${horas}h ${minutos}min`
                hrs = diferencaEmHoras
            }
            
           
            card = (
                <div className="card">
                    <Card>
                        <div className="escalas">
                            <p className="tipo">{dataE.getDate()}</p>
                            <p className="hE">{dataEntradaFormatada}</p>
                            <p className="hS">{dataSaidaFormatada}</p>
                            <p> {diferencaEmHoras}</p>
                        </div>

                        <div className="card-butons">
                            
                        </div>
                    </Card>
                </div>
            )
        }
        return(
            card
        )
    })
    return(
        <div>
            {r}
            {rows}
        </div>
    )
}
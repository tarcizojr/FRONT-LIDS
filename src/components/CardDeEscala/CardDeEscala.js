import React from "react";
import { Card } from 'primereact/card';
import './CardDeEscala.css';

import { Button } from 'primereact/button';

import { AiFillDelete, AiFillEdit, AiFillClockCircle } from "react-icons/ai";

// eslint-disable-next-line import/no-anonymous-default-export
export default props =>{
    
    let card = '';
    const rows = props.escalas.map(escala =>{
       
        if (escala.id === "") {
          card = (
            <div className="card">
              <div id="status" className="center sem-info">
                <p>Sem Escala Cadatrada</p>
              </div>
            </div>
          );
        } else {
            card = (
                <div className="card">
                    <Card>
                        <div className="escalas">
                            <p className="tipo">{escala.tipo}</p>
                            <p className="hE">{escala.horarioEntrada}</p>
                            <p className="hS">{escala.horarioSaida}</p>

                        </div>

                        <div className="card-butons">
                            <Button 
                        onClick={(e) => props.delete(escala.id)}
                        title="Deletar Escala" severity="warning" aria-label="Deletar Escala">
                            <AiFillDelete></AiFillDelete>
                        </Button>
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
            {rows}
        </div>
    )
}
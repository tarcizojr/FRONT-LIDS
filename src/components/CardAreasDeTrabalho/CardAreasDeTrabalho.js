import React from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

import { AiFillDelete, AiFillEdit, AiFillClockCircle } from "react-icons/ai";
import { BiSolidUserDetail } from "react-icons/bi";

// eslint-disable-next-line import/no-anonymous-default-export
export default props =>{

    let card = '';
    const rows = props.areas.map(area =>{
       console.log(area)
        if (area.id === "") {
          card = (
            <div className="card">
              <div id="status" className="center sem-info">
                <p>Sem Area Cadatrado</p>
              </div>
            </div>
          );
        } 
        else {
                       
          card = (
            <div className="card">
            <Card>
                <div className="left-projeto">
                    <p className="titulo">
                        {area.nome}
                    </p>
                    <p>
                        {area.codigo}
                    </p>
                   
                </div>

                <div id="status" className="center">
                    <p>
                        {area.codigo}
                    </p>
                </div>

                <div className="card-butons">
                    <Button title="Editar Area de Trabalho" severity="warning" aria-label="Editar Area de Trabalho"
                    onClick={(e) => props.editar(area.id)}>
                        <AiFillEdit></AiFillEdit>
                    </Button>

                    <Button
                    onClick={(e) => props.listarColaboradores(area.id)}
                    title="Listar Colaboradores" severity="warning" aria-label="Listar Colaboradores">
                        <BiSolidUserDetail></BiSolidUserDetail>
                    </Button>

                    <Button 
                    onClick={(e) => props.delete(area.id)}
                    title="Deletar Projeto" severity="warning" aria-label="Deletar Area de Trabalho">
                        <AiFillDelete></AiFillDelete>
                    </Button>
                </div>
            </Card>
            </div>
          );
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
import React from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

import { AiFillDelete, AiFillEdit, AiFillClockCircle } from "react-icons/ai";
import { BiSolidUserDetail } from "react-icons/bi";
import { BsFillImageFill } from "react-icons/bs";

// eslint-disable-next-line import/no-anonymous-default-export
export default props =>{

    let card = '';
    card = (
        <div className="card">
          <div id="status" className="center sem-info">
            <p>Sem Area Cadatrado</p>
          </div>
        </div>
      );
      console.log(props, "teste")
    const rows = props.areas.map(area =>{
       console.log(area, "t4ste")
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
                    <p >
                        {area.codigo}
                    </p>
                    <p className="titulo">
                        {area.nome}
                    </p>
                   
                </div>

                <div id="status" className="center">
                    <p>
                        {area.descricao}
                    </p>
                </div>

                <div className="card-butons">
                    <Button title="Editar Area de Trabalho" severity="warning" aria-label="Editar Area de Trabalho"
                    onClick={(e) => props.editar(area.id)}>
                        <AiFillEdit></AiFillEdit>
                    </Button>

                    <Button
                    onClick={(e) => props.listarEquipamentos(area.id)}
                    title="Listar Equipamentos" severity="warning" aria-label="Listar Equipamentos">
                        <BsFillImageFill></BsFillImageFill>
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
import React from "react";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { AiFillDelete, AiFillEdit, AiFillSecurityScan } from "react-icons/ai";
// eslint-disable-next-line import/no-anonymous-default-export
export default props =>{
    let card = '';
    const rows = props.colaboradores.map(colaborador =>{
       
        if (colaborador.id === "") {
          card = (
            <div className="card">
              <div id="status" className="center sem-info">
                <p>Sem Colaborador Cadatrado</p>
              </div>
            </div>
          );
        } 
        else {
          card = (
            <div className="card">
              <Card>
                <div className="left-colaborador">
                  <p className="nome">{colaborador.nome}</p>

                  <p className="tipo">{colaborador.tipo}</p>
                  <p className="email">{colaborador.email}</p>
                </div>

                <div id="status" className="center">
                  <p>{colaborador.status}</p>
                </div>

                <div className="card-butons">
                  <Button
                    onClick={(e) => props.editar(colaborador.id)}
                    title="Editar Colaborador"
                    severity="warning"
                    aria-label="Editar Colaborador"
                  >
                    <AiFillEdit></AiFillEdit>
                  </Button>

                  <Button
                    onClick={(e) => props.delete(colaborador.id)}
                    title="Deletar Colaborador"
                    severity="warning"
                    aria-label="Deletar Colaborador"
                  >
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
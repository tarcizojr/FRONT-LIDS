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
                  

                  {/* <Button
                    onClick={(e) => props.adicionarColaborador(colaborador.id, colaborador.matricula)}
                    title="Adicionar Colaborador Ao Projeto"
                    severity="warning"
                    aria-label="Adicionar Colaborador Ao Projeto"
                    label="+"
                  >
                    
                  </Button> */}
                  {colaborador.status === 'NÃO PERTENCE AO PROJETO' ? (
                    <Button 
                        label="+"
                        onClick={(e) => props.adicionarColaborador(colaborador.id)}
                        title="Adicionar Colaborador ao Projeto"
                        severity="warning"
                        aria-label="Adicionar Colaborador ao Projeto"
                    />
                ) : (
                    <Button 
                        label="-"
                        onClick={(e) => props.remover(colaborador.id)}
                        title="Remover Colaborador do Projeto"
                        severity="warning"
                        aria-label="Remover Colaborador do Projeto"
                    />
                )}
                </div>
              </Card>
            </div>
          );
        }
        return(
            // <div className="card">                
            //     <Card>
            //         <div className="left-colaborador">
            //             <p className="nome">
            //                 {colaborador.nome}
            //             </p>
                        
            //             <p className="tipo">
            //                 {colaborador.tipo}
            //             </p>
            //             <p className="email">
            //                 {colaborador.email}
            //             </p>
            //         </div>

            //         <div id="status" className="center">
            //             <p>
            //                 {colaborador.status}
            //             </p>
            //         </div>

            //         <div className="card-butons">
            //             <Button onClick={e => props.editar(colaborador.id)} title="Editar Colaborador" severity="warning" aria-label="Editar Colaborador">
            //                 <AiFillEdit></AiFillEdit>
            //             </Button>
                        
                        
            //             <Button onClick={e => props.delete(colaborador.id)} title="Deletar Colaborador" severity="warning" aria-label="Deletar Colaborador">
            //                 <AiFillDelete></AiFillDelete>
            //             </Button>
            //         </div>
            //     </Card>
            // </div>
            card
        )
    })

    return(
        <div>
            {rows}
        </div>
    )
}
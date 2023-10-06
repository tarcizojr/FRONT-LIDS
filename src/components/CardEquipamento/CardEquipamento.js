import React from "react";
import { Card } from 'primereact/card';

// eslint-disable-next-line import/no-anonymous-default-export
export default props =>{
    let card = '';
    const rows = props.equipamentos.map(equipamento =>{
        console.log(equipamento)
        if (equipamento.id === "") {
          card = (
            <div className="card">
              <div id="status" className="center sem-info">
                <p>Sem Equipamento Cadatrado</p>
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
                        {projeto.titulo}
                    </p>
                    
                    <p className="tempo">
                        <AiFillClockCircle className="icone"></AiFillClockCircle>
                        {diasRestantes}
                       
                    </p>
                </div>

                <div id="status" className="center">
                    <p>
                        {projeto.status}
                    </p>
                </div>

                <div className="card-butons">
                    <Button title="Editar Projet" severity="warning" aria-label="Editar Projet"
                    onClick={(e) => props.editar(projeto.id)}>
                        <AiFillEdit></AiFillEdit>
                    </Button>

                    <Button
                    onClick={(e) => props.listarColaboradores(projeto.id)}
                    title="Listar Colaboradores" severity="warning" aria-label="Listar Colaboradores">
                        <BiSolidUserDetail></BiSolidUserDetail>
                    </Button>

                    <Button 
                    onClick={(e) => props.delete(projeto.id)}
                    title="Deletar Projeto" severity="warning" aria-label="Deletar Projeto">
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
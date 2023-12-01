import React from "react";
import { Card } from 'primereact/card';
import './CardDeProjetos.css';
import { Button } from 'primereact/button';

import { AiFillDelete, AiFillEdit, AiFillClockCircle } from "react-icons/ai";
import { BiSolidUserDetail } from "react-icons/bi";

// eslint-disable-next-line import/no-anonymous-default-export
export default props =>{
    let card = '';
    const rows = props.projetos.map(projeto =>{
       console.log(projeto)
        if (projeto.id === "") {
          card = (
            <div className="card">
              <div id="status" className="center sem-info">
                <p>Sem Projeto Cadatrado</p>
              </div>
            </div>
          );
        } 
        else {
           
            
                        
//---------------
            const dataFimString = projeto.dataTermino;

            let dataFim = new Date(dataFimString);
            let dataAtual = new Date();
            // Calcule a diferença em milissegundos
            const diferencaEmMilissegundos = dataFim - dataAtual;
            // Converta a diferença para dias
            const diasRestantes = Math.ceil(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));

            console.log(dataFimString, 'datafim', diasRestantes, 'dias restantes')
           
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




{/* <div>
                
<Card>
    <div className="left-projeto">
        <p className="titulo">
            {this.props.title}
        </p>
        
        <p className="tempo">
            <AiFillClockCircle className="icone"></AiFillClockCircle>
            {this.props.dias_restantes}
        </p>
    </div>

    <div id="status" className="center">
        <p>
            {this.props.status}
        </p>
    </div>

    <div className="card-butons">
        <Button title="Editar Projet" severity="warning" aria-label="Editar Projet">
            <AiFillEdit></AiFillEdit>
        </Button>

        <Button title="Listar Colaboradores" severity="warning" aria-label="Listar Colaboradores">
            <BiSolidUserDetail></BiSolidUserDetail>
        </Button>

        <Button title="Deletar Projeto" severity="warning" aria-label="Deletar Projeto">
            <AiFillDelete></AiFillDelete>
        </Button>
    </div>
</Card>
</div> */}



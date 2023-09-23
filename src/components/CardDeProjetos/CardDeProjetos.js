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
                <p>Sem Colaborador Cadatrado</p>
              </div>
            </div>
          );
        } 
        else {
            const dataInicioString = projeto.dataInicio;
            const dataFimString = projeto.dataTermino;
            
            // Divida as datas em partes usando "-" como separador e inverta a ordem para "yyyy-mm-dd"
            const partesDataInicio = dataInicioString.split('-');
            const partesDataFim = dataFimString.split('-');
            const dataInicio = new Date(partesDataInicio[2], partesDataInicio[1] - 1, partesDataInicio[0]); // Subtrai 1 do mês porque os meses em JavaScript são baseados em zero
            const dataFim = new Date(partesDataFim[2], partesDataFim[1] - 1, partesDataFim[0]);
            
            // Calcule a diferença em milissegundos
            const diferencaEmMilissegundos = dataFim - dataInicio;
            
            // Converta a diferença para dias
            const diasRestantes = Math.ceil(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
           
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
                    <Button title="Editar Projet" severity="warning" aria-label="Editar Projet">
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



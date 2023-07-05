import React from "react";
import { Card } from 'primereact/card';
import './CardDeColaboradores.css';
import { Button } from 'primereact/button';
import './CardDeColaboradores.css';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";


export default class ListagemDeColaboradores extends React.Component{
    

    
    render(){
        
        return(
            <div>
                
                <Card>
                    <div className="left-colaborador">
                        <p className="nome">
                            {this.props.nome_colaborador}
                        </p>
                        
                        <p className="tipo">
                            {this.props.tipo_colaborador}
                        </p>
                        <p className="email">
                            {this.props.email}
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
                        
                        
                        <Button title="Deletar Projeto" severity="warning" aria-label="Deletar Projeto">
                            <AiFillDelete></AiFillDelete>
                        </Button>
                    </div>
                </Card>
            </div>
        )
    }
}
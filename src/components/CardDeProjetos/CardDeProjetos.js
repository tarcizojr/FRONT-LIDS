import React from "react";
import { Card } from 'primereact/card';
import './CardDeProjetos.css';
import { Button } from 'primereact/button';

import { AiFillDelete, AiFillEdit, AiFillClockCircle } from "react-icons/ai";
import { BiSolidUserDetail } from "react-icons/bi";


export default class ListagemDeProjetos extends React.Component{
    

    
    render(){
        
        return(
            <div>
                
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
            </div>
        )
    }
}
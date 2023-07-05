import React from "react";
import ListagemDeColaboradores from '../../components/CardDeColaboradores/CardDeColaboradores';
import './ListarColaboradores.css';

import { InputText } from "primereact/inputtext";
import { BreadCrumb } from 'primereact/breadcrumb';

import { Button } from 'primereact/button';

export default class ListarColaboradores extends React.Component{
    state = {
        items:[{ label: 'Colaboradores', url:"/colaboradores" }],

        home: {icon: 'pi pi-home ', url: '/' },

        colaboradores :[
            {nome_colaborador:"Tarcizo Leite",tipo_colaborador:"10", status:"ATIVO", email:"email@gmail.com"}
        ]
    }

    render(){
        return(

            <div className="container">
                <div className="header">
                    <div>
                        <BreadCrumb model={this.state.items} home={this.state.home} />
                    
                        <span className="p-input-icon-left">
                            <i  className="pi pi-search " />
                            <InputText placeholder="Pocurar" />
                        </span>
                    </div>
    
                    <div className="bt-add">
                        <a href="/criarColaboradores">
                            <Button label="+" severity="warning" raised 
                            onClick={this.adicionarProjeto}/>
                        </a>
    
                    </div>
                </div>

                <div className="colaboradores">
                    <ListagemDeColaboradores 
                    nome_colaborador={this.state.colaboradores[0].nome_colaborador} 
                    tipo_colaborador={this.state.colaboradores[0].tipo_colaborador}
                    status={this.state.colaboradores[0].status}
                    email={this.state.colaboradores[0].email}
                    />
                    
                </div>
            </div>
        )
    }

}
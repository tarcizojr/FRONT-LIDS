import React from "react";

import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";

import './CriarColaborador.css'
export default class CriarColaborador extends React.Component{

    state = {
        items:[{ label: 'Colaboradores', url:"/colaboradores" }, { label: 'Criar Colaborador'}],

        home: {icon: 'pi pi-home ', url: '/' }
    }

    render(){
        
        return(
            <div className="container">
                <div className="header">
                    <div className="header-criar-projeto">
                        <BreadCrumb model={this.state.items} home={this.state.home}></BreadCrumb>
                    </div>
                    <div className="bt-salvar">
                        <Button label="Salvar" severity="warning" raised onClick={this.salvarProjeto} />
        
                    </div>
                </div>
                
                <div className="input-texts">
                    <div>
                        <InputText className="borderColorEdit" type="text" placeholder="Nome" />
                    </div>
                    <div className="input-endereco">
                        <InputText className="borderColorEdit" type="text" placeholder="Endereço" />
                    </div>
                </div>
            </div>

        )
    }
}
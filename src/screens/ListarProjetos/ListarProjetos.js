import React from "react";
import { InputText } from "primereact/inputtext";
import { BreadCrumb } from 'primereact/breadcrumb';

import { Button } from 'primereact/button';

import CardDeProjetos from "../../components/CardDeProjetos/CardDeProjetos";
import './ListarProjetos.css'
import 'primeicons/primeicons.css';

export default class ListarProjetos extends React.Component{
    state = {
        items:[{ label: 'Projetos', url:"/projetos" }],

        home: {icon: 'pi pi-home ', url: '/' },

        projetos :[
            {nome_projeto:"PROJETO GEMINI",dias_restantes:"10", status:"CONCLUÍDO"}
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
                        <a href="/criarProjeto">
                            <Button label="+" severity="warning" raised 
                            onClick={this.adicionarProjeto}/>
                        </a>
    
                    </div>
                </div>
    
                
                
                <div className="projetos">
                    <CardDeProjetos 
                    title={this.state.projetos[0].nome_projeto} 
                    dias_restantes={this.state.projetos[0].dias_restantes}
                    status={this.state.projetos[0].status}/>
                    
                </div>
                
                
            </div>
        )
    }

}
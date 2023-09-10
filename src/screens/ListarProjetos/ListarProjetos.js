import React from "react";
import { InputText } from "primereact/inputtext";
import { BreadCrumb } from 'primereact/breadcrumb';

import { Button } from 'primereact/button';

import CardDeProjetos from "../../components/CardDeProjetos/CardDeProjetos";
import './ListarProjetos.css'
import 'primeicons/primeicons.css';
import ProjetoService from "../../services/ProjetoService"
export default class ListarProjetos extends React.Component{
    state = {
        items:[{ label: 'Projetos', url:"/projetos" }],

        home: {icon: 'pi pi-home ', url: '/' },

        projetos :[
           
        ],
        projetosAuxiliar:[{}]
    }
    
    constructor(){
        super();
        this.service = new ProjetoService();
    }


    componentDidMount(){
        //  this.token();             
          this.findAll();
      }
    
      findAll = () => {        
        this.service.get('/all')
            .then(response => {
                const projetos = response.data;
                
                this.setState({projetos})
                this.setState({projetosAuxiliar:projetos})
                console.log(projetos)
            }
            ).catch(error => {
              //  console.log(error.response);
            }
            );
    }

    find = () =>{
        window.location.href = `/colaboradoresProjeto/${1}`;
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
                        projetos = {this.state.projetos}
                        listarColaboradores = {this.find}
                    />
                    
                </div>
                
                
            </div>
        )
    }

}
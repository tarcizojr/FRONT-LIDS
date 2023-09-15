import React from "react";
import axios from 'axios';

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
        projetosAuxiliar:[{}],

        nomeParaFiltro:'',

       
    }
    
    constructor(){
        super();
        this.service = new ProjetoService();
    }


    componentDidMount(){
        //  this.token();             
          this.findAll();
          axios.defaults.headers.common['Authorization'] = `Bearer
          ${this.state.token}     
          `;

      }
    
      findAll = () => {        
        this.service.get('/all')
            .then(response => {
                const projetos = response.data;
                
                this.setState({projetos})
                this.setState({projetosAuxiliar:projetos})
                
            }
            ).catch(error => {
              //  console.log(error.response);
            }
            );
    }

    find = (id) =>{
        window.location.href = `/colaboradoresProjeto/${id}`;
    }


    filtro = async () =>{
        
        await this.setState({projetos:this.state.projetosAuxiliar})
        console.log(this.state.projetos)
        let lista = []
        
        this.state.projetos.forEach(element => {
            console.log(this.state.projetos)
            if(element.titulo.toUpperCase().includes(this.state.nomeParaFiltro.toUpperCase())){
                lista.push(element);
            }
           
        });
        this.setState({projetos:lista})
    }


    render(){
        return(
        
            <div className="container">
                <div className="header">
                    <div>
                        <BreadCrumb id="breadCrumb" model={this.state.items} home={this.state.home} />
                    
                        <div className="filtragem">
                            <span className="p-input-icon-left">
                                <i  className="pi pi-search " />
                                <InputText placeholder="Buscar"
                                value= {this.state.nomeParaFiltro} 
                                onChange={(e) => { this.setState({nomeParaFiltro: e.target.value }) }} />
                            </span>

                            <Button className="bt-filtro" label="Filtrar" 
                            onClick={this.filtro}
                            title="Filtrar Projetos" severity="warning" raised />

                            <Button className="bt-filtro" label="Limpar Filtro" 
                            onClick={this.limparFiltro}
                            title="Listar Todos Projetos" severity="warning" raised />
                        </div>
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
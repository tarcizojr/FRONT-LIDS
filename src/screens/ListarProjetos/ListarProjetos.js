import React from "react";
import axios from 'axios';

import { InputText } from "primereact/inputtext";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Dropdown } from 'primereact/dropdown';

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
        renderizar:false,
        
        filtrosProjeto: [
            {filtro:'TODOS'},
            {filtro:'EM_ANDAMENTO'},
            {filtro:'CONCLUIDO'},
            {filtro:'CANCELADO'}
        ],
        filtroProjeto:{filtro:''}
       
    }
    
    constructor(){
        super();
        this.service = new ProjetoService();
        this.service.getToken();
        this.service.autenticado();
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
        
        const { nomeParaFiltro, filtroProjeto, projetosAuxiliar } = this.state;
        let projetosFiltrados = [...projetosAuxiliar];
    
        // Filtrar por nome
        if (nomeParaFiltro) {
            const nomeFiltrado = nomeParaFiltro.toUpperCase();
            projetosFiltrados = projetosFiltrados.filter(element =>
                element.titulo.toUpperCase().includes(nomeFiltrado)
            );
        }
    
        // Filtrar por status (se o filtroProjeto.filtro não estiver vazio)
        if (filtroProjeto.filtro) {
            projetosFiltrados = projetosFiltrados.filter(element =>
                element.status.includes(filtroProjeto.filtro)
            );
        }
    
        // Atualizar o estado com os projetos filtrados
        this.setState({ projetos: projetosFiltrados });
    

    }

    limparFiltro = () =>{
        this.setState({nomeParaFiltro:''})
        this.setState({ filtroProjeto: { filtro: '' } });
        this.setState({projetos:this.state.projetosAuxiliar})

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
                            
                            <div className="">
                                <Dropdown id=""
                                    value={this.state.filtroProjeto} onChange={(e) => this.setState({filtroProjeto: this.filtroProjeto = e.value})}
                                    options={this.state.filtrosProjeto}
                                    optionLabel="filtro"
                                    placeholder="Filtrar Por Status" />

                                    {/* usado para mostrar a msg de erro, caso tenha
                                {this.state.errorTipo && <span style={{ color: 'red' }}>{this.state.errorTipo}</span>} */}
                             </div>
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
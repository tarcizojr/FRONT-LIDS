import React from "react";
import { Toast } from 'primereact/toast';

import axios from 'axios';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

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
        filtroProjeto:{filtro:''},
        projetoId:''
       
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
        localStorage.setItem("idDoPorjeto", id)
        this.state.projetosAuxiliar.forEach(element => {
            if(element.id === id){
                console.log(element.colaboradores, 'coalboradores do projeto')
                localStorage.setItem("colaboradoresDoProjeto", JSON.stringify(element.colaboradores));
            }
        });
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
        if(filtroProjeto.filtro === 'TODOS'){
            this.limparFiltro();
        }
        else if (filtroProjeto.filtro) {
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

    delete = (projetoId) =>{
        this.service.delete(projetoId)
            .then(async (response) =>{
                this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Projeto Excluido Com Sucesso' });
                await this.delay(2000);
               window.location.reload();
            }).catch(error =>{
                this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Excluir o Projeto' });
            })
    }

    delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      };

    accept = () => {
        this.state.toast.show({ severity: 'info', summary: 'Confirmado', detail: 'Deletar Projeto Confirmado', life: 3000 });
        this.delete(this.state.projetoId);
    };

    reject = () => {
        this.state.toast.show({ severity: 'warn', summary: 'Regeitado', detail: 'Projeto Não Deletado', life: 3000 });
    };

    confirm = async (projetoId) => {
        this.setState({projetoId: projetoId})
        //const a = document.getElementsByClassName('p-button p-component p-confirm-dialog-reject p-button-text')
        let msg = '';
        this.state.projetos.forEach(element => {
            if(element.id === projetoId){
                if(element.status !== 'CANCELADO'){
                    msg = 'Esse projeto sera Cancelado, para Excluir precione o  Botão Novamente'
                }else{
                    msg = 'Você realmente deseja Deletar esse Projeto?'
                }
            }
        });
        
        confirmDialog({
            
            message: msg,
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            
            accept:this.accept,
            reject:this.reject,
            
        });
        await this.delay(10);
        document.getElementsByClassName('p-button-label')[9].textContent = "Sim"
        document.getElementsByClassName('p-button-label')[8].textContent = "Não"
    };

    editar = (projetoId) => {
        this.state.projetos.forEach(element => {
            if(element.id === projetoId){
                localStorage.setItem("projetoParaEditar", JSON.stringify(element))
            }
        });
        window.location.href = `/editarProjeto/${projetoId}`;    
        
    }
    
    render(){

        return(
        
            <div className="container">
                <Toast ref={(el) => (this.state.toast = el)} />

                <ConfirmDialog 
                  acceptClassName="p-button-success"
                  rejectClassName="p-button-danger"
                 acceptLabel="Sim"
                 rejectLabel="Não"/>

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
                        delete = {this.confirm}
                        editar = {this.editar}
                    />
                    
                </div>
                
                
            </div>
        )
    }

}
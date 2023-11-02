import React from "react";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { InputText } from "primereact/inputtext";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Dropdown } from 'primereact/dropdown';


import { Button } from 'primereact/button';
import CardAreasDeTrabalho from "../../components/CardAreasDeTrabalho/CardAreasDeTrabalho";
import AreasService from "../../services/AreasService"

export default class ListarAreaDeTrabalho extends React.Component{
    state = {
        items:[{ label: 'Areas de Trabalho', url:"/areasDeTrabalho" }],

        home: {icon: 'pi pi-home ', url: '/' },

        areas:[],
        areasAuxiliar:[],
        areaId:""

    }

    constructor(){
        super();
        this.service = new AreasService();
        
    }

    componentDidMount(){
        //  this.token();             
          this.findAll();
          
      }

      findAll = () => {        
        this.service.get('/all')
            .then(response => {
                const areas = response.data;
                
                this.setState({areas})
                this.setState({areasAuxiliar:areas})
                console.log(areas)
            }
            ).catch(error => {
                console.log(error.response);
            }
            );
    }

    confirm = async (areaId) => {
        this.setState({areaId: areaId})
        //const a = document.getElementsByClassName('p-button p-component p-confirm-dialog-reject p-button-text')
        confirmDialog({
          
            message: 'Você Realmente quer Deletar essa Area de Trabalho?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            
            accept:this.accept,
            reject:this.reject,
            acceptLabel: "Sim",
            rejectLabel: "Não",
            
        });
        
    };

    accept = () => {
        this.state.toast.show({ severity: 'info', summary: 'Confirmado', detail: 'Deletar Area Confirmado', life: 3000 });
        this.delete(this.state.areaId);
    };

    reject = () => {
        this.state.toast.show({ severity: 'warn', summary: 'Regeitado', detail: 'Area Não Deletada', life: 3000 });
    };

    delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    delete = (areaId) =>{
        this.service.delete(areaId)
            .then(async (response) =>{
                this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Area Excluida Com Sucesso' });
                await this.delay(2000);
               window.location.reload();
            }).catch(error =>{
                this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Excluir a Area' });
            })
    }

    editar = (areaId) => {
      
        
        window.location.href = `/editarAreaDeTrabalho/${areaId}`; 
        
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
                        <a href="/criarAreaDeTrabalho">
                            <Button label="+" severity="warning" raised 
                            onClick={this.adicionarProjeto}/>
                        </a>
    
                    </div>
                </div>
                <div className="projetos">
                    <CardAreasDeTrabalho 
                        areas = {this.state.areas}
                        listarColaboradores = {this.find}
                        delete = {this.confirm}
                        editar = {this.editar}
                    />
                    
                </div>
            </div>
        )
    }
}   
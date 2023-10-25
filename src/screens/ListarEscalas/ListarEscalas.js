import React from "react";
import { Toast } from 'primereact/toast';

import axios from 'axios';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import { InputText } from "primereact/inputtext";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Dropdown } from 'primereact/dropdown';

import { Button } from 'primereact/button';
import EscalaService from "../../services/EscalaService";
import CardDeEscala from "../../components/CardDeEscala/CardDeEscala";
export default class ListarEscalas extends React.Component{
    state = {
        items:[{ label: 'Escalas', url:"/escalas" }],

        home: {icon: 'pi pi-home ', url: '/' },
        escalas:[],
        escalasAuxiliar:[],
        escalaid:'',
        filtroTipos:[
            {filtro: 'FIXA'},
            {filtro: 'FLEXIVEL'},
            {filtro: 'BANCO DE HORAS'}
        ],
        filtroTipo:[
            {filtro:''}
        ]
        
        
    }

    constructor(){
        super();
        this.service = new EscalaService();
    }

    
    componentDidMount(){
        //  this.token();             
          this.findAll();
          
      }

      findAll = () => {        
        this.service.get('/all')
            .then(response => {
                const escalas = response.data;
                
                this.setState({escalas})
                this.setState({escalasAuxiliar:escalas})
                console.log(escalas)
            }
            ).catch(error => {
                console.log(error.response);
            }
            );
    }

    confirm = async (escalaid) => {
        this.setState({escalaid: escalaid})
        //const a = document.getElementsByClassName('p-button p-component p-confirm-dialog-reject p-button-text')
        confirmDialog({
          
            message: 'Você Realmente quer Deletar essa Escala?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            
            accept:this.accept,
            reject:this.reject,
            acceptLabel: "Sim",
            rejectLabel: "Não",
            
        });
        
    };

    accept = () => {
        this.state.toast.show({ severity: 'info', summary: 'Confirmado', detail: 'Deletar Escala Confirmada', life: 3000 });
        this.delete(this.state.escalaid);
    };

    reject = () => {
        this.state.toast.show({ severity: 'warn', summary: 'Regeitado', detail: 'Escala Não Deletada', life: 3000 });
    };

    delete = (escalaid) =>{
        this.service.delete(escalaid)
            .then(async (response) =>{
                this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Escala Excluida Com Sucesso' });
                await this.delay(2000);
               window.location.reload();
            }).catch(error =>{
                this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Excluir Escala' });
            })
    }

    delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      };

      filtro = async () =>{
        const { filtroTipo, escalasAuxiliar } = this.state;
        let escalasFiltradas = [...escalasAuxiliar];

        if (filtroTipo.filtro) {
            escalasFiltradas = escalasFiltradas.filter(element =>
                element.tipo === filtroTipo.filtro
            );
        }
    
        // Atualizar o estado com os projetos filtrados
        this.setState({ projetos: escalasFiltradas });
      }

      limparFiltro = () =>{
        this.setState({ filtroTipo: { filtro: '' } });
        this.setState({escalas:this.state.escalasAuxiliar})

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
                                                        
                            <div className="">
                                <Dropdown id=""
                                    value={this.state.filtroTipo} onChange={(e) => this.setState({filtroTipo: this.filtroTipo = e.value})}
                                    options={this.state.filtroTipos}
                                    optionLabel="filtro"
                                    placeholder="Filtrar Por Tipo" />

                                    {/* usado para mostrar a msg de erro, caso tenha
                                {this.state.errorTipo && <span style={{ color: 'red' }}>{this.state.errorTipo}</span>} */}
                             </div>
                            <Button className="bt-filtro" label="Filtrar" 
                            onClick={this.filtro}
                            title="Filtrar Escala" severity="warning" raised />

                            <Button className="bt-filtro" label="Limpar Filtro" 
                            onClick={this.limparFiltro}
                            title="Listar Todos Projetos" severity="warning" raised />
                        </div>
                    </div>
    
                    <div className="bt-add">
                        <a href="/cadastrarEscala">
                            <Button label="+" severity="warning" raised 
                            onClick={this.adicionarProjeto}/>
                        </a>
    
                    </div>
                </div>
                                
                <div className="projetos">
                    <CardDeEscala 
                        escalas = {this.state.escalas}
                        // listarColaboradores = {this.find}
                         delete = {this.confirm}
                        // editar = {this.editar}
                    />
                    
                </div>

            </div>
        )
    }
}
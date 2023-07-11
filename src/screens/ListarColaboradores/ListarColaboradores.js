import React from "react";
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';


//import CardDeColaboradores from '../../components/CardDeColaboradores/CardDeColaboradores';
import './ListarColaboradores.css';

import CardColaborador from "../../components/CardListaColaboradores/CardListaColaborador";

import { InputText } from "primereact/inputtext";
import { BreadCrumb } from 'primereact/breadcrumb';

import { Button } from 'primereact/button';

import ColaboradorService from "../../services/ColaboradorService";

export default class ListarColaboradores extends React.Component{
    state = {
        items:[{ label: 'Colaboradores', url:"/colaboradores" }],

        home: {icon: 'pi pi-home ', url: '/' },

        colaboradores2:[
            {
                id:'',
                nome:'',
                email:'',
                cargaHorariaSemanal:'',
                tipo:'',
                status:'SEM COLABORADOR CADASTRADO',
                linkCurriculo:''
                
            }
        ],
        token:"",
        toast:''
        
    }

    constructor(){
        super();
        this.service = new ColaboradorService();
    }

    

    componentDidMount(){
      //  this.token();             
        this.findAll();
    }

    token = async () => {
        await this.service.getToken('')
            .then(response => {
               const token = response.data
               this.setState({token:token})
               
                console.log("token",response.data);

                this.findAll(token); 
            }
            ).catch(error => {
                console.log("erro ao pegar o token",error);
            }
            );
    }

    delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      };

    findAll = (token) => {
        const headers = { 'Authorization':` Bearer ${token}` };
        console.log("bbbbbbbbbb",headers)
        this.service.get('/all', {headers})
            .then(response => {
                const colaboradores2 = response.data;
                
                this.setState({colaboradores2})

                console.log(this.state.colaboradores2);
            }
            ).catch(error => {
                console.log(error.response);
            }
            );
    }



    delete = (colaboradorId) =>{
        this.service.delete(colaboradorId)
            .then(async (response) =>{
                this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Colaborador Excluido Com Sucesso' });
                await this.delay(2000);
               window.location.reload();
            }).catch(error =>{
                this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Excluir o Colaborador' });
            })
    }

    editar = (colaboradorId) => {
        window.location.href = `/editarColaborador/${colaboradorId}`;    
        
    }

    accept = () => {
        this.state.toast.show({ severity: 'info', summary: 'Confirmado', detail: 'Você Aceitou', life: 3000 });
    };

    reject = () => {
        this.state.toast.show({ severity: 'warn', summary: 'Regeitado', detail: 'Usuario Não Deletado', life: 3000 });
    };

    confirm2 = (event) => {
        const a = document.getElementsByClassName('p-button p-component p-confirm-dialog-reject p-button-text')
        confirmDialog({
            target: event.currentTarget,
            message: 'Você Realmente quer Deletar esse Colaborador?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            
            accept:this.accept,
            reject:this.reject,
            
        });
        console.log(a);
    };

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
                        <BreadCrumb model={this.state.items} home={this.state.home} />
                    
                        <span className="p-input-icon-left">
                            <i  className="pi pi-search " />
                            <InputText placeholder="Procurar" />
                        </span>
                    </div>
    
                    <div className="bt-add">
                        <a href="/criarColaboradores">
                            <Button label="+" title="Adicionar Colaborador" severity="warning" raised />
                        </a>
    
                    </div>
                </div>

                <div className="colaboradores">
                    <CardColaborador 
                        colaboradores ={this.state.colaboradores2}
                        delete = {this.confirm2}
                        editar = {this.editar}
                        aviso = {this.state.toast}
                    />
                    
                </div>
            </div>
        )
    }

}
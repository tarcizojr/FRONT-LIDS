import React from "react";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';


import CardColaborador from "../../components/CardColaboradoresProjetos/ColaboradoresProjeto";

import { InputText } from "primereact/inputtext";
import { BreadCrumb } from 'primereact/breadcrumb';

import { Button } from 'primereact/button';

import AssociacaoService from "../../services/AssociacaoService";



export default class ListarColaboradoresDoProjeto extends React.Component{
    state = {
        items:[{ label: 'Projetos', url:"/projetos" },
        { label: 'Colaboradores'}],

        home: {icon: 'pi pi-home ', url: '/' },
        colaboradores:[],
        colaboradoresAuxiliar:[],
        id:'',
        associacoes:[]
    }


    constructor(){
        super();
        this.service = new AssociacaoService();
        this.service.getToken();
        this.service.autenticado();
      
    }

    componentDidMount(){           
        //this.findAll();
        this.listarColaboradores()
        const url = window.location.href;
        let id = url.substring(url.lastIndexOf('/') + 1);
        this.setState({id})
       
    }
   


      findAll = async () => {
        try {
            const response = await this.service.get('/all');
            const associacoes = response.data;
            let a = []
            const url = window.location.href;
             let id = url.substring(url.lastIndexOf('/') + 1);
            await associacoes.forEach(element => {
                if(element.projeto.id === parseInt(id)){
                    console.log(element, "element")
                    a.push(element)
                }
            });           
            
           this.setState({associacoes:a})
         //   this.listarColaboradores();
        } catch (error) {
            console.error(error.response);
        }
    }
    
    listarColaboradores = async () => {
        await this.findAll();
        
        const { associacoes } = this.state;
        console.log(associacoes, 'associações');
    
        let colaboradores = [];
    
        associacoes.forEach(element => {
            const { colaborador } = element;
            
            // Verifica se o colaborador já está na lista
            const existeColaborador = colaboradores.some(colab => colab.id === colaborador.id);
    
            if (!existeColaborador) {
                colaborador.status = "PERTENCE AO PROJETO";
                colaboradores.push(colaborador);
            }
        });
        
        // Converta para uma string JSON
        const listaString = JSON.stringify(colaboradores);

        // Armazene no Local Storage
        localStorage.setItem('colaboradoresDoProjeto', listaString);

        console.log(colaboradores, 'colaboradores');
        this.setState({ colaboradores });
    }
    
        


    filtro = async () =>{
        
        await this.setState({colaboradores:this.state.colaboradoresAuxiliar})
        console.log(this.state.colaboradores)
        let lista = []
        
        this.state.colaboradores.forEach(element => {
            console.log(this.state.nomeParaFiltro)
            if(element.nome.toUpperCase().includes(this.state.nomeParaFiltro.toUpperCase())){
                lista.push(element);
            }
           
        });
        this.setState({colaboradores:lista})
    }


    limparFiltro = () =>{
        this.setState({nomeParaFiltro:''})
        this.setState({colaboradores:this.state.colaboradoresAuxiliar})

    }


    delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      };
    
    
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

    excluirColaborador = (colaboradorId) => {
        let lista = [];
        this.state.colaboradores.forEach(element => {
            if(element.id !== colaboradorId){
                lista.push(element)
            }
        });
        this.setState.colaboradores(lista)
    }

    editar = (colaboradorId) => {
        window.location.href = `/editarColaborador/${colaboradorId}`;    
        
    }

    accept = () => {
        this.state.toast.show({ severity: 'info', summary: 'Confirmado', detail: 'Deletar Colaborador Confirmado', life: 3000 });
        this.delete(this.state.colaboradorId);
    };

    reject = () => {
        this.state.toast.show({ severity: 'warn', summary: 'Regeitado', detail: 'Colaborador Não Deletado', life: 3000 });
    };


    
    confirm = async (colaboradorId) => {
        this.setState({colaboradorId: colaboradorId})
        //const a = document.getElementsByClassName('p-button p-component p-confirm-dialog-reject p-button-text')
        confirmDialog({
          
            message: 'Você Realmente quer Deletar esse Colaborador?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            
            accept:this.accept,
            reject:this.reject,
            acceptLabel: "Sim",
            rejectLabel: "Não",
            
        });
        
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
                            title="Filtrar Colaboradores" severity="warning" raised />

                            <Button className="bt-filtro" label="Limpar Filtro" 
                            onClick={this.limparFiltro}
                            title="Listar Todos Colaboradores" severity="warning" raised />
                        </div>
                       
                    </div>
    
                    <div className="bt-add">
                    <a href={`/adicionarColaboradorAoProjeto/${this.state.id}`}>
                            <Button severity="warning" label="+" title="Adicionar Colaborador ao Projeto"  raised />
                        </a>
    
                    </div>
                </div>

                <div className="colaboradores">
                    <CardColaborador 
                        colaboradores={this.state.colaboradores}
                    />
                    
                </div>
            </div>
        )
    }

}
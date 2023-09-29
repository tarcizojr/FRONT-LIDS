import React from "react";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

//import CardDeColaboradores from '../../components/CardDeColaboradores/CardDeColaboradores';


import { InputText } from "primereact/inputtext";
import { BreadCrumb } from 'primereact/breadcrumb';

import { Button } from 'primereact/button';

import ColaboradorService from "../../services/ColaboradorService";
import ProjetoService from "../../services/ProjetoService";
import CardAdicionarColaborador from "../../components/CardAdicionarColaboradorAoProjeto/CardAdicionarColaborador";
import ApiService from "../../services/ApiService";


export default class AdicionarColaborador extends React.Component{
    state = {
        items:[{ label: 'Projetos', url:"/projetos" },
        { label: 'Colaboradores', url:`/colaboradoresProjeto/${localStorage.getItem("idDoPorjeto")}`}, { label: 'Adicionar Colaborador'}],

        home: {icon: 'pi pi-home ', url: '/' },

        colaboradorId:'',
        colaboradores:[
            {
                id:'',
                nome:'',
                email:'',
                cargaHorariaSemanal:'',
                tipo:'',
                status:'',
                linkCurriculo:''
                
            }
        ],
      
        toast:'',

        nomeParaFiltro:'',

       
        colaboradoresAuxiliar:[{}],
        renderizar:false,
        colaboradoresDoProjeto:[{}],
        matriculaColaboradoresDoProjeto:[],
        idDoProjeto:''

        
    }

    constructor(){
        super();
        this.service = new ColaboradorService();
        this.service.getToken();
        this.service.autenticado();
        this.service2 = new ProjetoService();
      
    }

    componentDidMount = async () =>{ 
        await this.findColaboradoresDoProjeto();          
        this.findAll();
        const url = window.location.href;
        const idDoProjeto = url.substring(url.lastIndexOf('/') + 1);    
        this.setState({idDoProjeto})
        
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

     findColaboradoresDoProjeto = async () =>{
        await this.service2.get('/all')
        .then(response => {
            let b = response.data[0].colaboradores
            
            let a =[]
            b.forEach(element => {
                console.log(element.matricula,'colaboradores do projeto')
                a.push(element.matricula)
            });
           this.setState({matriculaColaboradoresDoProjeto:a})
        }).catch(error => {
              console.log(error, 'erro service');
          }
          );
     }

    findAll = async () => {        
        this.service.get('/all')
            .then(response => {
                const colaboradores = response.data;
                let colaboradores2 = []
                let a = this.state.matriculaColaboradoresDoProjeto
                colaboradores.forEach(element => {
                    if(a.includes(element.matricula)){                
                        element.status = 'ADICIONADO'                
                        colaboradores2.push(element)
                    }else{
                        element.status = 'NÃO ADICIONADO' 
                        colaboradores2.push(element)
                    }
                });
                this.setState({colaboradores:colaboradores2})
                this.setState({colaboradoresAuxiliar:colaboradores2})
                
            }
            ).catch(error => {
              //  console.log(error.response);
            }
            );
        //await this.delay(2000);
       // this.verificar();
    }

    adicionarColaborador = async (id, matricula) => {        
        await this.service2.addColaborador({
            idColaborador:id,
            idProjeto:this.state.idDoProjeto
        })
        .then(response => {
            console.log(response)
            this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Colaborador Adicionado Com Sucesso' });            
            this.delay(2000);
            window.location.href = `/adicionarColaboradorAoProjeto/${this.state.idDoProjeto}`;
            let a = this.state.matriculaColaboradoresDoProjeto
            a.push(matricula)
            this.setState({matriculaColaboradoresDoProjeto:a})
        }).catch(error => {
              console.log(error, 'erro service2');
          }
          );
    }


    // delete = (colaboradorId) =>{
    //     this.service.delete(colaboradorId)
    //         .then(async (response) =>{
    //             this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Colaborador Excluido Com Sucesso' });
    //             await this.delay(2000);
    //            window.location.reload();
    //         }).catch(error =>{
    //             this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Excluir o Colaborador' });
    //         })
    // }

    // excluirColaborador = (colaboradorId) => {
    //     let lista = [];
    //     this.state.colaboradores.forEach(element => {
    //         if(element.id !== colaboradorId){
    //             lista.push(element)
    //         }
    //     });
    //     this.setState.colaboradores(lista)
    // }


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
            
        });
        await this.delay(10);
        document.getElementsByClassName('p-button-label')[9].textContent = "Sim"
        document.getElementsByClassName('p-button-label')[8].textContent = "Não"
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
    
                    
                </div>

                <div className="colaboradores">
                    <CardAdicionarColaborador 
                        colaboradores ={this.state.colaboradores}
                        adicionarColaborador = {this.adicionarColaborador}
                       
                    />
                    
                </div>
            </div>
        )
    }

}
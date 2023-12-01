import React from "react";
import Modal from "react-modal";

import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import { InputText } from "primereact/inputtext";
import { BreadCrumb } from 'primereact/breadcrumb';

import { Button } from 'primereact/button';

import ColaboradorService from "../../services/ColaboradorService";
import ProjetoService from "../../services/ProjetoService";
import CardAdicionarColaborador from "../../components/CardAdicionarColaboradorAoProjeto/CardAdicionarColaborador";
import ApiService from "../../services/ApiService";
import AssociacaoService from "../../services/AssociacaoService";
import EscalaService from "../../services/EscalaService";
import CardDeEscala from "../../components/CardAdicionarEscalaAoColaborador/CardAdicionarEscalaAoColaborador";
Modal.setAppElement('#root');
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
        colaboradoresAll:[],
        renderizar:false,
        colaboradoresDoProjeto:[{}],
        matriculaColaboradoresDoProjeto:[],
        idDoProjeto:'',

        isPopupOpen: false,

        escalas:[],
        idColaboradorParaAdicionar:''
        
    }

    constructor(){
        super();
        this.service = new ColaboradorService()
        //this.service = new ColaboradorService();
        this.service.getToken();
        this.service.autenticado();
        //this.service2 = new ProjetoService();
      
    }

    componentDidMount = async () =>{ 
        this.findAll();
        const url = window.location.href;
        const idDoProjeto = url.substring(url.lastIndexOf('/') + 1);    
        this.setState({idDoProjeto});

        let e = document.getElementsByClassName('bt1').bt
        e.classList.add('selecionar')
        
    }

    findEscalas = async () =>{
        this.serviceE = new EscalaService();
        try {
            const response = await this.serviceE.get('/all');
            console.log(response.data,'escalas')
            this.setState({escalas:response.data})
        } catch (error) {
            console.error(error.response);
        }

    }

    openPopup = () => {
        this.setState({ isPopupOpen: true });
      };
    
      closePopup = () => {
        this.setState({ isPopupOpen: false });
      };


    findAll = async () => {
        try {
            const response = await this.service.get('/all');
            console.log(response.data)
            this.setState({colaboradoresAll:response.data})
        } catch (error) {
            console.error(error.response);
        }

        this.colaboradoresDoProjeto()
    }

    colaboradoresDoProjeto = () => {
        const listaStringDoLocalStorage = localStorage.getItem('colaboradoresDoProjeto');
        const minhaListaDoLocalStorage = JSON.parse(listaStringDoLocalStorage) || []; // Certifique-se de que seja uma lista válida
    
        let ids = minhaListaDoLocalStorage.map(element => element.id);
        let colaboradores = this.state.colaboradoresAll;
    
        let c = colaboradores.map(element => {
            if (ids.includes(element.id)) {
                return { ...element, status: "PERTENCE AO PROJETO" };
            } else {
                return { ...element, status: "NÃO PERTENCE AO PROJETO" };
            }
            colaboradores.push(element)
        });
    
        this.setState({ colaboradores: c });
        console.log(c, 'colaboradores');
        console.log(minhaListaDoLocalStorage, 'colaboradores do projeto');
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
        // await this.delay(10);
        // document.getElementsByClassName('p-button-label')[9].textContent = "Sim"
        // document.getElementsByClassName('p-button-label')[8].textContent = "Não"
    };

    adicionarColaborador = async (colaboradorId) =>{
        this.findEscalas()
        this.setState({idColaboradorParaAdicionar:colaboradorId})
        this.openPopup();
    }

    adicionarEscala = async (escalaId) =>{
        let idColaborador = this.state.idColaboradorParaAdicionar
        
        const url = window.location.href;
        let id = url.substring(url.lastIndexOf('/') + 1);
        let idProjeto = parseInt(id)

        this.serviceA = new AssociacaoService()
        await this.serviceA.creat(
            {
                "idProjeto":idProjeto,
                "idColaborador":idColaborador,
                "idEscala":escalaId
            }
            ).then (async (response) =>{
    
                this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Colaborador Adicionado Com Sucesso' });
               await this.delay(2000);
                window.location.href = `/colaboradoresProjeto/${idProjeto}`;
            }).catch(error =>{
                console.log(error.response,'erro')
    
                this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Adicionar o Colaborador' });
                this.state.toast.show({ severity: 'error', summary: 'Erro', detail: error.response.data });
            })
        
        console.log("idColaborador:", idColaborador, "escala:", escalaId, "idProjeto:", idProjeto)
    }

    render(){

        return(
            

            <div className="container">


                
            <Modal
                isOpen={this.state.isPopupOpen}
                onRequestClose={this.closePopup}
                contentLabel="Exemplo de Pop-up"
                >

                <CardDeEscala 
                        escalas = {this.state.escalas}
                        // listarColaboradores = {this.find}
                         adicionarEscala = {this.adicionarEscala}
                        // editar = {this.editar}
                    />

                <button class="p-button p-component bt-filtro p-button-raised p-button-warning" onClick={this.closePopup}>Fechar</button>
            </Modal>

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

                            {/* <Button
                                className="bt-filtro"
                                label="Abrir Pop-up"
                                onClick={this.openPopup}
                                severity="info"
                                raised
                            /> */}
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
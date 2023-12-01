import React from "react";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { InputText } from "primereact/inputtext";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Dropdown } from 'primereact/dropdown';


import { Button } from 'primereact/button';
import EquipamentoService from "../../services/EquipamentoService";
import ComputadorService from "../../services/ComputadorService";
import CardEquipamento from "../../components/CardEquipamento/CardEquipamento";

export default class ListarEquipamentos extends React.Component{

    state = {
        items:[{ label: 'Equipamentos', url:"/equipamentos" }],

        home: {icon: 'pi pi-home ', url: '/' },
        equipamentos:[],
        nomeParaFiltro:'',
        filtroEquipamentos:{filtro:''},

        filtrosEquipamento: [
            {filtro:'NOME'},
            {filtro:'CODIGO'},
            
        ],
        filtroEquipamento:{filtro:'NOME'},
        equipamentoId:""
    }

    constructor(){
        super();
        this.service = new EquipamentoService();
        this.service.getToken();
        this.service.autenticado();
      
    }

    componentDidMount(){           
        this.findAll();

        let e = document.getElementsByClassName('bt5').bt
        e.classList.add('selecionar')
       
    }

    editar = (equipamentoId) => {
        this.state.equipamentos.forEach(element => {
            if(element.id===equipamentoId){
                localStorage.setItem("equipamentoEditar", JSON.stringify(element))
            }
        });
        window.location.href = `/editarEquipamento/${equipamentoId}`; 
        
    }

    findAll = () => {        
        this.service.get('/all')
            .then(response => {
                const equipamentos = response.data;
                
                 this.setState({equipamentos})
                 this.setState({equipamentosAuxiliar:equipamentos})
                console.log(equipamentos)
            }
            ).catch(error => {
              //  console.log(error.response);
            }
            );
    }

    filtro = async () =>{
        
        const { nomeParaFiltro,filtroEquipamentos, equipamentosAuxiliar } = this.state;
        let equipamentosFiltrados = [...equipamentosAuxiliar];
        const nomeFiltrado = nomeParaFiltro.toUpperCase();
        // Filtrar por nome
        if (this.state.filtroEquipamento.filtro === "NOME") {            
            const nomeFiltrado = nomeParaFiltro.toUpperCase();
            equipamentosFiltrados = equipamentosFiltrados.filter(element =>
                element.nome.toUpperCase().includes(nomeFiltrado)
            );
                                    
        } 
        if (this.state.filtroEquipamento.filtro === "CODIGO") {            
            const nomeFiltrado = nomeParaFiltro.toString(); // Converter para string
            equipamentosFiltrados = equipamentosFiltrados.filter(element =>
                element.codigo.toString().includes(nomeFiltrado)
            );
        }    
            
       
        this.setState({ equipamentos: equipamentosFiltrados });
    
    }

    limparFiltro = () =>{
        this.setState({nomeParaFiltro:''})
        this.setState({ equipamentosFiltrados: { filtro: '' } });
        this.setState({equipamentos:this.state.equipamentosAuxiliar})

    }

    confirm = async (equipamentoId) => {
        this.setState({equipamentoId: equipamentoId})
        //const a = document.getElementsByClassName('p-button p-component p-confirm-dialog-reject p-button-text')
        confirmDialog({
          
            message: 'Você Realmente quer Deletar esse Equipamento?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            
            accept:this.accept,
            reject:this.reject,
            acceptLabel: "Sim",
            rejectLabel: "Não",
            
        });
       
    };
    delete = (equipamentoId) =>{
        this.service.delete(equipamentoId)
            .then(async (response) =>{
                this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Equipamento Excluido Com Sucesso' });
                await this.delay(2000);
               window.location.reload();
            }).catch(error =>{
                console.log(error,"erro ao excluir")
                this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Excluir o Equipamento' });
            })
    }

    delay = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
      };

    accept = () => {
        this.state.toast.show({ severity: 'info', summary: 'Confirmado', detail: 'Deletar Equipamento Confirmado', life: 3000 });
        this.state.equipamentos.forEach(element => {
            if(element.id === this.state.equipamentoId){
                console.log(element.marca, "marca")
                if(element.marca !== undefined){
                    this.service = new ComputadorService();
                }
            }
        });
        this.delete(this.state.equipamentoId);
    };

    reject = () => {
        this.state.toast.show({ severity: 'warn', summary: 'Regeitado', detail: 'Equipamento Não Deletado', life: 3000 });
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

                            <div className="">
                                <Dropdown id=""
                                    value={this.state.filtroEquipamento} onChange={(e) => this.setState({filtroEquipamento: this.filtroEquipamento = e.value})}
                                    options={this.state.filtrosEquipamento}
                                    optionLabel="filtro"
                                    placeholder="" />

                                    {/* usado para mostrar a msg de erro, caso tenha
                                {this.state.errorTipo && <span style={{ color: 'red' }}>{this.state.errorTipo}</span>} */}
                             </div>

                            <Button className="bt-filtro" label="Filtrar" 
                            onClick={this.filtro}
                            title="Filtrar Equipamento" severity="warning" raised />

                            <Button className="bt-filtro" label="Limpar Filtro" 
                            onClick={this.limparFiltro}
                            title="Listar Todos Equipamentos" severity="warning" raised />
                        </div>
                       
                    </div>
    
                    <div className="bt-add">
                        <a href="/criarEquipamentos">
                            <Button severity="warning" label="+" title="Adicionar Equipamento"  raised />
                        </a>
    
                    </div>
                </div>

                <div className="esquipamentos">
                    <CardEquipamento 
                        equipamentos = {this.state.equipamentos}
                        
                        delete = {this.confirm}
                        editar = {this.editar}
                    />
                    
                </div>

            </div>
        )
    }
}

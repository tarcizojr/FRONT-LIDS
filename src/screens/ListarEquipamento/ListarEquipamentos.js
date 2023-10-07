import React from "react";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { InputText } from "primereact/inputtext";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Dropdown } from 'primereact/dropdown';


import { Button } from 'primereact/button';
import EquipamentoService from "../../services/EquipamentoService";
import CardEquipamento from "../../components/CardEquipamento/CardEquipamento";

export default class ListarColaboradores extends React.Component{

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
    }

    constructor(){
        super();
        this.service = new EquipamentoService();
        this.service.getToken();
        this.service.autenticado();
      
    }

    componentDidMount(){           
        this.findAll();
       
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
                            title="Filtrar Colaboradores" severity="warning" raised />

                            <Button className="bt-filtro" label="Limpar Filtro" 
                            onClick={this.limparFiltro}
                            title="Listar Todos Colaboradores" severity="warning" raised />
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
                        listarColaboradores = {this.find}
                        delete = {this.confirm}
                        editar = {this.editar}
                    />
                    
                </div>

            </div>
        )
    }
}

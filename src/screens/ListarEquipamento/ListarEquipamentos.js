import React from "react";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { InputText } from "primereact/inputtext";
import { BreadCrumb } from 'primereact/breadcrumb';

import { Button } from 'primereact/button';
import EquipamentoService from "../../services/EquipamentoService";

export default class ListarColaboradores extends React.Component{

    state = {
        items:[{ label: 'Equipamentos', url:"/equipamentos" }],

        home: {icon: 'pi pi-home ', url: '/' },
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
                
                // this.setState({colaboradores})
                // this.setState({colaboradoresAuxiliar:colaboradores})
                console.log(equipamentos)
            }
            ).catch(error => {
              //  console.log(error.response);
            }
            );
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

            </div>
        )
    }
}

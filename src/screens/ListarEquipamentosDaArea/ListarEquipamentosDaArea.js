import React from "react";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { InputText } from "primereact/inputtext";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Dropdown } from 'primereact/dropdown';


import { Button } from 'primereact/button';
import CardEquipamentoArea from "../../components/CardEquipamentosArea/CardEquipamentoArea";
import AreasService from "../../services/AreasService"
export default class ListarEquipamentosDaArea extends React.Component{
    state = {
        items:[{ label: 'Areas de Trabalho', url:"/areasDeTrabalho" },
        { label: 'Equipamentos da Area'}],

        home: {icon: 'pi pi-home ', url: '/' },

        areas:[],       
        areaId:"",
        equipamentos:[],
        equipamentosArea:[]

    }

    constructor(){
        super();
        this.service = new AreasService();
      
       const url = window.location.href;
       let id = url.substring(url.lastIndexOf('/') + 1); 
        this.setState({areaId:id}) 

       
    }

    componentDidMount(){
        // const url = window.location.href;
        // let id = url.substring(url.lastIndexOf('/') + 1); 
        // this.setState({areaId:id})       
        this.findAll();
       //this.findEquipamentos()
       
          
      }

      
      findAll = () => {        
        this.service.find(1)
            .then(response => {
                const areas = response.data;
                
                this.setState({areas})
                this.setState({equipamentosArea:areas.equipamentos})
                console.log(areas, 'find')
            }
            ).catch(error => {
                console.log(error.response);
            }
            );
    }


    findEquipamentos = async () =>{
       let a = localStorage.getItem("equipamentosArea");
    
       await this.setState({equipamentosArea:JSON.parse(a)})
       console.log(this.state.equipamentosArea, "state")
    }

    listagem  = async () =>{
        const url = window.location.href;
        let id = url.substring(url.lastIndexOf('/') + 1); 
      
        console.log(id, "testeee")
        window.location.href = `/adicionarEquipamentosArea/${id}`;
    }

    // retirarEquipamento = async (idEquipamento) =>{
    //     const url = window.location.href;
    //     let id = url.substring(url.lastIndexOf('/') + 1);
    //     console.log(idEquipamento, "id")
    //     await this.service.retirarEquipamento({
    //         "idAreaDeTrabalho":id,
    //         "idEquipamento": idEquipamento
    //     }).then (async (response) =>{
    //         this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Equipamento Removido Com Sucesso' });
    //         // let eq = []
    //         // this.state.equipamentosArea.forEach(element => {
    //         //     if(element.id != idEquipamento){
    //         //         eq.push(element)
    //         //     }
    //         // });
    //         // localStorage.setItem("equipamentosArea", JSON.stringify(eq));

    //         await this.delay(2000);
    //         const url = window.location.href;

    //         window.location.href = url;

    //     }).catch(async error =>{
    //         await console.log(error, 'erro')
      
    //         this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Remover Equipamento' });
    //         this.state.toast.show({ severity: 'error', summary: 'Erro', detail: error.response.data });
    //     })
    // }

    retirarEquipamento = async (idEquipamento) =>{
        const url = window.location.href;
        let id = url.substring(url.lastIndexOf('/') + 1);
        this.service = new AreasService();
        console.log(idEquipamento, "id")
        await this.service.retirarEquipamento({
            "idAreaDeTrabalho":id,
            "idEquipamento": idEquipamento
        }).then (async (response) =>{
            this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Equipamento Removido Com Sucesso' });
      
            await this.delay(2000);
            const url = window.location.href;

            window.location.href = url;

        }).catch(async error =>{
            await console.log(error, 'erro')
      
            this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao REmover Equipamento' });
            this.state.toast.show({ severity: 'error', summary: 'Erro', detail: error.response.data });
        })
    }

    delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
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
                        <a>
                            <Button label="+" severity="warning" raised 
                            onClick={this.listagem}
                           />
                        </a>
    
                    </div>
                </div>
                <div className="projetos">
                    
                    <CardEquipamentoArea 
                        equipamentos = {this.state.equipamentosArea}
                       
                        remover = {this.retirarEquipamento}
                       // editar = {this.editar}
                    />
                    
                </div>
            </div>
        )
    }
}
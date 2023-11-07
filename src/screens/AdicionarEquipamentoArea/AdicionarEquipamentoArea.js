import React from "react";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { InputText } from "primereact/inputtext";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Dropdown } from 'primereact/dropdown';


import { Button } from 'primereact/button';
import CardAdicionarEquipamentosArea from "../../components/CardAdicionarEquipamentosArea/CardAdicionarEquipamentosArea";
import AreasService from "../../services/AreasService"
import EquipamentoService from "../../services/EquipamentoService";

const url = window.location.href;
let id = url.substring(url.lastIndexOf('/') + 1);
export default class AdicionarEquipamentoArea extends React.Component{
    
    state = {
        items:[{ label: 'Areas de Trabalho', url:"/areasDeTrabalho" },
        { label: 'Equipamentos da Area',  url: `/equipamentosArea/${id}` },
        { label: 'Adicionar Equipamentos a Area'}],

        home: {icon: 'pi pi-home ', url: '/' },

        areas:[],       
        areaId:"",
        equipamentos:[],
        equipamentosArea:[]

    }

    constructor(){
        super();
        this.service = new AreasService();
        this.service2 = new EquipamentoService();
        let id = url.substring(url.lastIndexOf('/') + 1); 
        console.log(id,"id")
        this.setState({areaId:id}) 
        console.log(id, 'id area')
    }

    componentDidMount(){
        let id = url.substring(url.lastIndexOf('/') + 1); 
        console.log(id,"id")
        this.setState({areaId:id}) 
              
         this.findAll();
          
      }

      findAll = async () => {    
        let id = url.substring(url.lastIndexOf('/') + 1);     
        await this.service.find(id)
            .then(response => {
                const area = response.data; 
                console.log(area,'area')
                // areas.forEach(element => {
                //     // if(element.id == id){
                //     //     this.setState({equipamentosArea:areas[0].equipamentos});
                //     //    // console.log(areas[0].equipamentos, "equipamentos area")
                //     // }
                // });          
                // //console.log(areas.equipamentos, "areas")
                this.setState({equipamentosArea:area.equipamentos});
            }
            ).catch(error => {
                console.log(error.response);
            }
            );

        this.findEquipamentos();
    }

    findEquipamentos = () => {
        this.service2.get('/all')
            .then(response => {
                const areas = response.data;
    
                const equipamentosAreaIds = this.state.equipamentosArea.map(equipamento => equipamento.id);
    
                const equipamentos = areas.map(element => {
                    if (equipamentosAreaIds.includes(element.id)) {
                        return { ...element, descricao: "Pertence a Área" };
                    }else{
                        return { ...element, descricao: "Não Pertence a Área" };
                    }
                   
                });
    
                this.setState({ equipamentos });
                console.log(equipamentos, "equipamentos");
            })
            .catch(error => {
                console.log(error.response);
            });
    }

    delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
    
    adicionarEquipamento = async (idEquipamento) =>{
        console.log(idEquipamento, "id")
        await this.service.addEquipamento({
            "idAreaDeTrabalho":3,
            "idEquipamento": idEquipamento
        }).then (async (response) =>{
            this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Equipamento Adicionado Com Sucesso' });
      
            await this.delay(2000);
            const url = window.location.href;

            window.location.href = url;

        }).catch(async error =>{
            await console.log(error, 'erro')
      
            this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Adicionado Equipamento' });
            this.state.toast.show({ severity: 'error', summary: 'Erro', detail: error.response.data });
        })
    }

    retirarEquipamento = async (idEquipamento) =>{
        console.log(idEquipamento, "id")
        await this.service.retirarEquipamento({
            "idAreaDeTrabalho":3,
            "idEquipamento": idEquipamento
        }).then (async (response) =>{
            this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Equipamento Removido Com Sucesso' });
      
            await this.delay(2000);
            const url = window.location.href;

            window.location.href = url;

        }).catch(async error =>{
            await console.log(error, 'erro')
      
            this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Remover Equipamento' });
            this.state.toast.show({ severity: 'error', summary: 'Erro', detail: error.response.data });
        })
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
    
                    {/* <div className="bt-add">
                        <a href="/criarAreaDeTrabalho">
                            <Button label="+" severity="warning" raised 
                            onClick={this.adicionarProjeto}/>
                        </a>
    
                    </div> */}
                </div>
                <div className="projetos">
                    <CardAdicionarEquipamentosArea 
                        equipamentos = {this.state.equipamentos}
                       
                        adicionarEquipamento = {this.adicionarEquipamento}
                        remover = {this.retirarEquipamento}
                    />
                    
                </div>
            </div>
        )
    }
}
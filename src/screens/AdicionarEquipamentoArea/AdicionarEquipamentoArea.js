import React from "react";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { InputText } from "primereact/inputtext";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Dropdown } from 'primereact/dropdown';


import { Button } from 'primereact/button';
import EquipamentoService from "../../services/EquipamentoService";
import ComputadorService from "../../services/ComputadorService";
import CardAdicionarEquipamentosArea from "../../components/CardAdicionarEquipamentosArea/CardAdicionarEquipamentosArea";
import AreasService from "../../services/AreasService"

const url = window.location.href;
let id = url.substring(url.lastIndexOf('/') + 1);
export default class AdicionarEquipamentoArea extends React.Component{

    state = {
        items:[{ label: 'Areas de Trabalho', url:"/areasDeTrabalho" },
        { label: 'Equipamentos da Area',  url: `/equipamentosArea/${id}` },
        { label: 'Adicionar Equipamentos a Area'}],

        home: {icon: 'pi pi-home ', url: '/' },
        equipamentos:[],
        nomeParaFiltro:'',
        filtroEquipamentos:{filtro:''},

        filtrosEquipamento: [
            {filtro:'NOME'},
            {filtro:'CODIGO'},
            
        ],
        filtroEquipamento:{filtro:'NOME'},
        equipamentosId:[],
        equipamentosArea:[]
    }

    constructor(){
        super();
        this.service = new EquipamentoService();
        this.service.getToken();
        this.service.autenticado();
      
    }
    componentDidMount() {
        this.listagem();
      }
      
      findAll = async () => {
        try {
          const response = await this.service.get('/all');
          const equipamentos = response.data;
          this.setState({ equipamentos });
          this.setState({ equipamentosAuxiliar: equipamentos });
          console.log(equipamentos);
        } catch (error) {
          console.log(error.response);
        }
      }
      
      equipamentosArea = async () => {
        try {
          this.service2 = new AreasService();
          const response = await this.service2.find(1);
          const area = response.data;
          let ids = [];
          area.equipamentos.forEach(element => {
            ids.push(element.id);
          });
          console.log(ids, 'ids');
          this.setState({ equipamentosId: ids });
        } catch (error) {
          console.log(error.response);
        }
      }
      
      listagem = async () => {
        await this.findAll();
        await this.equipamentosArea();
      
        let eqall = this.state.equipamentos;
        let ids = this.state.equipamentosId;
        
         let eq = []
        eqall.forEach(element => {
            if(ids.includes(element.id)){
                element.descricao = "Pertence"
            }else{
                element.descricao = "Não Pertence a Área"
            }
            eq.push(element)

        });
        this.setState({equipamentos:eq})
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

    
    delay = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
      };

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

    adicionarEquipamento = async (idEquipamento) =>{
        this.service = new AreasService();
        console.log(idEquipamento, "id")
        await this.service.addEquipamento({
            "idAreaDeTrabalho":1,
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
                <CardAdicionarEquipamentosArea 
                        equipamentos = {this.state.equipamentos}
                       
                        adicionarEquipamento = {this.adicionarEquipamento}
                       // remover = {this.retirarEquipamento}
                    />
                    
                </div>

            </div>
        )
    }
}

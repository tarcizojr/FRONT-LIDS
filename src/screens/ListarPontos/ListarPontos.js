import React from "react";

import PontoService from "../../services/PontoService";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Dropdown } from 'primereact/dropdown';

import { Button } from 'primereact/button';
import CardPontos from "../../components/CardListarPontos/CardListarPontos";

export default class ListaPontos extends React.Component{
    state = {
        items:[{ label: 'Pontos', url:"/pontos" }],
        home: {icon: 'pi pi-home ', url: '/' },
        pontos:[],
        datas:[],
        data:[],
        pontosAuxiliar:[]
    }

    constructor(){
        super();
        this.service = new PontoService();
       
    }

    componentDidMount(){
        //  this.token();             
          this.findAll();
         
          
      }


    findAll = async () => {        
        await this.service.get('/all')
            .then(response =>  {
                const pontos = response.data;
                
                this.setState({pontos})
                //this.setState({escalasAuxiliar:escalas})
                console.log(pontos, "pontos")
            }
            ).catch(error => {
                console.log(error.response);
            }
            );
        this.MesAno()
    }

    MesAno = () => {
        let pontos = this.state.pontos;
        let mesAno = [...this.state.datas];
    
        pontos.forEach(element => {
            let data = new Date(element.data);
    
            let mes = data.getMonth() + 1;
            let ano = data.getFullYear();
            let res = `${mes}/${ano}`;
    
            // Verifica se a data já existe na lista
            if (!mesAno.includes(res)) {
                mesAno.push(res);
            }
        });
    
        this.setState({ datas: mesAno });
        console.log(mesAno, "mesAno");
    }
    
    filtro = () => {
        let pontoF = []
        let pontos = this.state.pontos
        let data = this.state.data
        const partesDataComparar = data.split("/");
        const dataComparar = new Date(partesDataComparar[1], partesDataComparar[0] - 1);

        let dataPonto
        pontos.forEach(element => {
            dataPonto = new Date(element.data)
            console.log(dataPonto,'data ponto', dataComparar, 'data')
            if(dataComparar.getMonth() === dataPonto.getMonth()){
                pontoF.push(element)
            }
        });

        this.setState({pontosAuxiliar:this.state.pontos})
        this.setState({pontos:pontoF})
        console.log(pontoF)
        
    }
    
    limparFiltro = () => {
        this.setState({pontos:this.state.pontosAuxiliar})
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
                                                    
                        <div className="">
                            <Dropdown id=""
                                value={this.state.data} onChange={(e) => this.setState({data: this.mesAno = e.value})}
                                options={this.state.datas}
                                placeholder="Filtrar Mês Ano" />

                                {/* usado para mostrar a msg de erro, caso tenha
                            {this.state.errorTipo && <span style={{ color: 'red' }}>{this.state.errorTipo}</span>} */}
                         </div>
                        <Button className="bt-filtro" label="Filtrar" 
                        onClick={this.filtro}
                        title="Filtrar Escala" severity="warning" raised />

                        <Button className="bt-filtro" label="Limpar Filtro" 
                        onClick={this.limparFiltro}
                        title="Listar Todos Projetos" severity="warning" raised />
                    </div>
                </div>

                <div className="bt-add">
                    <a href="/cadastrarEscala">
                        <Button label="+" severity="warning" raised 
                        onClick={this.adicionarProjeto}/>
                    </a>

                </div>
            </div>
                            
            <div className="projetos">
                <CardPontos 
                    pontos = {this.state.pontos}
                    // listarColaboradores = {this.find}
                    // delete = {this.confirm}
                    // editar = {this.editar}
                />
                
            </div>

        </div>

        )
        
    }


}
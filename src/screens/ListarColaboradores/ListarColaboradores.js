import React from "react";
//import CardDeColaboradores from '../../components/CardDeColaboradores/CardDeColaboradores';
import './ListarColaboradores.css';

import CardColaborador from "../../components/CardListaColaboradores/CardListaColaborador";

import { InputText } from "primereact/inputtext";
import { BreadCrumb } from 'primereact/breadcrumb';

import { Button } from 'primereact/button';

import ColaboradorService from "../../services/ColaboradorService";

export default class ListarColaboradores extends React.Component{
    state = {
        items:[{ label: 'Colaboradores', url:"/colaboradores" }],

        home: {icon: 'pi pi-home ', url: '/' },

        colaboradores2:[
            {
                id:'',
                nome:'',
                email:'',
                cargaHorariaSemanal:'',
                tipo:'',
                status:'SEM COLABORADOR CADASTRADO',
                linkCurriculo:''
                
            }
        ]
    }

    constructor(){
        super();
        this.service = new ColaboradorService();
    }

    

    componentDidMount(){
        this.findAll();
        console.log(this.findAll());
    }

    findAll = () => {
        
        this.service.get('/all')
            .then(response => {
                const colaboradores2 = response.data;
                
                this.setState({colaboradores2})

                console.log(this.state.colaboradores2);
            }
            ).catch(error => {
                console.log(error.response);
            }
            );
    }


    delete = (colaboradorId) =>{
        this.service.delete(colaboradorId)
            .then(response =>{
               alert("colaborador excluido")
               window.location.reload();
            }).catch(error =>{
                console.log(
                    alert("Erro ao Excluir")
                )
            })
    }

    editar = (colaboradorId) => {
        window.location.href = `/editarColaborador/${colaboradorId}`;    
        
    }

    render(){
        return(

            <div className="container">
                <div className="header">
                    <div>
                        <BreadCrumb model={this.state.items} home={this.state.home} />
                    
                        <span className="p-input-icon-left">
                            <i  className="pi pi-search " />
                            <InputText placeholder="Pocurar" />
                        </span>
                    </div>
    
                    <div className="bt-add">
                        <a href="/criarColaboradores">
                            <Button label="+" severity="warning" raised 
                            onClick={this.adicionarProjeto}/>
                        </a>
    
                    </div>
                </div>

                <div className="colaboradores">
                    <CardColaborador 
                        colaboradores ={this.state.colaboradores2}
                        delete = {this.delete}
                        editar = {this.editar}
                    />
                    
                </div>
            </div>
        )
    }

}
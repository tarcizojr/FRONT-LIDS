import React from "react";


import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from 'primereact/button';
import ColaboradorService from "../../services/ColaboradorService";
import './EditarColaborador.css'

import CardEditarColaborador from "../../components/CardEditarColaborador/CardEditarColaborador";
export default class EditarColaborador extends React.Component{

    state = {
        items:[{ label: 'Colaboradores', url:"/colaboradores" }, 
        { label: 'Editar Colaborador'}],

        home: {icon: 'pi pi-home ', url: '/' },

        colaborador:[{
            id:'',
            nome:'',
            email:'',
            cargaHorariaSemanal:'',
            tipo:'',
            status:'SEM COLABORADOR CADASTRADO',
            linkCurriculo:''
        }]
    }

    componentDidMount(){
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf('/') + 1);
        this.findByid(id)
    }

    constructor(){
        super();
        this.service = new ColaboradorService();
    }

    findByid = (id) =>{
        this.service.find(`/${id}`)
            .then(response =>{

                const colaborador = response.data;
                
                this.setState({colaborador})
                console.log(this.state.colaborador)
            })
            .catch(error =>{
                console.log(error)
            })
    }


    render(){
        
        
        return(
            <div className="container">
                <div className="header">
                    <div className="header-criar-projeto">
                        <BreadCrumb model={this.state.items} home={this.state.home}></BreadCrumb>
                    </div>
                    <div className="bt-salvar">
                        <Button label="Salvar" severity="warning" raised onClick={this.salvarProjeto} />
        
                    </div>
                </div>

                <CardEditarColaborador
                    colaborador={this.state.colaborador}
                />
            </div>

        )
    }
}
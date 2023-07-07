import React from "react";


import { Dropdown } from 'primereact/dropdown';

import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";

import ColaboradorService from "../../services/ColaboradorService";

import './CriarColaborador.css'
export default class CriarColaborador extends React.Component{
    


    state = {
        items:[{ label: 'Colaboradores', url:"/colaboradores" }, { label: 'Criar Colaborador'}],

        home: {icon: 'pi pi-home ', url: '/' },

        estados: [
            {nome:'Paraiba'}
        ],
        tipos: [
            {tipo:'DISCENTE'}
        ],
        estado:{nome:''},
        tipo:{tipo:''},

        
            nome:'',
            endereco:'',
            email:'',
            cidade:'',
            
            matricula:'',
            dataNascimento:'',
            linkCurriculo:''
        
    }

    constructor(){
        super();
        this.service = new ColaboradorService();
    }


    salvar = () =>{
        this.service.creat(
             {
            nome:this.state.nome,
            endereco:this.state.endereco.nome,
            email:this.state.email,
            cidade: this.state.cidade,
            estado:this.state.estado.nome,
            matricula: this.state.matricula,
            tipo: this.state.tipo.tipo,
            dataDeNascimento: this.state.dataNascimento,
            linkCurriculo: this.state.linkCurriculo
            // nome: ' tarcizo 2',
            // endereco : "tj",
            // email : "tarcizoJr@gmail.com",
            // cidade : "zabele",
            // estado:"pb",
            // matricula:"2020",
            // dataDeNascimento:"19/01/2001",
            // linkCurriculo:"link"
        
        }
        ).then(response =>{
            console.log(this.state.colaborador)
            console.log(response)
        }).catch(error =>{
            console.log(error.response)
        })
    }

    teste = () =>{
        console.log(this.state.nome);
        console.log(this.state.estado.nome)
    }

    render(){
        return(
            <div className="container">
                <div className="header">
                    <div className="header-criar-projeto">
                        <BreadCrumb model={this.state.items} home={this.state.home}></BreadCrumb>
                    </div>
                    <div className="bt-salvar">
                        <Button label="Salvar" severity="warning" raised onClick={this.salvar} />
        
                    </div>
                </div>
                
                <div className="input-texts">
                    <div className="input-um">
                        <InputText className="borderColorEdit" type="text" placeholder="Nome" 
                        onChange={(e) => { this.setState({nome: e.target.value }) }}/>
                    </div>
                    <div className="input-dois">
                        <InputText className="borderColorEdit" type="text" placeholder="Endereço" />
                    </div>
                </div>

                <div className="input-texts">
                    <div className="input-um">
                        <InputText className="borderColorEdit" type="text" placeholder="Email" />
                    </div>
                    <div className="input-dois">
                        <InputText className="borderColorEdit input-cidade" type="text" placeholder="Cidade" />
                    </div>

                    <div className="input-dois">
                        <Dropdown id="seletor" 
                        value={this.state.estado} onChange={(e) => this.setState({estado: this.estado = e.value})} 
                        options={this.state.estados} 
                        optionLabel="nome" 
                        placeholder="Estado" />
                    </div>
                </div>


                <div className="input-texts">
                    <div className="input-um">
                        <InputText className="borderColorEdit input-cidade" type="text" placeholder="Matricula" />
                    </div>

                    <div className="input-dois">
                        <InputText className="borderColorEdit input-cidade" type="date" placeholder="Data Aniversario" />
                    </div>


                    <div className="input-dois">
                        <Dropdown id="seletor" 
                        value={this.state.tipo} onChange={(e) => this.setState({tipo: this.tipo = e.value})} 
                        options={this.state.tipos} 
                        optionLabel="tipo" 
                        placeholder="Tipo" />
                    </div>

                                       
                </div>



                <div className="input-texts">
                    <div className="input-dois">
                        <InputText className="borderColorEdit input-cidade" type="text" placeholder="Senha" />
                    </div>

                    <div className="input-dois">
                        <InputText className="borderColorEdit input-cidade" type="text" placeholder="Confirmar Senha" />
                    </div>
                    
                </div>


                <div className="input-texts">
                    <div className="input-um">
                        <InputText className="borderColorEdit" type="text" placeholder="Link do Curriculo Lattes" />
                    </div>
                    
                </div>
            </div>

        )
    }
}
import React from "react";
import { Toast } from 'primereact/toast';

import { Dropdown } from 'primereact/dropdown';

import { InputText } from "primereact/inputtext";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from 'primereact/button';
import ColaboradorService from "../../services/ColaboradorService";
import './EditarColaborador.css'

export default class EditarColaborador extends React.Component{

    state = {
        items:[{ label: 'Colaboradores', url:"/colaboradores" }, 
        { label: 'Editar Colaborador'}],

        home: {icon: 'pi pi-home ', url: '/' },

        estados: [
            {nome:'Paraiba'}
        ],
        tipos: [
            {tipo:'DISCENTE'}
        ],
        estado:{nome:''},

      id:'',
       nome:'',
       endereco:'',
        email:'',
        cidade:'',
        estadoDoColaborador:'',
        matricula:'',
        tipo:'',
        dataDeNascimento:'',
        linkCurriculo:'',
        status:'',
        toast:''
    }

    componentDidMount(){
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf('/') + 1);
        this.findByid(id)
    }

    constructor(){
        super();
        this.service = new ColaboradorService();
        console.log(this.state.colaborador)
    }

    delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      };

   editar  = async () =>{
    await this.service.update(this.state.id,{
        nome:this.state.nome,
        endereco:this.state.endereco,
        email:this.state.email,
        cidade: this.state.cidade,
        estado:this.state.estado.nome,
        matricula: this.state.matricula,
        dataDeNascimento: this.state.dataDeNascimento,
        linkCurriculo: this.state.linkCurriculo,
        status:this.state.status
    }).then(async (response) =>{
        this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Colaborador Editado Com Sucesso' });
        
      //  this.props.history.push('/colaboradores');
        await this.delay(2000);
        window.location.href = `/colaboradores`;
    })
        .catch(error =>{

            this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Editar Colaborador' });

            console.log(error)
        })
    }

    findByid = (id) =>{
        this.service.find(`/${id}`)
            .then(response =>{

                const colaborador = response.data;
                const id = colaborador.id
                const nome = colaborador.nome
                const endereco = colaborador.endereco
                const email = colaborador.email
                const cidade = colaborador.cidade
                const estadoDoColaborador = colaborador.endereco
                const matricula = colaborador.matricula
                const tipo = colaborador.tipo
                const dataDeNascimento = colaborador.dataDeNascimento
                const linkCurriculo = colaborador.linkCurriculo
                const status = colaborador.status

                this.setState({id:id,nome:nome,endereco:endereco, email:email, cidade:cidade, estadoDoColaborador:estadoDoColaborador,matricula:matricula, tipo:tipo, dataDeNascimento:dataDeNascimento, linkCurriculo:linkCurriculo, status:status})
               

                console.log(this.state.colaborador, 'aaa')
            })
            .catch(error =>{
                console.log(error)
            })
    }


    render(){
        
        
        return(
            <div className="container">
                <div className="header">

                <Toast ref={(el) => (this.state.toast = el)} />

                    <div>
                        <BreadCrumb model={this.state.items} home={this.state.home}></BreadCrumb>
                    </div>
                    <div className="bt-salvar">
                        <Button label="Salvar" severity="warning" raised onClick={this.editar} />
        
                    </div>
                </div>

                <div >                
                
                <div className="input-texts">
                    <div className="input-um">
                        <label htmlFor="nome">Nome</label>
                        <InputText id="nome" className="borderColorEdit" type="text"
                         value={this.state.nome}
                        onChange={(e) => { this.setState({nome: e.target.value }) }} />
                    </div>
                    <div className="input-dois">
                        <label id="endereco-label" htmlFor="endereco">Endereço</label>
                        <InputText id="endereco" className="borderColorEdit" type="text" 
                        value= {this.state.endereco} 
                        onChange={(e) => { this.setState({endereco: e.target.endereco }) }}/>
                    </div>
                </div>

                <div className="input-texts">
                    <div className="input-um">
                        <label htmlFor="email">E-mail</label>

                        <InputText id="email" className="borderColorEdit" type="text" value= 
                        {this.state.email} 
                        onChange={(e) => { this.setState({email: e.target.email }) }}/>
                    </div>
                    <div className="input-dois">
                        <label htmlFor="cidade">Cidade</label>
                        <InputText id="cidade" className="borderColorEdit input-cidade" type="text" value= 
                        {this.state.cidade} 
                        onChange={(e) => { this.setState({cidade: e.target.cidade }) }}/>
                    </div>

                    <div className="input-dois">
                    <Dropdown id="seletor" 
                        value={this.state.estado} 
                        onChange={(e) => this.setState({estado: this.estado = e.value})} 
                        options={this.state.estados} 
                        optionLabel="nome" 
                        placeholder="Estado" />
                    </div>
                </div>


                <div className="input-texts">
                    <div className="input-dois">
                        <label  htmlFor="matricula">Matricula</label>

                        <InputText id="matricula" className="borderColorEdit input-cidade" type="text" value= {this.state.matricula} />
                    </div>

                    <div className="input-dois">
                        <label  htmlFor="dataNascimento">Data de Nascimento</label>

                        <InputText id="dataNascimento" className="borderColorEdit input-cidade" type="date" placeholder="Data Nascimento" 
                        value= {this.state.dataDeNascimento}
                        onChange={(e) => { this.setState({dataDeNascimento: e.target.value }) }}/>
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
                    <div className="input-um">
                        <label  htmlFor="linkCurriculo">Link do Curriculo</label>

                        <InputText id="linkCurriculo" className="borderColorEdit" type="text" 
                        value= {this.state.linkCurriculo} 
                        onChange={(e) => { this.setState({linkCurriculo: e.target.value }) }}/>
                    </div>
                    
                </div>
            </div>
                
            </div>

        )
    }
}
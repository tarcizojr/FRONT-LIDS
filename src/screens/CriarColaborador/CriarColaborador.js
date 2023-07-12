import React from "react";
import { Messages } from 'primereact/messages';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import { Toast } from 'primereact/toast';


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
        dataDeNascimento:'',
        linkCurriculo:'',
        toast:'',

        msgDeErro:'',
        error:''

        
    }

    constructor(){
        super();
        this.service = new ColaboradorService();
    }

    delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      };
    
    
    validar = () =>{
        let msgError= { severity: 'error', summary: 'Corrija os Erros a Baixo', detail: 'Campos não podem ser nulos' };
        let disparo = 0;
        if(this.state.nome === ''){
            disparo ++;
            let a = document.getElementById('nome'); 
            a.classList.add('p-invalid');
            this.setState({error:'Esse Campo é Obrigatorio'})
        }
        if(this.state.endereco === ''){
            disparo ++;
            let a = document.getElementById('endereco') 
            a.classList.add('p-invalid')
        }
        if(this.state.nome === ''){
            disparo ++;
            let a = document.getElementById('nome') 
            a.classList.add('p-invalid')
        }
        if(this.state.email === ''){
            disparo ++;
            let a = document.getElementById('email') 
            a.classList.add('p-invalid')
        }
        if(this.state.cidade === ''){
            disparo ++;
            let a = document.getElementById('cidade') 
            a.classList.add('p-invalid')
        }
        if(this.state.matricula === ''){
            disparo ++;
            let a = document.getElementById('matricula') 
            a.classList.add('p-invalid')
        }
        if(this.state.dataDeNascimento === ''){
            disparo ++;
            let a = document.getElementById('dataNascimento') 
            a.classList.add('p-invalid')
        }
        if(this.state.linkCurriculo === ''){
            disparo ++;
            let a = document.getElementById('linkCurriculo') 
            a.classList.add('p-invalid')

        }
        if(this.state.estado.nome === ''){
            disparo ++;
            let a = document.getElementById('seletor-estado') 
            a.classList.add('p-invalid')
        }
        if(this.state.tipo.tipo === ''){
            disparo ++;
            let a = document.getElementById('seletor-tipo') 
            a.classList.add('p-invalid')
        }


        if(disparo !== 0){
            this.state.toast.show(msgError);

        }else{
            this.confirm();
        }

        
    }

    confirm = () => {
        const a = document.getElementsByClassName('p-button p-component p-confirm-dialog-reject p-button-text')
        confirmDialog({
          
            message: 'Você Realmente quer Criar esse Colaborador?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            
            accept:this.accept,
            reject:this.reject,
            
        });
       
    };

    accept = () => {
        this.state.toast.show({ severity: 'info', summary: 'Confirmado', detail: 'Criar Colaborador Confirmado', life: 3000 });
        this.salvar();
    };

    reject = () => {
        this.state.toast.show({ severity: 'warn', summary: 'Regeitado', detail: 'Colaborador Não Criado', life: 3000 });
    };

    salvar = () =>{
        const dataOriginal = this.state.dataDeNascimento;
        const data = new Date(dataOriginal);

        const dia = data.getDate();
        const mes = data.getMonth() + 1;
        const ano = data.getFullYear();

        console.log("tamanho do mes", mes.size )
        const dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano.toString().padStart(2, '0')}`;
        this.service.creat(
             {
            nome:this.state.nome,
            endereco:this.state.endereco,
            email:this.state.email,
            cidade: this.state.cidade,
            estado:this.state.estado.nome,
            matricula: this.state.matricula,
            tipo: this.state.tipo.tipo,
            dataDeNascimento: dataFormatada,
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
        ).then (async (response) =>{
            
            this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Colaborador Criado Com Sucesso' });
           await this.delay(2000);
            window.location.href = `/colaboradores`;
        }).catch(error =>{
            this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Criado Criar Colaborador' });
            console.log(error.response)
        })
    }

    teste = () =>{       
      
        
        this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Operação realizada com sucesso!' });
        
    }

    render(){
        return(
            <div className="container">
                
                <div className="header">
                    <Toast ref={(el) => (this.state.toast = el)} />

                    <div className="header-criar-projeto">
                        <BreadCrumb model={this.state.items} home={this.state.home}></BreadCrumb>
                    </div>
                    <div className="bt-salvar">
                    <ConfirmDialog 
                  acceptClassName="p-button-success"
                  rejectClassName="p-button-danger"
                 acceptLabel="Sim"
                 rejectLabel="Não"/>
                        <Button label="Salvar" severity="warning" raised onClick={this.validar} />
        
                    </div>
                </div>
                
                <div className="input-texts">
                    <div className="input-um">                    
                        <label htmlFor="nome">Nome</label>
                        <InputText id="nome" className="borderColorEdit" type="text"
                         value={this.state.nome}
                        onChange={(e) => { this.setState({nome: e.target.value }) }} />

                    {this.state.error && <span style={{ color: 'red' }}>{this.state.error}</span>}

                    </div>
                    <div className="input-dois">
                        <label id="endereco-label" htmlFor="endereco">Endereço</label>
                        <InputText id="endereco" className="borderColorEdit" type="text" 
                        value= {this.state.endereco} 
                        onChange={(e) => { this.setState({endereco: e.target.value }) }}/>
                    </div>
                </div>

                <div className="input-texts">
                    <div className="input-um">
                        <label htmlFor="email">E-mail</label>

                        <InputText id="email" className="borderColorEdit" type="text" value= 
                        {this.state.email} 
                        onChange={(e) => { this.setState({email: e.target.value }) }}/>
                    </div>
                    <div className="input-dois">
                        <label htmlFor="cidade">Cidade</label>
                        <InputText id="cidade" className="borderColorEdit input-cidade" type="text" value= 
                        {this.state.cidade} 
                        onChange={(e) => { this.setState({cidade: e.target.value }) }}/>
                    </div>


                   

                    <div className="input-dois">
                    <Dropdown id="seletor-estado" 
                        value={this.state.estado} 
                        onChange={(e) => this.setState({estado: this.estado = e.value})} 
                        options={this.state.estados} 
                        optionLabel="nome" 
                        placeholder="Estado" />
                    </div>
                </div>


                <div className="input-texts">
                    <div className="input-dois">
                        <label  htmlFor="matricula">Matrícula</label>

                        <InputText id="matricula" className="borderColorEdit input-cidade" type="text" 
                        value= {this.state.matricula}
                        onChange={(e) => { this.setState({matricula: e.target.value }) }} />
                    </div>

                    <div className="input-dois">
                        <label  htmlFor="dataNascimento">Data de Nascimento</label>

                        <InputText id="dataNascimento" className="borderColorEdit input-cidade" type="date" placeholder="Data Nascimento" 
                        value= {this.state.dataDeNascimento}
                        onChange={(e) => { this.setState({dataDeNascimento: e.target.value }) }}/>
                    </div>

                    <div className="input-dois">
                        <Dropdown id="seletor-tipo" 
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

        )
    }
}
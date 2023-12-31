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
            {nome:'Paraiba'},
            {nome:'Pernanbuco'}
        ],
        tipos: [
            {tipo:'DISCENTE'},
            {tipo:'DOSCENTE'}
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
        errorNome:'',
        errorEndereco:'',
        errorEmail:'',
        errorCidade:'',
        errorEstado:'',
        errorMatricula:'',
        errorData:'',
        errorTipo:''


    }

    constructor(){
        super();
        this.service = new ColaboradorService();
    }

    delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    // Validar se os campos estão preenchidos corretamente
    validar = () =>{
        let msgError= { severity: 'error', summary: 'Corrija os Erros a Baixo', detail: 'Campos não podem ser nulos' };
        let frasePadrao = 'Esse Campo é Obrigatorio';
        let disparo = 0;

        this.setState({errorNome: ''})
        this.setState({errorEmail: ''})
        this.setState({errorEndereco: ''})
        this.setState({errorEstado: ''})
        this.setState({errorTipo: ''})
        this.setState({errorData: ''})
        this.setState({errorMatricula: ''})
        this.setState({errorCidade: ''})

        //Pre Validação de Nome
        if(this.state.nome === ''){
            disparo ++;
            let a = document.getElementById('nome');
            a.classList.add('p-invalid');
            this.setState({errorNome: frasePadrao})
            
        }
        if(this.state.nome.length < 5){
            disparo ++;
            let a = document.getElementById('nome');
            a.classList.add('p-invalid');
            this.setState({errorNome: 'Nome Deve ser Maior'})
            
        }
        if(!this.state.nome.includes(' ')){
            disparo ++;
            let a = document.getElementById('nome');
            a.classList.add('p-invalid');
            this.setState({errorNome: 'Deve Conter Nome e Sobrenome'})
            
        }

        //Pre Validação de Endereço
        if(this.state.endereco === ''){
            disparo ++;
            let a = document.getElementById('endereco')
            a.classList.add('p-invalid')
            this.setState({errorEndereco: frasePadrao})
        }
        if(this.state.endereco.length < 5){
            disparo ++;
            let a = document.getElementById('endereco')
            a.classList.add('p-invalid')
            this.setState({errorEndereco: 'Endereco deve ser Maior'})
        }

        //Pre Validação de email
        const regex = /@gmail/;
        if (!regex.test(this.state.email)) {
            disparo ++;
            let a = document.getElementById('email')
            a.classList.add('p-invalid')
            //this.setState({ error: { email: 'Esse Campo precisa ser um e-mail' } })
            this.setState({errorEmail:'Esse Campo precisa ser um e-mail'})

        }
        if(this.state.email === ''){
            disparo ++;
            let a = document.getElementById('email')
            a.classList.add('p-invalid')
            this.setState({errorEmail:frasePadrao})
          
        }
        if(this.state.email.length < 5){
            disparo ++;
            let a = document.getElementById('email')
            a.classList.add('p-invalid')
            this.setState({errorEndereco: 'E-mail Deve ser Maior'})
        }
        

        //Pre Validação de Cidade
        if(this.state.cidade === ''){
            disparo ++;
            let a = document.getElementById('cidade')
            a.classList.add('p-invalid')
            this.setState({errorCidade: frasePadrao})
        }
        if(this.state.cidade.length < 5){
            disparo ++;
            let a = document.getElementById('cidade')
            a.classList.add('p-invalid')
            this.setState({errorCidade: 'Nome da Cidade deve ser Maior'})
        }

        //Pre Validação de Matricula
        if(this.state.matricula === ''){
            disparo ++;
            let a = document.getElementById('matricula')
            a.classList.add('p-invalid')
            this.setState({errorMatricula: frasePadrao})
        }
        if(this.state.matricula.length !== 12){
            disparo ++;
            let a = document.getElementById('matricula')
            a.classList.add('p-invalid')
            this.setState({errorMatricula: 'Matricula deve Conter 12 Caracteres'})
        }

        //Pre Validação de Data de Nascimento
        if(this.state.dataDeNascimento === ''){
            disparo ++;
            let a = document.getElementById('dataNascimento')
            a.classList.add('p-invalid')
            this.setState({errorData: frasePadrao})
        }
        const data = new Date(this.state.dataDeNascimento);
        const dataAtual = new Date();
        const diferensaEmMS = dataAtual - data;
        const anos = diferensaEmMS / (1000 * 60 * 60 * 24 * 365.25); 
        if(anos < 15){
            disparo ++;
            let a = document.getElementById('dataNascimento')
            a.classList.add('p-invalid')
            this.setState({errorData: 'O colaborador deve ter pelomenos 15 anos'})
        }

        //Pre Validação de Estado
        if(this.state.estado.nome === ''){
            disparo ++;
            let a = document.getElementById('seletor-estado')
            a.classList.add('p-invalid')

            this.setState({errorEstado: frasePadrao})

        }

        //Pre Validação de Tipo
        if(this.state.tipo.tipo === ''){
            disparo ++;
            let a = document.getElementById('seletor-tipo')
            a.classList.add('p-invalid')

            this.setState({errorTipo: frasePadrao})

        }

        if(disparo !== 0){
            this.state.toast.show(msgError);

        }else{
            this.confirm();
        }


    }
    // Po up para velidar se realmente deseja criar o colaborador
    confirm = async () => {
        const a = document.getElementsByClassName('p-button p-component p-confirm-dialog-reject p-button-text')
        confirmDialog({

            message: 'Você Realmente quer Criar esse Colaborador?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',

            accept:this.accept,
            reject:this.reject,

        });
        await this.delay(10);
        document.getElementsByClassName('p-button-label')[7].textContent = "Sim"
        document.getElementsByClassName('p-button-label')[6].textContent = "Não"

    };
//Po up de confirmação de cadastro
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

        //Formata o mes antes de mandar para o back
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
            this.state.toast.show({ severity: 'error', summary: 'Erro', detail: error.response.data });
            console.log(error.response.data)
        })
    }

    // teste = () =>{


    //     this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Operação realizada com sucesso!' });

    // }

    render(){
        return(
            <div className="container">

                <div className="header">
                    {/* Toast: Usado para mostrar mensagem de alerta  */}
                    <Toast ref={(el) => (this.state.toast = el)} />

                    {/* BreadCrumb: Usado para o menu de navegaçao que fica ao lado do bt de salvar */}
                    <div className="header-criar-projeto">
                        <BreadCrumb model={this.state.items} home={this.state.home}></BreadCrumb>
                    </div>

                    <div className="bt-salvar">

                    {/* Campo de dialogo que aparece para confirmar se deseja salvar  */}
                    {/* Ele chama a função de validar, caso a validação der ok,apresenta o campo para confirmação e caso confirmado, chama a função de salva */}
                    <ConfirmDialog
                  acceptClassName="p-button-success"
                  rejectClassName="p-button-danger"
                 acceptLabel="Sim"
                 rejectLabel="Não"/>
                        <Button label="Salvar" severity="warning" raised onClick={this.validar} />

                    </div>
                </div>
                {/* Começas os Campos  */}
                <div className="input-texts">
                    <div className="input-um">
                        <label htmlFor="nome">Nome</label>
                        <InputText id="nome" className="borderColorEdit" type="text"
                         value={this.state.nome}
                        onChange={(e) => { this.setState({nome: e.target.value }) }} />

                    {/* usado para mostrar a msg de erro, caso tenha */}
                    {this.state.errorNome && <span style={{ color: 'red' }}>{this.state.errorNome}</span>}
                    </div>

                    <div className="input-dois">
                        <label id="endereco-label" htmlFor="endereco">Endereço</label>
                        <InputText id="endereco" className="borderColorEdit" type="text"
                        value= {this.state.endereco}
                        onChange={(e) => { this.setState({endereco: e.target.value }) }}/>

                        {/* usado para mostrar a msg de erro, caso tenha */}
                        {this.state.errorEndereco && <span style={{ color: 'red' }}>{this.state.errorEndereco}</span>}
                    </div>
                </div>

                <div className="input-texts">
                    <div className="input-um">
                        <label htmlFor="email">E-mail</label>

                        <InputText id="email" className="borderColorEdit" type="text" value=
                        {this.state.email}
                        onChange={(e) => { this.setState({email: e.target.value }) }}/>

                        {/* usado para mostrar a msg de erro, caso tenha */}
                        {this.state.errorEmail && <span style={{ color: 'red' }}>{this.state.errorEmail}</span>}
                    </div>

                    <div className="input-dois">
                        <label htmlFor="cidade">Cidade</label>
                        <InputText id="cidade" className="borderColorEdit input-cidade" type="text" value=
                        {this.state.cidade}
                        onChange={(e) => { this.setState({cidade: e.target.value }) }}/>
                        {/* usado para mostrar a msg de erro, caso tenha */}
                        {this.state.errorCidade && <span style={{ color: 'red' }}>{this.state.errorCidade}</span>}
                    </div>

                    <div className="input-dois">
                    <Dropdown id="seletor-estado"
                        value={this.state.estado}
                        onChange={(e) => this.setState({estado: this.estado = e.value})}
                        options={this.state.estados}
                        optionLabel="nome"
                        placeholder="Estado" />
                        {/* usado para mostrar a msg de erro, caso tenha */}
                    {this.state.errorEstado && <span style={{ color: 'red' }}>{this.state.errorEstado}</span>}
                    </div>
                </div>

                <div className="input-texts">
                    <div className="input-dois">
                        <label  htmlFor="matricula">Matrícula</label>

                        <InputText id="matricula" className="borderColorEdit input-cidade" type="text"
                        value= {this.state.matricula}
                        onChange={(e) => { this.setState({matricula: e.target.value }) }} />

                        {/* usado para mostrar a msg de erro, caso tenha */}
                    {this.state.errorMatricula && <span style={{ color: 'red' }}>{this.state.errorMatricula}</span>}
                    </div>

                    <div className="input-dois">
                        <label  htmlFor="dataNascimento">Data de Nascimento</label>

                        <InputText id="dataNascimento" className="borderColorEdit input-cidade" type="date" placeholder="Data Nascimento"
                        value= {this.state.dataDeNascimento}
                        onChange={(e) => { this.setState({dataDeNascimento: e.target.value }) }}/>

                        {/* usado para mostrar a msg de erro, caso tenha */}
                    {this.state.errorData && <span style={{ color: 'red' }}>{this.state.errorData}</span>}
                    </div>

                    <div className="input-dois">
                        <Dropdown id="seletor-tipo"
                        value={this.state.tipo} onChange={(e) => this.setState({tipo: this.tipo = e.value})}
                        options={this.state.tipos}
                        optionLabel="tipo"
                        placeholder="Tipo" />

                        {/* usado para mostrar a msg de erro, caso tenha */}
                    {this.state.errorTipo && <span style={{ color: 'red' }}>{this.state.errorTipo}</span>}
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
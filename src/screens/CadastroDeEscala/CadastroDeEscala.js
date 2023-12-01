import React from "react";
import { Dialog } from 'primereact/dialog';

import { Messages } from 'primereact/messages';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import { Toast } from 'primereact/toast';


import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';


import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { AiFillQuestionCircle } from "react-icons/ai";
import "./CadastrarEscala.css"
import EscalaService from "../../services/EscalaService";

export default class CadastrarDeEscala extends React.Component{
    state = {
        items:[{ label: 'Escalas', url:"/escalas" }, { label: 'Cadastrar Escala'}],

        home: {icon: 'pi pi-home ', url: '/' },
        tipos: [
            {tipo:'FLEXIVEL'},
            {tipo:'FIXA'},
            {tipo:'BANCO DE HORAS'}
        ],
        
        tipo:{tipo:''},

        cargaHoraria:"",
        horarioEntrada:"",
        horarioSaida:"",

        errorCargaHoraria:"",

        desabilitarHE:true,
        desabilitarHS:true,
        desabilitarCH:true,


        mostrarTexto:'',
        visible:false,
        position:'center'
    }

    constructor(){
        super();
        this.service = new EscalaService();
    }

    componentDidMount(){
        let e = document.getElementsByClassName('bt6').bt
        e.classList.add('selecionar')
    }

    handleMouseOver = () => {
        this.setState({mostrarTexto:true})
    };
    
    handleMouseOut = () => {
        this.setState({mostrarTexto:false})
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

        // document.getElementById('nome').classList.remove('p-invalid')
        // document.getElementById('endereco').classList.remove('p-invalid')
        // document.getElementById('email').classList.remove('p-invalid')
        // document.getElementById('cidade').classList.remove('p-invalid')
        // document.getElementById('matricula').classList.remove('p-invalid')
        // document.getElementById('dataNascimento').classList.remove('p-invalid')
        // document.getElementById('seletor-tipo').classList.remove('p-invalid')
        // document.getElementById('seletor-estado').classList.remove('p-invalid')

        // //Pre Validação de Nome
        // if(this.state.nome === ''){
        //     disparo ++;
        //     let a = document.getElementById('nome');
        //     a.classList.add('p-invalid');
        //     this.setState({errorNome: frasePadrao})
            
        // }
        // else if(this.state.nome.length < 5){
        //     disparo ++;
        //     let a = document.getElementById('nome');
        //     a.classList.add('p-invalid');
        //     this.setState({errorNome: 'Nome Deve ser Maior'})
            
        // }
        // else if(!this.state.nome.includes(' ')){
        //     disparo ++;
        //     let a = document.getElementById('nome');
        //     a.classList.add('p-invalid');
        //     this.setState({errorNome: 'Deve Conter Nome e Sobrenome'})
            
        // }

        // //Pre Validação de Endereço
        // if(this.state.endereco === ''){
        //     disparo ++;
        //     let a = document.getElementById('endereco')
        //     a.classList.add('p-invalid')
        //     this.setState({errorEndereco: frasePadrao})
        // }
        // else if(this.state.endereco.length < 5){
        //     disparo ++;
        //     let a = document.getElementById('endereco')
        //     a.classList.add('p-invalid')
        //     this.setState({errorEndereco: 'Endereco deve ser Maior'})
        // }

        // //Pre Validação de email
        // const regex = /@gmail/;
        // if (!regex.test(this.state.email)) {
        //     disparo ++;
        //     let a = document.getElementById('email')
        //     a.classList.add('p-invalid')
        //     //this.setState({ error: { email: 'Esse Campo precisa ser um e-mail' } })
        //     this.setState({errorEmail:'Esse Campo precisa ser um e-mail'})

        // }
        // else if(this.state.email === ''){
        //     disparo ++;
        //     let a = document.getElementById('email')
        //     a.classList.add('p-invalid')
        //     this.setState({errorEmail:frasePadrao})
          
        // }
        // else if(this.state.email.length < 5){
        //     disparo ++;
        //     let a = document.getElementById('email')
        //     a.classList.add('p-invalid')
        //     this.setState({errorEndereco: 'E-mail Deve ser Maior'})
        // }
        

        // //Pre Validação de Cidade
        // if(this.state.cidade === ''){
        //     disparo ++;
        //     let a = document.getElementById('cidade')
        //     a.classList.add('p-invalid')
        //     this.setState({errorCidade: frasePadrao})
        // }
        // else if(this.state.cidade.length < 5){
        //     disparo ++;
        //     let a = document.getElementById('cidade')
        //     a.classList.add('p-invalid')
        //     this.setState({errorCidade: 'Nome da Cidade deve ser Maior'})
        // }

        // //Pre Validação de Matricula
        // if(this.state.matricula === ''){
        //     disparo ++;
        //     let a = document.getElementById('matricula')
        //     a.classList.add('p-invalid')
        //     this.setState({errorMatricula: frasePadrao})
        // }
        // else if(this.state.matricula.length !== 12){
        //     disparo ++;
        //     let a = document.getElementById('matricula')
        //     a.classList.add('p-invalid')
        //     this.setState({errorMatricula: 'Matricula deve Conter 12 Caracteres'})
        // }

        // //Pre Validação de Data de Nascimento
        // if(this.state.dataDeNascimento === ''){
        //     disparo ++;
        //     let a = document.getElementById('dataNascimento')
        //     a.classList.add('p-invalid')
        //     this.setState({errorData: frasePadrao})
        // }
        // const data = new Date(this.state.dataDeNascimento);
        // const dataAtual = new Date();
        // const diferensaEmMS = dataAtual - data;
        // const anos = diferensaEmMS / (1000 * 60 * 60 * 24 * 365.25); 
        // if(anos < 15){
        //     disparo ++;
        //     let a = document.getElementById('dataNascimento')
        //     a.classList.add('p-invalid')
        //     this.setState({errorData: 'O colaborador deve ter pelomenos 15 anos'})
        // }

        // //Pre Validação de Estado
        // if(this.state.estado.nome === ''){
        //     disparo ++;
        //     let a = document.getElementById('seletor-estado')
        //     a.classList.add('p-invalid')

        //     this.setState({errorEstado: frasePadrao})

        // }

        // //Pre Validação de Tipo
        // if(this.state.tipo.tipo === ''){
        //     disparo ++;
        //     let a = document.getElementById('seletor-tipo')
        //     a.classList.add('p-invalid')

        //     this.setState({errorTipo: frasePadrao})

        // }

        if(false){
            this.state.toast.show(msgError);

        }else{
            this.confirm();
        }


    }
    // Po up para velidar se realmente deseja criar o colaborador
    confirm = async () => {

        const a = document.getElementsByClassName('p-button p-component p-confirm-dialog-reject p-button-text')
        confirmDialog({

            message: 'Você Realmente quer Criar essa Escala?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',

            accept:this.accept,
            reject:this.reject,
            acceptLabel: "Sim",
            rejectLabel: "Não",

        });
        // await this.delay(25);
        // document.getElementsByClassName('p-button-label')[7].textContent = "Sim"
        // document.getElementsByClassName('p-button-label')[6].textContent = "Não"

    };
//Po up de confirmação de cadastro
    accept = () => {
        this.state.toast.show({ severity: 'info', summary: 'Confirmado', detail: 'Criar Escala Confirmada', life: 3000 });
        this.salvar();
    };

    reject = () => {
        this.state.toast.show({ severity: 'warn', summary: 'Regeitado', detail: 'Escala Não Criada', life: 3000 });
    };

    delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    salvar = async () =>{
        

        let horaEntrada = new Date(this.state.horarioEntrada);
               
        let horaEntradaFormatada = `${padZero(horaEntrada.getHours())}:${padZero(horaEntrada.getMinutes())}:00`;       

        let horaSaida = new Date(this.state.horarioSaida);
        
        let horaSaidaFormatada = `${padZero(horaSaida.getHours())}:${padZero(horaSaida.getMinutes())}:00`;

        function padZero(valor) {
            return valor < 10 ? `0${valor}` : valor;
        }     
        console.log(horaEntradaFormatada, horaSaidaFormatada)
        
        await this.service.creat(
             {
                tipo: this.state.tipo.tipo,
                horarioEntrada: horaEntradaFormatada,
                horarioSaida: horaSaidaFormatada,
                dataAtiva: null,
                dataDesativada: "20-10-2023",
                limiteRadialLocalizacaoMetros: 10,
                horario: null	
            
        }
        ).then (async (response) =>{

            this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Escala Criada Com Sucesso' });
           await this.delay(2000);
            window.location.href = `/escalas`;
        }).catch( error =>{
            console.log(error.response,'erro')

            this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Criado Criar Escala' });
            this.state.toast.show({ severity: 'error', summary: 'Erro', detail: error.response.data });
        })
    }

    tipoEscala= (e) =>{
        this.setState({tipo:{tipo:e.value.tipo}})
        if(e.value.tipo === "FIXA"){
            this.setState({desabilitarHE:false})
            this.setState({desabilitarHS:false})
            this.setState({desabilitarCH:false})

    
        }if(e.value.tipo === "FLEXIVEL"){
            this.setState({desabilitarHE:true})
            this.setState({desabilitarHS:true})
            this.setState({desabilitarCH:false})

        }
        if(e.value.tipo === "BANCO DE HORAS"){
            this.setState({desabilitarHE:true})
            this.setState({desabilitarHS:true})
            this.setState({desabilitarCH:false})
        }
       
        console.log(e.value.tipo, "tipo escala")
    }

    mostrarTexto = () =>{
        this.setState({mostrarTexto:"Funcionou"})
    } 

     footerContent = () => {
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => this.setState({visible:false})} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={() => this.setState({visible:false})} autoFocus />
        </div>
    };

    show = (position) =>{
        this.setState({position:position})
        this.setState({visible:true})
    }

    render(){
        return(
            <div className="container">
                <div className="header">
                    {/* Toast: Usado para mostrar mensagem de alerta  */}
                    <Toast ref={(el) => (this.state.toast = el)} />

                    {/* BreadCrumb: Usado para o menu de navegaçao que fica ao lado do bt de salvar */}
                    <div className="header-criar-colaborador">
                        <BreadCrumb id="breadCrumb" model={this.state.items} home={this.state.home}></BreadCrumb>

                                             

                        {/* <Button
                        onClick={this.mostrarTexto()}> 
                            <AiFillQuestionCircle></AiFillQuestionCircle>
                        </Button>
                        {this.state.mostrarTexto && <span style={{ color: 'red' }}>{this.state.mostrarTexto}</span>} */}

                    </div>
                    <div className="botoes">
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
                        <div className="">
                            <Button label="Ajuda"  onClick={() => this.show('top-left')} className="p-button-warning" />
                            
                        </div>
                     </div>
                </div>

                <div className="input-texts">
                    <div className="input-dois seletor">
                        <Dropdown id="seletor-tipo"
                            value={this.state.tipo} 
                            onChange={(e) => this.tipoEscala(e)}
                            options={this.state.tipos}
                            optionLabel="tipo"
                            placeholder="Tipo" />

                            {/* usado para mostrar a msg de erro, caso tenha */}
                        {this.state.errorTipo && <span style={{ color: 'red' }}>{this.state.errorTipo}</span>}
                    </div>

                    
                     
                     <Dialog header="Ajuda" visible={this.state.visible} position={this.state.position} style={{ width: '50vw' }} onHide={() => this.setState({visible:false})} footer={this.footerContent} draggable={false} resizable={false}>
                <p className="m-0">
                    <b>Flexivel:</b> Carga horária diária, mas sem horário de entrada e saída definidos.
                    <br/>
                    <b>Fixa:</b> Carga horária definida, com horários de entrada e saída fixos.
                    <br/>
                    <b>Banco de Horas:</b> Sem carga horária diária definida, pode acumular horas. 
                </p>
            </Dialog>

                    <div className="input-dois">
                        <label  htmlFor="cargaHoraria">Carga Horaria</label>

                        <InputText id="cargaHoraria" 
                        disabled={this.state.desabilitarCH}
                        keyfilter="int"
                        className="borderColorEdit " type="text"
                        value= {this.state.cargaHoraria}
                        onChange={(e) => { this.setState({cargaHoraria: e.target.value }) }} />

                        {/* usado para mostrar a msg de erro, caso tenha */}
                    {this.state.errorCargaHoraria && <span style={{ color: 'red' }}>{this.state.errorCargaHoraria}</span>}
                    </div>

                </div>

                <div className="input-texts">
                    <div className="input-um">
                        <label htmlFor="horarioEntrada" className="font-bold block mb-2">
                            Horario de Entrada
                        </label>
                        <Calendar
                        disabled={this.state.desabilitarHE} id="horarioEntraday" value={this.state.horarioEntrada} onChange={(e) => {this.setState({horarioEntrada:e.target.value})}} timeOnly />
                    </div>

                    <div className="input-dois">
                        <label  htmlFor="horarioSaida" className="font-bold block mb-2">
                            Horario de Saida
                        </label>
                        <Calendar 
                        disabled={this.state.desabilitarHS} id="horarioSaida" value={this.state.horarioSaida} onChange={(e) => {this.setState({horarioSaida:e.target.value})}} timeOnly />
                    </div>
                </div>
                

            </div>

        )
    }
}
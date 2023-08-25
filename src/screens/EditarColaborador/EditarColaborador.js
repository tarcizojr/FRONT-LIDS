import React from "react";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

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
            {nome:'Paraiba'},
            {nome:'Pernanbuco'}
        ],
        tipos: [
            {tipo:'DISCENTE'},
            {tipo:'DOSCENTE'}
        ],
        
        

        id:'',
        nome:'',
        endereco:'',
        email:'',
        cidade:'',
        matricula:'',
        estado:{nome: ''},
        tipo:{tipo:''},
        dataDeNascimento:'',
        linkCurriculo:'',
        status:'',

        toast:'',

        msgDeErro:'',
        errorNome:'',
        errorEmail:''
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
    const dataOriginal = this.state.dataDeNascimento;
        const data = new Date(dataOriginal);

        const dia = data.getDate() + 1;
        const mes = data.getMonth() + 1;
        const ano = data.getFullYear();

        //Formata o mes antes de mandar para o back
       
        const dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano.toString().padStart(2, '0')}`
        console.log("data", dataFormatada )
    await this.service.update(this.state.id,{
        nome:this.state.nome,
        endereco:this.state.endereco,
        email:this.state.email,
        cidade: this.state.cidade,
        estado:this.state.estado.nome,
        matricula: this.state.matricula,
        dataDeNascimento: dataFormatada,
        linkCurriculo: this.state.linkCurriculo,
        status:this.state.status,
        tipo:this.state.tipo.tipo
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

   //Po up de confirmação de edição
    accept = () => {
        this.state.toast.show({ severity: 'info', summary: 'Confirmado', detail: 'Editar Colaborador Confirmado', life: 3000 });
        this.editar();
    };

    reject = () => {
        this.state.toast.show({ severity: 'warn', summary: 'Regeitado', detail: 'Colaborador Não Editado', life: 3000 });
    };

     // Po up para velidar se realmente deseja criar o colaborador
    confirm = async (colaboradorId) => {
        this.setState({colaboradorId: colaboradorId})
        const a = document.getElementsByClassName('p-button p-component p-confirm-dialog-reject p-button-text')
        confirmDialog({
          
            message: 'Você Realmente quer Editar esse Colaborador?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            
            accept:this.accept,
            reject:this.reject,
            
        });
        await this.delay(15);
        document.getElementsByClassName('p-button-label')[7].textContent = "Sim"
        document.getElementsByClassName('p-button-label')[6].textContent = "Não"
    };


    // Validar se os campos estão preenchidos corretamente
    validar = () =>{
        let msgError= { severity: 'error', summary: 'Corrija os Erros a Baixo', detail: 'Campos não podem ser nulos' };

        let disparo = 0;
        //Pre Validação de Nome
        if(this.state.nome === ''){
            disparo ++;
            let a = document.getElementById('nome');
            a.classList.add('p-invalid');
            this.setState({errorNome:'Esse Campo é Obrigatorio'})
            
        }

        //Pre Validação de Endereço
        if(this.state.endereco === ''){
            disparo ++;
            let a = document.getElementById('endereco')
            a.classList.add('p-invalid')
        }

        //Pre Validação de email
        const regex = /@/;
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
            this.setState({errorEmail:'Esse Campo é Obrigatorio'})
          
        }

        //Pre Validação de Cidade
        if(this.state.cidade === ''){
            disparo ++;
            let a = document.getElementById('cidade')
            a.classList.add('p-invalid')
        }

        //Pre Validação de Matricula
        if(this.state.matricula === ''){
            disparo ++;
            let a = document.getElementById('matricula')
            a.classList.add('p-invalid')
        }

        //Pre Validação de Data de Nascimento
        if(this.state.dataDeNascimento === ''){
            disparo ++;
            let a = document.getElementById('dataNascimento')
            a.classList.add('p-invalid')
        }

        //Pre Validação de Estado
        if(this.state.estado.nome === ''){
            disparo ++;
            let a = document.getElementById('seletor-estado')
            a.classList.add('p-invalid')
        }

        //Pre Validação de Tipo
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

    findByid = (id) =>{
        this.service.find(`/${id}`)
            .then(response =>{

                const colaborador = response.data;
                const id = colaborador.id
                const nome = colaborador.nome
                const endereco = colaborador.endereco
                const email = colaborador.email
                const cidade = colaborador.cidade
                const estadoDoColaborador = colaborador.estado
                const matricula = colaborador.matricula
                const tipo = colaborador.tipo
                const dataDeNascimento = colaborador.dataDeNascimento
                const linkCurriculo = colaborador.linkCurriculo
                const status = colaborador.status

                this.setState({id:id,nome:nome,endereco:endereco, email:email, cidade:cidade, matricula:matricula, linkCurriculo:linkCurriculo, status:status})

                const partesDaData = dataDeNascimento.split('/');
                const dataNoNovoFormato = `${partesDaData[2]}-${partesDaData[1]}-${partesDaData[0]}`
                this.setState({dataDeNascimento: dataNoNovoFormato})
                

                this.setState({estado:{nome: estadoDoColaborador}})
                this.setState({tipo:{tipo: tipo}})
               

                console.log(dataDeNascimento, 'aaa')
            })
            .catch(error =>{
                console.log(error)
            })
    }


    render(){
        
        
        return(
            <div className="container">
                <div className="header">

                {/* Toast: Usado para mostrar mensagem de alerta  */}
                <Toast ref={(el) => (this.state.toast = el)} />

                {/* Campo de dialogo que aparece para confirmar se deseja salvar  */}
                {/* Ele chama a função de validar, caso a validação der ok,apresenta o campo para confirmação e caso confirmado, chama a função de salva */}
                <ConfirmDialog 
                  acceptClassName="p-button-success"
                  rejectClassName="p-button-danger"
                 acceptLabel="Sim"
                 rejectLabel="Não"/>
                 
                    <div>
                        {/* BreadCrumb: Usado para o menu de navegaçao que fica ao lado do bt de salvar */}
                        <BreadCrumb model={this.state.items} home={this.state.home}></BreadCrumb>
                    </div>

                    <div className="bt-salvar">
                        <Button label="Salvar" severity="warning" raised onClick={this.validar} />
        
                    </div>
                </div>

                <div >                
                {/* Começas os Campos  */}
                <div className="input-texts">
                    <div className="input-um">
                        <label htmlFor="nome">Nome</label>
                        <InputText id="nome" className="borderColorEdit" type="text"
                         value={this.state.nome}
                        onChange={(e) => { this.setState({nome: e.target.value }) }} />
                        {this.state.errorNome && <span style={{ color: 'red' }}>{this.state.errorNome}</span>}
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
                        onChange={(e) => { this.setState({email: e.target.value }) }}
                        />
                        {this.state.errorEmail && <span style={{ color: 'red' }}>{this.state.errorEmail}</span>}
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

                        <InputText id="matricula" className="borderColorEdit input-cidade" type="text" value= {this.state.matricula} 
                         onChange={(e) => { this.setState({matricula: e.target.value }) }}/>
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
                
            </div>

        )
    }
}
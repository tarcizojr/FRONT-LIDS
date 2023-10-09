import React from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";

import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { InputTextarea } from "primereact/inputtextarea";

import ProjetoService from "../../services/ProjetoService";

import './CriarProjeto.css'
export default class CriarProjeto extends React.Component{
    state = {
        items:[{ label: 'Projetos', url:"/projetos" }, { label: 'Criar Projeto' }],

        home: {icon: 'pi pi-home ', url: '/' },


        tipos: [
            {tipo:'INOVAÇÃO'},
            {tipo:'PESQUISA'},
            {tipo:'EXTENSÃO'},
            {tipo:'ENSINO'}
        ],
        tipo:{tipo:''},

        nomeDoProjeto:'',
        objetivo:'',
        dataInicio:'',
        dataFim:'',

        toast:'',

        msgDeErro:'',
        errorNomeDoProjeto:'',
        errorObjetivo:'',
        errorDataInicio:'',
        errorDataFim:'',
        errorTipo:''
        


    }

    constructor(){
        super();
        this.service = new ProjetoService();
    }

    salvarProjeto = () => {
        

        const dataOriginalInicio = this.state.dataInicio;
        const dataI = new Date(dataOriginalInicio);
        const diaI = dataI.getDate() + 1;
        const mesI = dataI.getMonth() + 1;
        const anoI = dataI.getFullYear();
        const dataInicioFormatada = `${diaI.toString().padStart(2, '0')}-${mesI.toString().padStart(2, '0')}-${anoI.toString().padStart(2, '0')}`;


        const dataOriginalFim = this.state.dataFim;
        const dataF = new Date(dataOriginalFim);
        const diaF = dataF.getDate() + 1;
        const mesF = dataF.getMonth() + 1;
        const anoF = dataF.getFullYear();
        const dataFimFormatada = `${diaF.toString().padStart(2, '0')}-${mesF.toString().padStart(2, '0')}-${anoF.toString().padStart(2, '0')}`;

        console.log(`dataI ${dataInicioFormatada} dataF ${dataFimFormatada}`)

        const sem = this.state.tipo.tipo.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        this.service.creat({
            "titulo": this.state.nomeDoProjeto,
            "tipo" : sem,
            "descricao" : this.state.objetivo,
            "dataInicio":dataInicioFormatada,
            "dataTermino":dataFimFormatada
        }).then (async (response) =>{

            this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Projeto Criado Com Sucesso' });
            console.log(dataInicioFormatada,'data inicio passada')

           await this.delay(2000);
           window.location.href = `/projetos`;
        }).catch(async error =>{
            await console.log(error, 'erro')

            this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Criado Criar Projeto' });
            this.state.toast.show({ severity: 'error', summary: 'Erro', detail: error.response.data });
        })
    }

    delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    validar = () =>{
        console.log(this.state.dataInicio,"nome no validar")

        let msgError= { severity: 'error', summary: 'Corrija os Erros a Baixo', detail: 'Verifique os Erros a Baixo' };
        
        let frasePadrao = 'Esse Campo é Obrigatorio';
        let disparo = 0;

        this.setState({errorNomeDoProjeto: ''})
        this.setState({errorObjetivo: ''})
        this.setState({errorDataInicio: ''})
        this.setState({errorDataFim: ''})
        this.setState({errorTipo: ''})

        //Pre Validação de Nome
        if(this.state.nomeDoProjeto === ''){
            disparo ++;
            let a = document.getElementById('nomeDoProjeto');
            a.classList.add('p-invalid');
            this.setState({errorNomeDoProjeto: frasePadrao})
            
        }
        else if(this.state.nomeDoProjeto.length < 15){
            disparo ++;
            let a = document.getElementById('nomeDoProjeto');
            a.classList.add('p-invalid');
            this.setState({errorNomeDoProjeto: 'Nome Deve ser Maior'})
            
        }else if(this.state.nomeDoProjeto.length > 256){
            disparo ++;
            let a = document.getElementById('nomeDoProjeto');
            a.classList.add('p-invalid');
            this.setState({errorNomeDoProjeto: 'Nome Deve ser Menor'})
            
        }

        //Pre Validação de Tipo
        if(this.state.tipo.tipo === ''){
            disparo ++;
            let a = document.getElementById('seletor-tipo')
            a.classList.add('p-invalid')

            this.setState({errorTipo: frasePadrao})

        }

        //Pre Validação de Objetivo do Projeto
        if(this.state.objetivo === ''){
            disparo ++;
            let a = document.getElementById('objetivo');
            a.classList.add('p-invalid');
            this.setState({errorObjetivo: frasePadrao})
            
        }else if(this.state.objetivo.length < 30){
            disparo ++;
            let a = document.getElementById('objetivo');
            a.classList.add('p-invalid');
            this.setState({errorObjetivo: "Objetivo deve Ser Maior"})
            
        }else if(this.state.objetivo.length > 256){
            disparo ++;
            let a = document.getElementById('objetivo');
            a.classList.add('p-invalid');
            this.setState({errorObjetivo: "Objetivo deve Ser Menor"})
            
        }

        //Pre Validação de Data Inicio
        if(this.state.dataInicio === ''){
            disparo ++;
            let a = document.getElementById('dataInicio');
            a.classList.add('p-invalid');
            this.setState({errorDataInicio: frasePadrao})
            
        }

        //Pre Validação de Data Fim
        if(this.state.dataFim === ''){
            disparo ++;
            let a = document.getElementById('dataFim');
            a.classList.add('p-invalid');
            this.setState({errorDataFim: frasePadrao})
            
        }else if(this.state.dataFim < this.state.dataInicio){
            disparo ++;
            let a = document.getElementById('dataFim');
            a.classList.add('p-invalid');
            this.setState({errorDataFim: "Data de Termino tem que ser maior que a de Inicio "})
            
        }

        if(disparo !== 0){
            this.state.toast.show(msgError);

        }else{
            this.confirm();
        }
    }

    confirm = async () => {
        const a = document.getElementsByClassName('p-button p-component p-confirm-dialog-reject p-button-text')
        confirmDialog({

            message: 'Você Realmente quer Criar esse Projeto?',
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

    accept = () => {
        this.state.toast.show({ severity: 'info', summary: 'Confirmado', detail: 'Criar Projeto Confirmado', life: 3000 });
        this.salvarProjeto();
    };

    reject = () => {
        this.state.toast.show({ severity: 'warn', summary: 'Regeitado', detail: 'Projeto Não Criado', life: 3000 });
    };
    
    render(){
       


        
        return(

                        
            <div className="container">
                <div className="header">

                    <Toast ref={(el) => (this.state.toast = el)} />

                    
                    <div className="header-criar-projeto">
                        <BreadCrumb id="breadCrumb" model={this.state.items} home={this.state.home}></BreadCrumb>
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
                        <label htmlFor="nomeDoProjeto">Nome do Projeto</label>
                        <InputText id="nomeDoProjeto" className="borderColorEdit" type="text"
                         value={this.state.nomeDoProjeto}
                        onChange={(e) => { this.setState({nomeDoProjeto: e.target.value }) }} />

                    {/* usado para mostrar a msg de erro, caso tenha */}
                    {this.state.errorNomeDoProjeto && <span style={{ color: 'red' }}>{this.state.errorNomeDoProjeto}</span>}
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
                    
                </div>

                <div className="input-texts">
                    <div className="input-um">
                        <label htmlFor="objetivo">Descrição do Projeto</label>
                        <InputTextarea id="objetivo" className="borderColorEdit textArea" type="text"
                        value={this.state.objetivo}
                        onChange={(e) => { this.setState({objetivo: e.target.value }) }}
                        rows={5} cols={60} autoResize />

                        {/* usado para mostrar a msg de erro, caso tenha */}
                        {this.state.errorObjetivo && <span style={{ color: 'red' }}>{this.state.errorObjetivo}</span>}
                    </div>
                </div>

                <div className="input-texts">
                    <div className="input-um">
                            <label  htmlFor="dataInicio">Data Inicio</label>

                            <InputText id="dataInicio" className="borderColorEdit input-cidade" type="date" 
                            value= {this.state.dataInicio}
                            onChange={(e) => { this.setState({dataInicio: e.target.value }) }}/>

                            {/* usado para mostrar a msg de erro, caso tenha */}
                        {this.state.errorDataInicio && <span style={{ color: 'red' }}>{this.state.errorDataInicio}</span>}
                    </div>

                    <div className="input-dois">
                            <label  htmlFor="dataFim">Data Fim</label>

                            <InputText id="dataFim" className="borderColorEdit input-cidade" type="date" 
                            value= {this.state.dataFim}
                            onChange={(e) => { this.setState({dataFim: e.target.value }) }}/>

                            {/* usado para mostrar a msg de erro, caso tenha */}
                        {this.state.errorDataFim && <span style={{ color: 'red' }}>{this.state.errorDataFim}</span>}
                    </div>
                </div>
            </div>

            
                
    
        )
    }
}
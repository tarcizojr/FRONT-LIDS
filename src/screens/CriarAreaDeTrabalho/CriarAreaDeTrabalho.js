import React from "react";
import { Messages } from 'primereact/messages';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from 'primereact/dropdown';
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";

import AreasService from "../../services/AreasService"


export default class CriarAreaDeTrabalho extends React.Component{
    state = {
        items:[{ label: 'Area de Trabalho', url:"/areasDeTrabalho" }, { label: 'Criar Area de Trabalho'}],

        nome:"",
        codigo:"",
        descricao:"",

        errorNome:"",
        errorCodigo:"",
        errorDescricao:""
    }

    constructor(){
        super()
        this.service = new AreasService();
        
      }

    delay = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    validar = () => {

        let msgError = {
          severity: "error",
          summary: "Corrija os Erros a Baixo",
          detail: "Verifique os Erros a Baixo",
        };
    
        let frasePadrao = "Esse Campo é Obrigatorio";
        let disparo = 0;
    
        this.setState({ errorNome: "" });
        this.setState({ errorCodigo: "" });
        this.setState({ errorDescricao: "" });
           
        if(this.state.nome === ''){
          disparo ++;
          let a = document.getElementById('nome');
          a.classList.add('p-invalid');
          this.setState({errorNome: frasePadrao})
        }
        else if(this.state.nome.length < 5){
          disparo ++;
          let a = document.getElementById('nome');
          a.classList.add('p-invalid');
          this.setState({errorNome: 'Nome Deve ser Maior'})          
      } else if(this.state.nome.length > 12){
        disparo ++;
        let a = document.getElementById('nome');
        a.classList.add('p-invalid');
        this.setState({errorNome: 'Nome Deve ser MEnor'})
      }

      if(this.state.codigo === ''){
        disparo ++;
        let a = document.getElementById('codigo');
        a.classList.add('p-invalid');
        this.setState({errorCodigo: frasePadrao})
      }
      else if(this.state.codigo.length !== 3){
        disparo ++;
        let a = document.getElementById('codigo');
        a.classList.add('p-invalid');
        this.setState({errorCodigo: 'Codigo Deve ter 3 numeros'})          
      }
      
      if(this.state.descricao === ''){
        disparo ++;
        let a = document.getElementById('descricao');
        a.classList.add('p-invalid');
        this.setState({errorDescricao: frasePadrao})
      }
      else if(this.state.descricao.length < 5){
        disparo ++;
        let a = document.getElementById('descricao');
        a.classList.add('p-invalid');
        this.setState({errorDescricao: "Descrição deve ser Maior"})
      }
      else if(this.state.descricao.length > 20){
        disparo ++;
        let a = document.getElementById('descricao');
        a.classList.add('p-invalid');
        this.setState({errorDescricao: "Descrição deve ser Menor"})
      }
    
    
        if (disparo !== 0) {
          this.state.toast.show(msgError);
        } else {
          this.confirm();
        }
      };

      confirm = async () => {
        const a = document.getElementsByClassName(
          "p-button p-component p-confirm-dialog-reject p-button-text"
        );
        
        confirmDialog({
          
          message: `Você Realmente quer Criar essa Area de Trabalho?`,
          icon: "pi pi-info-circle",
          acceptClassName: "p-button-danger",
    
          accept: this.accept,
          reject: this.reject,
          acceptLabel: "Sim",
          rejectLabel: "Não",
          
        });
       
      };

      accept = () => {
        this.state.toast.show({
          severity: "info",
          summary: "Confirmado",
          detail: "Criar Area de Trabalho Confirmada",
          life: 3000,
        });
        
        this.salvarAreaDeTrabalho();
        
    }

    reject = () => {
      this.state.toast.show({ severity: 'warn', summary: 'Regeitado', detail: 'Area de Trabalho Não Criada', life: 3000 });
  };

    salvarAreaDeTrabalho =() =>{
        this.service.creat({
            "codigo": this.state.codigo,
            "nome": this.state.nome,
            "descricao": this.state.descricao
          }).then (async (response) =>{
      
            this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Area de Trabalho Criada Com Sucesso' });
      
           await this.delay(2000);
           window.location.href = `/areasDeTrabalho`;
        }).catch(async error =>{
            await console.log(error, 'erro')
      
            this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao  Criar Area de Trabalho' });
            this.state.toast.show({ severity: 'error', summary: 'Erro', detail: error.response.data });
        })
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

            <div className="input-texts">
            <div className="input-um">
                <label htmlFor="nome">Nome</label>
                <InputText
                id="nome"
                className="borderColorEdit"
                type="text"
                value={this.state.nome}
                onChange={(e) => {
                    this.setState({ nome: e.target.value });
                }}
                />

                {/* usado para mostrar a msg de erro, caso tenha */}
                {this.state.errorNome && (
                <span style={{ color: "red" }}>{this.state.errorNome}</span>
                )}
            </div>

            <div className="input-dois">
                <label id="codigo-label" htmlFor="codigo">
                Codigo
                </label>
                <InputText
                id="codigo"
                className="borderColorEdit"
                type="text"
                value={this.state.codigo}
                onChange={(e) => {
                    this.setState({ codigo: e.target.value });
                }}
                />

                {/* usado para mostrar a msg de erro, caso tenha */}
                {this.state.errorCodigo && (
                <span style={{ color: "red" }}>{this.state.errorCodigo}</span>
                )}
            </div>
        </div>
        
        <div className="input-texts">
          <div className="input-um">
            <label htmlFor="descricao">Descrição da Area</label>
            <InputTextarea
              id="descricao"
              className="borderColorEdit textArea"
              type="text"
              value={this.state.descricao}
              onChange={(e) => {
                this.setState({ descricao: e.target.value });
              }}
              rows={5}
              cols={60}
              autoResize
            />

            {/* usado para mostrar a msg de erro, caso tenha */}
            {this.state.errorDescricao && (
              <span style={{ color: "red" }}>{this.state.errorDescricao}</span>
            )}
          </div>

            

            
        </div>
        

    </div>

        )
    }

}
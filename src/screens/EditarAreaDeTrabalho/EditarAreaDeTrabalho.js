import React from "react";
import AreasService from "../../services/AreasService"
import { Messages } from 'primereact/messages';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from 'primereact/dropdown';
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
export default class EditarAreaDeTrabalho extends React.Component {

    state = {
        items: [
          { label: "Areas de Trabalho", url: "/areasDeTrabalho" },
          { label: "Editar Area de Trabalho" },
        ],

        id:"",
        nome:"",
        codigo:"",
        descricao:"",

        errorNome:"",
        errorCodigo:"",
        errorDescricao:""

    }

    componentDidMount(){
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf('/') + 1);
        this.findByid(id)
    }

    constructor(){
        super()
        this.service = new AreasService();
        
      }


      findByid = (id) =>{
        this.service.find(`/${id}`)
            .then(response =>{

                const area = response.data;
                const id = area.id
                const nome = area.nome
                const codigo = area.codigo
                const descricao = area.descricao

                this.setState({id:id,nome:nome, codigo:codigo, descricao:descricao})

               
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
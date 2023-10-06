import React from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import "./CriarEquipamento.css";
import EquipamentoService from "../../services/EquipamentoService";
import ComputadorService from "../../services/ComputadorService";

export default class CriarEquipamento extends React.Component {
  state = {
    items: [
      { label: "Equipamentos", url: "/equipamentos" },
      { label: "Criar Equipamento" },
    ],

    home: { icon: "pi pi-home ", url: "/" },

    tipos: [{ tipo: "EQUIPAMENTO" }, { tipo: "COMPUTADOR" }],
    tipo: { tipo: "EQUIPAMENTO" },

    tiposDaMaquinas: [{ tipo: "COMPUTADOR" }, { tipo: "NOTBOOK" }],
    tipoDaMaquina: { tipo: "" },

    memorias: [{ tipo: "DDR1" }, { tipo: "DDR2" }],
    memoria: { tipo: "" },

    armazenamentos: [{ tipo: "DDR1" }, { tipo: "DDR2" }],
    armazenamento: { tipo: "" },
    desativado: true,

    nome: "",
    codigo: "",
    descricao: "",
    marca: "",
    modelo: "",
    tamanho: "",
    processador: "",
    capacidade: "",

    erroNome: "",
    errorCodigo: "",
    errorDescricao: "",
    errorTipo: "",
    errorTipoDaMaquina: "",
    errorMarca: "",
    errorModelo: "",
    errorTamanho: "",
    errorProcessador: "",
    errorArmazenamento: "",
    errorCapacidade: "",
  };

  constructor(){
    super()
    this.service = new EquipamentoService();
    this.serviceC = new ComputadorService();
  }


  selecaoEquipamento = (e) => {
    this.setState({ tipo: (this.tipo = e.value) });
    if (e.value.tipo === "COMPUTADOR") {
      this.setState({ desativado: false });
    } else {
      this.setState({ desativado: true });
    }
  };

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

    this.setState({ erroNome: "" });
    this.setState({ erroCodigo: "" });
    this.setState({ erroDescricao: "" });
    this.setState({ errorTipo: "" });
    this.setState({ errorMarca: "" });
    this.setState({ errorModelo: "" });
    this.setState({ errorTamanho: "" });
    this.setState({ errorProcessador: "" });
    this.setState({ errorArmazenamento: "" });
    this.setState({ errorCapacidade: "" });


    //Pre Validação de Nome
    if(this.state.nome === ''){
      disparo ++;
      let a = document.getElementById('nome');
      a.classList.add('p-invalid');
      this.setState({errorNome: frasePadrao})
      
    }

  //Pre Validação de Codigo
  if(this.state.codigo === ''){
    disparo ++;
    let a = document.getElementById('codigo');
    a.classList.add('p-invalid');
    this.setState({errorCodigo: frasePadrao})
    
  }

  //Pre Validação de Codigo
  if(this.state.descricao === ''){
    disparo ++;
    let a = document.getElementById('descricao');
    a.classList.add('p-invalid');
    this.setState({errorDescricao: frasePadrao})
    
  }

  if(this.state.tipo.tipo === "COMPUTADOR"){
     //Pre Validação de Tipo da Maquina
    if(this.state.tipoDaMaquina.tipo === ''){
      disparo ++;
      let a = document.getElementsByClassName('seletor-tipo-maquina');
      a[0].classList.add('p-invalid');
      this.setState({errorTipoDaMaquina: frasePadrao})
      
    }

    //Pre Validação de Marca
    if(this.state.marca === ''){
      disparo ++;
      let a = document.getElementById('marca');
      a.classList.add('p-invalid');
      this.setState({errorMarca: frasePadrao})
      
    }

    //Pre Validação de Modelo
    if(this.state.modelo === ''){
      disparo ++;
      let a = document.getElementById('modelo');
      a.classList.add('p-invalid');
      this.setState({errorModelo: frasePadrao})
      
    }

    //Pre Validação de Memoria
    if(this.state.memoria.tipo === ''){
      disparo ++;
      let a = document.getElementsByClassName('seletor-tipo-memoria');
      a[0].classList.add('p-invalid');
      this.setState({errorMemoria: frasePadrao})
      
    }

    //Pre Validação de Tamanho
    if(this.state.tamanho === ''){
      disparo ++;
      let a = document.getElementById('tamanho');
      a.classList.add('p-invalid');
      this.setState({errorTamanho: frasePadrao})
      
    }

    //Pre Validação de Processador
    if(this.state.processador === ''){
      disparo ++;
      let a = document.getElementById('processador');
      a.classList.add('p-invalid');
      this.setState({errorProcessador: frasePadrao})
      
    }

    //Pre Validação de Armazenamento
    if(this.state.armazenamento.tipo === ''){
      disparo ++;
      let a = document.getElementsByClassName('seletor-tipo-armazenamento');
      a[0].classList.add('p-invalid');
      this.setState({errorArmazenamento: frasePadrao})
      
    }

    //Pre Validação de Capacidade
    if(this.state.capacidade === ''){
      disparo ++;
      let a = document.getElementById('capacidade');
      a.classList.add('p-invalid');
      this.setState({errorCapacidade: frasePadrao})
      
    }
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
    let n = 'Computador'
    if(this.state.tipo.tipo === "EQUIPAMENTO"){
      n = "Equipamento"
    }
    confirmDialog({
      
      message: `Você Realmente quer Criar esse ${n}?`,
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",

      accept: this.accept,
      reject: this.reject,
    });
    await this.delay(20);
    document.getElementsByClassName("p-button-label")[8].textContent = "Sim";
    document.getElementsByClassName("p-button-label")[7].textContent = "Não";
  };

  accept = () => {
    this.state.toast.show({
      severity: "info",
      summary: "Confirmado",
      detail: "Criar Equipamento Confirmado",
      life: 3000,
    });
    if(this.state.tipo.tipo === "EQUIPAMENTO"){
      this.salvarEquipamento();
    }else{
      this.salvarComputador();
    }
  
  };

  reject = () => {
    this.state.toast.show({
      severity: "warn",
      summary: "Regeitado",
      detail: "Equipamento Não Criado",
      life: 3000,
    });
  };

  salvarEquipamento =() =>{
    this.service.creat({
      "codigo": this.state.codigo,
      "nome": this.state.nome,
      "descricao": this.state.descricao
    }).then (async (response) =>{

      this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Equipamento Criado Com Sucesso' });

     await this.delay(2000);
     window.location.href = `/equipamentos`;
  }).catch(async error =>{
      await console.log(error, 'erro')

      this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Criado Criar Equipamento' });
      this.state.toast.show({ severity: 'error', summary: 'Erro', detail: error.response.data });
  })
  }
  salvarComputador =() =>{
    console.log(`
    "codigo": ${this.state.codigo},
    "nome": ${this.state.nome},
    "descricao": ${this.state.descricao},
    "tipoDaMaquina": ${this.state.tipoDaMaquina.tipo},
    "modelo": ${this.state.modelo},
    "marca": ${this.state.marca},
    "processador": ${this.state.processador},
    "tipoMemoria": ${this.state.memoria.tipo},
    "capacidadeMemoria": ${this.state.tamanho},
    "tipoArmazenamento": ${this.state.armazenamento.tipo},
    "capacidadeArmazenamento": ${this.state.capacidade},
    "tipoDeConexao": "USB, HDMI",
    "quantidadeMonitores": 1

    `)
    this.serviceC.creat({
      "codigo": this.state.codigo,
      "nome": this.state.nome,
      "descricao": this.state.descricao,
      "tipoDaMaquina": this.state.tipoDaMaquina.tipo,
      "modelo": this.state.modelo,
      "marca": this.state.marca,
      "processador": this.state.processador,
      "tipoMemoria": this.state.memoria.tipo,
      "capacidadeMemoria": this.state.tamanho,
      "tipoArmazenamento": this.state.armazenamento.tipo,
      "capacidadeArmazenamento": this.state.capacidade,
      "tipoDeConexao": "USB, HDMI",
      "quantidadeMonitores": 1

      
    }).then (async (response) =>{

      this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Equipamento Criado Com Sucesso' });

     await this.delay(2000);
     window.location.href = `/equipamentos`;
  }).catch(async error =>{
      await console.log(error, 'erro')

      this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Criado Criar Equipamento' });
      this.state.toast.show({ severity: 'error', summary: 'Erro', detail: error.response.data });
  })
  }
  render() {
    return (
      <div className="container">
        <div className="header">
          <Toast ref={(el) => (this.state.toast = el)} />

          <div className="header-criar-equipamento">
            <BreadCrumb
              id="breadCrumb"
              model={this.state.items}
              home={this.state.home}
            ></BreadCrumb>
          </div>
          <div className="bt-salvar">
            <ConfirmDialog
              acceptClassName="p-button-success"
              rejectClassName="p-button-danger"
              acceptLabel="Sim"
              rejectLabel="Não"
            />

            <Button
              label="Salvar"
              severity="warning"
              raised
              onClick={this.validar}
            />
          </div>
        </div>

        <div className="input-texts">
          <div className="input-um">
            <label htmlFor="nome">Nome do Equipamento</label>
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
            <label htmlFor="descricao">Descrição do Equipamento</label>
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

          <div className="input-dois seletor">
            {/* tipo maquina */}
            <Dropdown
              id="seletor-tipo"
              value={this.state.tipo}
              // onChange={(e) => this.setState({ tipo: (this.tipo = e.value) })}
              onChange={(e) => this.selecaoEquipamento(e)}
              options={this.state.tipos}
              optionLabel="tipo"
              placeholder="Tipo"
            />

            {/* usado para mostrar a msg de erro, caso tenha */}
            {this.state.errorTipo && (
              <span style={{ color: "red" }}>{this.state.errorTipo}</span>
            )}
          </div>

          <div className="input-dois seletor">
            <Dropdown
              disabled={this.state.desativado}
              className="seletor-tipo-maquina"
              id="seletor-tipo"
              value={this.state.tipoDaMaquina}
              onChange={(e) =>
                this.setState({ tipoDaMaquina: (this.tipo = e.value) })
              }
              options={this.state.tiposDaMaquinas}
              optionLabel="tipo"
              placeholder="Tipo"
            />

            {/* usado para mostrar a msg de erro, caso tenha */}
            {this.state.errorTipoDaMaquina && (
              <span style={{ color: "red" }}>
                {this.state.errorTipoDaMaquina}
              </span>
            )}
          </div>
        </div>

        <div className="input-texts">
          <div className="input-um">
            <label htmlFor="nome">Marca</label>
            <InputText
              disabled={this.state.desativado}
              id="marca"
              className="borderColorEdit"
              type="text"
              value={this.state.marca}
              onChange={(e) => {
                this.setState({ marca: e.target.value });
              }}
            />

            {/* usado para mostrar a msg de erro, caso tenha */}
            {this.state.errorMarca && (
              <span style={{ color: "red" }}>{this.state.errorMarca}</span>
            )}
          </div>

          <div className="input-dois">
            <label id="modelo-label" htmlFor="codigo">
              Modelo
            </label>
            <InputText
              disabled={this.state.desativado}
              id="modelo"
              className="borderColorEdit"
              type="text"
              value={this.state.modelo}
              onChange={(e) => {
                this.setState({ modelo: e.target.value });
              }}
            />

            {/* usado para mostrar a msg de erro, caso tenha */}
            {this.state.errorModelo && (
              <span style={{ color: "red" }}>{this.state.errorModelo}</span>
            )}
          </div>

          <div className="input-dois seletor">
            <Dropdown
              disabled={this.state.desativado}
              className="seletor-tipo-memoria"
              id="seletor-tipo"
              value={this.state.memoria}
              onChange={(e) =>
                this.setState({ memoria: (this.tipo = e.value) })
              }
              options={this.state.memorias}
              optionLabel="tipo"
              placeholder="Memoria RAM"
            />

            {/* usado para mostrar a msg de erro, caso tenha */}
            {this.state.errorMemoria && (
              <span style={{ color: "red" }}>{this.state.errorMemoria}</span>
            )}
          </div>

          <div className="input-dois">
            <label id="tamanho-label" htmlFor="codigo">
              Tamanho
            </label>
            <InputText
              disabled={this.state.desativado}
              id="tamanho"
              className="borderColorEdit"
              type="text"
              value={this.state.tamanho}
              onChange={(e) => {
                this.setState({ tamanho: e.target.value });
              }}
            />

            {/* usado para mostrar a msg de erro, caso tenha */}
            {this.state.errorTamanho && (
              <span style={{ color: "red" }}>{this.state.errorTamanho}</span>
            )}
          </div>
        </div>

        <div className="input-texts">
          <div className="input-um">
            <label htmlFor="nome">Processador</label>
            <InputText
              disabled={this.state.desativado}
              id="processador"
              className="borderColorEdit"
              type="text"
              value={this.state.processador}
              onChange={(e) => {
                this.setState({ processador: e.target.value });
              }}
            />

            {/* usado para mostrar a msg de erro, caso tenha */}
            {this.state.errorProcessador && (
              <span style={{ color: "red" }}>
                {this.state.errorProcessador}
              </span>
            )}
          </div>

          <div className="input-dois seletor">
            <Dropdown
              disabled={this.state.desativado}
              className="seletor-tipo-armazenamento"
              id="seletor-tipo"
              value={this.state.armazenamento}
              onChange={(e) =>
                this.setState({ armazenamento: (this.tipo = e.value) })
              }
              options={this.state.armazenamentos}
              optionLabel="tipo"
              placeholder="Armazenamento"
            />

            {/* usado para mostrar a msg de erro, caso tenha */}
            {this.state.errorArmazenamento && (
              <span style={{ color: "red" }}>
                {this.state.errorArmazenamento}
              </span>
            )}
          </div>

          <div className="input-dois">
            <label id="capacidade-label" htmlFor="capacidade">
              Capacidade
            </label>
            <InputText
              disabled={this.state.desativado}
              id="capacidade"
              className="borderColorEdit"
              type="text"
              value={this.state.capacidade}
              onChange={(e) => {
                this.setState({ capacidade: e.target.value });
              }}
            />

            {/* usado para mostrar a msg de erro, caso tenha */}
            {this.state.errorCapacidade && (
              <span style={{ color: "red" }}>{this.state.errorCapacidade}</span>
            )}
          </div>
        </div>
      </div>
    );
  }
}

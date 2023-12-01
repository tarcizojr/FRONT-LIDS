import React from "react";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { AiFillClockCircle, AiFillEnvironment } from "react-icons/ai";
import { InputText } from "primereact/inputtext";
import { BreadCrumb } from "primereact/breadcrumb";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import "./Pontos.css";
import { Card } from "primereact/card";
import AssociacaoService from "../../services/AssociacaoService";
import PontoService from "../../services/PontoService";
import CardPontos from "../../components/CardListarPontos/CardListarPontos";
import Modal from "react-modal";
export default class ListarProjetos extends React.Component {
  state = {
    home: { icon: "pi pi-home ", url: "/" },
    hora: new Date(),
    cidade: "",
    projetos: [],
    projetoSelect: [],

    regimes:[],
    regimeSelect:[],
    pontos:[],
    associacoes:[],

    isPopupOpen: false,
  };
  constructor() {
    super();
    this.service = new AssociacaoService();
  }
  componentDidMount = async () => {
    await this.obterNomeCidade();
    this.intervalId = setInterval(this.atualizarHorario, 60000);
    this.findAll();
    this.findAllPontos();

    let e = document.getElementsByClassName('bt4').bt
    e.classList.add('selecionar')
  };

  findAll = () => {
    this.service
      .get("/all")
      .then((response) => {
        const associacao = response.data;
        let projetos = [];
        let associacoes = [];

        associacao.forEach((element) => {
          const projetoAtual = element.projeto;
  
          // Verifica se o colaborador pertence ao projeto
          if (element.colaborador.id === 1) {
            associacoes.push(element)
            // Adiciona o projeto à lista
            projetos.push(projetoAtual);
          }
        });
        this.setState({ projetos });
        this.setState({associacoes})
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  
  openPopup = () => {
    this.setState({ isPopupOpen: true });
  };

  closePopup = () => {
    this.setState({ isPopupOpen: false });
  };

  

  findAllPontos = async () => {   
    this.service2 = new PontoService();     
    await this.service2.get('/all')
        .then(response =>  {
            const pontos = response.data;
            
            this.setState({pontos})
            //this.setState({escalasAuxiliar:escalas})
            console.log(pontos, "pontos")
        }
        ).catch(error => {
            console.log(error.response);
        }
        );
    
}

  atualizarHorario = () => {
    let h = new Date();
    this.setState({ hora: h });
  };

  obterNomeCidade = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          const apiKey = "69be4c2c8c0147ec96e877e6e7a7997a";
          const apiUrl =
            await `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

          try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            let d = JSON.stringify(data);

            const indiceInicio = d.indexOf(`"formatted":"`);
            const indiceFim = d.indexOf(`","geometry"`);

            const palavraNoMeio = d
              .substring(indiceInicio + `"formatted":"`.length, indiceFim)
              .trim();

            const partes = palavraNoMeio.split(",");
            const cidade = partes[0] + ", " + partes[2];
            this.setState({ cidade: cidade });

            console.log(`Cidade Atual: ${partes[0]} ${partes[2]}`);
          } catch (error) {
            console.error(
              "Erro ao obter informações de geocodificação:",
              error
            );
          }
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
        }
      );
    } else {
      console.error("Geolocalização não suportada pelo navegador.");
    }
  };

  listarPontos = () => {
    window.location.href = `/listarPontos`;
  };



  delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

  selecionarProjetoRegime = ()=>{
    this.openPopup();
  }

  registrarPonto = async ()=>{
   
    this.service2 = new PontoService();
    await this.service2.creat(
      {
        "idProjeto":this.state.projetoSelect.id,
        "idColaborador":2
     
        }
        ).then (async (response) =>{

            this.state.toast.show({ severity: 'success', summary: 'Sucesso', detail: 'Ponto Registrado Com Sucesso' });
            await this.delay(2000);
            window.location.href = `/pontos`;
        }).catch( error =>{
            console.log(error.response,'erro')

            this.state.toast.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao Registrar Escala' });
            this.state.toast.show({ severity: 'error', summary: 'Erro', detail: error.response.data });
        })
  }

  render() {
    return (
      <div className="container">

              <Modal
                id="modal"
                isOpen={this.state.isPopupOpen}
                onRequestClose={this.closePopup}
                contentLabel="Exemplo de Pop-up"
                >


                <Card className="card">
                  <div>
                    <p className="titulo">Você está em:</p>
                    <div className="endereco">
                      <p>{this.state.cidade}</p>
                      <p className="endereco-icon">
                        <AiFillEnvironment></AiFillEnvironment>
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="titulo">Último Registro:</p>
                    <div className="horario">
                      <p>
                        {this.state.hora.getHours()}:{this.state.hora.getMinutes()}
                      </p>
                      <p className="hora-icon">
                        <AiFillClockCircle></AiFillClockCircle>
                      </p>
                    </div>
                  </div>
                </Card>

              <div className="registrar-pontos projetos">
                  <Dropdown
                    id=""
                    value={this.state.projetoSelect}
                    onChange={(e) =>
                      this.setState({ projetoSelect: (this.projetoSelect = e.value) })
                    }
                    options={this.state.projetos}
                    optionLabel="titulo"
                    placeholder="Selecionar Projeto"
                  />
                </div>

                

                <div className="registrar-pontos butons">
                  <button class="p-button p-component bt-filtro p-button-raised p-button-warning" onClick={this.closePopup}>Fechar</button>

                  <button class="p-button p-component bt-filtro p-button-raised p-button-warning" onClick={this.registrarPonto}>Registrar</button>
                </div>
            </Modal>

        
        <Toast ref={(el) => (this.state.toast = el)} />
        <ConfirmDialog
          acceptClassName="p-button-success"
          rejectClassName="p-button-danger"
          acceptLabel="Sim"
          rejectLabel="Não"
        />

        <div className="header">
          <div>
            <BreadCrumb
              id="breadCrumb"
              model={this.state.items}
              home={this.state.home}
            />
          </div>
        </div>
        <div>
          
        </div>

        <div>
          <Card className="card">
            
            <Button
              severity="warning"
              label="Ajuste de Pontos"
              title="Ajuste de Pontos"
              raised
            />
            <Button
            onClick={this.selecionarProjetoRegime}
            severity="warning"
            label="Registrar Ponto"
            title="Registrar Ponto"
            raised
            />
            <Button
              severity="warning"
              label="Pontos em Atraso"
              title="Pontos em Atraso"
              raised
            />
          </Card>
        </div>
        {/* <div className="registrar">
          <Button
            onClick={this.selecionarProjetoRegime}
            severity="warning"
            label="Registrar Ponto"
            title="Registrar Ponto"
            raised
          />
        </div> */}
        <CardPontos 
                    pontos = {this.state.pontos}
                    // listarColaboradores = {this.find}
                    // delete = {this.confirm}
                    // editar = {this.editar}
                />
      </div>
    );
  }
}

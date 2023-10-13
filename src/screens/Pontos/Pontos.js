import React from "react";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { AiFillClockCircle, AiFillEnvironment } from "react-icons/ai";
import { InputText } from "primereact/inputtext";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import "./Pontos.css"
import { Card } from 'primereact/card';

export default class ListarProjetos extends React.Component{
    state = {
        
        home: {icon: 'pi pi-home ', url: '/' },
        hora: new Date(),
        cidade:''
    
    }
    componentDidMount = async() =>{
        await this.obterNomeCidade();
        this.intervalId = setInterval(this.atualizarHorario, 60000);

    }
    
    componentWillUnmount() {
      clearInterval(this.intervalId);
    }

    atualizarHorario = () =>{
      let h = new Date()
      this.setState({hora:h})
    }
  

     obterNomeCidade= async () => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
      
           
            const apiKey = '69be4c2c8c0147ec96e877e6e7a7997a';
            const apiUrl = await `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
      
            try {
              const response = await fetch(apiUrl);
              const data = await response.json();      
              
              let d =  JSON.stringify(data)
              
              const indiceInicio = d.indexOf(`"formatted":"`);
              const indiceFim = d.indexOf(`","geometry"`);

              const palavraNoMeio = d.substring(indiceInicio + `"formatted":"`.length, indiceFim).trim();
             
              const partes = palavraNoMeio.split(',');
              const cidade = partes[0]+", "+ partes[2]
              this.setState({cidade:cidade})

              console.log(`Cidade Atual: ${partes[0]} ${partes[2]}`);
            } catch (error) {
              console.error("Erro ao obter informações de geocodificação:", error);
            }
          }, (error) => {
            console.error("Erro ao obter localização:", error);
          });
        } else {
          console.error("Geolocalização não suportada pelo navegador.");
        }
      }
      


    render(){
        return(
            <div className="container">
                <Toast ref={(el) => (this.state.toast = el)} />
                 <ConfirmDialog 
                  acceptClassName="p-button-success"
                  rejectClassName="p-button-danger"
                 acceptLabel="Sim"
                 rejectLabel="Não"/>

                <div className="header">
                    <div>
                        <BreadCrumb id="breadCrumb" model={this.state.items} home={this.state.home} />
                    
                        
                       <h2 className="nome-usuario">Ola, Tarcizo</h2>
                       
                    </div>
                        
                </div>
                <div>
                    <Card className="card">
                        
                        <div>
                          <p className="titulo">Você está em:</p>
                          <div className="endereco">
                            <p>{this.state.cidade}</p>
                            <p className="endereco-icon"><AiFillEnvironment></AiFillEnvironment></p>
                          </div>
                        </div>

                        <div>
                          <p className="titulo">Último Registro:</p>
                          <div className="horario">
                            <p>{this.state.hora.getHours()}:{this.state.hora.getMinutes()}</p>
                            <p className="hora-icon"><AiFillClockCircle></AiFillClockCircle></p>
                          </div>
                        </div>
                        
                        
                    </Card>
                    
                </div>

                <div>
                    <Card className="card">
                      <Button severity="warning" label="Histórico de Pontos" title="Histórico de Pontos"  raised />
                      <Button severity="warning" label="Ajuste de Pontos" title="Ajuste de Pontos"  raised />
                      <Button severity="warning" label="Pontos em Atraso" title="Pontos em Atraso"  raised />
                    </Card>
                </div>
                <div className="registrar">
                  <Button severity="warning" label="Registrar Ponto" title="Registrar Ponto"  raised />
                </div>
            </div>
        )
    }
}
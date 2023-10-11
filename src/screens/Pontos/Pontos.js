import React from "react";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { InputText } from "primereact/inputtext";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import "./Pontos.css"
import { Card } from 'primereact/card';

export default class ListarProjetos extends React.Component{
    state = {
        
        home: {icon: 'pi pi-home ', url: '/' },
    
    
    }
    componentDidMount = async() =>{
        await this.obterNomeCidade();
    }
     obterNomeCidade= async () => {
        // Verifica se o navegador suporta geolocalização
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
      
            // Substitua 'SUA_CHAVE_API' pela sua chave de API do OpenCage Geocoding
            const apiKey = '69be4c2c8c0147ec96e877e6e7a7997a';
            const apiUrl = await `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
      
            try {
              const response = await fetch(apiUrl);
              const data = await response.json();
      
              // Obtém o nome da cidade a partir dos resultados
              const cidade = data.results[0].components.city;
              let d =  JSON.stringify(data)
             let c = JSON.parse(d)

              console.log(`Cidade Atual: ${c}`);
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
    
                    <div className="bt-add">
                        <a href="/criarEquipamentos">
                            <Button severity="warning" label="+" title="Adicionar Equipamento"  raised />
                        </a>
    
                    </div>
                </div>
                <div>
                    <Card>
                        <p>Você está em:</p>
                    </Card>
                </div>
            </div>
        )
    }
}
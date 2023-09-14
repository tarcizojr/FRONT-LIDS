import React from "react";
import axios from 'axios';

import { InputText } from "primereact/inputtext";
import { BreadCrumb } from 'primereact/breadcrumb';

import { Button } from 'primereact/button';

import CardDeProjetos from "../../components/CardDeProjetos/CardDeProjetos";
import './ListarProjetos.css'
import 'primeicons/primeicons.css';
import ProjetoService from "../../services/ProjetoService"
export default class ListarProjetos extends React.Component{
    state = {
        items:[{ label: 'Projetos', url:"/projetos" }],

        home: {icon: 'pi pi-home ', url: '/' },

        projetos :[
           
        ],
        projetosAuxiliar:[{}],

        nomeParaFiltro:'',

        token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjdjMGI2OTEzZmUxMzgyMGEzMzMzOTlhY2U0MjZlNzA1MzVhOWEwYmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyODcwNzQ2NDc2ODQtdGVjYjgwYjE5dTZtNmYwNG5pb3Fsam85bjY1NnZ2djAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyODcwNzQ2NDc2ODQtdGVjYjgwYjE5dTZtNmYwNG5pb3Fsam85bjY1NnZ2djAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTc5NzIxNTc4MDA5MTc1MzIzNDkiLCJlbWFpbCI6InRhcmNpem9sZWl0ZW1vbnRlaXJvQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiYlhzUTVFYUJiNG5HN3FDbVprTWRNZyIsIm5vbmNlIjoiT05iV3pWM0ZWVVRrTDNkTlZhdTJDLThqLXRtY2ZhTjRudGhWVnU1dTZMdyIsIm5hbWUiOiJUYXJjaXpvIEpSIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0pQWUNnYi1ZYy1BS3JadzNUanY3bTR6cWFuQjVvMTJDRFBublhRRkh6aWVRQT1zOTYtYyIsImdpdmVuX25hbWUiOiJUYXJjaXpvIiwiZmFtaWx5X25hbWUiOiJKUiIsImxvY2FsZSI6InB0LUJSIiwiaWF0IjoxNjk0NzI3MjU0LCJleHAiOjE2OTQ3MzA4NTR9.XxWyCO3-_kT1T0p9NDF-co8d6D2IQH-lVmZeAgzsmf3diiK40iczDWksIht3evHmF_VFCnQLIdsExTaIoYsiYSA4jLABPojn9Ib9-YasbHyZYVODHUCuZawyrMwbCV8tzOtqwIQRGYpcyW3M2m856TDSt58aDXoqkorss77KovXjZQravdOxGCwZ8MfW8MScH1y9jiJHyGFXNdQo2NS6V1XXJrgjS8ifwltwL8L2t8mCgFSbLEamBxe5uRT34Yfbc9YGbCyQmh5osZdtXPYSKlOEaXcE8046Ts6NqYm4DxXWKwqG2Nn7maNP75-29fffS1KUZyD2bUPyaDN1jOpkHg'
    }
    
    constructor(){
        super();
        this.service = new ProjetoService();
    }


    componentDidMount(){
        //  this.token();             
          this.findAll();
          axios.defaults.headers.common['Authorization'] = `Bearer
          ${this.state.token}     
          `;

      }
    
      findAll = () => {        
        this.service.get('/all', {
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }
          })
            .then(response => {
                const projetos = response.data;
                
                this.setState({projetos})
                this.setState({projetosAuxiliar:projetos})
                
            }
            ).catch(error => {
              //  console.log(error.response);
            }
            );
    }

    find = (id) =>{
        window.location.href = `/colaboradoresProjeto/${id}`;
    }


    filtro = async () =>{
        
        await this.setState({projetos:this.state.projetosAuxiliar})
        console.log(this.state.projetos)
        let lista = []
        
        this.state.projetos.forEach(element => {
            console.log(this.state.projetos)
            if(element.titulo.toUpperCase().includes(this.state.nomeParaFiltro.toUpperCase())){
                lista.push(element);
            }
           
        });
        this.setState({projetos:lista})
    }


    render(){
        return(
        
            <div className="container">
                <div className="header">
                    <div>
                        <BreadCrumb model={this.state.items} home={this.state.home} />
                    
                        <div className="filtragem">
                            <span className="p-input-icon-left">
                                <i  className="pi pi-search " />
                                <InputText placeholder="Buscar"
                                value= {this.state.nomeParaFiltro} 
                                onChange={(e) => { this.setState({nomeParaFiltro: e.target.value }) }} />
                            </span>

                            <Button className="bt-filtro" label="Filtrar" 
                            onClick={this.filtro}
                            title="Filtrar Projetos" severity="warning" raised />

                            <Button className="bt-filtro" label="Limpar Filtro" 
                            onClick={this.limparFiltro}
                            title="Listar Todos Projetos" severity="warning" raised />
                        </div>
                    </div>
    
                    <div className="bt-add">
                        <a href="/criarProjeto">
                            <Button label="+" severity="warning" raised 
                            onClick={this.adicionarProjeto}/>
                        </a>
    
                    </div>
                </div>
    
                
                
                <div className="projetos">
                    <CardDeProjetos 
                        projetos = {this.state.projetos}
                        listarColaboradores = {this.find}
                    />
                    
                </div>
                
                
            </div>
        )
    }

}
import React from "react";
import AssociacaoService from "../../services/AssociacaoService";
import { BreadCrumb } from 'primereact/breadcrumb';
import CardColaborador from "../../components/CardColaboradoresProjetos/ColaboradoresProjeto";
import { Button } from 'primereact/button';

export default class ListarColaboradoresDoProjetoOld extends React.Component{
    
    state = {
        items:[{ label: 'Projetos', url:"/projetos" },
        { label: 'Colaboradores'}],

        home: {icon: 'pi pi-home ', url: '/' },
        colaboradores:[],
        colaboradoresAuxiliar:[],
        id:''
    }

    constructor(){
        super();
        this.service = new AssociacaoService();
        this.service.getToken();
        this.service.autenticado();
    }

    componentDidMount(){
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf('/') + 1);    
        this.setState({id})
        this.findAll();
    }

    delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };


    findAll = async () =>{        
        let colaboradores = []     
        await this.service.get('/all')
            .then(response => {
                const associacoes = response.data;
                associacoes.forEach(element => {
                    if(element.projeto.id === 1){
                        if(!this.pertence(element.colaborador, colaboradores)){
                            colaboradores.push(element.colaborador);
                        }
                    }
                });
                console.log(colaboradores, 'colaboradores');
                this.setState({colaboradores});
                this.setState({colaboradoresAuxiliar: colaboradores});
            }
            ).catch(error => {
                console.log(error.response);
            });
    }

    pertence = (colaborador, lista) => {
        return lista.some(elem => elem.id === colaborador.id);
    }

    render(){
        return(
            <div className="container">
                <div className="header">
                    <BreadCrumb model={this.state.items} home={this.state.home} />
                    <div className="bt-add">
                        <a href={`/adicionarColaboradorAoProjeto/${this.state.id}`}>
                            <Button severity="warning" label="+" title="Adicionar Colaborador ao Projeto"  raised />
                        </a>
                    </div>
                </div>
                <div className="colaboradores">
                    <CardColaborador 
                        colaboradores={this.state.colaboradores}
                    />
                </div>
            </div>
        )
    }
}

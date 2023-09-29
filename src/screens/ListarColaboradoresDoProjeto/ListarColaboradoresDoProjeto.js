import React from "react";
import ProjetoService from "../../services/ProjetoService"
import { BreadCrumb } from 'primereact/breadcrumb';
import CardColaborador from "../../components/CardColaboradoresProjetos/ColaboradoresProjeto";
import { Button } from 'primereact/button';

export default class ListarColaboradoresDoProjeto extends React.Component{
    
    state = {
        items:[{ label: 'Projetos', url:"/projetos" },
        { label: 'Colaboradores'}],

        home: {icon: 'pi pi-home ', url: '/' },
        colaboradores:[{}],

        colaboradoresAuxiliar:[{}],
        id:''
    }

    constructor(){
        super();
        this.service = new ProjetoService();
        
        this.setState({colaboradores:localStorage.getItem("colaboradoresDoProjeto") })
    }


    componentDidMount(){
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf('/') + 1);    
        this.setState({id})
        //this.find(id);
        this.listarColaboradores()
    }
    delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      };

      listarColaboradores = () =>{
        let colaboradores = localStorage.getItem("colaboradoresDoProjeto")
        console.log(JSON.parse(colaboradores), 'local ')
        this.setState({colaboradores:JSON.parse(colaboradores)})
        this.setState({colaboradoresAuxiliar:JSON.parse(colaboradores)})
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
                        colaboradores ={this.state.colaboradores}
                        //colaboradores = { localStorage.setItem("colaboradoresDoProjeto")}
                        
                       
                    />
                    
                </div>
                
            </div>
        )
    }
}
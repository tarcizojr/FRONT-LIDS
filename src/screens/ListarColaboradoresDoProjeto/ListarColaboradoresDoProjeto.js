import React from "react";
import ProjetoService from "../../services/ProjetoService"
import { BreadCrumb } from 'primereact/breadcrumb';
import CardColaborador from "../../components/CardColaboradoresProjetos/ColaboradoresProjeto";

export default class ListarColaboradoresDoProjeto extends React.Component{
    state = {
        items:[{ label: 'Projetos', url:"/projetos" },
        { label: 'Colaboradores'}],

        home: {icon: 'pi pi-home ', url: '/' },
        colaboradores:[{}],

        colaboradoresAuxiliar:[{}]

    }

    constructor(){
        super();
        this.service = new ProjetoService();
    }


    componentDidMount(){
        //  this.token();             
        this.find();
    }

    find = () => {        
        this.service.find('/1')
            .then(response => {
                const colaboradores = response.data.colaboradores;
                
                this.setState({colaboradores})
                this.setState({colaboradoresAuxiliar:colaboradores})
                console.log("aaa",colaboradores)
            }
            ).catch(error => {
              //  console.log(error.response);
            }
            );
    }

    render(){
        return(
            <div className="container">
                <div className="header">
                    <BreadCrumb model={this.state.items} home={this.state.home} />

                </div>



                <div className="colaboradores">
                    <CardColaborador 
                        colaboradores ={this.state.colaboradores}
                        
                       
                    />
                    
                </div>
                
            </div>
        )
    }
}
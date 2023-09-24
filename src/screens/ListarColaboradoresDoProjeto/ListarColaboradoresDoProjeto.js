import React from "react";
import ProjetoService from "../../services/ProjetoService"
import { BreadCrumb } from 'primereact/breadcrumb';
import CardColaborador from "../../components/CardColaboradoresProjetos/ColaboradoresProjeto";
import { Button } from 'primereact/button';

export default class ListarColaboradoresDoProjeto extends React.Component{
    
    state = {
        items:[{ label: 'Projetos', url:"/projetos" },
        { label: 'Colaboradores', url: `colaboradoresProjeto/`}],

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
        this.teste()
    }
    delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      };

      teste = () =>{
        let colaboradores = localStorage.getItem("colaboradoresDoProjeto")
        console.log(JSON.parse(colaboradores), 'local ')
        this.setState({colaboradores:JSON.parse(colaboradores)})
        this.setState({colaboradoresAuxiliar:JSON.parse(colaboradores)})
      }
    find = async (id) => {      
       // localStorage.setItem("teste", "funcionou");  
       console.log(id, 'id')
        this.service.find(`${2}`)
            .then(response => {
                const colaboradores = response.data.colaboradores;
                let a = localStorage.getItem("colaboradoresDoProjeto")
                console.log(JSON.parse(a), 'local ')
                this.setState({colaboradores})
                this.setState({colaboradoresAuxiliar:colaboradores})
                
            }
            ).catch(error => {
              //  console.log(error.response);
            }
            );
        await this.delay(2000);
        this.adicionarAoLocal()
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
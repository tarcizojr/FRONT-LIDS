import React from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from 'primereact/calendar';


import './CriarProjeto.css'
export default class CriarProjeto extends React.Component{
    state = {
        items:[{ label: 'Projetos', url:"/projetos" }, { label: 'Criar Projeto' }],

        home: {icon: 'pi pi-home ', url: '/' },

        dataT:''
    }

    salvarProjeto = () => {
        console.log(this.state.dataT)
    }
    
    render(){
        let  data = "";


        
        return(
            
            <div className="container">
                <div className="header">
                    <div className="header-criar-projeto">
                        <BreadCrumb model={this.state.items} home={this.state.home}></BreadCrumb>
                    </div>
                    <div className="bt-salvar">
                        <Button label="Salvar" severity="warning" raised onClick={this.salvarProjeto} />
        
                    </div>
                </div>

                <div>
                    <InputText className="borderColorEdit" type="text" placeholder="Nome do Projeto" />
                </div>

                <div >
                    <select id="sexo">
                        <option value="">Selecione</option>
                        <option value="masculino">Inovação</option>
                        <option value="feminino">Pesquisa</option>
                        <option value="outro">Extensão</option>
                        <option value="outro">Ensino</option>

                    </select>
                </div>

                <div>
                    <div className="card flex justify-content-center">
                        <span className="p-float-label">
                            <InputTextarea className="borderColorEdit" id="description"  rows={5} cols={30} />
                            <label htmlFor="description">Objetivo</label>
                        </span>
                    </div>
                </div>

                <div className="card flex justify-content-center borderColorEdit">
                    <Calendar className="borderColorEdit" value={data}  
                   // onChange={(e) => this.state.dataT =e} 
                    dateFormat="dd/mm/yy" showIcon />

                </div>
            </div>
    
        )
    }
}
import React from "react";
import { Dropdown } from 'primereact/dropdown';

import { InputText } from "primereact/inputtext";
import './EditarColaborador.css'
// eslint-disable-next-line import/no-anonymous-default-export
export default props=>{
        
        return(
           
            <div >                
                
                <div className="input-texts">
                    <div className="input-um">
                        <InputText className="borderColorEdit" type="text"
                        placeholder= {props.colaborador.nome}  />
                    </div>
                    <div className="input-dois">
                        <InputText className="borderColorEdit" type="text" 
                        value= {props.colaborador.endereco} />
                    </div>
                </div>

                <div className="input-texts">
                    <div className="input-um">
                        <InputText className="borderColorEdit" type="text" value= 
                        {props.colaborador.email} />
                    </div>
                    <div className="input-dois">
                        <InputText className="borderColorEdit input-cidade" type="text" value= 
                        {props.colaborador.cidade} />
                    </div>

                    <div className="input-dois">
                        <Dropdown id="seletor" 
                        value={props.colaborador.estado} 
                         
                        options={props.estados} 
                        optionLabel="nome" 
                        placeholder="Estado" />
                    </div>
                </div>


                <div className="input-texts">
                    <div className="input-dois">
                        <InputText className="borderColorEdit input-cidade" type="text" value= {props.colaborador.matricula} />
                    </div>

                    <div className="input-dois">
                        <InputText className="borderColorEdit input-cidade" type="date" placeholder="Data Nascimento" 
                        value= {props.colaborador.dataDeNascimento}
                        onChange={(e) => { this.setState({dataDeNascimento: e.target.value }) }}/>
                    </div>
                </div>



                <div className="input-texts">
                    <div className="input-dois">
                        <InputText className="borderColorEdit input-cidade" type="text" placeholder="Senha" />
                    </div>

                    <div className="input-dois">
                        <InputText className="borderColorEdit input-cidade" type="text" placeholder="Confirmar Senha" />
                    </div>
                    
                </div>


                <div className="input-texts">
                    <div className="input-um">
                        <InputText className="borderColorEdit" type="text" 
                        value= {props.colaborador.linkCurriculo} />
                    </div>
                    
                </div>
            </div>
        )
    }
    
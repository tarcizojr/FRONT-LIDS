import React from "react";

import { InputText } from "primereact/inputtext";
import './EditarColaborador.css'

// eslint-disable-next-line import/no-anonymous-default-export
export default props=>{
    
        return(
            <div >                
                
                <div className="input-texts">
                    <div className="input-um">
                        <InputText className="borderColorEdit" type="text"
                        value= {props.colaborador.nome}  />
                    </div>
                    <div className="input-dois">
                        <InputText className="borderColorEdit" type="text" 
                        value= {props.colaborador.enedereco} />
                    </div>
                </div>

                <div className="input-texts">
                    <div className="input-um">
                        <InputText className="borderColorEdit" type="text" value= 
                        {props.colaborador.email} />
                    </div>
                    <div className="input-dois">
                        <InputText className="borderColorEdit input-cidade" type="text" placeholder="Cidade" />
                    </div>
                </div>


                <div className="input-texts">
                    <div className="input-dois">
                        <InputText className="borderColorEdit input-cidade" type="text" value= {props.colaborador.matricula} />
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
    

import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { AiOutlineGoogle } from "react-icons/ai";

import SVGLids from "../img/SVGLids";
import './Login.css'
import ApiService from "../services/ApiService";


export default function Login() {


    return (
        <div className="container-login">
            <div className="left-login">
                
                <div className="imagem">
                    <SVGLids src="../img/LIDS.svg"></SVGLids>

                </div>
            </div>
            <div className="hight-login">
                <div className="card-login">
                    
                    {/* <InputText className="input" type="text" placeholder="e-mail" />
                    <InputText type="text" placeholder="senha" />
                    
                    <Button label="Login" /> */}


                    <a href="http://localhost:8080/api/entrar">
                        
                        <Button severity="warning"  label="Login Google" >
                            {/* <AiOutlineGoogle></AiOutlineGoogle> */}
                        </Button>
                        
                    </a>
                   
                </div>
            </div>
        </div>
        

    )
}
        
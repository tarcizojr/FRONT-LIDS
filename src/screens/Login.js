
import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';

import SVGLids from "../img/SVGLids";
import './Login.css'

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
                    
                    <InputText className="input" type="text" placeholder="e-mail" />
                    <InputText type="text" placeholder="senha" />
                    
                    <Button label="Login" />
                   
                </div>
            </div>
        </div>
        

    )
}
        
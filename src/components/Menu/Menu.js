import React from 'react';

import "./Menu.css";
import SVGLids from "../../img/SVGLids";
import { Button } from 'primereact/button';
import MenuItem from './MenuItem';

import { AiOutlineLogout } from "react-icons/ai";
import ApiService from '../../services/ApiService';


// eslint-disable-next-line import/no-anonymous-default-export
export default class  extends React.Component{
    
    constructor() {
        super();
        this.service = null; // Inicializa com null
    }
    
    async componentDidMount() {
        this.service = new ApiService(); // Inicializa no componentDidMount
    }
    
    async sair() {
        window.location.href = 'http://localhost:8080/api/sair';
    
    }

    render(){
        const url = window.location.href;
        const telaAtual = url.substring(url.lastIndexOf('/') + 1);
        let novaClasse = ''
        if(telaAtual === 'login'){
            novaClasse = 'sumir';
        }
    return(
        <div className= {`menu ${novaClasse}`}>
            
           <div className="logo">
                <a href='/'>
                    <SVGLids></SVGLids>
                </a>
           </div>
           <div className="butoes">
                <MenuItem href='/projetos' label='PROJETOS'></MenuItem>
                
                <MenuItem href='/colaboradores' label='COLABORADORES'></MenuItem>

                <Button id='bt' label="ÁREAS DE TRABALHO" severity="secondary" text />
                <Button id='bt' label="PONTOS" severity="secondary" text />
                <MenuItem href='/equipamentos' label='EQUIPAMENTOS'></MenuItem>

                <Button id='sair' onClick={this.sair} label=''>
                    <AiOutlineLogout></AiOutlineLogout>
                </Button>

           </div>
        </div>
    )
    }
}
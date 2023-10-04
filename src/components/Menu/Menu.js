import React from 'react';

import "./Menu.css";
import SVGLids from "../../img/SVGLids";
import { Button } from 'primereact/button';
import MenuItem from './MenuItem';

import { AiOutlineLogout } from "react-icons/ai";
import ApiService from '../../services/ApiService';

// eslint-disable-next-line import/no-anonymous-default-export
export default class  extends React.Component{
    
     constructor(){
        super();
        this.service = new ApiService();
        
    }

    
    async sair(){
        if (this.service) {
            // Certifique-se de que this.service está definido antes de chamá-lo
            await this.service.sair();
        } else {
            console.error('O serviço não foi inicializado corretamente.');
            // Trate a situação de serviço não inicializado conforme necessário
        }
        
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

                <Button onClick={this.sair} label='sair'>
                    <AiOutlineLogout></AiOutlineLogout>
                </Button>

           </div>
        </div>
    )
    }
}
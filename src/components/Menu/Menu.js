import React from 'react';

import "./Menu.css";
import SVGLids from "../../img/SVGLids";
import { Button } from 'primereact/button';
import MenuItem from './MenuItem';
export default function Menu(){

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
                <Button id='bt' label="EQUIPAMENTOS" severity="secondary" text />

           </div>
        </div>
    )
}
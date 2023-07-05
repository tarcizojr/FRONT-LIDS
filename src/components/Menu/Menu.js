import React from 'react';

import "./Menu.css";
import SVGLids from "../../img/SVGLids";
import { Button } from 'primereact/button';
import MenuItem from './MenuItem';
export default function Menu(){

    
    
    return(
        <div className="menu">
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
import React from "react";
import { Button } from 'primereact/button';

export default function MenuItem(props){

    return(

        <a href={props.href}> 
            <Button id='bt'  label={props.label} severity="secondary" text />
        </a>

    )
}
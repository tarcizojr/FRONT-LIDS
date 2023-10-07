import React from "react";
import { Card } from 'primereact/card';
import { AiFillDelete, AiFillEdit, AiFillClockCircle } from "react-icons/ai";
import { Button } from 'primereact/button';
import './CardEquipamento.css';

// eslint-disable-next-line import/no-anonymous-default-export
export default props =>{
    let card = '';
    const rows = props.equipamentos.map(equipamento =>{
        console.log(equipamento, 'equipamentos')
        let a = ''
        let b = ''
        let descricao =''
        if(equipamento.marca){
            a = '-'
            b ='|'
        }else{
            descricao = equipamento.descricao
        }
        if (equipamento.id === "") {
          card = (
            <div className="card">
              <div id="status" className="center sem-info">
                <p>Sem Equipamento Cadatrado</p>
              </div>
            </div>
          );
        } 
        else {
        card = (
            <div className="card">
            <Card>
                <div className="left-equipamento">
                    <div className="nome-codigo">
                        <p className="nome">
                            {equipamento.nome} - 
                        </p>
                        
                        <p className="codigo">
                            {equipamento.codigo}
                        </p>
                    </div>
                    
                    
                    <p className="modelo-marca">
                        <p className="modelo">
                            {equipamento.marca} {a}  {equipamento.modelo}
                        </p>                        
                    </p>
                </div>

                <div id="descricao" className="center">
                    <p>
                        {descricao}
                    </p>
                    <p>
                        {equipamento.processador}                        
                    </p>
                    <p>
                        {equipamento.tipoMemoria} {b} {equipamento.capacidadeMemoria}
                    </p>
                    <p>
                        {equipamento.tipoArmazenamento} {b} {equipamento.capacidadeArmazenamento}
                    </p>
                </div>

                <div className="card-butons">
                    <Button title="Editar Projet" severity="warning" aria-label="Editar Projet"
                    onClick={(e) => props.editar(equipamento.id)}>
                        <AiFillEdit></AiFillEdit>
                    </Button>

                    {/* <Button
                    onClick={(e) => props.listarColaboradores(projeto.id)}
                    title="Listar Colaboradores" severity="warning" aria-label="Listar Colaboradores">
                        <BiSolidUserDetail></BiSolidUserDetail>
                    </Button> */}

                    <Button 
                    onClick={(e) => props.delete(equipamento.id)}
                    title="Deletar Projeto" severity="warning" aria-label="Deletar Projeto">
                        <AiFillDelete></AiFillDelete>
                    </Button>
                </div>
            </Card>
            </div>
          );
        }
        return(
            card
        )
    })    

           

        
    return(
        <div>
            {rows}
        </div>
    )
}
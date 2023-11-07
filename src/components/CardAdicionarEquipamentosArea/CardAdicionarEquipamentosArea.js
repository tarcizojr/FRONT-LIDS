import React from "react";
import { Card } from 'primereact/card';
import { AiFillDelete, AiFillEdit, AiFillMinusSquare } from "react-icons/ai";
import { Button } from 'primereact/button';

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
                        <p >
                            {equipamento.codigo} 
                        </p>
                        
                        <p className="nome">
                            {equipamento.nome}
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
                        {equipamento.descricao}
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
                    {/* <Button title="Editar Projet" severity="warning" aria-label="Editar Projet"
                    onClick={(e) => props.editar(equipamento.id)}>
                        <AiFillEdit></AiFillEdit>
                    </Button> */}

                   
                {equipamento.descricao === 'Não Pertence a Área' ? (
                    <Button 
                        label="+"
                        onClick={(e) => props.adicionarEquipamento(equipamento.id)}
                        title="Adicionar Equipamento à Área"
                        severity="warning"
                        aria-label="Adicionar Equipamento à Área"
                    />
                ) : (
                    <Button 
                        label="-"
                        onClick={(e) => props.remover(equipamento.id)}
                        title="Remover Equipamento da Área"
                        severity="warning"
                        aria-label="Remover Equipamento da Área"
                    />
                )}
                    
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
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from "../screens/Home";
import Login from "../screens/Login";

import ListaProjetos from "../screens/ListarProjetos/ListarProjetos";
import CriarProjeto from "../screens/CriarProjeto/CriarProjeto";
import ListarColaboradoresDoProjeto from "../screens/ListarColaboradoresDoProjeto/ListarColaboradoresDoProjeto"
import EditarProjeto from "../screens/EditarProjeto/EditarProjeto";

import ListarColaboradores from "../screens/ListarColaboradores/ListarColaboradores";
import CriarColaborador from "../screens/CriarColaborador/CriarColaborador";
import EditarColaborador from "../screens/EditarColaborador/EditarColaborador";
import AdicionarColaborador from "../screens/AdicionarColaboradorAoProjeto/AdicionarColaborador";


import CriarEquipamento from "../screens/CriarEquipamento/CriarEquipamento";
import ListarEquipamentos from "../screens/ListarEquipamento/ListarEquipamentos";
import EditarEquipamento from "../screens/EditarEquipamento/EditarEquipamento";

import Pontos from "../screens/Pontos/Pontos"


import CadastrarDeEscala from "../screens/CadastroDeEscala/CadastroDeEscala";
import ListarEscalas from "../screens/ListarEscalas/ListarEscalas";

import ListarAreaDeTrabalho from "../screens/ListarAreaDeTrabalho/ListarAreaDeTrabalho";
import CriarAreaDeTrabalho from "../screens/CriarAreaDeTrabalho/CriarAreaDeTrabalho";
import EditarAreaDeTrabalho from "../screens/EditarAreaDeTrabalho/EditarAreaDeTrabalho";
import ListarEquipamentosDaArea from "../screens/ListarEquipamentosDaArea/ListarEquipamentosDaArea";
import AdicionarEquipamentoArea from "../screens/AdicionarEquipamentoArea/AdicionarEquipamentoArea";

function AppRouts(){
    return(
        <Router>
           <Routes>
                <Route  path="/" element={<Home/>} exact ></Route>
                <Route  path="/login" element={<Login/>} exact ></Route>

                <Route element={<ListaProjetos/>} path="/projetos"></Route>
                <Route element={<CriarProjeto/>} path="/criarProjeto"></Route>
                <Route element={<ListarColaboradoresDoProjeto/>} path="/colaboradoresProjeto/:id"></Route>
                <Route element={<EditarProjeto/>} path="/editarProjeto/:id"></Route>



                <Route element={<ListarColaboradores/>} path="/colaboradores"></Route>
                <Route element={<CriarColaborador/>} path="/criarColaboradores"></Route>
                <Route element={<EditarColaborador/>} path="/editarColaborador/:id"></Route>
                
                <Route element={<AdicionarColaborador/>} path="/adicionarColaboradorAoProjeto/:id"></Route>


                <Route element={<CriarEquipamento/>} path="/criarEquipamentos"></Route>
                <Route element={<ListarEquipamentos/>} path="/equipamentos"></Route>
                <Route element={<EditarEquipamento/>} path="/editarEquipamento/:id"></Route>

               <Route element={<Pontos/>} path="/pontos"></Route>


               <Route element={<CadastrarDeEscala/>} path="/cadastrarEscala"></Route>
               <Route element={<ListarEscalas/>} path="/escalas"></Route>


               <Route element={<ListarAreaDeTrabalho/>} path="/areasDeTrabalho"></Route>
               <Route element={<CriarAreaDeTrabalho/>} path="/criarAreaDeTrabalho"></Route>
               <Route element={<EditarAreaDeTrabalho/>} path="/editarAreaDeTrabalho/:id"></Route>
               <Route element={<ListarEquipamentosDaArea/>} path="/equipamentosArea/:id"></Route>
               <Route element={<AdicionarEquipamentoArea/>} path="/adicionarEquipamentosArea/:id"></Route>

           </Routes>
        </Router>
    )
}

export default AppRouts;
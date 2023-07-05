import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Home from "../screens/Home";
import Login from "../screens/Login";

import ListaProjetos from "../screens/ListarProjetos/ListarProjetos";
import CriarProjeto from "../screens/CriarProjeto/CriarProjeto";


import ListarColaboradores from "../screens/ListarColaboradores/ListarColaboradores";
import CriarColaborador from "../screens/CriarColaborador/CriarColaborador";

function AppRouts(){
    return(
        <Router>
           <Routes>
                <Route  path="/" element={<Home/>} exact ></Route>
                <Route  path="/login" element={<Login/>} exact ></Route>

                <Route element={<ListaProjetos/>} path="/projetos"></Route>
                <Route element={<CriarProjeto/>} path="/criarProjeto"></Route>


                <Route element={<ListarColaboradores/>} path="/colaboradores"></Route>
                <Route element={<CriarColaborador/>} path="/criarColaboradores"></Route>
                
           </Routes>
        </Router>
    )
}

export default AppRouts;
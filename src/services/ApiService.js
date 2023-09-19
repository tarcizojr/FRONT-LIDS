import axios from "axios";

const httpCliente = axios.create({
    baseURL:'http://localhost:8080/api'
});

let token =''
;


export default class ApiService {
    
    constructor(endpoint){
        this.endpoint = endpoint;    
        this.getToken();    
     //   this.registerToken(token);
      
    }
    

    registerToken(token){
        if(token){
            httpCliente.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }        
    }
    
    post(url, params){
        url = this.buildUrl(url);
        return httpCliente.post(url, params);
    }

    patch(url, params){
        url = this.buildUrl(url);
        return httpCliente.patch(url, params);
    }

    delete(url){
        url = this.buildUrl(url);
        return httpCliente.delete(url);
    }

    get(url){
        url = this.buildUrl(url);
        return httpCliente.get(url);
    }

    async getToken() {
        let url = 'http://localhost:8080/api/token';
    
        try {
            const response = await httpCliente.get(url);
            token = response.data;
           console.log(token, 'token')

            this.registerToken(token);
            return response.data;
        } catch (error) {
            console.error('Erro ao obter o token:', error);
            throw error; 
        }
    }
    
    async autenticado(){
        let url = 'http://localhost:8080/api/altenticado';
        const response = await httpCliente.get(url);
        console.log(response.data, 'Autenticado')
        if(response.data === false){
            window.location.href = `/login`;
        }
        return response.data;
    }

    buildUrl(url){
        return `${this.endpoint}${url}`;
    }
}
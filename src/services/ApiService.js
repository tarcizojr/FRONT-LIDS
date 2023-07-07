import axios from "axios";

const httpCliente = axios.create({
    baseURL:'http://localhost:8080/api'
});

export default class ApiService {
    constructor(endpoint){
        this.endpoint = endpoint;
    }
    
    post(url, params){
        url = this.buildUrl(url);
        return httpCliente.post(url, params);
    }

    put(url, params){
        url = this.buildUrl(url);
        return httpCliente.put(url, params);
    }

    delete(url){
        url = this.buildUrl(url);
        return httpCliente.delete(url);
    }

    get(url){
        url = this.buildUrl(url);
        return httpCliente.get(url);
    }

    buildUrl(url){
        return `${this.endpoint}${url}`;
    }
}
import axios from "axios";

const httpCliente = axios.create({
    baseURL:'http://localhost:8080/api'
});

let token ='eyJhbGciOiJSUzI1NiIsImtpZCI6IjdjMGI2OTEzZmUxMzgyMGEzMzMzOTlhY2U0MjZlNzA1MzVhOWEwYmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyODcwNzQ2NDc2ODQtdGVjYjgwYjE5dTZtNmYwNG5pb3Fsam85bjY1NnZ2djAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyODcwNzQ2NDc2ODQtdGVjYjgwYjE5dTZtNmYwNG5pb3Fsam85bjY1NnZ2djAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTc5NzIxNTc4MDA5MTc1MzIzNDkiLCJlbWFpbCI6InRhcmNpem9sZWl0ZW1vbnRlaXJvQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiU2xTU0YzZXZQWXlzTm54YUk0ZDlVQSIsIm5vbmNlIjoiWHZ6alNGYWgxT3dmME5EbjNHcnNqQ0xRdGt5WnVYTzdRNXJ3emlpOGNrNCIsIm5hbWUiOiJUYXJjaXpvIEpSIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0pQWUNnYi1ZYy1BS3JadzNUanY3bTR6cWFuQjVvMTJDRFBublhRRkh6aWVRQT1zOTYtYyIsImdpdmVuX25hbWUiOiJUYXJjaXpvIiwiZmFtaWx5X25hbWUiOiJKUiIsImxvY2FsZSI6InB0LUJSIiwiaWF0IjoxNjk0NzM1NDg1LCJleHAiOjE2OTQ3MzkwODV9.cCCOzcoZVF7R-mr4GTc8i6jxlXCVVyYp3D9lB3j-eV_NiVmezJE0NFAm-HLDMgMdqD66bFrDRGXUDlgofq3u_xrnbA8835HFFELdvGxcusWFtJ8z6TauvgIqzHOIY7F_bQ-sim6FP6EdM2YcZnnKFCMn4iCCNjrYd-2lvvfkZkqdu1o3uj1DoWN336M0lNnPQRbiGw0HW2kiAwT-HaLd3ALCRXHpM91OCRB2KVYdLRE3CnmNPjudUFRwtZvsXHXdRgaLxW15-reWk-oGuU436yK5DEX3P9acZtKoRkBJAX3G_QDEE6Phc-LfjkHtL4I0X94VGQe-7WPqZsh_5kkf-g'
;
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;


export default class ApiService {
    constructor(endpoint){
        this.endpoint = endpoint;        
        this.registerToken(token);
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

    getToken(){
        let url = 'http://localhost:8080/api/token';
         return httpCliente.get(url);
     }

    buildUrl(url){
        return `${this.endpoint}${url}`;
    }
}
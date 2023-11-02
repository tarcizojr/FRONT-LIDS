import ApiService from "./ApiService";


export default class AreasService extends ApiService{
    constructor(){
        super('/areaDeTrabalho')
        
    }

    creat(obj){
        return this.post('', obj)
    }

    addColaborador(obj){
        return this.post('/addColaborador', obj)
    }

    update(id,obj){
        
        return this.patch(`/${id}`, obj);
    }

    delete(id){
        return super.delete(`/${id}`)
    }
    
    find(id){
        return this.get(`${id}`);
    }
    
    findAll(){
        return this.getAll('/all');
    }


}
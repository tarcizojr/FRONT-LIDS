import ApiService from "./ApiService";

export default class EquipamentoService extends ApiService{
    constructor(){
        super('/equipamento')
    }

    creat(obj){
        return this.post('', obj)
    }

    update(id,obj){
        
        return this.patch(`/${id}`, obj);
    }

    delete(id){
        return super.delete(`/${id}`)
    }
    
    find(params){
        return this.get(`${params}`);
    }
    
    findAll(){
        return this.getAll('/all');
    }
}
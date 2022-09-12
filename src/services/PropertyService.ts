import $api from '../http/index';
import SERVER_API from "../http/apiConsts";
import {IProperty} from "../types/mainTypes";

export default class PropertyService {
    static async getAllKeys(){
        return $api.get(`${SERVER_API.PROPERTIES}/keys`);
    }

    static async getByProduct(id:number){
        return $api.get(`${SERVER_API.PROPERTIES}/${id}`);
    }

    static async create(data:IProperty){
        return $api.post(SERVER_API.PROPERTIES, data);
    }


    static async delete(id:number){
        return $api.delete(`${SERVER_API.PROPERTIES}/${id}`);
    }


}
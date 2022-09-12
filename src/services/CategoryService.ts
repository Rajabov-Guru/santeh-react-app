import $api from '../http/index';
import SERVER_API from "../http/apiConsts";

export default class CategoryService {

    static async getAll(){
        return $api.get(SERVER_API.CATEGORIES);
    }

    static async getHighLevel(){
        return $api.get(SERVER_API.HIGH_LEVEL_CATEGORIES);
    }

    static async getOne(id:number){
        return $api.get(`${SERVER_API.CATEGORIES}/${id}`);
    }

    static async create(data:FormData){
        return $api.post(SERVER_API.CATEGORIES, data);
    }

    static async update(data:FormData){
        return $api.patch(SERVER_API.CATEGORIES, data);
    }

    static async delete(id:number){
        return $api.delete(`${SERVER_API.CATEGORIES}/${id}`);
    }

    static async getByName(name:string){
        return $api.get(`${SERVER_API.CATEGORIES}/by_name/${name}`);
    }

    static async getAllChildes(id:number){
        return $api.get(`${SERVER_API.CATEGORIES}/${id}/childes`);
    }
}
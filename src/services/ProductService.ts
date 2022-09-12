import $api from '../http/index';
import SERVER_API from "../http/apiConsts";

export default class ProductService {
    static async getAll(){
        return $api.get(SERVER_API.PRODUCTS);
    }

    static async getOne(id:number){
        return $api.get(`${SERVER_API.PRODUCTS}/${id}`);
    }

    static async create(data:FormData){
        return $api.post(SERVER_API.PRODUCTS, data);
    }

    static async update(data:FormData){
        return $api.patch(SERVER_API.PRODUCTS, data);
    }

    static async delete(id:number){
        return $api.delete(`${SERVER_API.PRODUCTS}/${id}`);
    }

    static async getByCategory(id:number){
        return $api.get(`${SERVER_API.PRODUCTS}/by_category/${id}`);
    }


}
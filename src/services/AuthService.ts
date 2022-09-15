import $api from '../http/index';
import {IAdmin} from "../types/mainTypes";
import SERVER_API from "../http/apiConsts";

export default class AuthService {
    static async login(data:IAdmin){
        return $api.post(SERVER_API.LOGIN, data);
    }
}
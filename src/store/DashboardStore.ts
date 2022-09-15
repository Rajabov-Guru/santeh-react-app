import {makeAutoObservable} from "mobx";
import {IAdmin, ICategory, IKey, IPotentialProperty, IProduct, IProperty} from "../types/mainTypes";
import CategoryService from "../services/CategoryService";
import ProductService from "../services/ProductService";
import PropertyService from "../services/PropertyService";
import {paths} from "../routing/routes";
import AuthService from "../services/AuthService";

export default class DashboardStore {
    token:string | null = null;
    isAuth:boolean = false;

    categories:ICategory[] = [];
    products:IProduct[] = [];
    properties:IProperty[] = [];
    potentialProperties:IPotentialProperty[] = [];
    keys:IKey[] = [];

    currentCategory:ICategory | null = null;

    isLoading:boolean = false;

    dashboardContentIndex:string = paths.DASHBOARD_CATEGORIES;

    searchText:string='';

    constructor() {
        makeAutoObservable(this);
    }

    setSearchText(text:string){
        this.searchText = text;
    }

    setIsAuth(value:boolean){
        this.isAuth = value;
    }

    setToken(value:string | null){
        this.token=value;
    }

    setCurrentCategory(value:ICategory | null){
        this.currentCategory = value;
    }



    setDashboardContentIndex(value:string){
        this.dashboardContentIndex = value;
    }

    setLoading(value:boolean){
        this.isLoading = value;
    }


    setProperties(value:IProperty[]){
        this.properties = value;
    }

    setPotentialProperties(value:IPotentialProperty[]){
        this.potentialProperties = value;
    }

    setCategories(value:ICategory[]){
        this.categories = value;
    }

    setProducts(value:IProduct[]){
        this.products = value;
    }

    setKeys(value:IKey[]){
        this.keys = value;
    }

    addPotentialProperty(item:IPotentialProperty){
        this.potentialProperties = [...this.potentialProperties, item];
    }

    deletePotentialProperty(item:IPotentialProperty){
        this.potentialProperties = this.potentialProperties.filter(x=>x.keyId!==item.keyId && x.value!==item.value);
    }


    async login(data:IAdmin){
        this.setLoading(true);
        try {
            const response = await AuthService.login(data);
            this.setToken(response.data.token);
            this.setIsAuth(true);
            return response.data;
        }catch (e){
            console.log(e)
        }finally {
            this.setLoading(false);
        }
    }

    async logout(){
        this.setLoading(true);
        try {
            this.setToken(null);
            this.setIsAuth(false);
        }catch (e){
            console.log(e)
        }finally {
            this.setLoading(false);
        }
    }

    async getHighLevelCategories(){
        this.setLoading(true);
        try {
            const response = await CategoryService.getHighLevel();
            this.setCategories(response.data);
            return response.data;
        }catch (e){
            console.log(e)
        }finally {
            this.setLoading(false);
        }
    }


    async getLowLevelCategories(id:number){
        this.setLoading(true);
        try {
            const response = await CategoryService.getAllChildes(id);
            this.setCategories(response.data);
            return response.data;
        }catch (e){
            console.log(e)
        }finally {
            this.setLoading(false);
        }
    }

    async getProductsByCategory(id:number){
        this.setLoading(true);
        try {
            const response = await ProductService.getByCategory(id);
            this.setProducts(response.data);
        }catch (e){
            console.log(e)
        }finally {
            this.setLoading(false);
        }
    }

    async getAllProducts(){
        this.setLoading(true);
        try {
            const response = await ProductService.getAll();
            this.setProducts(response.data);
        }catch (e){
            console.log(e)
        }finally {
            this.setLoading(false);
        }
    }


    async getProperties(id:number){
        this.setLoading(true);
        try {
            const response = await PropertyService.getByProduct(id);
            this.setProperties(response.data);
            return response.data;
        }catch (e){
            console.log(e)
        }finally {
            this.setLoading(false);
        }
    }

    async createCategory(data:FormData){
        this.setLoading(true);
        try {
            const response = await CategoryService.create(data);
            return response.data;
        }catch (e){
            console.log(e)
        }finally {
            this.setLoading(false);
        }
    }

    async updateCategory(data:FormData){
        this.setLoading(true);
        try {
            const response = await CategoryService.update(data);
            return response.data;
        }catch (e){
            console.log(e)
        }finally {
            this.setLoading(false);
        }
    }

    async getCurrentCategory(id:number){
        this.setLoading(true);
        try {
            const response = await CategoryService.getOne(id);
            return response.data;
        }catch (e){
            console.log(e)
        }finally {
            this.setLoading(false);
        }
    }


    async createProduct(data:FormData){
        this.setLoading(true);
        try {
            const response = await ProductService.create(data);
            return response.data;
        }catch (e){
            console.log(e)
        }finally {
            this.setLoading(false);
        }
    }


    async createProperty(data:IProperty){
        this.setLoading(true);
        try {
            const response = await PropertyService.create(data);
            return response.data;
        }catch (e){
            console.log(e)
        }finally {
            this.setLoading(false);
        }
    }

    async updateProduct(data:FormData){
        this.setLoading(true);
        try {
            const response = await ProductService.update(data);
            return response.data;
        }catch (e){
            console.log(e)
        }finally {
            this.setLoading(false);
        }
    }

    async deleteProperty(id:number){
        try {
            const response = await PropertyService.delete(id);
            this.setProperties(this.properties.filter(x=>x.id!==id));
        }catch (e){
            console.log(e)
        }finally {
        }
    }

    async deleteProduct(id:number){
        try {
            const response = await ProductService.delete(id);
            this.setProducts(this.products.filter(x=>x.id!==id));
        }catch (e){
            console.log(e)
        }finally {

        }
    }

    async getProduct(id:number){
        this.setLoading(true);
        try {
            const response = await ProductService.getOne(id);
            return response.data;
        }catch (e){
            console.log(e)
        }finally {
            this.setLoading(false);
        }
    }

    async getAllKeys(){
        try {
            const response = await PropertyService.getAllKeys();
            this.setKeys(response.data);
            return response.data;
        }catch (e){
            console.log(e)
        }finally {

        }
    }
}
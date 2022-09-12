import {makeAutoObservable} from "mobx";
import {ICategory, IProduct, IProperty} from "../types/mainTypes";
import CategoryService from "../services/CategoryService";
import ProductService from "../services/ProductService";
import PropertyService from "../services/PropertyService";

export default class MainStore {
    categories:ICategory[] = [];
    lowLevelCategories:ICategory[]=[];
    products:IProduct[] = [];
    properties:IProperty[] = [];

    currentProduct:IProduct | null = null;
    isLoading:boolean = false;

    selectedMenuItem:string = '0';
    selectedNavbarItem:string = '/';

    constructor() {
        makeAutoObservable(this);
    }

    setSelectedMenuItem(value:string | number){
        this.selectedMenuItem = value.toString();
    }

    setSelectedNavbarItem(value:string){
        this.selectedNavbarItem = value;
    }

    setLoading(value:boolean){
        this.isLoading = value;
    }

    setCurrentProduct(value:IProduct){
        this.currentProduct=value;
    }

    setProperties(value:IProperty[]){
        this.properties = value;
    }

    setCategories(value:ICategory[]){
        this.categories = value;
    }

    setLowLevelCategories(value:ICategory[]){
        this.lowLevelCategories = value;
    }

    setProducts(value:IProduct[]){
        this.products = value;
    }


    async getHighLevelCategories(){
        this.setLoading(true);
        try {
            const response = await CategoryService.getHighLevel();
            this.setCategories(response.data);
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
            this.setLowLevelCategories(response.data);
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

    async getCurrentProduct(id:number){
        this.setLoading(true);
        try {
            const response = await ProductService.getOne(id);
            this.setCurrentProduct(response.data);
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
        }catch (e){
            console.log(e)
        }finally {
            this.setLoading(false);
        }
    }

}
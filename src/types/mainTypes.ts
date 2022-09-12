export interface IProperty{
    id?: number;
    value: string;
    keyId: number | string;
    productId: number;
    key?:IKey;
}

export interface IPotentialProperty{
    value: string;
    keyId: number | string;
    productId?: number;
}

export interface IKey{
    id:number;
    keyValue:string;
}

export interface ICategory{
    id?:number;
    name:string;
    image?:string;
    parentId?:number;
    hasChildes?:boolean;
}

export interface IProduct{
    id?:number;
    name:string;
    image?:string;
    price:number;
    available:boolean;
    description:string;
    country:string;
    categoryId:number;
    category?:ICategory;
    properties?:IProperty[];
}


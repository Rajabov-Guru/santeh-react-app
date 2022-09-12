import React, {FC} from 'react';
import styles from './cardlist.module.css';
import {ICategory, IProduct} from "../../types/mainTypes";
import CategoryCard from "./categoryCard/CategoryCard";
import ProductCard from "./productCard/ProductCard";

interface ICardList{
    categories?:ICategory[];
    products?:IProduct[];
    isProductList:boolean;
    dashboard?:boolean;
    deleteHandler?:(id:number)=>void;
}

const CardList:FC<ICardList> = ({categories, products, isProductList,dashboard,deleteHandler}) => {

    if(isProductList){
        return (
            <div className={`${styles.item__list_column} ${dashboard && styles.centered}`}>
                {products?.map(cat=>
                    <ProductCard deleteHandler={deleteHandler} key={cat.id} dashboard={dashboard} product={cat}/>
                )}
            </div>
        );
    }
    return (
        <div className={styles.item__list}>
            {categories?.map(cat=>
                <CategoryCard key={cat.id} dashboard={dashboard} category={cat}/>
            )}
        </div>
    );
};

export default CardList;
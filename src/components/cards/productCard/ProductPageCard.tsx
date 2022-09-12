import React, {FC} from 'react';
import {Image} from "antd";
import {IProductCard} from "./ProductCard";
import styles from './product-card.module.css';
import {IProduct, IProperty} from "../../../types/mainTypes";
import FailImage from "../../common/FailImage";


const KeyData:FC<{product:IProduct | null}> = ({product})=>{
    return (
        <div className={styles.charac}>
            <div className={styles.charac__content}>
                <p className={styles.charac_item_label}>Цена:</p>
                <span className={styles.charac_item_value}>{product?.price}</span>
                <p className={styles.charac_item_label}>Наличие:</p>
                <span className={styles.charac_item_value}>{product?.available?"Есть":"Нет"}</span>
                <p className={styles.charac_item_label}>Страна:</p>
                <span className={styles.charac_item_value}>{product?.country}</span>
            </div>
        </div>
    );
}

const PropertiesView:FC<{properties:IProperty[] | undefined}> = ({properties})=>{
    return (
        <div className={styles.section}>
            <h1 className={styles.section_title}>Характеристики:</h1>
            <table className={styles.product__properties}>
                <tbody className={styles.product__properties}>
                {properties?.map(property=>
                    <tr>
                        <td className={styles.cortege_item}>{property.key?.keyValue}</td>
                        <td className={styles.cortege_item}>{property.value}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}


const ProductPageCard:FC<IProductCard> = ({product,properties}) => {
    return (
        <div className={styles.product__wrapper}>
            <h1 className={styles.product__title}>{product?.name}</h1>
            <div className={styles.product__head}>
                <div style={{maxWidth:500}}>
                    {product?.image?<Image src={`${process.env.REACT_APP_API_URL}${product?.image}`}/>:
                        <FailImage/>}
                </div>
                <KeyData product={product}/>
            </div>
            {properties && properties.length>0 && <PropertiesView properties={properties}/>}
            {product?.description &&
                <div className={styles.section}>
                    <h1 className={styles.section_title}>Описание:</h1>
                    <div className={styles.product__description}>
                        {product?.description}
                    </div>
                </div>
            }
        </div>
    );
};

export default ProductPageCard;
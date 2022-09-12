import React, {FC} from 'react';
import {paths} from "../../../routing/routes";
import {Avatar, Card, Image, Popconfirm} from "antd";
import FailImage from "../../common/FailImage";
import Meta from "antd/es/card/Meta";
import styles from './product-card.module.css';
import {IProduct, IProperty} from "../../../types/mainTypes";
import {DeleteOutlined, EditOutlined, PictureOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import ProductService from "../../../services/ProductService";

export interface IProductCard{
    product:IProduct | null;
    properties?:IProperty[];
    dashboard?:boolean;
    deleteHandler?:(id:number)=>void;
}

const ProductCard:FC<IProductCard> = ({product,dashboard,deleteHandler}) => {
    const router = useNavigate();

    const handleClick = ()=>{
        if(!dashboard) router(`${paths.PRODUCTS_ROUTE}/${product?.id}`);
    }

    const editClick = ()=>{
        router(`${paths.DASHBOARD_EDIT_PRODUCTS.split(':')[0]}${product?.id}`);
    }

    const deleteItem = async (id:number)=>{
        if(deleteHandler) deleteHandler(id);
    }

    return (
        <div onClick={handleClick} className={styles.product__card}>
            {product?.image?<Image onClick={e=>e.stopPropagation()} width={200} src={`${process.env.REACT_APP_API_URL}${product?.image}`}/>:
            <FailImage/>}
            <div className={styles.card__inner}>
                <div className={styles.card__title}>
                    {product?.name}
                </div>
                <div className={styles.card__description}>
                    Страна: {product?.country}
                </div>
                {dashboard &&
                    <div className={styles.actions}>

                        <Popconfirm
                            placement={'leftTop'}
                            title="Вы действительно хотите удалить этот товар?"
                            onConfirm={()=>deleteItem(product?.id?product.id:1)}
                            okText="Да"
                            cancelText="Нет"
                        >
                            <DeleteOutlined style={{color:'red', fontSize:25}} key="delete" />
                        </Popconfirm>
                        <EditOutlined onClick={editClick} style={{fontSize:25}}/>
                    </div>
                }
            </div>
        </div>
    );
};

export default ProductCard;
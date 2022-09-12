import React, {FC, MouseEventHandler, useContext} from 'react';
import Meta from "antd/es/card/Meta";
import {Card, Image, MenuProps} from "antd";
import styles from './category-card.module.css'
import FailImage from "../../common/FailImage";
import {ICategory} from "../../../types/mainTypes";
import {log} from "util";
import {useNavigate} from "react-router-dom";
import {paths} from "../../../routing/routes";
import {Context} from "../../../index";
import {ArrowUpOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined} from "@ant-design/icons";

interface ICategoryCard{
    category:ICategory;
    dashboard?:boolean;
}


const CategoryCard:FC<ICategoryCard> = ({category, dashboard}) => {
    const {mainStore} = useContext(Context);
    const router = useNavigate();

    const handleClick = (e:React.MouseEvent<HTMLElement>)=>{
        e.stopPropagation();
        if(!dashboard){
            router(`${paths.CATEGORIES_ROUTE}/${category.id}`);
            mainStore.setSelectedMenuItem(category.id?category.id:1);
        }
    }

    const editClick = (e:React.MouseEvent<HTMLElement>)=>{
        e.stopPropagation();
        router(`${paths.DASHBOARD_EDIT_CATEGORIES.split(':')[0]}${category.id}`);
    }

    const openPage = (e:React.MouseEvent<HTMLElement>)=>{
        e.stopPropagation();
        router(`${paths.DASHBOARD_CATEGORIES}/${category.id}`);
    }


    return (
        <Card
            // onClick={handleClick}
            className={styles.shadow__card}
            style={{ width: 300, padding:'3px', border:'1px solid #d9d9d9', cursor:'pointer' }}
            actions={dashboard?[
                <ArrowUpOutlined style={{color:"#18d94b"}} onClick={openPage} key="ellipsis"/>,
                <EditOutlined style={{color:"#2b5ffc"}} onClick={editClick} key="edit" />,

            ]:[
                <ArrowUpOutlined style={{color:"#18d94b"}} onClick={handleClick} key="ellipsis"/>
            ]}
            cover={
            category.image?
                <Image
                    onClick={e=>e.stopPropagation()}
                    height={200}
                    alt="example"
                    src={`${process.env.REACT_APP_API_URL}${category.image}`}
                />
                :<FailImage/>

            }
        >
            <Meta
                className={styles.card__meta}
                title={category.name}
            />
        </Card>
    );
};

export default CategoryCard;
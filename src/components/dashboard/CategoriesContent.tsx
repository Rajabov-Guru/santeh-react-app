import React, {CSSProperties, useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import CardList from "../cards/CardList";
import {Content, Header} from "antd/es/layout/layout";
import Search from "antd/es/input/Search";
import styles from "../common/header/header.module.css";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../common/Loading";
import {Button} from "antd";
import {paths} from "../../routing/routes";

export const headerStyles:CSSProperties={
    paddingLeft: 20,
    color:'white',
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between'
}

const CategoriesContent = () => {
    const router = useNavigate();
    const {id} = useParams();
    const {dashboard} = useContext(Context);

    useEffect(()=>{
        dashboard.setCategories([]);
        fetchCategories();
    },[id])

    const fetchCategories = async()=>{
        if(id) {
            const current = await dashboard.getCurrentCategory(Number(id));
            dashboard.setCurrentCategory(current);
            await dashboard.getLowLevelCategories(Number(id));
            return;
        }
        dashboard.setCurrentCategory(null);
        await dashboard.getHighLevelCategories();
    }

    function clickHandler() {
        router(paths.DASHBOARD_ADD_CATEGORIES);
    }

    return (
        <>
            <Header className="site-layout-background" style={headerStyles}>
                {"Категории товаров"}
                <Search
                    className={styles.search}
                    placeholder="Введите текст для поиска...."
                    allowClear
                    enterButton="Поиск"
                    size="large"
                    onSearch={()=>console.log('on search')}
                />
                <Button
                    onClick={clickHandler}
                    type="primary">{id?"Добавить подкатегорию":"Добавить категорию"}</Button>
            </Header>
            <Content style={{overflow: 'initial', backgroundColor:'white'}}>
                <div style={{padding: 40}}>
                    {id && "Id HERE"}
                    {dashboard.isLoading?<Loading/>:
                        <CardList dashboard isProductList={false} categories={dashboard.categories}/>
                    }
                </div>
            </Content>
        </>
    );
};

export default observer(CategoriesContent);
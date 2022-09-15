import React, {useContext, useEffect} from 'react';
import {Content, Header} from "antd/es/layout/layout";
import Search from "antd/es/input/Search";
import styles from "../common/header/header.module.css";
import CardList from "../cards/CardList";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {headerStyles} from "./CategoriesContent";
import {Button, PageHeader} from "antd";
import {useNavigate} from "react-router-dom";
import {paths} from "../../routing/routes";
import Loading from "../common/Loading";
import {LeftOutlined} from "@ant-design/icons";

const ProductsContent = () => {
    const router = useNavigate();
    const {dashboard} = useContext(Context);

    useEffect(()=>{
        dashboard.setDashboardContentIndex(paths.DASHBOARD_PRODUCTS);
        fetchCategories();
    },[])

    const fetchCategories = async()=>{
        await dashboard.getAllProducts();
    }

    const deleteProductHandler = async(id:number)=>{
        await dashboard.deleteProduct(id);
    }

    return (
        <>
            <Header className="site-layout-background" style={headerStyles}>
                <PageHeader
                    backIcon={<LeftOutlined style={{color:'white'}}/>}
                    className="site-page-header"
                    onBack={() => router(-1)}
                    title={<div style={{color:'white'}}>{"Товары"}</div>}

                />
                {/*<Search*/}
                {/*    className={styles.search}*/}
                {/*    placeholder="Введите текст для поиска...."*/}
                {/*    allowClear*/}
                {/*    enterButton="Поиск"*/}
                {/*    size="large"*/}
                {/*    onSearch={()=>console.log('on search')}*/}
                {/*/>*/}
                <Button onClick={()=>router(paths.DASHBOARD_ADD_PRODUCTS)} type="primary">Добавить товар</Button>
            </Header>
            <Content style={{overflow: 'initial', backgroundColor:'white'}}>
                <div style={{padding: 60}}>
                    {dashboard.isLoading?<Loading/>:
                        <CardList deleteHandler={deleteProductHandler} dashboard isProductList={true} products={dashboard.products}/>
                    }
                </div>
            </Content>
        </>
    );
};

export default observer(ProductsContent);
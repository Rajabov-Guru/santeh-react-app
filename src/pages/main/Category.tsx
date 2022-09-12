import React, {useContext, useEffect, useState} from 'react';
import Layout from "../../components/common/Layout";
import CardList from "../../components/cards/CardList";
import SideMenu from "../../components/common/side-menu/SideMenu";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {ICategory} from "../../types/mainTypes";
import CategoryService from "../../services/CategoryService";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../../components/common/Loading";
import { Divider, PageHeader} from "antd";

const Category = () => {
    const router = useNavigate();
    const [category, setCategory] =  useState<ICategory | null>(null);
    const {mainStore} = useContext(Context);
    const {id} = useParams<{id?: string}>();


    useEffect(()=>{
        mainStore.setSelectedNavbarItem(window.location.pathname);
        mainStore.setSelectedMenuItem(Number(id));
        fetchCurrent();
        fetchCategories();
        fetchProducts();
    },[id])


    const fetchCurrent = async()=>{
        const response = await CategoryService.getOne(Number(id));
        setCategory(response.data);
    }

    const fetchCategories = async()=>{
       await mainStore.getLowLevelCategories(Number(id));
    }

    const fetchProducts = async()=>{
        await mainStore.getProductsByCategory(Number(id));
    }


    return (
        <Layout>
            <div className={'content-inner'}>
                <SideMenu/>
                <div className={'content-block'}>
                    <PageHeader
                        className="site-page-header"
                        onBack={() => router(-1)}
                        title={category?.name}
                        subTitle="подкатегории и товары"
                    />
                    <div className={'content-area'}>
                        {mainStore.isLoading?<Loading/>:
                            <div className={'item__wrapper'}>
                                {!(mainStore.lowLevelCategories.length>0) && !(mainStore.products.length>0) &&
                                    <Divider>Здесь пока ничего нет</Divider>
                                }
                                {mainStore.lowLevelCategories.length>0 &&
                                    <>
                                        <Divider>Подкатегории</Divider>
                                        <CardList isProductList={false} categories={mainStore.lowLevelCategories}/>
                                    </>
                                }
                                {mainStore.products.length>0 &&
                                    <>
                                        <Divider>Товары</Divider>
                                        <CardList isProductList={true} products={mainStore.products}/>
                                    </>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default observer(Category);
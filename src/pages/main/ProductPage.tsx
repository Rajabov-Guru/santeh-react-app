import React, {useContext, useEffect, useState} from 'react';
import SideMenu from "../../components/common/side-menu/SideMenu";
import Layout from "../../components/common/Layout";
import {useNavigate, useParams} from "react-router-dom";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import ProductPageCard from "../../components/cards/productCard/ProductPageCard";
import Loading from "../../components/common/Loading";
import {PageHeader} from "antd";


const ProductPage = () => {
    const {mainStore} = useContext(Context);
    const {id} = useParams<{id?: string}>();
    const router = useNavigate();

    useEffect(()=>{
        mainStore.setSelectedNavbarItem(window.location.pathname);
        fetchProduct();
        fetchProperties();
    },[id])

    const fetchProduct = async()=>{
        await mainStore.getCurrentProduct(Number(id));
    }

    const fetchProperties = async()=>{
        await mainStore.getProperties(Number(id));
    }

    return (
        <Layout>
            <div className={'content-inner'}>
                <SideMenu/>
                <div className={'content-block'}>
                    <PageHeader
                        className="site-page-header"
                        onBack={() => router(-1)}
                        title={'Товар'}
                    />
                    <div className={'content-area'}>
                        {mainStore.isLoading?<Loading/>:
                            <ProductPageCard product={mainStore.currentProduct} properties={mainStore.properties}/>
                        }
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default observer(ProductPage);
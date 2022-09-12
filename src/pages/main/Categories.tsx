import React, {useContext, useEffect} from 'react';
import Layout from "../../components/common/Layout";
import CardList from "../../components/cards/CardList";
import SideMenu from "../../components/common/side-menu/SideMenu";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import Loading from "../../components/common/Loading";
import {PageHeader} from "antd";
import {useNavigate} from "react-router-dom";

const Categories = () => {
    const router = useNavigate();

    const {mainStore} = useContext(Context);

    useEffect(()=>{
        mainStore.setSelectedNavbarItem(window.location.pathname);
        mainStore.setSelectedMenuItem(0);
        fetchCategories();
    },[])

    const fetchCategories = async()=>{
        await mainStore.getHighLevelCategories();
    }

    return (
        <Layout>
            <div className={'content-inner'}>
                <SideMenu/>
                <div className={'content-block'}>
                    <PageHeader
                        className="site-page-header"
                        onBack={() => router(-1)}
                        title={'Популярные категории'}
                    />
                    <div className={'content-area'}>
                        {mainStore.isLoading?<Loading/>:
                            <CardList isProductList={false} categories={mainStore.categories}/>
                        }
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default observer(Categories);
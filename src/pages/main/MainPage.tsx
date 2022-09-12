import React, {useContext, useEffect} from 'react';
import Layout from "../../components/common/Layout";
import CardList from "../../components/cards/CardList";
import CategoryCard from "../../components/cards/categoryCard/CategoryCard";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import Loading from "../../components/common/Loading";



const MainPage = () => {
    const {mainStore} = useContext(Context);

    useEffect(()=>{
        mainStore.setSelectedNavbarItem('/');
        fetchCategories();
    },[])

    const fetchCategories = async()=>{
        await mainStore.getHighLevelCategories();
    }

    return (
        <Layout>
            <div className={'content-inner'}>
                <div className={'content-block'}>
                    <h1 className={'page__title'}>Популярные категории товаров</h1>
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

export default observer(MainPage);
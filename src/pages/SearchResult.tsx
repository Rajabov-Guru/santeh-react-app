import React, {useContext, useEffect, useState} from 'react';
import Layout from "../components/common/Layout";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import Loading from "../components/common/Loading";
import CardList from "../components/cards/CardList";
import {ICategory, IProduct} from "../types/mainTypes";
import {Divider} from "antd";

function getSearchedCategories(text:string, data:ICategory[]){
    return data.filter(x=>x.name.toLowerCase().includes(text.toLowerCase()));
}

function getSearchedProducts(text:string, data:IProduct[]){
    return data.filter(x=>x.name.toLowerCase().includes(text.toLowerCase()));
}

const SearchResult = () => {
    const {query} = useParams();
    const {mainStore} = useContext(Context);

    const [searchText, setSearchText] = useState('');
    const [searchedCategories, setSearchedCategories] = useState<ICategory[]>([]);
    const [searchedProducts, setSearchedProducts] = useState<IProduct[]>([]);



    useEffect(()=>{
        if(query) {
            setSearchText(query.replaceAll('_',' '))
            fetchData();
        }
    },[query,searchText])

    const fetchData = async()=>{
        await mainStore.getAllCategories();
        setSearchedCategories(getSearchedCategories(searchText,mainStore.categories));
        await mainStore.getAllProducts();
        setSearchedProducts(getSearchedProducts(searchText,mainStore.products));
    }

    return (
        <Layout>
            <div className={'content-inner'}>
                <div className={'content-block'}>
                    <h1 className={'page__title'}>Поиск по запросу : {searchText}</h1>
                    <div className={'content-area centered'}>
                        {mainStore.isLoading?<Loading/>:
                            <div className={'item__wrapper'}>
                                {!(searchedCategories.length>0) && !(searchedProducts.length>0) &&
                                    <Divider>Здесь пока ничего нет</Divider>
                                }
                                {searchedCategories.length>0 &&
                                    <>
                                        <Divider>Категории</Divider>
                                        <CardList isProductList={false} categories={searchedCategories}/>
                                    </>
                                }
                                {searchedProducts.length>0 &&
                                    <>
                                        <Divider>Товары</Divider>
                                        <CardList isProductList={true} products={searchedProducts}/>
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

export default observer(SearchResult);
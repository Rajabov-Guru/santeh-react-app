import React, {useContext, useEffect} from 'react';
import Layout from "../../components/common/Layout";
import {PageHeader} from "antd";
import {useNavigate} from "react-router-dom";
import {Context} from "../../index";

const Partners = () => {
    const router = useNavigate();
    const {mainStore} = useContext(Context);
    useEffect(()=>{
        mainStore.setSelectedNavbarItem(window.location.pathname);
    },[]);

    return (
        <Layout>
            <div className={'content-inner'}>
                <div className={'content-block'}>
                    <PageHeader
                        className="site-page-header"
                        onBack={() => router(-1)}
                        title={'Партнеры'}
                    />
                    <div className={'content-area'}>
                        Partners
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Partners;
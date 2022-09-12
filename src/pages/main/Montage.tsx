import React, {useContext, useEffect} from 'react';
import Layout from "../../components/common/Layout";
import {useNavigate} from "react-router-dom";
import {Context} from "../../index";
import {PageHeader} from "antd";

const Montage = () => {
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
                        title={'Монтаж'}
                    />
                    <div className={'content-area'}>
                        MOntage
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Montage;
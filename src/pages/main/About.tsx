import React, {useContext, useEffect} from 'react';
import Layout from "../../components/common/Layout";
import about from "../../assets/about.jpeg";
import {Image, PageHeader, Typography} from "antd";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";

const {Title} = Typography;

const text = "Предлагаем комплексные поставки отопительного оборудования и инженерной сантехники на любые объекты. Гарантированное качество, проверенные производители, адекватные цены. Любые формы оплаты. Осуществляем доставку на объект в короткие сроки.";


const About = () => {
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
                        title={'О компании'}
                    />
                    <div className={'content-area'}>
                        <Title level={3}>{text}</Title>
                        <div style={{margin:"0 auto", maxWidth:1000}}>
                            <Image src={about}/>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default About;
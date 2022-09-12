import React from 'react';
import Header from "./header/Header";
import Footer from "./footer/Footer";
import {Breadcrumb, Card, Menu} from "antd";
import {HomeOutlined, UserOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";

const Layout = (props:any) => {
    return (
        <div className={'wrapper'}>
            <Header/>
            <div className={'content'}>
                <div className={'container'}>
                    {props.children}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Layout;
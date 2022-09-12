import React from 'react';
import Header from "./header/Header";
import Footer from "./footer/Footer";

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
import React, {FC, useContext, useEffect} from 'react';
import DashboardSider from "./DashboardSider";
import {Layout} from "antd";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import {paths} from "../../routing/routes";

interface IContentLayout{
    children:React.ReactNode;
}

const ContentLayout:FC<IContentLayout> = ({children}) => {
    const {dashboard} = useContext(Context);
    const router = useNavigate();

    useEffect(()=>{
        if(!dashboard.isAuth){
            router(paths.DASHBOARD_LOGIN);
        }
    },[children])

    return (
        <Layout hasSider>
            <DashboardSider/>
            <Layout className="site-layout" style={{marginLeft: 200,}}>
                {children}
            </Layout>
        </Layout>
    );
};

export default ContentLayout;
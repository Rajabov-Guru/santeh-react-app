import React, {FC} from 'react';
import DashboardSider from "./DashboardSider";
import {Layout} from "antd";

interface IContentLayout{
    children:React.ReactNode;
}

const ContentLayout:FC<IContentLayout> = ({children}) => {
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
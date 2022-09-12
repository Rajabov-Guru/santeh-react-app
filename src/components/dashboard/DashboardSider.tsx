import React, {useContext} from 'react';
import {Menu, MenuProps} from "antd";
import Sider from "antd/es/layout/Sider";
import {Context} from "../../index";
import {AppstoreOutlined, CloseCircleOutlined, ShopOutlined} from "@ant-design/icons";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

const items = [
    {
        key:'/dashboard/categories',
        icon:React.createElement(AppstoreOutlined),
        label:"Категории товаров"
    },
    {
        key:'/dashboard/products',
        icon:React.createElement(ShopOutlined),
        label:"Товары"
    },
    {
        key:'3',
        icon:React.createElement(CloseCircleOutlined),
        label:"Выход"
    }
];

const siderStyles:React.CSSProperties = {
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
};

const DashboardSider = () => {
    const {dashboard} = useContext(Context);
    const router = useNavigate();

    const clickHandler: MenuProps['onClick'] = e => {
        if(e.key==="3"){
            console.log("Logout");
            return;
        }
        dashboard.setDashboardContentIndex(e.key);
        router(e.key);
    };
    return (
        <Sider style={siderStyles}>
            <div className="logo">SANTEH PROFESSIONAL</div>
            <Menu onClick={clickHandler} theme="dark" mode="inline" defaultSelectedKeys={[`${dashboard.dashboardContentIndex}`]} items={items} />
        </Sider>
    );
};

export default observer(DashboardSider);
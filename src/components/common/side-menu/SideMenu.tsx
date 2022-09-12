import React, {useContext, useEffect, useState} from 'react';
import styles from './side_menu.module.css';
import {Menu, MenuProps} from "antd";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {paths} from "../../../routing/routes";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
): MenuItem {
    return {
        key,
        label
    } as MenuItem;
}

const SideMenu = () => {
    const [items, setItems] = useState<MenuProps['items']>();
    const router = useNavigate();
    const {mainStore} = useContext(Context);

    useEffect(()=>{
        fetchCategories();
    },[])


    const fetchCategories = async()=>{
        await mainStore.getHighLevelCategories();
        setItems(mainStore.categories.map(item=>getItem(item.name, item.id?item.id:1)))
    }


    const onClick: MenuProps['onClick'] = e => {
        mainStore.setSelectedMenuItem(e.key);
        router(`${paths.CATEGORIES_ROUTE}/${e.key}`);
    };


    return (
        <>
            <Menu
                className={styles.sider__inline}
                onClick={onClick}
                style={{ width: 256}}
                defaultSelectedKeys={[mainStore.selectedMenuItem]}
                selectedKeys={[mainStore.selectedMenuItem]}
                mode="inline"
                theme="dark"
                items={items}
            />
            <Menu
                className={styles.sider__horiz}
                onClick={onClick}
                style={{ width: '100%'}}
                defaultSelectedKeys={[mainStore.selectedMenuItem]}
                selectedKeys={[mainStore.selectedMenuItem]}
                mode="horizontal"
                theme="light"
                items={items}
            />
        </>
    );
};

export default observer(SideMenu);
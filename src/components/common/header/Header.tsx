import React, {useContext} from 'react';
import './header.module.css';
import Search from "antd/es/input/Search";
import {Button, Menu, Space, Typography} from "antd";
import styles from './header.module.css';
import Navbar from "../navbar/Navbar";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {LoginOutlined, PhoneOutlined} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";
import {paths} from "../../../routing/routes";

const Header = () => {
    const router = useNavigate();
    const {mainStore} = useContext(Context);

    const navBarClickHandler = (code:string)=>{
        mainStore.setSelectedNavbarItem(code);
    }

    const toLoginPage =()=>{
        router(paths.DASHBOARD_CATEGORIES);
    }


    return (
        <div className={styles.header}>
            <div className={'container'}>
                <header className={styles.header__inner}>
                    <div className={styles.header_container}>
                        <Typography className={styles.logo}>САНТЕХ<br/>ПРОФЕССИОНАЛ</Typography>
                        <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                            <Space className={styles.telephone}>
                                <PhoneOutlined />
                                <Typography className={styles.telephone}>8 (495) 204-33-88</Typography>
                            </Space>
                            <Space className={styles.telephone}>
                                <PhoneOutlined />
                                <Typography className={styles.telephone}>8 (495) 204-33-88</Typography>
                            </Space>
                        </Space>
                        <Search
                            className={styles.search}
                            placeholder="Введите текст для поиска...."
                            allowClear
                            enterButton="Поиск"
                            size="large"
                            onSearch={()=>console.log('on search')}
                        />
                        <Button onClick={toLoginPage} icon={<LoginOutlined />}>Вход</Button>
                    </div>

                </header>
                <Navbar code={mainStore.selectedNavbarItem} handleClick={navBarClickHandler}/>
            </div>
        </div>
    );
};

export default observer(Header);
import React from 'react';
import styles from './footer.module.css';
import {Link} from "react-router-dom";
import {paths} from "../../../routing/routes";
import {Descriptions} from "antd";

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={'container'}>
                <div className={styles.footer_inner}>
                    <div className={styles.footer__content}>
                        <Descriptions
                            title="ООО СанТехЛюкс"
                            contentStyle={{color:'white', fontSize:'18px'}}
                            labelStyle={{color:'white', fontSize:'18px'}} size={'middle'}>
                            <Descriptions.Item label="Телефон">+7 915 052 98 10</Descriptions.Item>
                            <Descriptions.Item label="Почта">info@santehlux-msk.ru</Descriptions.Item>
                            <Descriptions.Item label="Address">
                                Склад Москва г., Егорьевский проезд, д. 2а, стр. 1
                                Телефон: +7 915 052 98 10
                            </Descriptions.Item>
                        </Descriptions>
                        {/*<div className={styles.footer__block}>*/}
                        {/*    <div className={styles.footer__block__title}>О компании</div>*/}
                        {/*    <Link className={styles.footer__link} to={paths.ABOUT_ROUTE}>О нас</Link>*/}
                        {/*    <Link className={styles.footer__link} to={paths.PARTNERS}>Партнеры</Link>*/}
                        {/*    <Link className={styles.footer__link} to={paths.CONTACTS}>Контакты</Link>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
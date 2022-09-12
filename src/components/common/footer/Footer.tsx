import React from 'react';
import styles from './footer.module.css';
import {Link} from "react-router-dom";
import {paths} from "../../../routing/routes";

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={'container'}>
                <div className={styles.footer_inner}>
                    <div className={styles.footer__content}>
                        <div className={styles.footer__block}>
                            <div className={styles.footer__block__title}>О компании</div>
                            <Link className={styles.footer__link} to={paths.ABOUT_ROUTE}>О нас</Link>
                            <Link className={styles.footer__link} to={paths.PARTNERS}>Партнеры</Link>
                            <Link className={styles.footer__link} to={paths.CONTACTS}>Контакты</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
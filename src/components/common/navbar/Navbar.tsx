import React, {FC} from 'react';
import styles from "./navbar.module.css";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {navigates} from "../../../routing/routes";


const Navbar:FC<{code:string, handleClick:(c:string)=>void}> = ({code,handleClick}) => {
    const router = useNavigate();

    const handleNavClick =(path:string)=>{
        handleClick(path)
        router(path);

    }

    return (
        <menu className={styles.menu}>
            <ul className={styles.menu__list}>
                {navigates.map(nav=>
                    <li key={nav.path}
                        onClick={()=>handleNavClick(nav.path)}
                        className={`${styles.menu__item} ${nav.path===code && styles.active}`}>
                        {nav.label}
                    </li>
                )}
            </ul>
        </menu>
    );
};

export default Navbar;
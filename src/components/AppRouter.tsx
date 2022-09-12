import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {paths, routes} from "../routing/routes";

const AppRouter = () => {
    return (
        <Routes>
            {routes.map(route=>
                <Route key={Date.now()} path={route.path} element={<route.Component/>}/>
            )}
            <Route path="/*" element={<Navigate to={paths.MAIN_ROUTE}/>} />
        </Routes>
    );
};

export default AppRouter;
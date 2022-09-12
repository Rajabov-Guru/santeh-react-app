import React from 'react';
import {Spin} from "antd";

const Loading = () => {
    return (
        <div className={'backdrop'}>
            <Spin size="large" />
        </div>
    );
};

export default Loading;
import React, {useContext, useState} from 'react';
import {Button, Form, Input, message} from "antd";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {paths} from "../../routing/routes";

const Login = () => {
    const router = useNavigate();
    const {dashboard} = useContext(Context);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    async function onFinish() {
        const data = {
            login,
            password
        }
        const response = await dashboard.login(data);
        if(!response){
            message.error('Администратор не найден. Попробуйте ещё раз');
        }
        router(paths.DASHBOARD_CATEGORIES);
    }

    function onFinishFailed() {

    }

    return (
        <div className={'login-layout'}>
            <Form
                style={{margin:'0 auto', width:"max-content"}}
                name="basic"
                layout={'vertical'}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Логин"
                    name="username"
                    rules={[{ required: true, message: 'Это поле обязательное!' }]}
                >
                    <Input value={login} onChange={(e)=>setLogin(e.target.value)} style={{width:400}} />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Это поле обязательное!' }]}
                >
                    <Input.Password value={password} onChange={(e)=>setPassword(e.target.value)} style={{width:400}}/>
                </Form.Item>

                <Form.Item style={{width:400, marginTop:'40px', marginLeft:'-6%', display:"flex", justifyContent:'flex-end'}} wrapperCol={{ offset: 8, span: 16 }}>
                    <Button loading={dashboard.isLoading} type="primary" htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default observer(Login);
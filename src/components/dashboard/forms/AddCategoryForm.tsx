import React, { FC, useContext, useEffect, useState} from 'react';
import {Content, Header} from "antd/es/layout/layout";
import {headerStyles} from "../CategoriesContent";
import {Button, Form, Input, message, Typography, Upload, UploadFile, UploadProps} from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import {RcFile} from "antd/es/upload";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {ICategory} from "../../../types/mainTypes";
import {useParams} from "react-router-dom";
import Loading from "../../common/Loading";



const {Title} = Typography;

const AddCategoryForm = () => {

    const [form] = Form.useForm();
    const {dashboard} = useContext(Context);


    const [name, setName] = useState('');
    const [image, setImage] = useState<any>(null);




    const onFinish = async(values:any) => {
        const formData = new FormData();
        if(dashboard.currentCategory){
            formData.append('parentId', `${dashboard.currentCategory.id}`);
        }
        formData.append('name', name);
        formData.append('image', image);
        const cat = await dashboard.createCategory(formData);
        console.log(cat);
        reset();
        message.success('Данные успешно сохранены',3);
    }


    function reset(){
        form.resetFields();
        setName('');
        setImage(null);

    }

    function selectFile(file:RcFile, fileList:RcFile[]){
        setImage(file);
        return false;
    }


    return (
        <>
            <Header className="site-layout-background" style={headerStyles}>
                {`Категория`}
            </Header>
            <Content style={{overflow: 'initial', backgroundColor:'white'}}>
                {dashboard.isLoading?<Loading/>:
                    <div className={'form__wrapper'}>

                        <Title>{`Добавить ${dashboard.currentCategory?"подкатегорию":"категорию"}`}</Title>

                        <Form form={form} size={"large"} layout={'vertical'} name="basic" onFinish={onFinish}  autoComplete="off">

                            <Form.Item style={{width:600}} label="Название" name="name" rules={[{ required: true, message: 'Please input your username!' }]}>
                                <Input onChange={(e)=>{setName(e.target.value)}} value={name}/>
                            </Form.Item>

                            <Form.Item label="Картинка" valuePropName="fileList" >
                                <Upload listType="picture-card" beforeUpload={selectFile}>
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Загрузить</div>
                                    </div>
                                </Upload>
                            </Form.Item>

                            <Form.Item>
                                <Button loading={dashboard.isLoading} type="primary" htmlType="submit">Сохранить</Button>
                            </Form.Item>

                        </Form>
                    </div>
                }
            </Content>
        </>
    );
};

export default observer(AddCategoryForm);
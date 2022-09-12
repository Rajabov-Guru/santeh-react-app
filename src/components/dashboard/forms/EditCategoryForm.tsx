import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Button, Form, Input, message, Typography, Upload, UploadFile, UploadProps} from "antd";
import {Context} from "../../../index";
import {ICategory} from "../../../types/mainTypes";
import {RcFile} from "antd/es/upload";
import Loading from "../../common/Loading";
import {Content, Header} from "antd/es/layout/layout";
import {headerStyles} from "../CategoriesContent";
import {PlusOutlined} from "@ant-design/icons";
import {observer} from "mobx-react-lite";

const {Title} = Typography;

const EditCategoryForm = () => {
    const {id} = useParams();
    const [form] = Form.useForm();
    const {dashboard} = useContext(Context);

    const [category, setCategory] = useState<ICategory>({name:'',image:'',parentId:2});
    const [name, setName] = useState('');
    const [image, setImage] = useState<any>(null);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(()=>{
        if(id){
            fetchCategory();
        }
    },[id])

    const fetchCategory = async()=>{
        const cat = await dashboard.getCurrentCategory(Number(id));
        setCategory(cat);
        form.setFieldValue('name',cat.name);
        setName(cat.name);
        setFileList([
            {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: `${process.env.REACT_APP_API_URL}${cat.image}`,
            }
        ])
    }

    const onFinish = async(values:any) => {
        const formData = new FormData();
        if(category.id) formData.append('id', category.id.toString());
        formData.append('name', name);
        formData.append('image', image?image:category.image);
        const cat = await dashboard.updateCategory(formData);
        console.log(cat);
        message.success('Данные успешно сохранены',3);
    }

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList([newFileList[1]]);



    function selectFile(file:RcFile, fileList:RcFile[]){
        setImage(file);
        return false;
    }


    return (
        <>
            <Header className="site-layout-background" style={headerStyles}>
                {"Редактирование категории"}
            </Header>
            <Content style={{overflow: 'initial', backgroundColor:'white'}}>
                {dashboard.isLoading?<Loading/>:
                    <div className={'form__wrapper'}>
                        <Title>{`${"Редактировать"} ${dashboard.currentCategory?"подкатегорию":"категорию"}`}</Title>

                        <Form form={form} size={"large"} layout={'vertical'} name="basic" onFinish={onFinish}  autoComplete="off">

                            <Form.Item style={{width:600}} label="Название" name="name" rules={[{ required: true, message: 'Please input your username!' }]}>
                                <Input onChange={(e)=>{setName(e.target.value)}} value={name}/>
                            </Form.Item>

                            <Form.Item label="Картинка" valuePropName="fileList" >
                                <Upload listType="picture-card" beforeUpload={selectFile} fileList={fileList} onChange={handleChange}>
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

export default observer(EditCategoryForm);
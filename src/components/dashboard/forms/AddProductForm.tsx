import React, {FC, useContext, useEffect, useState} from 'react';
import {Content, Header} from "antd/es/layout/layout";
import {headerStyles} from "../CategoriesContent";
import Loading from "../../common/Loading";
import {
    Button,
    Divider,
    Form,
    Input,
    message,
    Modal, PageHeader,
    TreeSelect,
    TreeSelectProps,
    Typography,
    Upload
} from "antd";
import {LeftOutlined, PlusOutlined} from "@ant-design/icons";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {RcFile} from "antd/es/upload";
import type { DefaultOptionType } from 'antd/es/select';
import {ICategory, IProperty} from "../../../types/mainTypes";
import CategoryService from "../../../services/CategoryService";
import useModal from "../../../hooks/useModal";
import AddPropertyForm from "./AddPropertyForm";
import {useNavigate} from "react-router-dom";

const {Title} = Typography;
const { TextArea } = Input;

export const genNode = (category:ICategory) => {
    return {
        id: category.id,
        pId: category.parentId?category.parentId:0,
        value: category.id,
        title: category.name,
        isLeaf:!category.hasChildes,
    };
};


const AddProductForm = () => {
    const router = useNavigate();
    const [form] = Form.useForm();
    const {dashboard} = useContext(Context);

    const [treeData, setTreeData] = useState<Omit<DefaultOptionType, 'label'>[]>([]);


    const [categoryId, setCategoryId] = useState<string>();
    const [image, setImage] = useState<any>(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');



    useEffect(()=>{
        fetchCategories();
    },[])

    const fetchCategories = async()=>{
        dashboard.setPotentialProperties([]);
        const result = await dashboard.getHighLevelCategories();
        setTreeData(result.map((item:ICategory)=>genNode(item)));
    }

    const onLoadData: TreeSelectProps['loadData'] = async ({ id }) =>{
        const result = await CategoryService.getAllChildes(id);
        setTreeData(
            treeData.concat(result.data.map((item:ICategory)=>genNode(item))),
        );
        return undefined;
    }





    const onChange = (newValue: string) => {
        console.log(newValue);
        setCategoryId(newValue);
    };

    const onFinish = async(values:any) => {
        const formData = new FormData();
        if(categoryId) formData.append('categoryId', categoryId);
        formData.append('name', name);
        formData.append('image', image);
        formData.append('price', price);
        formData.append('country', country);
        formData.append('description', description);
        const prod = await dashboard.createProduct(formData);
        if(dashboard.potentialProperties.length>0){
            dashboard.potentialProperties.forEach(x=>x.productId = prod.id);
            for (const el of dashboard.potentialProperties) {
                await  dashboard.createProperty(el as IProperty);
            }
        }
        reset();
        message.success('Данные успешно сохранены',3);
    }


    function reset(){
        dashboard.setPotentialProperties([]);
        form.resetFields();
        setCategoryId('');
        setName('');
        setImage(null);
        setPrice('');
        setCountry('');
        setDescription('');

    }

    function selectFile(file:RcFile, fileList:RcFile[]){
        setImage(file);
        return false;
    }


    return (
        <>
            <Header className="site-layout-background" style={headerStyles}>
                <PageHeader
                    backIcon={<LeftOutlined style={{color:'white'}}/>}
                    className="site-page-header"
                    onBack={() => router(-1)}
                    title={<div style={{color:'white'}}>{"Товар"}</div>}

                />
            </Header>
            <Content style={{overflow: 'initial', backgroundColor:'white'}}>
                {dashboard.isLoading?<Loading/>:
                    <div className={'form__wrapper'}>


                        <Form form={form} size={"large"} layout={'vertical'} name="basic" onFinish={onFinish}  autoComplete="off">
                            <Title>{`Добавить товар`}</Title>
                            <Form.Item
                                style={{width:600}}
                                label="Категория"
                                name="category"
                                rules={[{ required: true, message: 'Это обязательное поле' }]}>
                                <TreeSelect
                                    treeDataSimpleMode
                                    style={{ width: '100%' }}
                                    value={categoryId}
                                    dropdownStyle={{ maxHeight: 600 }}
                                    placeholder="Выберите категорию"
                                    onChange={onChange}
                                    loadData={onLoadData}
                                    treeData={treeData}
                                />
                            </Form.Item>

                            <Form.Item
                                style={{width:600}}
                                label="Название"
                                name="name"
                                rules={[{ required: true, message: 'Это обязательное поле' }]}>
                                <Input onChange={e=>setName(e.target.value)} value={name}/>
                            </Form.Item>

                            <Form.Item
                                style={{width:600}}
                                label="Цена"
                                name="price"
                                rules={[{ required: true, message: 'Это обязательное поле' }]}>
                                <Input onChange={e=>setPrice(e.target.value)} value={price} addonAfter="₽"/>
                            </Form.Item>

                            <Form.Item
                                style={{width:600}}
                                label="Страна"
                                name="country"
                                rules={[{ required: true, message: 'Это обязательное поле' }]}>
                                <Input onChange={e=>setCountry(e.target.value)} value={country}/>
                            </Form.Item>

                            <Form.Item
                                style={{width:600}}
                                label="Описание"
                                name="description" >
                                <TextArea onChange={e=>setDescription(e.target.value)} value={description} rows={4}/>
                            </Form.Item>


                            <Form.Item label="Картинка" valuePropName="fileList" >
                                <Upload listType="picture-card" beforeUpload={selectFile}>
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Загрузить</div>
                                    </div>
                                </Upload>
                            </Form.Item>

                            <AddPropertyForm/>

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

export default observer(AddProductForm);
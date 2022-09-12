import React, {useContext, useEffect, useState} from 'react';
import {Content, Header} from "antd/es/layout/layout";
import {headerStyles} from "../CategoriesContent";
import Loading from "../../common/Loading";
import {
    Button,
    Form,
    Input,
    message, PageHeader,
    TreeSelect,
    TreeSelectProps,
    Typography,
    Upload,
    UploadFile,
    UploadProps
} from "antd";
import {LeftOutlined, PlusOutlined} from "@ant-design/icons";
import AddPropertyForm from "./AddPropertyForm";
import {Context} from "../../../index";
import {DefaultOptionType} from "antd/es/select";
import {observer} from "mobx-react-lite";
import {RcFile} from "antd/es/upload";
import {useNavigate, useParams} from "react-router-dom";
import {ICategory, IPotentialProperty, IProduct, IProperty} from "../../../types/mainTypes";
import CategoryService from "../../../services/CategoryService";
import {genNode} from "./AddProductForm";
import EditPropertyForm from "./EditPropertyForm";

const {Title} = Typography;
const { TextArea } = Input;

const EditProductForm = () => {
    const router= useNavigate();
    const {id} = useParams();
    const [form] = Form.useForm();
    const {dashboard} = useContext(Context);

    const [treeData, setTreeData] = useState<Omit<DefaultOptionType, 'label'>[]>([]);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const [product, setProduct] = useState<IProduct>();

    const [placeholder, setPlaceholder] = useState('');

    const [categoryId, setCategoryId] = useState<string>();
    const [image, setImage] = useState<any>(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');

    useEffect(()=>{
        fetchCurrent();
        fetchCategories();
    },[])

    const fetchCurrent = async()=>{
        const result:IProduct = await dashboard.getProduct(Number(id));
        if(result.id) {
            const propers:IProperty[] = await dashboard.getProperties(result.id);
            dashboard.setProperties(propers);
        }
        setProduct(result);
        setCategoryId(result.categoryId.toString());
        if(result.category)setPlaceholder(result.category?.name)
        setName(result.name);
        setPrice(result.price.toString());
        setCountry(result.country);
        setDescription(result.description);
        form.setFieldValue('name',result.name);
        form.setFieldValue('categoryId',result.categoryId);
        form.setFieldValue('price',result.price);
        form.setFieldValue('country',result.country);
        form.setFieldValue('description',result.description);
        setFileList([
            {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: `${process.env.REACT_APP_API_URL}${result.image}`,
            }
        ])

    }

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

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList([newFileList[1]]);


    const onChange = (newValue: string) => {
        setCategoryId(newValue);
    };

    const onFinish = async(values:any) => {
        const formData = new FormData();
        if(id) formData.append('id', id);
        if(categoryId) formData.append('categoryId', categoryId);
        formData.append('name', name);
        formData.append('image', image?image:product?.image);
        formData.append('price', price);
        formData.append('country', country);
        formData.append('description', description);
        const prod = await dashboard.updateProduct(formData);
        if(dashboard.potentialProperties.length>0){
            dashboard.potentialProperties.forEach(x=>x.productId = prod.id);
            for (const el of dashboard.potentialProperties) {
                await  dashboard.createProperty(el as IProperty);
            }
        }
        message.success('Данные успешно сохранены',3);
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
                    title={<div style={{color:'white'}}>{`Редактирование: ${product?.name}`}</div>}

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
                                name="category">
                                <TreeSelect
                                    treeDataSimpleMode
                                    style={{ width: '100%' }}
                                    value={categoryId}
                                    dropdownStyle={{ maxHeight: 600 }}
                                    placeholder={placeholder}
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
                                <Upload listType="picture-card" beforeUpload={selectFile} fileList={fileList} onChange={handleChange}>
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Загрузить</div>
                                    </div>
                                </Upload>
                            </Form.Item>

                            <EditPropertyForm/>

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

export default observer(EditProductForm);
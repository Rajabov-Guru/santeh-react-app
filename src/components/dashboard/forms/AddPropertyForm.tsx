import React, {useContext, useEffect, useState} from 'react';
import useModal from "../../../hooks/useModal";
import {AutoComplete, Button, Card, Col, Divider, Input, Modal, Row, Space} from "antd";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {IKey, IPotentialProperty, IProperty} from "../../../types/mainTypes";
import {values} from "mobx";

interface IOption{
    value:string;
}

function genOptions(items:IKey[]):IOption[]{
    return items.map(k=>{
        return {id:k.id, value:k.keyValue};
    })
}


const AddPropertyForm = () => {
    const {dashboard} = useContext(Context);
    const {isModalOpen, showModal, handleCancel} = useModal();

    const [text, setText] = useState('');
    const [keyValue, setKeyValue] = useState('');
    const [options, setOptions] = useState<IOption[]>([]);

    useEffect(()=>{
        dashboard.getAllKeys();
    },[])


    const handleOk = () => {
        const potential:IPotentialProperty = {
            value:text,
            keyId:keyValue
        }
        dashboard.addPotentialProperty(potential);
        setText('');
        setKeyValue('');
        handleCancel();
    };

    const handleDelete= (x:IPotentialProperty)=>{
        dashboard.deletePotentialProperty(x);
    }



    const onSearch = (searchText: string) => {
        const opts:IOption[] = genOptions(dashboard.keys);
        setOptions(
            !searchText ? [] : opts.filter(x=>x.value.toLowerCase().includes(searchText.toLowerCase())),
        );
    };

    const onSelect = (data: string) => {
        console.log('onSelect', data);
    };

    const onChange = (data: string) => {
        setKeyValue(data);
    };

    return (
        <>
            <Space direction={'vertical'} style={{width:'100%', marginTop:20}}>
                <Divider >Характеристики</Divider>
                {dashboard.potentialProperties.map(x=>
                    <>
                        <Row justify="space-around">
                            <Col span={4}>{x.keyId}</Col>
                            <Col span={4}>{x.value}</Col>
                            <Col span={4}>
                                <Button onClick={()=>handleDelete(x)}>Удалить</Button>
                            </Col>
                        </Row>
                        <Divider/>
                    </>
                )}
            </Space>
            <Space style={{justifyContent:'flex-end', width:'100%'}}>
                <Button style={{margin:'30px 0'}} onClick={showModal}>
                    Добавить
                </Button>
            </Space>
            <Modal
                title="Добавить характеристику"
                open={isModalOpen} onOk={handleOk}
                onCancel={handleCancel} okText={"Добавить"}
                cancelText={"Отмена"}>
                <div style={{display:"flex", flexDirection:'column', gap:"20px"}}>
                    <AutoComplete
                        value={keyValue}
                        options={options}
                        style={{ width: '100%' }}
                        onSelect={onSelect}
                        onSearch={onSearch}
                        onChange={onChange}
                        placeholder="Название"
                    />
                    <Input
                        placeholder={'Текст'}
                        onChange={e=>setText(e.target.value)}
                        value={text}/>
                </div>
            </Modal>
        </>
    );
};

export default observer(AddPropertyForm);
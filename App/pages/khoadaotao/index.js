import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Checkbox, DatePicker, message, List, Table, Divider } from 'antd';
import api from "../../api/khoaapi";
import moment from 'moment';
const App = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setState({ ...state, edit: false })
        setIsModalVisible(true);
    };

    useEffect(() => {
        api.getDetail().then(d => {
            setState({ ...state, data: d.list, total: d.total })
        })
    }, []);

    function onChangeSearch(e) {
        const { value, name } = e.target;
        api.getDetail({ search: value }).then(d => {
            setState({ ...state, data: d.list, total: d.total })
        })
    }


    const handleOk = (edit) => {
        // onFinish()
        if (edit) {
            api.suakhoadaotao({ ...state, bienChe: true }).then(d => {
                console.log(d, "đ")
                message.success("Sửa thành công")
                setIsModalVisible(false);
                api.getDetail().then(dd => {
                    setState({ ...state, data: dd.list, total: dd.total, edit: false })
                })

            }).catch(e => {
                console.log(e, "")
            })
        } else {
            api.sendkhoadaotao({ tenKhoa: state.tenKhoa, bienChe: true }).then(d => {
                console.log(d, "đ")
                message.success("Thêm thành công")
                setIsModalVisible(false);
                api.getDetail().then(dd => {
                    setState({ ...state, data: dd.list, total: dd.total, edit: false })
                })

            }).catch(e => {
                console.log(e, "")
            })
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const columns = [
        {
            title: 'Tên khoa',
            dataIndex: 'tenKhoa',
            key: 'tenKhoa',
            // render: text => <a>{text}</a>,
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'Action',
            // render: text => <a>{text}</a>,
            render: (text, record) => (
                <>
                    <button onClick={() => edit(record.id)}>
                        {"Sửa"}
                    </button>&nbsp;
                    <button onClick={() => remove(record.id)}>
                        {"Xóa"}
                    </button>
                </>
            ),
        },

    ];


    const remove = (id) => {
        api.xoakhoadaotao({ id }).then(d => {
            console.log(d, "đ")
            message.success("Xóa thành công")
            api.getDetail().then(d => {
                setState({ ...state, data: d.list, total: d.total, edit: false })
            })
        }).catch(e => {
            console.log(e, "")
        })
    }

    const edit = (id) => {
        setState({ ...state, edit: true })
        api.getId({ id }).then(d => {
            if (d) {
                console.log(d, "ff")
                setState({ ...state, ...d, edit: true })

            }
            setIsModalVisible(true);
        }).catch(e => {
            console.log(e, "")
        })
    }

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function onChange(e) {
        const { value, name } = e.target;
        setState({
            ...state,
            [name]: value,
        });
        console.log(`value = ${value}`);
        console.log(`name = ${name}`);
    }
    const [state, setState] = useState({
        data: [],
        currentData: null,
        edit: false
    });

    const data = state.data.map((x, k) =>
    ({
        key: k + "",
        tenKhoa: x.tenKhoa,
        id: x.id
    })
    )

    var data1 = []
    if (state.data) {
        data1 = state.data.map(x => (
            x
        ))
    }


    return (
        <div className='content' style={{ marginTop: 50 }}>
            <div style={{ display: "flex", justifyContent: "right", marginBottom: 20 }}>
                <Input onChange={onChangeSearch} placeholder="Search" />
                <Button type="primary" onClick={showModal} >
                    Thêm
                </Button>
            </div>
            <Table columns={columns} dataSource={data} />

            <Modal
                key={state?.id}
                title={state?.edit ? "Thêm khoa" : "Sửa khoa"}
                visible={isModalVisible}
                onOk={() => handleOk(state.edit)}
                onCancel={handleCancel}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    // initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên khoa"
                        name="ten"
                        rules={[{ required: true, message: 'Nhập tên khoa!' }]}
                    >
                        <Input defaultValue={state?.tenKhoa} name="tenKhoa" onChange={onChange} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
export default App;
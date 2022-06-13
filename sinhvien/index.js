import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Select, message, List, Table, Divider } from 'antd';
import api from "../../api/sinhvienapi";
import apikhoa from "../../api/khoaapi";
import moment from 'moment';
import DatePicker1 from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateTimePicker from "../../lib/datetimepicker";

const App = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [namDate, setnamDate] = useState(new Date());

    const showModal = () => {
        setState({
            data: [...state.data],
            edit: false,
            ngaySinh: new Date(),
            namHoc: new Date()
        })
        setIsModalVisible(true);
    };

    useEffect(() => {
        api.getDetail().then(d => {
            apikhoa.getDetail().then(dd => {
                setState({ ...state, data: d.list, total: d.total, dataKhoa: dd.list })
            })

        })

    }, []);

    const handleOk = (edit) => {
        // console.log(state, "state")
        let body = {
            // ghiChu: state.ghiChu,
            // gioiTinh: state.gioiTinh,
            // id: state.id,
            // khoaDaoTao: state.khoaDaoTao,
            // namHoc: state.namHoc,
            // ngaySinh: state.ngaySinh,
            // ngayTao: state.ngayTao,
            // tenSinhVien: state.tenSinhVien,
        }
        if (edit) {
            api.suasinhvien({ ...state, bienChe: true }).then(d => {
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
            api.sendsinhvien({ ...state, bienChe: true }).then(d => {
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
        console.log("handleCancel")
        api.getDetail().then(dd => {
            setState({ ...state, data: dd.list, total: dd.total, edit: false })
        })
        setIsModalVisible(false)
    };


    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'hoten',
            key: 'hoten',
            // render: text => <a>{text}</a>,
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'ngaysinh',
            key: 'ngaysinh',
        },
        {
            title: 'Giới tính',
            dataIndex: 'gioiTinh',
            key: 'gioiTinh',
        },
        {
            title: 'Năm học',
            dataIndex: 'namhoc',
            key: 'namhoc',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'ngaytao',
            key: 'ngaytao',
        },
        {
            title: 'Khoa đào tạo',
            dataIndex: 'khoadaotao',
            key: 'khoadaotao',
        },
        {
            title: 'Ghi chú',
            dataIndex: 'ghichu',
            key: 'ghichu',
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
        api.xoasinhvien({ id }).then(d => {
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
                // console.log(d, "ff")
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
        dataKhoa: [],
        currentData: null,
        edit: false,
        ngaySinh: new Date(),
        namHoc: new Date()
    });

    const handleChange = (value, name) => {
        console.log(value, "datae", name)
        // message.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
        // setDate(value);
        // if(name == "namHoc"){
        // setState({ ...state, [name]: value })
        // }
    };


    const handleChangeKhoa = (value) => {
        console.log(`selected ${value}`);
        setState({ ...state, khoaDaoTaoId: value })
    }

    const handleChangengaySinh = (value, name) => {
        setState({ ...state, ngaySinh: moment(value).toISOString() })
        setStartDate(value)
    };

    const handleChangenamhoc = (value, name) => {
        console.log(value, "value------")
        setState({ ...state, namHoc: moment(value).toISOString() })
        setnamDate(value)
    };

    var data1 = []
    if (state.data) {
        data1 = state.data.map(x => (
            x
        ))
    }

    // console.log(state.data, "state.data")
    const data = state.data.map((x, k) =>
    ({
        key: k + "",
        hoten: x.tenSinhVien,
        ngaysinh: moment(x.ngaySinh).format("DD/MM/YYYY"),
        gioiTinh: x.gioiTinh,
        chucvu: x.chucVu,
        namhoc: moment(x.namHoc).format("YYYY"),
        ngaytao: moment(x.ngayTao).format("DD/MM/YYYY"),
        donvi: x.donVi?.tenDonVi,
        khoadaotao: x.khoaDaoTao?.tenKhoa,
        chuyenmon: x.chuyenMon?.chuyenNganhTN,
        nghiepvu: x.nghiepVu?.tenNghiepVU,
        nhiemvu: x.nhiemVu?.tenNhiemVu,
        ghichu: x.ghiChu,
        id: x.id

    })
    )

    console.log(state, "dflkd==")

    return (
        <div className='content' style={{
            //  maxWidth: 1200, 
            marginTop: 50
        }}>
            <div style={{ display: "flex", justifyContent: "right", marginBottom: 20 }}>
                <Button type="primary" onClick={showModal} >
                    Thêm
                </Button>
            </div>
            <Table columns={columns} dataSource={data} />
            <Modal
                key={state?.id}
                title={!state.edit ? "Thêm sinh viên" : "Sửa sinh viên"}
                visible={isModalVisible}
                onOk={() => handleOk(state.edit)}
                onCancel={handleCancel}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên sinh viên"
                        name="ten"
                        rules={[{ required: true, message: 'Nhập tên sinh viên!' }]}
                    >
                        <Input defaultValue={state?.tenSinhVien} name="tenSinhVien" onChange={onChange} />
                    </Form.Item>

                    <Form.Item
                        label="Giới tính"
                        name="gioitinh"
                        rules={[{ required: true, message: 'Nhập giới tính!' }]}
                    >
                        <Input defaultValue={state?.gioiTinh} name="gioiTinh" onChange={onChange} />
                    </Form.Item>

                    <Form.Item
                        label="Năm học"
                        name="namhoc"
                        rules={[{ required: true, message: 'Nhập năm học!' }]}
                    >
                        <DatePicker1
                            dateFormat="yyyy"
                            selected={new Date(state.namHoc) || namDate}
                            onChange={(date, dateString) => handleChangenamhoc(date, dateString, 1)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Ngày sinh"
                        name="ngaysinh"
                        rules={[{ required: true, message: 'Nhập ngày sinh!' }]}
                    >

                        <DatePicker1
                            dateFormat="dd/MM/yyyy"
                            selected={new Date(state.ngaySinh) || startDate}
                            onChange={(date, dateString) => handleChangengaySinh(date, dateString, 1)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Ghi chú"
                        name="ghichu"
                    >
                        <Input defaultValue={state?.ghiChu} name="ghiChu" onChange={onChange} />
                    </Form.Item>
                    {
                        state?.dataKhoa && state?.dataKhoa.length > 0 &&
                        <Form.Item
                            label="Khoa"
                            name="khoa"
                        >

                            <Select style={{ width: 120 }} defaultValue={state?.khoaDaoTaoId} onChange={handleChangeKhoa}>
                                {
                                    state.dataKhoa.map(x => {
                                        return (
                                            <Option value={x.id}>{x.tenKhoa}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                    }
                </Form>
            </Modal>
        </div>
    );
};
export default App;
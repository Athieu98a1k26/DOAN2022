import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Checkbox, DatePicker, message, List, Table, Divider } from 'antd';
import api from "../../api/giangvienapi";
import moment from 'moment';
import DatePicker1 from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
            setState({ ...state, data: d.list, total: d.total })
        })
    }, []);

    const handleOk = (edit) => {
        // onFinish()
        if (edit) {
            api.suagiangvien({ ...state, bienChe: true }).then(d => {
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
            api.sendgiangvien({ ...state, bienChe: true }).then(d => {
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
            title: 'Chức vụ',
            dataIndex: 'chucvu',
            key: 'chucvu',
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
            title: 'Đơn vị',
            dataIndex: 'donvi',
            key: 'donvi',
        },
        {
            title: 'Chuyên môn',
            dataIndex: 'chuyenmon',
            key: 'chuyenmon',
        },
        {
            title: 'Nhiệm vụ',
            dataIndex: 'nhiemvu',
            key: 'nhiemvu',
        },
        {
            title: 'Nghiệp vụ',
            dataIndex: 'nghiepvu',
            key: 'nghiepvu',
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
        api.xoagiangvien({ id }).then(d => {
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

    const handleChangengaySinh = (value, name) => {
        setState({ ...state, ngaySinh: moment(value).toISOString() })
        setStartDate(value)
    };

    const handleChangenamhoc = (value, name) => {
        console.log(value, "value------")
        setState({ ...state, namHoc: moment(value).toISOString() })
        setnamDate(value)
    };

    const [state, setState] = useState({
        data: [],
        currentData: null,
        edit: false,
        ngaySinh: new Date(),
        namHoc: new Date()
    });
    const [date, setDate] = useState(null);
    const handleChange = (value, name) => {
        console.log(value, "datae", name)
        // message.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
        // setDate(value);
        // if(name == "namHoc"){
        setState({ [name]: value })
        // }
    };

    var data1 = []
    if (state.data) {
        data1 = state.data.map(x => (
            x
        ))
    }

    const data = state.data.map((x, k) =>
    ({
        key: k + "",
        hoten: x.tenGiangVien,
        ngaysinh: moment(x.ngaySinh).format("DD/MM/YYYY"),
        gioiTinh: x.gioiTinh,
        chucvu: x.chucVu,
        namhoc: moment(x.namHoc).format("YYYY"),
        ngaytao: moment(x.ngayTao).format("DD/MM/YYYY"),
        donvi: x.donVi?.tenDonVi,
        chuyenmon: x.chuyenMon?.chuyenNganhTN,
        nghiepvu: x.nghiepVu?.tenNghiepVU,
        nhiemvu: x.nhiemVu?.tenNhiemVu,
        ghichu: x.ghiChu,
        id: x.id

    })
    )

    console.log(state?.tenGiangVien, "statevv")

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
                title={!state.edit ? "Thêm giảng viên" : "Sửa giảng viên"}
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
                        label="Tên giảng viên"
                        name="ten"
                        rules={[{ required: true, message: 'Nhập tên giảng viên!' }]}
                    >
                        <Input defaultValue={state?.tenGiangVien} name="tenGiangVien" onChange={onChange} />
                    </Form.Item>

                    <Form.Item
                        label="Giới tính"
                        name="gioitinh"
                        rules={[{ required: true, message: 'Nhập giới tính!' }]}
                    >
                        <Input defaultValue={state?.gioiTinh} name="gioiTinh" onChange={onChange} />
                    </Form.Item>

                    <Form.Item
                        label="Chức vụ"
                        name="chucvu"
                        rules={[{ required: true, message: 'Nhập chức vụ!' }]}
                    >
                        <Input defaultValue={state?.chucVu} name="chucVu" onChange={onChange} />
                    </Form.Item>
                    <Form.Item
                        label="Biên chế"
                        name="bienche"
                    >
                        <Checkbox defaultValue={state?.bienChe ? true : false} name="bienChe" onChange={onChange}></Checkbox>

                    </Form.Item>


                    <Form.Item
                        label="Số đề tài"
                        name="detai"
                        rules={[{ required: true, message: 'Số đề tài!' }]}
                    >
                        <Input defaultValue={state?.soDeTai} name="soDeTai" type="number" onChange={onChange} />
                    </Form.Item>

                    <Form.Item
                        label="Khóa đào tạo"
                        name="daotao"
                        rules={[{ required: true, message: 'Nhập khóa đào tạo!' }]}
                    >
                        <Input defaultValue={state?.khoaDaoTao} name="khoaDaoTao" type="number" onChange={onChange} />
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
                </Form>
            </Modal>

        </div>
    );
};
export default App;
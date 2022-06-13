import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, DatePicker, message } from 'antd';

const App = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }

    const [date, setDate] = useState(null);
    const handleChange = value => {
        // message.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
        setDate(value);
    };

    return (
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
                label="Tên giảng viên"
                name="ten"
                rules={[{ required: true, message: 'Nhập tên giảng viên!' }]}
            >
                <Input onChange={onChange} />
            </Form.Item>

            <Form.Item
                label="Giới tính"
                name="gioitinh"
                rules={[{ required: true, message: 'Nhập giới tính!' }]}
            >
                <Input onChange={onChange} />
            </Form.Item>

            <Form.Item
                label="Chức vụ"
                name="chucvu"
                rules={[{ required: true, message: 'Nhập chức vụ!' }]}
            >
                <Input onChange={onChange} />
            </Form.Item>
            <Form.Item
                label="Biên chế"
                name="bienche"
            >
                <Checkbox onChange={onChange}></Checkbox>

            </Form.Item>


            <Form.Item
                label="Số đề tài"
                name="detai"
                rules={[{ required: true, message: 'Số đề tài!' }]}
            >
                <Input type="number" onChange={onChange} />
            </Form.Item>

            <Form.Item
                label="Khóa đào tạo"
                name="daotao"
                rules={[{ required: true, message: 'Nhập khóa đào tạo!' }]}
            >
                <Input type="number" onChange={onChange} />
            </Form.Item>
            <Form.Item
                label="Năm học"
                name="namhoc"
                rules={[{ required: true, message: 'Nhập năm học!' }]}
            >
                <DatePicker onChange={handleChange} />
            </Form.Item>
            <Form.Item
                label="Ngày sinh"
                name="ngaysinh"
                rules={[{ required: true, message: 'Nhập ngày sinh!' }]}
            >
                <DatePicker onChange={handleChange} />
            </Form.Item>


            <Form.Item
                label="Ghi chú"
                name="ghichu"
                rules={[{ required: true, message: 'Nhập ghi chú!' }]}
            >
                <Input onChange={onChange} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
export default App;
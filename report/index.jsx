import React, { useState, useEffect } from 'react';
import { Table, Tag, Space } from 'antd';
import api from "../../api/report";
import moment from 'moment';

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
        title: 'Học hàm',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Năm TN',
        dataIndex: 'namtn',
        key: 'namtn',
    },
    {
        title: 'Nơi TN',
        dataIndex: 'noitn',
        key: 'noitn',
    },
    {
        title: 'Nghiệp vụ',
        dataIndex: 'nghiepvu',
        key: 'nghiepvu',
    },
    {
        title: 'Chức vụ',
        dataIndex: 'chucvu',
        key: 'chucvu',
    },
    {
        title: 'Đơn vị',
        dataIndex: 'donvi',
        key: 'donvi',
    },
    {
        title: 'Nhiệm vụ',
        dataIndex: 'nhiemvu',
        key: 'nhiemvu',
    },
    {
        title: 'Ghi chú',
        dataIndex: 'ghichu',
        key: 'ghichu',
    },

];

// const data = [
//     {
//         key: '1',
//         hoten: 'John Brown',
//         ngaysinh: 32,
//         address: 'New York No. 1 Lake Park',
//         namtn: "2020",
//         noitn: "2020",
//         nghiepvu: "2020",
//         chucvu: "2020",
//         donvi: "2020",
//         nhiemvu: "2020",
//         ghichu: "2020",
//     }
// ];

const App = () => {

    const [state, setState] = useState({
        data: [],
        currentData: null,
        edit: false
    });

    useEffect(() => {
        api.getDetail().then(d => {
            setState({ ...state, data: d.list, total: d.total })
        })
    }, []);

    const data = state.data.map((x, k) =>
    ({
        key: k + "",
        hoten: x.tenGiangVien,
        ngaysinh: moment(x.ngaySinh).format("DD/MM/YYYY"),
        address: x.chuyenMon?.hocHam,
        namtn: moment(x.chuyenMon?.namTN).format("YYYY"),
        noitn: x.chuyenMon?.noiTN,
        nghiepvu: x.nghiepVu?.tenNghiepVU,
        chucvu: x.chucVu,
        donvi: x.donVi?.tenDonVi,
        nhiemvu: x.nhiemVu?.tenNhiemVu,
        ghichu: x.ghiChu,

    })
    )

    return (
        <Table columns={columns} dataSource={data} />
    )
}

export default App;
import React, { useState, useEffect } from 'react';
import api from "../../api/report";
import moment from 'moment';
import { Table, Tag, Space } from 'antd';

const { Column, ColumnGroup } = Table;


const App = () => {

    const [state, setState] = useState({
        data: [],
        currentData: null,
        edit: false
    });

    useEffect(() => {
        api.getdtbd().then(d => {
            setState({ ...state, data: d.list, total: d.total })
        })
    }, []);

    const data = state.data.map((x, k) =>
    ({
        key: k + "",
        TenGiangVien: x.tenGiangVien,
        TenDonVi: x.tenDonVi,
        TenKhoa: x.tenKhoa,
        Chucvu: x.chucVu,
        daotao: x.ketqua == "Đào tạo" ? "x" : "",
        boiduong: x.ketqua == "Bồi dưỡng" ? "x" : "",
    })
    )

    return (
        <Table dataSource={data}>
            <Column title="Họ và tên" dataIndex="TenGiangVien" key="TenGiangVien" />
            <Column title="Đơn vị công tác" dataIndex="TenDonVi" key="TenDonVi" />
            <Column title="Chức vụ" dataIndex="Chucvu" key="Chucvu" />
            <Column title="Tên khóa học" dataIndex="TenKhoa" key="TenKhoa" />
            <ColumnGroup title="Kết quả">
                <Column title="Đào tạo" dataIndex="daotao" key="daotao" />
                <Column title="Bồi dưỡng" dataIndex="boiduong" key="boiduong" />
            </ColumnGroup>
        </Table>
    )
}

export default App;
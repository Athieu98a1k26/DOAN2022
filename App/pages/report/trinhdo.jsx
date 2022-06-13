import React, { useState, useEffect } from 'react';
import { Table, Tag, Space } from 'antd';
import api from "../../api/report";
import moment from 'moment';

const columns = [
    {
        title: 'Năm học',
        dataIndex: 'namhoc',
        key: 'namhoc',
    },
    {
        title: 'Tổng cộng',
        dataIndex: 'tongcong',
        key: 'tongcong',
    },
    {
        title: 'Giáo sư',
        dataIndex: 'giaosu',
        key: 'giaosu',
    },
    {
        title: 'Phó giáo sư',
        dataIndex: 'phogiaosu',
        key: 'phogiaosu',
    },
    {
        title: 'Tiến sỹ',
        dataIndex: 'tiensy',
        key: 'tiensy',
    },
    {
        title: 'Thạc sỹ',
        dataIndex: 'thacsy',
        key: 'thacsy',
    },
    {
        title: 'Đại học',
        dataIndex: 'daihoc',
        key: 'daihoc',
    }

];

const App = () => {

    const [state, setState] = useState({
        data: [],
        currentData: null,
        edit: false
    });

    useEffect(() => {
        api.gettrinhdo().then(d => {
            setState({ ...state, data: d.list, total: d.total })
        })
    }, []);

    const data = state.data.map((x, k) =>
    ({
        key: k + "",
        namhoc: x.namhoc,
        tongcong: x.tongcong,
        giaosu: x.giaosu,
        phogiaosu: x.phogiaosu,
        thacsy: x.thacsy,
        tiensy: x.tiensy,
        thpt: x.thpt,
        daihoc: x.daihoc
    })
    )

    return (
        <Table columns={columns} dataSource={data} />
    )
}

export default App;
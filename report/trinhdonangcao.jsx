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
        api.gettrinhdonangcao().then(d => {
            setState({ ...state, data: d.list, total: d.total })
        })
    }, []);

    const data = state.data.map((x, k) =>
    ({
        key: k + "",
        namhoc: moment(x.namhoc).format("YYYY"),
        tongcong: x.tongcong,
        giaosu: x.giaosu,
        phogiaosu: x.phogiaosu,
        thacsy: x.thacsy,
        tiensy: x.tiensy,
        thacsy1: x.thacsy1,
        tiensy1: x.tiensy1,
    })
    )

    return (
        <Table dataSource={data}>
            <Column title="Năm" dataIndex="namhoc" key="namhoc" />
            <ColumnGroup title="Số lượng cử đi đào tạo">
                <Column title="Tiến sỹ" dataIndex="tiensy" key="tiensy" />
                <Column title="Thạc sỹ" dataIndex="thacsy" key="thacsy" />
            </ColumnGroup>
            <ColumnGroup title="Số tốt nghiệp">
                <Column title="Tiến sỹ" dataIndex="tiensy1" key="tiensy1" />
                <Column title="Thạc sỹ" dataIndex="thacsy1" key="thacsy1" />
            </ColumnGroup>
            <Column title="Ghi chú" dataIndex="ghichu" key="ghichu" />
        </Table>
    )
}

export default App;
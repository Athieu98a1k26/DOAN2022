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
        api.getdanhgia().then(d => {
            setState({ ...state, data: d.list, total: d.total })
        })
    }, []);

    const data = state.data.map((x, k) =>
    ({
        key: k + "",
        namhoc: moment(x.namhoc).format("YYYY"),
        xuatsac: x.xuatsac,
        tot: x.tot,
        hoanthanh: x.hoanthanh,
        khoanthanh: x.khoanthanh,
        khongxet: x.khongxet,
        cstdn: x.cstdn,
        cstdncs: x.cstdncs,
        ldtt: x.ldtt,
        bk: x.bk,
        gk: x.gk,
    })
    )

    return (
        <Table dataSource={data}>
            <Column title="Năm" dataIndex="namhoc" key="namhoc" />
            <ColumnGroup title="Kết quả phân loại viên chức">
                <Column title="Hoàn thành xuất sắc NV" dataIndex="xuatsac" key="xuatsac" />
                <Column title="Hoàn thành tốt NV" dataIndex="tot" key="tot" />
                <Column title="Hoàn thành NV" dataIndex="hoanthanh" key="hoanthanh" />
                <Column title="Không hoàn thành NV" dataIndex="khoanthanh" key="khoanthanh" />
                <Column title="Không xét" dataIndex="khongxet" key="khongxet" />
            </ColumnGroup>
            <ColumnGroup title="Kết quả thi đua">
                <Column title="CSTDN" dataIndex="cstdn" key="cstdn" />
                <Column title="CSTDCS" dataIndex="cstdncs" key="cstdncs" />
                <Column title="LDTT" dataIndex="ldtt" key="ldtt" />
            </ColumnGroup>
            <ColumnGroup title="Khen thưởng">
                <Column title="BK" dataIndex="bk" key="bk" />
                <Column title="GK" dataIndex="gk" key="gk" />
            </ColumnGroup>
        </Table>
    )
}

export default App;
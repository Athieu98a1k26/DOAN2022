import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from '../../lib/connect';
import { toggleSidebar } from '../../actions/app';
import qs from 'qs';
import classnames from 'classnames';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const menu = (
    <Menu>
        <Menu.Item>
            <Link to='/'>Giảng viên</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/report'>CBQL</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/donvi'>Đơn vị</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/chuyenmon'>Chuyên môn</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/nhiemvu'>Nhiệm vụ</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/nghiepvu'>Nghiệp vụ</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/daotao'>Khóa đào tạo</Link>
        </Menu.Item>
        {
            /**
        <Menu.Item>
            <Link to='/nhiemvu'>Nhiệm vụ</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/nghiepvu'>Nghiệp vụ</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/donvi'>Đơn vị</Link>
        </Menu.Item>
        <Menu.Item>
            <Link to='/chuyenmon'>Chuyên môn</Link>
        </Menu.Item>
         */
        }

    </Menu>
);

const menu1 = () => {
    return (
        <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                Menu <DownOutlined />
            </a>
        </Dropdown>
    )
};

export default menu1;
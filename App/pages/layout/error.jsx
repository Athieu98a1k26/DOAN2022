import React from 'react';
import { Link } from 'react-router-dom';

export default class ErrorPage extends React.Component {
    render() {
        return (
            <section className="error" style={this.props.inner ? { height: 'auto' } : null}>
                <div className="error__inner">
                    <h1>{this.props.error}</h1>
                    <h2>{this.props.message}</h2>
                    <br />
                    <Link to="/">Về trang chủ</Link> | <Link to="/logout">Đăng xuất</Link>
                </div>
            </section>
        );
    }
}
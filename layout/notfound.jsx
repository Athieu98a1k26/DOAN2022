import React from 'react';

export default class NotFoundPage extends React.Component {
    render() {
        return (
            <section className="error">
                <div className="error__inner">
                    <h1>404</h1>
                    <h2>Trang bạn đang truy cập không tồn tại!</h2>
                </div>
            </section>
        );
    }
}
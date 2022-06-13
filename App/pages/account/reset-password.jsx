import React from 'react';
import TextField from '../../controls/input2';
import Button from '../../controls/button';
import Checkbox from '../../controls/checkbox';
import Icon from '../../controls/icon';
import Dropdown from '../../controls/dropdown';
import Loading from '../../controls/loading';
import LoginWrap from './login-wrap';
import { validateComponent } from '../../lib/validate';
import qs from 'qs';

import { connect } from '../../lib/connect';
import * as actions from '../../actions/account';

class ResetPasswordPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            newPassword: "",
            rePassword: "",
            msg: "",
            error: false
        }

        var params = qs.parse(props.location.search.replace(/^\?/, ''));

        console.log(props, params);
        this.email = params.email;
        this.code = params.code;

    }

    componentWillMount() {
        if (this.props.account.loggedIn) {
            this.redirect('/');
        }
        if (!this.email || !this.code) {
            this.setState({ msg: 'Đường dẫn khôi phục không đúng', error: true });
        }
    }

    componentDidMount() {
        if (this.newPassword) {
            this.newPassword.focus();
        }
    }

    reset = () => {
        let ok = this.newPassword.validate() && this.rePassword.validate();
        if (ok) {
            this.setState({ loading: true });
            this.props.actions.resetPassword(this.email, this.code, this.state.newPassword)
                .then(data => {
                    this.redirect('/login');
                    notify('Đổi mật khẩu thành công');
                })
                .catch(({ error, message }) => {
                    this.setState({ msg: message, loading: false });
                })
        }
    }


    onKeyPress = (e) => {
        if (e.charCode == 13) {
            this.reset();
        }
    }

    render() {
        return (
            <LoginWrap>
            <div className="login" style={{ height: '100vh', overflow: 'hidden' }}>
                <div className='login__block active'>
                    <div className="login__block__header">
                        <Icon name="account-circle" />
                        <span>Nhập mật khẩu mới của bạn</span>

                        <div className="actions actions--inverse login__block__actions">
                            <Dropdown button={<Icon name="more-vert" className="actions__item" />}>
                                <Dropdown.Item href="/login" link>Đăng nhập</Dropdown.Item>
                            </Dropdown>
                        </div>
                    </div>

                    <div className="login__block__body">
                        {
                            this.state.msg && (
                                <p className="mt-4 text-danger">{this.state.msg}</p>
                            )
                        }

                        {
                            !this.state.error && (
                                <div>
                                    <TextField
                                        type="password"
                                        ref={ref => this.newPassword = ref}
                                        value={this.state.newPassword}
                                        onChange={text => this.setState({ newPassword: text })}
                                        label='Mật khẩu mới'
                                        required
                                    />
                                    <TextField
                                        type="password"
                                        ref={ref => this.rePassword = ref}
                                        value={this.state.rePassword}
                                        onChange={text => this.setState({ rePassword: text })}
                                        label='Xác nhận mật khẩu'
                                        required
                                        onKeyPress={this.onKeyPress}
                                        validation={{
                                            pattern: new RegExp("^" + this.state.newPassword + "$"),
                                            message: 'Mật khẩu không khớp'
                                        }}
                                    />
                                    <Loading padding={10} show={this.state.loading} type="inline" />
                                    {
                                        !this.state.loading && (
                                            <Button text='Đổi mật khẩu' onClick={this.reset} />
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            </LoginWrap>
        );
    }
}

export default connect(ResetPasswordPage, state => ({
    account: state.account,
}), actions);
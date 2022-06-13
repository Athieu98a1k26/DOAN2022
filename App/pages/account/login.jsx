import React, { Component } from 'react';
import TextField from '../../controls/input2';
import Button from '../../controls/button';
import Icon from '../../controls/icon';
import Loading from '../../controls/loading';
import logo from '../../asset/img/logo-w.png';
import LoginWrap from './login-wrap';

import { validateComponent } from '../../lib/validate';
import { connect } from '../../lib/connect';
import * as actions from '../../actions/account';

class FormLogin extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            loading: false,
            username: "",
            password: "",
            email: "",
            msg: props.account.logoutMessage,
            remember: false,
            box: 'login',
            resetOK: false,
            recaptchKey: Date.now()
        }
    }

    componentWillMount() {
        if (this.props.account.loggedIn) {
            console.log(this.props);
            let state = this.props.location.state;
            if (state && state.from && state.from != "/logout") {
                this.redirect({ pathname: state.from, search: state.search });
            }
            else {
                this.redirect("/");
            }
        }
    }

    componentDidMount() {
        if (
            (this.props.account.token && this.props.account.loggedIn)
        ) {
            this.redirect("/");
        }
        console.log('login did mount')
        if (this.refs.username) {
            this.refs.username.focus();
        }
    }

    switchBox = box => {
        this.setState({
            box,
            msg: "",
            username: "",
            password: "",
            email: "",
            resetOK: false,
            loading: false
        });
    }

    login = () => {
        let ok = validateComponent(this);
        if (ok) {
            this.setState({ loading: true });
            this.props.actions
                .login(this.state.username, this.state.password, this.state.remember)
                .catch(error => {
                    this.setState({ msg: error.message, loading: false, recaptchKey: Date.now() });
                })
        }
    }

    resetPassword = () => {
        if (this.email.validate()) {
            this.setState({ loading: true });
            this.props.actions.resetPassword(this.state.email)
                .then(data => {
                    this.setState({ resetOK: true });
                })
                .catch(error => {
                    this.setState({ msg: error.message, loading: false });
                })
        }
    }

    onKeyPress = (e) => {
        if (e.charCode == 13) {
            this.login();
        }
    }

    render() {
        return (
            <LoginWrap>
                <div className="login" style={{ height: '100vh', overflow: 'hidden' }}>
                    <div className={`login__block ${this.state.box == 'login' ? 'active' : ''}`}>
                        <div className="login__block__header">
                            <h2 className="text-white">Login</h2>
                        </div>

                        <div className="login__block__body">
                            {
                                this.state.msg && (
                                    <p className="mt-4 text-danger">{this.state.msg}</p>
                                )
                            }
                            <TextField
                                onKeyPress={this.onKeyPress}
                                ref="username"
                                value={this.state.username}
                                onChange={text => this.setState({ username: text })}
                                label='Tên đăng nhập'
                                required
                                requiredMessage='Tên đăng nhập là trường bắt buộc'
                            />
                            <TextField
                                type="password"
                                ref="password"
                                value={this.state.password}
                                onChange={text => this.setState({ password: text })}
                                label='Mật khẩu'
                                required
                                requiredMessage='Mật khẩu là trường bắt buộc'
                                onKeyPress={this.onKeyPress}
                            />
                            <br />

                            <Loading padding={10} show={this.state.loading} type="inline" />
                            {
                                !this.state.loading && (
                                    <Button icon="check" text='Đăng nhập' onClick={this.login} />
                                )
                            }
                            <br />
                        </div>
                    </div>

                </div>
            </LoginWrap>
        );
    }
}

export default connect(FormLogin, state => ({
    account: state.account,
}), actions);
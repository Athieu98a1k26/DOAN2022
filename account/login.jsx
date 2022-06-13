import React, { Component } from 'react';
import TextField from '../../controls/input2';
import Button from '../../controls/button';
import Icon from '../../controls/icon';
import Loading from '../../controls/loading';
import logo from '../../asset/img/logo-w.png';
import LoginWrap from './login-wrap';
import ReCAPTCHA from 'react-google-recaptcha';

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

        if (!this.state.recaptcha) {
            return this.setState({ captchaInvalid: true });
        }

        this.setState({ captchaInvalid: false });

        if (ok) {
            this.setState({ loading: true });
            this.props.actions
                .login(this.state.username, this.state.password, this.state.remember, this.state.recaptcha)
                .catch(error => {
                    if (error.type == 'http') {
                        this.setState({ msg: error.error, loading: false, recaptchKey: Date.now() });
                        console.warn('login error', error.message);
                    }
                    else {
                        this.setState({ msg: error.message, loading: false, recaptchKey: Date.now() });
                    }
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
                            <h2 className="text-white">RWS</h2>
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

                            <div className="form-group">
                                <ReCAPTCHA
                                    ref="recaptcha"
                                    key={this.state.recaptchKey}
                                    sitekey="6LdoKmcUAAAAAHNaKBwAzQm3dD5bsT5IcI4KkMIv"
                                    onChange={text => this.setState({ recaptcha: text })}
                                />
                                {
                                    this.state.captchaInvalid && !this.state.recaptcha &&
                                    <small className="text-red d-block">Bạn chưa tick vào captcha</small>
                                }
                            </div>
                            <br />

                            <Loading padding={10} show={this.state.loading} type="inline" />
                            {
                                !this.state.loading && (
                                    <Button icon="check" text='Đăng nhập' onClick={this.login} />
                                )
                            }
                            <br />
                            <div className="mt-4 text-center">
                                <a href="#" onClick={(e) => { e.preventDefault(); this.switchBox('reset') }}>Bạn quên mật khẩu?</a>
                            </div>



                        </div>
                    </div>
                    <div className={`login__block ${this.state.box == 'reset' ? 'active' : ''}`}>
                        <div className="login__block__header">
                            <h2 className="text-white">RWS</h2>
                        </div>

                        {
                            this.state.resetOK ? (
                                <div className="login__block__body">
                                    <p className="mt-4 text-success">Vui lòng kiểm tra hộp thư đến của bạn và thực hiện theo các bước hướng đẫn để lấy lại mật khẩu.</p>
                                    <Button icon="arrow-left" text='Đăng nhập' onClick={() => this.switchBox('login')} />
                                </div>
                            ) : (
                                <div className="login__block__body">
                                    <p className="mt-4">Điền email để khôi phục mật khẩu.</p>
                                    {
                                        this.state.msg && (
                                            <p className="mt-4 text-danger">{this.state.msg}</p>
                                        )
                                    }
                                    <TextField
                                        type="email"
                                        ref={ref => this.email = ref}
                                        value={this.state.email}
                                        onChange={text => this.setState({ email: text })}
                                        label='Email address'
                                        required
                                        requiredMessage='Email là trường bắt buộc'
                                    />
                                    <br />
                                    <div className="row mt-3 align-items-center">
                                        <div className="col-md-6 text-left">
                                            <a href="#" onClick={(e) => { e.preventDefault(); this.switchBox('login') }}><Icon name="long-arrow-return" className="mr-1 align-middle" />Đăng nhập</a>
                                        </div>
                                        <div className="col-md-6 text-right">
                                            <Loading padding={10} show={this.state.loading} type="inline" />
                                            {
                                                !this.state.loading && (
                                                    <Button icon="check" text='Lấy lại mật khẩu' onClick={this.resetPassword} />
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </div>
            </LoginWrap>
        );
    }
}

export default connect(FormLogin, state => ({
    account: state.account,
}), actions);
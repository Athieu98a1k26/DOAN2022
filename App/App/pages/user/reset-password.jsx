import React from 'react';
import Button from '../../controls/button';
import TextField from '../../controls/input2';
import Modal from '../../controls/modal2';
import Loading from '../../controls/loading';
import { connect } from '../../lib/connect';
import * as actions from '../../actions/user';
import { validateComponent } from '../../lib/validate';

class ResetPasswordForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            model: {
                id: 0,
                password: '',
                rePassword: ''
            },
            loading: false
        }
    }

    componentWillReceiveProps(props) {
        if (props.model) {
            this.setState(
                {
                    model: {
                        id: props.model.id,
                        password: '',
                        rePassword: ''
                    }
                }
            )
        }
    }

    setValue = data => {
        this.setState({
            model: { ...this.state.model, ...data }
        });
    }

    handleClose = () => {
        if (this.props.onRequestClose) {
            this.props.onRequestClose();
        }
    }

    handleSubmit = () => {
        let ok = validateComponent(this);

        if (ok) {
            this.setState({ loading: true });
            this.props.actions.changePassword(this.state.model)
                .then(data => {
                    this.setState({ loading: false });
                    this.handleClose();
                    notify('Đổi mật khẩu thành công');
                })
                .catch(error => {
                    this.setState({ loading: false });
                    alert(error.error, error.message, 'error');
                });
        }
    }

    render() {
        const buttons = this.state.loading ? [
            <Loading show={true} type="inline" />
        ] : [
                <Button
                    text='Hủy'
                    type="link"
                    onClick={this.handleClose}
                />,
                <Button
                    text='Cập nhật'
                    onClick={this.handleSubmit}
                />,
            ];
        return (
            <Modal
                show={this.props.open}
                onRequestClose={this.handleClose}
                title="ĐỔI MẬT KHẨU"
                buttons={buttons}>

                <TextField
                    ref="password"
                    type="password"
                    value={this.state.model.password}
                    onChange={text => this.setValue({ password: text })}
                    label='Mật khẩu mới'
                    required
                />
                <TextField
                    ref="rePassword"
                    type="password"
                    value={this.state.model.rePassword}
                    onChange={text => this.setValue({ rePassword: text })}
                    validation={{
                        pattern: new RegExp("^" + this.state.model.password + "$"),
                        message: 'Mật khẩu không khớp'
                    }}
                    label='Xác nhận mật khẩu'
                    required
                />
            </Modal>
        );
    }
}

export default connect(ResetPasswordForm, null, actions);
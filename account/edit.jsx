import React from 'react';
import Button from '../../controls/button';
import TextField from '../../controls/input2';
import Modal from '../../controls/modal2';
import Loading from '../../controls/loading';
import Select from '../../controls/select2';
import DatePicker from '../../controls/datetimepicker';
import { connect } from '../../lib/connect';
import * as actions from '../../actions/account';

import { validateComponent } from '../../lib/validate';

class EditForm extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            model: {
                ...props.user
            },
            loading: false
        }
    }

    componentWillReceiveProps(props) {
        this.setState(
            {
                model: {
                    ...props.user
                }
            }
        )
    }

    setValue = data => {
        this.setState({
            model: { ...this.state.model, ...data }
        });
    }

    handleClose = () => {
        this.redirect('/account');
    }

    handleSubmit = () => {
        let ok = validateComponent(this); //validate inputs

        if (ok) {
            this.setState({ loading: true });
            this.state.model.fullName = this.state.model.lastName + " " + this.state.model.firstName;
            this.props.actions.updateProfile(this.state.model)
                .then(data => {
                    this.setState({ loading: false });
                    this.handleClose();
                    notify('Cập nhật thành công');
                })
                .catch(error => {
                    this.setState({ loading: false });
                    alert(error.error, error.message, 'error');
                });
        }
    }

    render() {
        console.log(this.props.model);
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
                show={true}
                onRequestClose={this.handleClose}
                title="Update account"
                buttons={buttons}>

                <TextField
                    ref="fullname"
                    value={this.state.model.fullName}
                    onChange={text => this.setValue({ fullName: text })}
                    label='Họ tên'
                    required
                />

                <TextField
                    ref="email"
                    type="email"
                    value={this.state.model.email}
                    onChange={text => this.setValue({ email: text })}
                    label='Email'
                    required
                />

                <TextField
                    ref="phone"
                    type="tel"
                    value={this.state.model.phone}
                    onChange={text => this.setValue({ phone: text })}
                    label='Điện thoại'
                />

                <TextField
                    ref="description"
                    value={this.state.model.description}
                    onChange={text => this.setValue({ description: text })}
                    label='Giới thiệu'
                    multiline
                />

            </Modal>
        );
    }
}

export default connect(EditForm, state => ({
    user: state.account.user
}), actions);
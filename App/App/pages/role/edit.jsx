import React from 'react';
import Button from '../../controls/button';
import TextField from '../../controls/input2';
import Modal from '../../controls/modal2';
import Loading from '../../controls/loading';
import Select from '../../controls/select2';

import { connect } from '../../lib/connect';
import * as actions from '../../actions/role';

import { validateComponent } from '../../lib/validate';

class EditForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            model: {
                ...this.props.model
            },
            loading: false
        }
    }

    componentWillReceiveProps(props) {
        this.setState(
            {
                model: {
                    ...props.model
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
        if (this.props.onRequestClose) {
            this.props.onRequestClose();
        }
    }

    handleSubmit = () => {
        let ok = validateComponent(this);

        if (ok) {
            this.setState({ loading: true });
            this.props.actions.update(this.state.model)
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
        if (!this.props.open || !this.props.model) return null;

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
                title="Cập nhật role"
                buttons={buttons}>

                <TextField
                    ref="name"
                    value={this.state.model.name}
                    onChange={text => this.setValue({ name: text })}
                    label='Tên'
                    required
                />

                <TextField
                    ref="description"
                    value={this.state.model.description}
                    onChange={text => this.setValue({ description: text })}
                    label='Mô tả'
                    multiline
                />

                <Select
                    required
                    ref="status"
                    label='Trạng thái'
                    value={this.state.model.status}
                    onChange={option => this.setValue({ status: option })}
                    options={this.props.status}
                />
            </Modal>
        );
    }
}

export default connect(EditForm, state => ({
    status: state.app.enums.identityStatus,
    role: state.role
}), actions);
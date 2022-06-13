import React from 'react';
import Button from '../../controls/button';
import TextField from '../../controls/input2';
import Modal from '../../controls/modal2';
import Loading from '../../controls/loading';
import Select from '../../controls/select2';

import { connect } from '../../lib/connect';
import * as actions from '../../actions/role';

import { validateComponent } from '../../lib/validate';

class CreateForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.initState();
    }

    initState = () => ({
        model: {
            description: ''
        },
        loading: false
    })

    setValue = data => {
        this.setState({
            model: { ...this.state.model, ...data }
        });
    }

    handleClose = () => {
        if (this.props.onRequestClose) {
            this.props.onRequestClose();
        }
        this.setState(this.initState());
    }

    handleSubmit = () => {
        let ok = validateComponent(this);

        if (ok) {
            this.setState({ loading: true });
            this.props.actions.create(this.state.model)
                .then(data => {
                    this.handleClose();
                    notify('Thêm mới thành công');
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
                    text='Thêm mới'
                    onClick={this.handleSubmit}
                />,
            ];

        return (
            <Modal
                show={this.props.open}
                onRequestClose={this.handleClose}
                title="Thêm role mới"
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
            </Modal>
        );
    }
}

export default connect(CreateForm, state => ({
    role: state.role
}), actions);
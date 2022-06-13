import React from 'react';
import Button from '../../controls/button';
import TextField from '../../controls/input2';
import Modal from '../../controls/modal2';
import Loading from '../../controls/loading';
import Select from '../../controls/select2';
import { connect } from '../../lib/connect';
import * as actions from '../../actions/user';
import { validateComponent } from '../../lib/validate';
import RoleCheckList from './role-checklist';
import UserSelect from '../../components/userselect';

class EditForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            model: {},
            loading: false
        }
    }

    componentWillReceiveProps(props) {
        if (props.model) {
            this.setState(
                {
                    model: {
                        ...props.model,
                        roleIds: props.model.roles.map(r => r.id)
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
        let ok = validateComponent(this); //validate inputs

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
        if (!this.props.model) return null;

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

        let parentRoleId = null;
        if (this.state.model.roleIds) {
            const role = this.props.role.items.find(item => this.state.model.roleIds.contains(item.id));
            if (role) {
                if (role.name == "Leader") {
                    parentRoleId = this.props.role.items.find(item => item.name == "Regional Leader").id;
                }
                else if (role.name == "Publisher") {
                    parentRoleId = this.props.role.items.find(item => item.name == "Leader").id;
                }
            }
        }

        console.log(this.state.model)

        return (
            <Modal
                show={this.props.open}
                onRequestClose={this.handleClose}
                title="Cập nhật người dùng"
                size="full"
                buttons={buttons}>

                <div className="row">
                    <div className="col-4">
                        <RoleCheckList
                            value={this.state.model.roleIds[0]}
                            onChange={id => this.setValue({ roleIds: [id] })} />
                    </div>
                    <div className="col-8">
                        <div className="row">
                            <div className="col-12">
                                <label>Thông tin tài khoản</label>
                                <hr />
                            </div>
                            <div className="col-md-6">
                                <TextField
                                    ref="userName"
                                    value={this.state.model.userName}
                                    onChange={text => this.setValue({ userName: text })}
                                    label='Tên đăng nhập'
                                    required
                                />
                                <TextField
                                    ref="fullName"
                                    value={this.state.model.fullName}
                                    onChange={text => this.setValue({ fullName: text })}
                                    label='Họ tên'
                                    required
                                />

                                {
                                    parentRoleId &&
                                    <UserSelect
                                        ref="uselect"
                                        value={this.state.model.parentId}
                                        onChange={id => this.setValue({ parentId: id })}
                                        label='Cấp trên'
                                        clearable={true}
                                        filter={{ roleIds: [parentRoleId] }}
                                    />
                                }
                            </div>
                            <div className="col-md-6">
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
                                <Select
                                    required
                                    ref="status"
                                    label='Trạng thái'
                                    value={this.state.model.status}
                                    onChange={option => this.setValue({ status: option })}
                                    options={this.props.status}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </Modal>
        );
    }
}

export default connect(EditForm, state => ({
    status: state.app.enums.identityStatus,
    role: state.role
}), actions);
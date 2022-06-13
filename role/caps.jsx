import React from 'react';
import Button from '../../controls/button';
import TextField from '../../controls/input2';
import Modal from '../../controls/modal2';
import Loading from '../../controls/loading';
import Select from '../../controls/select2';
import Tabs from '../../controls/tabs';
import Checkbox from '../../controls/checkbox';
import CheckboxList from '../../controls/checkboxlist';

import { connect } from '../../lib/connect';
import * as actions from '../../actions/role';

import { validateComponent } from '../../lib/validate';

class CapsFrom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            caps: props.model ? props.model.caps : [],
            loading: false,
            tabIndex: 0
        }
    }

    componentDidMount() {
        if (this.props.role.caps.length == 0) {
            this.props.actions.getCaps();
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ caps: props.model ? props.model.caps : [] });
    }

    handleClose = () => {
        if (this.props.onRequestClose) {
            this.props.onRequestClose();
        }
    }

    handleChecked = (checked, cap) => {
        if (checked) {
            this.setState({ caps: [...this.state.caps, cap] });
        }
        else {
            this.setState({ caps: this.state.caps.filter(c => c != cap) });
        }
    }

    handleCheckedAll = (checked, items) => {
        const caps = items.map(item => item.value);

        if (checked) {
            this.setState({ caps: [...this.state.caps, ...caps] });
        }
        else {
            this.setState({ caps: this.state.caps.filter(c => !caps.contains(c)) });
        }
    }

    handleSubmit = () => {
        this.setState({ loading: true });
        this.props.actions.updateCaps(this.props.model.id, this.state.caps)
            .then(data => {
                this.setState({ loading: false });
                notify('Cập nhật thành công');
                this.handleClose();
            })
            .catch(error => {
                alert(error.error, error.message);
                this.setState({ loading: false })
            })
    }

    render() {
        if (!this.props.open || !this.props.model) return null;

        const buttons = this.state.loading ? [
            <Loading show={true} type="inline" />
        ] : [
                <Button
                    text='Đóng'
                    type="link"
                    onClick={this.handleClose}
                />,
                <Button
                    text='Cập nhật'
                    onClick={this.handleSubmit}
                />,
            ];

        const tabs = [
            {
                title: 'Người dùng',
                key: 'user',
                groups: ['User', 'Role']
            },
            {
                title: 'Thiết lập',
                key: 'options',
                groups: ['Options']
            }
        ];

        return (
            <Modal
                show={this.props.open}
                onRequestClose={this.handleClose}
                title="Phân quyền"
                size="large"
                buttons={buttons}>

                <Tabs
                    routes={tabs}
                    index={this.state.tabIndex}
                    onIndexChange={(index) => this.setState({ tabIndex: index })}
                    renderScene={this.renderTabScene}
                />
            </Modal>
        );
    }

    renderTabScene = route => {
        return (
            <div className="row">
                {
                    route.groups.map(prefix => {
                        let items = this.props.role.caps
                            .filter(cap => cap.indexOf(prefix + ".") > -1)
                            .map(cap => ({
                                value: cap,
                                label: cap
                            }))

                        if (items.length == 0) return null;

                        let options = items.map(item => ({
                            ...item,
                            key: item.value,
                            checked: this.state.caps.contains(item.value),
                            onChange: checked => this.handleChecked(checked, item.value)
                        }));

                        let checkedCount = options.count(item => item.checked);

                        return (
                            <div className="col-3 border p-0 m-3" key={prefix}>
                                <div className="border-bottom p-2 bg-light">
                                    <Checkbox
                                        label={prefix}
                                        checked={items.length == checkedCount}
                                        onChange={checked => this.handleCheckedAll(checked, items)} />
                                </div>
                                <div className="p-2">
                                    {
                                        options.map(item => (
                                            <Checkbox {...item} />
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default connect(CapsFrom, state => ({
    status: state.app.enums.identityStatus,
    role: state.role
}), actions);
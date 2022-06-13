import moment from 'moment';
import React from 'react';
import * as actions from '../../actions/user';
import Actions from '../../controls/actions';
import Card from '../../controls/card2';
import Radio from '../../controls/radio';
import ListView from '../../controls/listview';
import Loading from '../../controls/loading';
import Pagination from '../../controls/pagination';
import Toolbar from '../../controls/toolbar';
import Tooltip from '../../controls/tooltip';
import { connect } from '../../lib/connect';
import CreateForm from './create';
import EditForm from './edit';
import ResetPassword from './reset-password';

class UserPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            loading: false,
            openCreate: false,
            currentEditItem: null,
            currentDeleteItemId: null,
            filter: {
                page: 1,
                pageSize: 50,
                search: '',
            }
        }
    }

    componentDidMount() {
        if (!this.props.user.loaded) {
            this.refresh();
        }
        else {
            this.props.actions.getList(this.state.filter);
        }
    }

    refresh = () => {
        this.applyFilter({});
    }

    applyFilter = (filter) => {
        filter = { ...this.state.filter, ...filter };

        this.setState({ loading: true, filter });

        this.props.actions.getList(filter)
            .catch(({ error, message }) => {
                notify(message, 'danger');
                this.setState({ loading: false });
            })
            .then(() => {
                this.setState({ loading: false });
            });
    }

    edit = (item) => {
        this.setState({ currentEditItem: item, box: "edit" });
    }

    delete = (item) => {
        confirm('Bạn có chắc chắn muốn xóa không?').then(ok => {
            if (ok) {
                this.setState({ currentDeleteItemId: item.id });
                this.props.actions.remove(item.id)
                    .then(() => {
                        notify('Xóa thành công');
                        this.setState({ currentDeleteItemId: null });
                    })
                    .catch(error => {
                        alert(error.error, error.message, 'danger');
                        this.setState({ currentDeleteItemId: null });
                    });
            }
        });
    }

    resetPassword = (item) => {
        this.setState({ currentEditItem: item, box: "reset" });
    }

    onPageChange = page => {
        this.applyFilter({ page });
    }

    onSearch = search => {
        this.applyFilter({ search });
    }



    render() {
        const canCreate = this.context.user.hasCap("User.Create");
        const canEdit = this.context.user.hasCap("User.Edit");
        const canDelete = this.context.user.hasCap("User.Delete");
        const canChangePassword = this.context.user.hasCap("User.ResetPassword");
        let actionsItems = [];
        if (canCreate) {
            actionsItems.push({ text: "Thêm người dùng", icon: 'plus', onClick: () => this.setState({ openCreate: true }) });
        }
        actionsItems = [
            ...actionsItems,
            {
                icon: 'dots-vertical',
                menuItems: [
                    { text: 'Làm mới', onClick: this.refresh }
                ]
            }
        ]
        return (
            <div>
                <Toolbar title='Quản lý người dùng'
                    inner
                    onSearch={this.onSearch}
                    actions={actionsItems}
                />

                <Card padding={0}>
                    <table className="table">
                        <thead >
                            <tr>
                                <th>#</th>
                                <th>Tài khoản</th>
                                <th>Họ tên</th>
                                <th>Vai trò</th>
                                <th>Ngày tạo</th>
                                <th>Trạng thái</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.user.items.map((item, index) => (
                                    <tr key={item.id} className={item.status == 3 ? 'del' : ''}>
                                        <td>{index + 1}</td>
                                        <td>{item.userName}</td>
                                        <td>{item.fullName}</td>
                                        <td>
                                            {
                                                item.status != 3 && item.roles.map(r => (
                                                    <span className="badge badge-info" style={{ marginRight: 5 }}>{r.name}</span>
                                                ))
                                            }
                                        </td>
                                        <td>{moment(item.joinDate).format("L")}</td>
                                        <td>{getEnumLabel(item.status, this.props.status)}</td>
                                        <td className="td-actions">
                                            <Loading type="inline" show={this.state.currentDeleteItemId == item.id} />
                                            {
                                                this.state.currentDeleteItemId != item.id && item.status != 3 && (
                                                    <Actions actions={[
                                                        {
                                                            icon: 'dots-vertical',
                                                            menuItems: [
                                                                { text: 'Sửa', icon: 'pencil', onClick: () => this.edit(item), hidden: !canEdit },
                                                                { text: 'Đổi mật khẩu', icon: 'textbox-password', onClick: () => this.resetPassword(item), hidden: !canChangePassword },
                                                                { divider: true, hidden: item.id == 1 },
                                                                { text: 'Xóa', icon: 'delete', onClick: () => this.delete(item), hidden: item.id == 1 || !canDelete },
                                                            ]
                                                        }
                                                    ]} />
                                                )
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                    <Loading
                        type={this.props.user.total == 0 ? 'block' : 'card'}
                        show={this.state.loading} />

                    <Pagination
                        total={this.props.user.total}
                        pageSize={this.state.filter.pageSize}
                        page={this.state.filter.page}
                        onChange={this.onPageChange} />

                    {
                        !this.state.loading && this.props.user.total == 0 && (
                            <div className="list-empty-msg">Danh sách trống</div>
                        )
                    }
                </Card>

                <CreateForm
                    open={this.state.openCreate}
                    onRequestClose={() => this.setState({ openCreate: false })} />

                <EditForm
                    open={!!this.state.currentEditItem && this.state.box == 'edit'}
                    model={this.state.currentEditItem}
                    onRequestClose={() => this.setState({ currentEditItem: null })} />

                <ResetPassword
                    open={!!this.state.currentEditItem && this.state.box == 'reset'}
                    model={this.state.currentEditItem}
                    onRequestClose={() => this.setState({ currentEditItem: null })} />
            </div>
        );
    }
}


export default connect(UserPage, state => ({
    user: state.user,
    status: state.app.enums.identityStatus
}), { ...actions });
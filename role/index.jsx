import moment from 'moment';
import React from 'react';
import * as actions from '../../actions/role';
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

class IndexPage extends React.Component {

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
        if (!this.props.role.loaded) {
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
        const canCreate = this.context.user.hasCap("Role.Create");
        const canEdit = this.context.user.hasCap("Role.Edit");
        const canDelete = this.context.user.hasCap("Role.Delete");

        let actionsItems = [];

        if (canCreate) {
            actionsItems.push({ text: "Thêm vai trò", icon: 'plus', onClick: () => this.setState({ openCreate: true }) });
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
                <Toolbar title='Quản lý vai trò người dùng'
                    inner
                    onSearch={this.onSearch}
                    actions={actionsItems}
                />

                <Card padding={0}>
                    <table className="table">
                        <thead >
                            <tr>
                                <th>#</th>
                                <th>Tên nhóm quyền</th>
                                <th>Trạng thái</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.role.items.map((item, index) => (
                                    <tr key={item.id} className={item.status == 3 ? 'del' : ''}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{getEnumLabel(item.status, this.props.status)}</td>
                                        <td className="td-actions">
                                            <Loading type="inline" show={this.state.currentDeleteItemId == item.id} />
                                            {
                                                this.state.currentDeleteItemId != item.id && item.status != 3 && item.name != 'Administrators' && (
                                                    <Actions actions={[
                                                        {
                                                            icon: 'dots-vertical',
                                                            menuItems: [
                                                                { text: 'Sửa', icon: 'pencil', onClick: () => this.edit(item), hidden: !canEdit },
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
                        type={this.props.role.items.length == 0 ? 'block' : 'card'}
                        show={this.state.loading} />

                    {
                        !this.state.loading && this.props.role.items.length == 0 && (
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
            </div>
        );
    }
}


export default connect(IndexPage, state => ({
    role: state.role,
    status: state.app.enums.identityStatus
}), actions);
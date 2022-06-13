import React from 'react';
import { connect } from '../../lib/connect';
import { getList as roleGetList } from '../../actions/role';
import RadioList from '../../controls/radiolist';

class RoleCheckList extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false,
            tabIndex: 0
        }
    }

    componentDidMount() {
        if (!this.props.role.loaded) {
            this.props.actions.roleGetList();
        }
    }

    render() {
        return (
            <div>
                <label>Vai trò</label>
                <hr />
                <RadioList
                    options={this.props.role.items.map(item => ({ label: item.name, value: item.id }))}
                    value={this.props.value}
                    onChange={this.props.onChange}
                />
            </div>
        );
    }
}

export default connect(RoleCheckList, state => ({
    role: state.role
}), { roleGetList });
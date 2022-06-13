import React from 'react';
import qs from 'qs';
import { connect } from '../../lib/connect';
import * as actions from '../../actions/account';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var params = qs.parse(this.props.location.search.replace(/^\?/, ''));
        console.log('logout', params);
        this.props.actions.logout(params.reason);
    }

    componentWillReceiveProps(props) {
        if (!props.account.loggedIn) {
            this.redirect('/login');
        }
    }

    render() {
        return <div>See you again</div>;
    }
}

export default connect(LoginPage, state => ({
    account: state.account,
}), actions);
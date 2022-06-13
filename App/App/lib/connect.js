
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import User from './user';
import request from './request';
import { connect as rdConnect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, Switch, Route } from 'react-router-dom';

//const AppContext = React.createContext()

// This context contains two interesting components
//const { Provider, Consumer } = AppContext;


export class ContextWrap extends Component {

    getChildContext() {
        return {
            user: new User(this.props.account, this.redirect),
            request: request,
            options: this.props.options,
            redirect: this.redirect
        };
    }

    redirect = (to, push) => {
        if (typeof to == 'string') {
            to = {
                pathname: to,
            };
        }

        to = {
            state: null,
            search: '',
            ...to
        }

        if (push) {
            this.props.history.push(to.pathname + to.search, to.state);
        }
        else {
            this.props.history.replace(to.pathname + to.search, to.state);
        }
    }


    render() {
        return this.props.children;
    }
}

ContextWrap.propsTypes = {
    user: PropTypes.object,
    options: PropTypes.object,
    children: PropTypes.node,
}

ContextWrap.childContextTypes = {
    user: PropTypes.object,
    request: PropTypes.object,
    options: PropTypes.object,
    redirect: PropTypes.func,
};

export const Context = rdConnect(state => ({
    account: state.account,
    options: state.app.options
}))(ContextWrap);

export const connect = (component, mapStateToProp, actions, mapDispatchToProps) => {
    if (!component) {
        throw new Error("Component can not be null");
    }

    component.contextTypes = ContextWrap.childContextTypes;

    component.prototype.redirect = function (to, push) {
        if (this.context.redirect) {
            this.context.redirect(to, push);
        }
    }

    var make;

    if (actions) {
        make = rdConnect(mapStateToProp, dispatch => {
            if (typeof mapDispatchToProps == 'function') {
                return {
                    actions: bindActionCreators(actions, dispatch),
                    ...mapDispatchToProps(dispatch, bindActionCreators)
                }
            }
            else {
                return {
                    actions: bindActionCreators(actions, dispatch)
                }
            }
        }, null, { forwardRef: true });
    }
    else {
        make = rdConnect(mapStateToProp, dispatch => {
            if (typeof mapDispatchToProps == 'function') {
                return {
                    ...mapDispatchToProps(dispatch, bindActionCreators)
                }
            }
            return null;
        }, null, { forwardRef: true })
    }


    return make(component);
}
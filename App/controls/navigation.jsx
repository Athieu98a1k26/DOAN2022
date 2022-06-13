import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from './icon';
import Tooltip from './tooltip';

import { connect } from '../lib/connect';


class Navigation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            subToggleIndex: null
        }
    }

    componentWillReceiveProps(props, context) {
        // console.log('sidebar new context', context);
    }


    menuItemClick = (item) => {
        if (this.props.onItemClick) {
            this.props.onItemClick(item);
        }
    }

    toggleSub = index => {
        this.setState({ subToggleIndex: this.state.subToggleIndex === index ? null : index });
    }

    render() {

        const currentPath = location.pathname;
        const { items, showMenuTooltip, showChevron } = this.props;
        return (
            <ul className="navigation">
                {
                    items.map((menuItem, index) => {
                        if (menuItem.cap && !this.context.user.hasCap(menuItem.cap)) {
                            return null;
                        }
                        if (menuItem.subItems) {
                            let items = menuItem.subItems.filter(item => !item.cap || this.context.user.hasCap(item.cap));
                            if (items.length == 0) return null;
                            let hasActive = items.find(item => item.path == currentPath);
                            let classes = classnames('navigation__sub', {
                                'navigation__sub--toggled': menuItem.toggled || hasActive && this.state.subToggleIndex === null || this.state.subToggleIndex == index
                            });
                            return (
                                <li className={classes} key={index}>
                                    <a onClick={() => this.toggleSub(index)}>
                                        <Icon name={menuItem.icon} />
                                        {menuItem.title}
                                    </a>

                                    <ul>
                                        {
                                            items.map(item => {
                                                let classes = currentPath == item.path ? 'active' : '';
                                                return (
                                                    <li className={classes} key={item.path}>
                                                        <Link to={item.path} onClick={() => this.menuItemClick(item)}>
                                                            {item.title}
                                                        </Link>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </li>
                            )
                        }
                        else if (menuItem.path) {
                            let classes = currentPath == menuItem.path ? 'active' : '';
                            return (
                                <li key={menuItem.path} className={classes} onClick={() => this.toggleSub(index)}>
                                    <Link to={menuItem.path} onClick={() => this.menuItemClick(menuItem)}>
                                        <Icon name={menuItem.icon} />
                                        {menuItem.title}
                                    </Link>
                                </li>
                            )
                        }
                    })
                }
            </ul>
        );
    }
}

const itemSharp = PropTypes.shape({
    title: PropTypes.string,
    icon: PropTypes.string,
    path: PropTypes.string,
    cap: PropTypes.string,
    toggled: PropTypes.bool,
    subItems: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        icon: PropTypes.string,
        path: PropTypes.string,
        cap: PropTypes.string
    }))
})

Navigation.propTypes = {
    open: PropTypes.bool,
    onItemClick: PropTypes.func,
    items: PropTypes.arrayOf(itemSharp),
}

export default connect(Navigation);
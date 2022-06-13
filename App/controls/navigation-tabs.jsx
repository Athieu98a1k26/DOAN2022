import React from 'react';
import PropTypes from 'prop-types';
import Tabs from './tabs';
import { Redirect } from 'react-router-dom';
import { connect } from '../lib/connect';


class NavigationTabs extends React.Component {

    constructor(props) {
        super(props);

        let tabIndex = 0;
        props.items.forEach((item, index) => {
            if (location.pathname == item.path) {
                tabIndex = index;
            }
        })

        this.state = {
            tabIndex
        }
    }

    onIndexChange = index => {
        this.setState({ tabIndex: index })
    }

    render() {
        const routes = this.props.items.map(item => ({
            ...item,
            key: item.path
        }));

        const currentItem = this.props.items[this.state.tabIndex];

        return (
            <React.Fragment>
                <div className="navigation-tabs">
                    <Tabs
                        routes={routes}
                        index={this.state.tabIndex}
                        onIndexChange={this.onIndexChange}
                    />
                </div>
                <div className="navigation-tabs-content">
                    {
                        currentItem && (
                            <React.Fragment>
                                {currentItem.path != location.pathname &&
                                    <Redirect to={currentItem.path} />
                                }
                                {React.createElement(currentItem.component)}
                            </React.Fragment>
                        )
                    }
                </div>
            </React.Fragment>
        );
    }
}

const itemSharp = PropTypes.shape({
    title: PropTypes.string,
    icon: PropTypes.string,
    path: PropTypes.string,
    cap: PropTypes.string,
    component: PropTypes.any
})

NavigationTabs.propTypes = {
    open: PropTypes.bool,
    onItemClick: PropTypes.func,
    items: PropTypes.arrayOf(itemSharp),
}

export default connect(NavigationTabs);
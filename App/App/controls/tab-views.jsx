import React, { Component } from 'react';
import Icon from './icon';
import PropTypes from 'prop-types';
import colors from '../constants/color';
import classnames from 'classnames';
import Actions from './actions';

class TabViews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTabTitle: "",
            index: '',
        }
    }

    componentDidMount() {

    }
    componentWillReceiveProps(props) {
        var current = props.routes[props.index];
        if (current) {
            if ((props.index != this.props.index || current.title) && (props.index != this.state.index || current.title))
                this.setState({ currentTabTitle: current.title || "", index: props.index });
        }

        // console.log('current: ', this.refs.fieldNameView, props.nextRefs, props)
        if (this.refs.fieldNameView && (!this.props.isFilters)) {
            this.refs.fieldNameView.focus();
        }

    }

    onTabClick = (event, index, route) => {
        event.preventDefault();
        if (index == this.props.index) {
            if (route.hasFilter && this.props.onRequestShowFilter) {
                this.props.onRequestShowFilter();
            }
        }
        else {
            this.props.onIndexChange(index, route);
        }
    }

    getSubIndex = (parentIndex, subIndex) => {
        return parseInt(parentIndex + '00' + subIndex);
    }

    validateCurrentTabTitle = () => {

    }

    getCurrentTabTitle = () => {
        return this.state.currentTabTitle;
    }

    handleTabTitleChange = e => {
        this.setState({
            currentTabTitle: e.target.value
        })
    }

    render() {
        const { theme, routes, index, renderScene, onIndexChange, justify, actions,
            style, tabsStyle, contentStyle, showAddTabButton, addTabText,
            addTabPlaceHolder, onAddTabButtonClick, showFilter, ...props } = this.props;
        const classes = classnames('tab-container', {
            ['tab-container--' + this.colorNameToClass(theme)]: theme
        });

        const navClasses = classnames('nav nav-tabs', {
            'nav-fill': justify
        });

        return (
            <div className={classes} style={style}>
                <ul className={navClasses} role="tablist" style={tabsStyle}>
                    {
                        this.props.routes.map((item, i) => (
                            <li className="nav-item" key={item.key}>
                                {
                                    showFilter && item.hasFilter && i == index ? (
                                        <input
                                            ref={'fieldNameView'}
                                            type='text'
                                            placeholder={addTabPlaceHolder}
                                            value={this.state.currentTabTitle}
                                            className="form-control form-control-default mt-1 ml-1"
                                            onChange={this.handleTabTitleChange} />
                                    ) : (
                                            <a className={`nav-link ${i == index ? 'active' : ''}`}
                                                onClick={e => this.onTabClick(e, i, item)}
                                                role="tab" aria-expanded={i == index}>
                                                {
                                                    item.icon && <Icon name={item.icon} style={{ marginRight: 10 }} />
                                                }
                                                {item.title}
                                                {
                                                    item.hasFilter && i == index && <Icon name="more-vert" style={{ marginRight: 10, marginLeft: 10 }} />
                                                }
                                            </a>
                                        )
                                }
                            </li>
                        ))
                    }
                    {
                        showAddTabButton && (
                            <li className="nav-item tab-add-tab-button">
                                <a className="nav-link bg-success text-white" onClick={onAddTabButtonClick}><Icon name="plus" /> {addTabText}</a>
                            </li>
                        )
                    }
                    {
                        actions && (
                            <li className="tab-actions">
                                <Actions actions={actions} hiddenXs />
                            </li>
                        )
                    }
                </ul>

                <div className="tab-content" style={contentStyle}>
                    {
                        showFilter && this.props.renderFilter && this.props.routes[index] && this.props.routes[index].hasFilter && (
                            this.props.renderFilter(this.props.routes[index])
                        )
                    }
                    {
                        this.props.routes.map((item, i) => {

                            let classes = classnames('tab-pane animated', {
                                fadeIn: i == index,
                                active: i == index
                            });
                            return (
                                <div className={classes} key={item.key}
                                    role="tabpanel" aria-expanded={i == index}>
                                    {
                                        renderScene(item)
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div >
        );
    }

    colorNameToClass = name => {
        return name ? name.replace(/\w+([A-Z])/g, "-$1").toLowerCase() : "";
    }
}

const routeType = {
    icon: PropTypes.string,
    title: PropTypes.string,
    key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    hasFilter: PropTypes.bool
}

TabViews.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.shape({
        ...routeType,
    })).isRequired, //mảng định tuyến tabs

    index: PropTypes.number, //current routes index
    showFilter: PropTypes.bool,
    showAddTabButton: PropTypes.bool,
    onIndexChange: PropTypes.func.isRequired, // khi tab thay đổi
    onRequestShowFilter: PropTypes.func,
    onAddTabButtonClick: PropTypes.func,
    renderScene: PropTypes.func.isRequired, // render nội dung tab
    renderFilter: PropTypes.func.isRequired, // render form filter
    addTabText: PropTypes.string,
    addTabPlaceHolder: PropTypes.string,
    justify: PropTypes.bool, // căn đều hai bên
    theme: PropTypes.oneOf([null, ...Object.keys(colors)]), // màu theme
    actions: Actions.propTypes.actions,
    style: PropTypes.object,
    tabsStyle: PropTypes.object,
    contentStyle: PropTypes.object
}



export default TabViews;
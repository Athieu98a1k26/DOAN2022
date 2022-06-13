import React, { Component } from 'react';
import Icon from './icon';
import PropTypes from 'prop-types';
import colors from '../constants/color';
import classnames from 'classnames';
import Actions from './actions';
import Dropdown from './dropdown';

class Tabs extends Component {

    onTabClick = (event, index, route) => {
        event.preventDefault();
        this.props.onIndexChange(index, route);
    }

    getSubIndex = (parentIndex, subIndex) => {
        return parseInt(parentIndex + '00' + subIndex);
    }

    render() {
        const { theme, routes, index, renderScene, onIndexChange, justify, actions,
            style, tabsStyle, contentStyle, ...props } = this.props;
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
                                    item.subRoutes ? (
                                        <Dropdown
                                            button={
                                                <a className="nav-link dropdown-toggle">
                                                    {
                                                        item.icon && <Icon name={item.icon} style={{ marginRight: 10 }} />
                                                    }
                                                    {item.title}&nbsp;&nbsp;&nbsp;
                                                </a>
                                            }>
                                            {
                                                item.subRoutes.map((subItem, subI) => {
                                                    let si = this.getSubIndex(i, subI);
                                                    return (
                                                        <Dropdown.Item text={subItem.title}
                                                            key={subItem.key}
                                                            className={si == index ? 'active' : ''}
                                                            onClick={e => this.onTabClick(e, si, item)}
                                                        />
                                                    )
                                                })
                                            }
                                        </Dropdown>
                                    ) : (
                                            <a className={`nav-link ${i == index ? 'active' : ''}`}
                                                onClick={e => this.onTabClick(e, i, item)}
                                                role="tab" aria-expanded={i == index}>
                                                {
                                                    item.icon && <Icon name={item.icon} style={{ marginRight: 10 }} />
                                                }
                                                {item.title}
                                                {
                                                    item.badge >= 0 && <span style={{ marginLeft: 4 }}>({item.badge})</span>
                                                }
                                            </a>
                                        )
                                }
                            </li>
                        ))
                    }
                    {
                        actions && (
                            <li className="tab-actions">
                                <Actions actions={actions} hiddenXs />
                            </li>
                        )
                    }
                </ul>
                {
                    renderScene && (
                        <div className="tab-content" style={contentStyle}>
                            {
                                this.props.routes.map((item, i) => {
                                    if (item.subRoutes) {
                                        return item.subRoutes.map((subItem, subI) => {
                                            let si = this.getSubIndex(i, subI);
                                            let classes = classnames('tab-pane animated', {
                                                fadeIn: si == index,
                                                active: si == index
                                            });
                                            return (
                                                <div className={classes} key={subItem.key}
                                                    role="tabpanel" aria-expanded={si == index}>
                                                    {
                                                        renderScene(subItem)
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                    else {
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
                                    }
                                })
                            }
                        </div>
                    )
                }
            </div>
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
}

Tabs.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.shape({
        ...routeType,
        subRoutes: PropTypes.arrayOf(PropTypes.shape(routeType))
    })).isRequired, //mảng định tuyến tabs
    index: PropTypes.number, //current routes index
    onIndexChange: PropTypes.func.isRequired, // khi tab thay đổi
    renderScene: PropTypes.func, // render nội dung tab
    justify: PropTypes.bool, // căn đều hai bên
    theme: PropTypes.oneOf([null, ...Object.keys(colors)]), // màu theme
    actions: Actions.propTypes.actions,
    style: PropTypes.object,
    tabsStyle: PropTypes.object,
    contentStyle: PropTypes.object
}



export default Tabs;
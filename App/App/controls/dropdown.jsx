import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from './icon';
import { NavLink } from 'react-router-dom';
export default class DropdownList extends React.Component {
    render() {
        const { tagName, button, className, children, right,
            block, static: ddStatic, boundary, container, display,
            width, maxHeight, menuStyle: menuStyle1, ...props } = this.props;
        const TagName = tagName || 'div';

        const classes = classNames('dropdown-menu', {
            'dropdown-menu-right': right,
            'dropdown-menu-static': ddStatic,
            'dropdown-menu--block': block
        });

        const menuStyle = {
            width,
            maxHeight,
            overflowY: 'auto',
            ...menuStyle1
        }

        return (
            <TagName {...props} className={classNames('dropdown', className)}>
                {
                    button && React.cloneElement(button, {
                        'data-toggle': 'dropdown',
                        'data-boundary': boundary,
                        'data-container': container,
                        'data-display': display
                    })
                }
                <div className={classes} style={menuStyle}>
                    {children}
                </div>
            </TagName>
        )
    }
}

DropdownList.defaultProps = {
    display: 'dynamic',
    container: 'body',
    boundary: 'window',
    maxHeight: 400
}

DropdownList.propTypes = {
    button: PropTypes.element,
    tagName: PropTypes.string,
    right: PropTypes.bool,
    block: PropTypes.bool,
    static: PropTypes.bool,
    width: PropTypes.number
}


export class DropdownItem extends React.Component {
    render() {
        const { className, divider, header, text, icon, children, hidden, link, href,
            target, active, disabled, ...props } = this.props;

        if (hidden) return null;

        if (divider) {
            return <div className="dropdown-divider"></div>;
        }

        if (header) {
            return <h6 className="dropdown-header">{text}</h6>
        }

        const classes = classNames("dropdown-item", className, { active, disabled });

        if (href && href != '#' && link !== false && !href.match(/^\s*http/i)) {
            return (
                <NavLink activeClassName="active" exact={true} target={target}
                    className={classes} to={href}>
                    {icon && <Icon name={icon} style={{ marginRight: 10 }} />}
                    {text} {children}
                </NavLink>
            )
        }

        return (
            <a {...props} className={classes} target={target} href={href}>
                {icon && <Icon name={icon} style={{ marginRight: 10 }} />}
                {text} {children}
            </a>
        )
    }
}

DropdownItem.defaultProps = {
    tabIndex: 0
}

DropdownItem.propTypes = {
    divider: PropTypes.bool,
    header: PropTypes.bool,
    hidden: PropTypes.bool,
    text: PropTypes.string,
    link: PropTypes.bool,
    href: PropTypes.string,
    target: PropTypes.oneOf(['', '_blank', '_self', '_parent', '_top', 'framename']),
    onClick: PropTypes.func,
    icon: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number
}

DropdownList.Item = DropdownItem;

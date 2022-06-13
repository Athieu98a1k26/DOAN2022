import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Dropdown from './dropdown';
import Icon from './icon';
import Button from './button';

export default class Actions extends React.Component {
    render() {
        const { className, inverse } = this.props;
        const iconClass = classNames('actions__item', {
            'hidden-xs-down': this.props.hiddenXs
        });
        const actionsClass = classNames(
            className,
            "actions",
            inverse ? "actions--inverse" : ''
        )

        return (
            this.props.actions && (
                <div style={this.props.style} className={actionsClass}>
                    {
                        this.props.actions.map((item, index) => {
                            if (item.hidden) return null;
                            if (item.menuItems) {
                                let count = item.menuItems.count(item => !item.hidden);
                                return count > 0 && (
                                    <Dropdown
                                        key={index}
                                        right
                                        className={iconClass}
                                        style={{ width: 'auto' }}
                                        button={
                                            item.text ?
                                                <Button key={index} text={item.text} icon={item.icon} className={classNames(item.className, 'mr-1', { 'hidden-xs-down': this.props.hiddenXs })} /> :
                                                <Icon name={item.icon} />
                                        }>
                                        {
                                            item.menuItems.map((mitem, mi) => (
                                                <Dropdown.Item key={mi} {...mitem} />
                                            ))
                                        }
                                    </Dropdown>
                                )
                            }
                            else if (item.customRender) {
                                return React.cloneElement(item.customRender(), { key: index });
                            }
                            else if (item.text) {
                                return <Button key={index} {...item} className={classNames(item.className, 'mr-1', { 'hidden-xs-down': this.props.hiddenXs })} />
                            }
                            else {
                                return (
                                    <Icon name={item.icon} key={index} {...item} className={iconClass} />
                                )
                            }
                        })
                    }
                </div >
            )
        )
    }
}

Actions.propTypes = {
    hiddenXs: PropTypes.bool,
    inverse: PropTypes.bool,
    actions: PropTypes.arrayOf(PropTypes.shape({
        hidden: PropTypes.bool,
        icon: PropTypes.string,
        href: PropTypes.string,
        link: PropTypes.bool,
        onClick: PropTypes.func,
        text: PropTypes.string,
        className: PropTypes.string,
        type: PropTypes.oneOf(['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'link']),
        menuItems: PropTypes.arrayOf(PropTypes.shape({
            divider: PropTypes.bool,
            hidden: PropTypes.bool,
            text: PropTypes.string,
            link: PropTypes.bool,
            href: PropTypes.string,
            target: PropTypes.oneOf(['', '_blank', '_self', '_parent', '_top', 'framename']),
            onClick: PropTypes.func,
            icon: PropTypes.string
        }))
    }))
}
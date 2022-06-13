import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class ButtonGroup extends React.Component {

    render() {
        const { className, size, toggleable, wrap, style, ...props } = this.props;

        const allClass = classNames('btn-group', className, {
            'btn-group-lg': size == 'lager',
            'btn-group-sm': size == 'small',
            'btn-group-toggle': toggleable
        });

        const attrs = {
            ...props,
            style: wrap ? {flexWrap: 'wrap', ...style} : style,
            className: allClass,
        };

        if (toggleable) {
            attrs['data-toggle'] = 'buttons';
        }

        return (
            <div {...attrs}>
                {this.props.children}
            </div>
        )
    }
}

ButtonGroup.propTypes = {
    className: PropTypes.string,
    size: PropTypes.oneOf(['lager', 'default', 'small']),
    toggleable: PropTypes.bool,
    wrap:PropTypes.bool // flex-wrap
}
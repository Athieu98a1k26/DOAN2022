import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
class Col extends Component {
    render() {
        const { children, size, className, offset,col,column, ...attributes } = this.props;
        let columnSize = size || col ||column || 12;
        const classes = classNames(
            `col-md-${columnSize}`,
            offset ? `offset-md-${+offset}` : null,
            className
        )
        return (
            <div className={classes} {...attributes}>
                {children && children}
            </div>
        );
    }
}

Col.propsTypes = {
    size: PropTypes.oneOf(range(1, 12))
}
export default Col;

export class Row extends Component {
    render() {
        const { className, children, ...attributes } = this.props;
        const classes = classNames(
            className,
            "row",
        )
        return (
            <div className={classes} {...attributes}>
                {children && children}
            </div>
        );
    }
}
Row.Col = Col;
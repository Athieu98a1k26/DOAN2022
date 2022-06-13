import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

let count = 0;
class Checkbox extends Component {
    constructor(props) {
        super(props);

        this.id = "ct-checkbox-" + (count++);
    }

    handleChange = (e) => {
        if (this.props.onChange) {
            this.props.onChange(e.target.checked);
        }
    }

    onLabelClick = (e) => {
        e.preventDefault();
        if (this.props.onChange) {
            this.props.onChange(!this.props.checked);
        }
    }

    render() {
        const { className, label, inline, checked, onChange, disabled, children, ...props } = this.props;

        const classes = classNames(
            className,
            'checkbox',
            { 'checkbox-inline': inline }
        );


        return (
            <div className={classes} {...props}>
                <input
                    type="checkbox"
                    onChange={this.handleChange}
                    checked={checked}
                    disabled={disabled} />
                <label className="checkbox__label" onClick={this.onLabelClick} >{(label || children)}</label>
            </div>
        );
    }
}
Checkbox.defaultProps = {
    checked: false,
    disabled: false,
}

Checkbox.propTypes = {
    className: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
    inline: PropTypes.bool,
    onChange: PropTypes.func
};

export default Checkbox;
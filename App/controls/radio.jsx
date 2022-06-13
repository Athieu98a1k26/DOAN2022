import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
let count = 0;
class Radio extends Component {
    constructor(props) {
        super(props);

        this.id = "ct-radio-" + (count++);
    }

    handleChange = (e) => {
        if (this.props.onChange) {
            this.props.onChange(e.target.checked);
        }
    }


    render() {
        const { className, label, inline, checked, onChange, disabled, children, ...props } = this.props;

        const classes = classNames(className, 'radio', {
            'radio-inline': inline
        });

        return (
            <div className={classes} {...props}>
                <input
                    type="radio"
                    id={this.id}
                    onChange={this.handleChange}
                    checked={checked}
                    disabled={disabled} />
                <label className="radio__label" htmlFor={this.id}>{(label || children)}</label>
            </div>
        );
    }
}


Radio.propTypes = {
    className: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    inline: PropTypes.bool,
    label: PropTypes.string
};

export default Radio;
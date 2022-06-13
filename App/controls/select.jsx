import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        }
    }

    validate = () => {
        const { required, requiredMessage, onValidate } = this.props;
        let error = null, msgType = 'danger';
        if (required && typeof this.select.value === 'undefined' || this.select.value === '' || this.select.value === null) {
            error = requiredMessage;
        }
        if (onValidate) {
            onValidate(!!error);
        }

        if (error) {
            this.setState({ error, msgType });
            return false;
        }
        else {
            this.setState({ error: null });
            return true;
        }
    }

    handleChange = (e) => {
        if (this.props.onChange) {
            this.props.onChange(this.select.value);
        }
        if (this.props.autoValidate) {
            this.validate();
        }
    }
    render() {
        let { className, size, options, float, material, label, column,
            onChange, required, placeholder, requiredMessage, autoValidate, wrapClass,
            ...attributes } = this.props;
        const labelClass = classNames(
            'form-control--label',
            column ? `col-md-${12 - column} col-form-label` : null
        )
        const classes = classNames('form-control', {
            'form-control-sm': size == 'small',
            'form-control-lg': size == 'large',
            'form-control--active': this.state.value,
            'form-control-default': !material,
            'is-invalid': this.state.error,
            [`form-control-${this.state.errorType}`]: this.state.error
        });
        const wrapClasses = classNames(className,
            column ? 'row' : null,
            {
                'form-group': label,
                'form-group-default': !material,
                [`has-${this.state.msgType}`]: this.state.error,
            });

        const wrapControlClasses = classNames(
            'wrap-form-control',
            'select',
            wrapClass,
            column ? `col-md-${column}` : null,
            label ? null : 'empty-label'
        )
        return (
            <div className={wrapClasses}>
                {
                    label && <label className={labelClass}>{label}
                        {
                            required && <span className="text-danger required-icon">(*)</span>
                        }
                    </label>
                }
                <div className={wrapControlClasses}>
                    <select ref={ref => this.select = ref} onChange={this.handleChange}
                 
                        className={classes} {...attributes}>
                        {
                            options.map((option, index) =>
                                <option key={index}  value={option.value}>{option.label}</option>
                            )
                        }
                    </select>
                    {
                        this.state.error && (
                            <small className="invalid-feedback d-block">{this.state.error}</small>
                        )
                    }
                </div>
            </div>
        );
    }
}

Select.defaultProps = {
    value: '',
    size: '',
    float: false,
    requiredMessage: __('Trường này là bắt buộc'),
    autoValidate: true,
}
Select.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    size: PropTypes.string
}
export default Select;
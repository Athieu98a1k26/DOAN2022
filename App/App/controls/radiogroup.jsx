import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radio from './radio';
import classNames from 'classnames';

class RadioGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null
        }
    }

    handleUpdate = (checked, value) => {
        if (checked) {
            if (this.props.hasOwnProperty('onChange')) {
                this.props.onChange(value);
            }
        }
    }
    render() {
        const { className, options, value, onChange, label, column, required, ...attributes } = this.props;


        const labelClass = classNames(
            'form-control--label',
            column ? `col-md-${12 - column} col-form-label` : null
        )

        const wrapClasses = classNames('radio-list', className,
            {
                'form-group': label,
                'form-group-default': true
            });

        const wrapControlClasses = classNames(
            'wrap-form-control',
            column ? `col-md-${column}` : null,
        )

        return (
            <div className={wrapClasses}>
                {
                    label && (
                        <label className={labelClass}>{label}
                            {required && <small className="text-danger required-icon">(*)</small>}
                        </label>
                    )
                }
                <div className={wrapControlClasses}>
                    {
                        options.map((item, index) => {
                            return (
                                <div key={index}>
                                    <Radio
                                        value={item.value}
                                        onChange={checked => this.handleUpdate(checked, item.value)}
                                        checked={item.value === value}
                                        className="mb-1"
                                        {...attributes}>
                                        {item.label && item.label}
                                    </Radio>
                                    {
                                        item.value == value && item.renderContent && (
                                            <div className="pt-2 pb-3">
                                                {item.renderContent(item)}
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}
RadioGroup.defaultProps = {
    value: '',
    className: ''
}
RadioGroup.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    column: PropTypes.number,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        renderContent: PropTypes.func
    })).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func
};

export default RadioGroup;
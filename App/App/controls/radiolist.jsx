import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radio from './radio';
import classNames from 'classnames';
class RadioList extends Component {
    constructor(props) {
        super(props);
    }

    handleUpdate = (checked, value) => {
        if (checked) {
            if (this.props.hasOwnProperty('onChange')) {
                this.props.onChange(value);
            }
        }
    }
    render() {
        const { className, options, value, onChange, label,inline,radioClassName,...attributes } = this.props;

        const classes = classNames(
            'form-group',
            'form-group-default',
            className,
           
        );
        const radioClasses = classNames(
             inline ? "d-inline-block list-inline" : null,
             radioClassName
        )

        return (
            <div className={classes}>
                {label && <label className="form-control--label">{label}</label>}
                <div className="radio-list">
                {
                    options.map((item, index) => {
                        return (
                            <Radio
                                className={radioClasses}
                                key={index}
                                value={item.value}
                                onChange={checked => this.handleUpdate(checked, item.value)}
                                checked={item.value === value}
                                { ...attributes } >
                                {item.label && item.label}
                            </Radio>
                        )
                    })
                }
                </div>
            </div>
        );
    }
}
RadioList.defaultProps = {
    value: '',
    inline:false,
}
RadioList.propTypes = {
    className: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired
};

export default RadioList;
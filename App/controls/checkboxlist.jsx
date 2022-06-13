import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from './checkbox';
import classNames from 'classnames';

class CheckboxList extends Component {
    handleUpdate = (checked, value) => {
        if (this.props.onChange) {
            var values = this.props.values || [];
            if (checked) {
                values = [...values, value].distinct();
            }
            else {
                values = values.filter(v => v != value);
            }
            this.props.onChange(values);
        }
    }

    render() {
        const { label, className, options, values: propValues, inline, onChange, checkboxClassName, ...props } = this.props;
        const values = propValues || [];
        console.log('checkbox list values', values)

        const classes = classNames(
            'form-group',
            'form-group-default',
            className,
        )

        const radioClasses = classNames(
            inline ? "d-inline-block list-inline" : null,
            checkboxClassName
        )
        return (
            <div className={classes} {...props}>
                {label && <label className="form-control--label">{label}</label>}
                <div className="checkbox-list">
                    {
                        options.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <Checkbox
                                        className={radioClasses}
                                        value={item.value || ""}
                                        onChange={checked => this.handleUpdate(checked, item.value)}
                                        checked={values.contains(item.value)}
                                        label={item.label} />
                                    {
                                        !inline && (
                                            <div className="clearfix mb-2"></div>
                                        )
                                    }
                                </React.Fragment>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}
CheckboxList.defaultProps = {
    values: [],
    options: [],
    className: '',
    inline: false,
}
CheckboxList.propTypes = {
    className: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })).isRequired,
    values: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))
    ]),
    inline: PropTypes.bool,
    onChange: PropTypes.func
};

export default CheckboxList;